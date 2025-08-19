"use client";

import { useState } from "react";
import { CheckinFormScreen } from "./screens/checkin-form-screen";
import { FlightDetailsScreen } from "./screens/flight-details-screen";
import { BoardingPassScreen } from "./screens/boarding-pass-screen";
import { AircraftWeightScreen } from "./screens/aircraft-weight-screen";
import { SecurityQuestionsScreen } from "./screens/security-questions-screen";
import { useToast } from "@/hooks/use-toast";
import { findPassenger } from "@/lib/data";
import type { CheckedInPassenger, AircraftWeightInfo } from "@/lib/types";
import { addCheckedInData, getAccumulatedWeight, resetWeight } from "@/lib/weight-store";

type Screen = 'checkinForm' | 'securityQuestions' | 'flightDetails' | 'boardingPass' | 'aircraftWeight';

export function CheckInFlow() {
  const [screen, setScreen] = useState<Screen>('checkinForm');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [currentPassenger, setCurrentPassenger] = useState<CheckedInPassenger | null>(null);
  const [selectedSeat, setSelectedSeat] = useState('');
  const [baggageCount, setBaggageCount] = useState(0);
  const [aircraftWeightInfo, setAircraftWeightInfo] = useState<AircraftWeightInfo | null>(null);

  const handleSearch = async (data: { passengerName: string; bookingRef: string; }) => {
    setIsLoading(true);
    await new Promise(res => setTimeout(res, 500));
    
    const passengerData = findPassenger(data.bookingRef, data.passengerName);
    
    setIsLoading(false);
    if (passengerData) {
      const passengerWithBookingRef: CheckedInPassenger = {
        ...passengerData,
        bookingRef: data.bookingRef,
        checkedBags: 0,
        totalBaggageWeight: 0,
      };
      setCurrentPassenger(passengerWithBookingRef);
      setSelectedSeat(''); 
      setBaggageCount(passengerData.baggageAllowance.count > 0 ? 1 : 0);
      setScreen('securityQuestions'); // Move to security questions first
      return passengerData;
    } else {
      toast({
        variant: "destructive",
        title: "Search Error",
        description: "Passenger name or PNR is incorrect. Please verify and try again.",
      });
      return null;
    }
  };

  const handleSecurityCheckPassed = () => {
    setScreen('flightDetails');
  };
  
  const handleConfirmCheckin = () => {
    if (!currentPassenger || !selectedSeat) return;

    let finalGate = currentPassenger.gate;
    if (currentPassenger.hasGateChange) {
      const originalGateNumber = parseInt(finalGate.substring(1));
      finalGate = `${finalGate.charAt(0)}${originalGateNumber + 2}`;
    }

    const finalBaggageWeight = baggageCount * currentPassenger.baggageAllowance.weight;
    const finalPassenger: CheckedInPassenger = {
        ...currentPassenger,
        seat: selectedSeat,
        checkedBags: baggageCount,
        totalBaggageWeight: finalBaggageWeight,
        finalGate: finalGate,
    };
    
    addCheckedInData(finalBaggageWeight);
    setCurrentPassenger(finalPassenger);
    setScreen('boardingPass');
  };
  
  const handleNewCheckin = () => {
    setCurrentPassenger(null);
    setSelectedSeat('');
    setBaggageCount(0);
    setAircraftWeightInfo(null);
    setScreen('checkinForm');
  };
  
  const handleShowWeight = () => {
    const { passengerWeight, baggageWeight, cargoWeight } = getAccumulatedWeight();
    const totalWeight = passengerWeight + baggageWeight + cargoWeight;
    setAircraftWeightInfo({ passengerWeight, baggageWeight, cargoWeight, totalWeight });
    setScreen('aircraftWeight');
  };

  const handlePrint = () => {
    window.print();
  };

  const renderScreen = () => {
    switch (screen) {
      case 'checkinForm':
        return <CheckinFormScreen onSearch={handleSearch} isLoading={isLoading} />;
      case 'securityQuestions':
        return <SecurityQuestionsScreen onConfirm={handleSecurityCheckPassed} onBack={() => setScreen('checkinForm')} />;
      case 'flightDetails':
        if (!currentPassenger) return <CheckinFormScreen onSearch={handleSearch} isLoading={isLoading} />;
        return (
          <FlightDetailsScreen 
            passenger={currentPassenger}
            selectedSeat={selectedSeat}
            onSeatSelect={setSelectedSeat}
            baggageCount={baggageCount}
            onBaggageCountChange={setBaggageCount}
            onConfirm={handleConfirmCheckin}
            onBack={() => setScreen('securityQuestions')}
          />
        );
      case 'boardingPass':
        if (!currentPassenger) return <CheckinFormScreen onSearch={handleSearch} isLoading={isLoading} />;
        return (
          <BoardingPassScreen 
            passenger={currentPassenger}
            onPrint={handlePrint}
            onNewCheckin={handleNewCheckin}
            onShowWeight={handleShowWeight}
          />
        );
      case 'aircraftWeight':
        if (!aircraftWeightInfo) return null;
         return (
            <AircraftWeightScreen 
                weightInfo={aircraftWeightInfo}
                onBack={() => setScreen('boardingPass')}
            />
         );
      default:
        return <CheckinFormScreen onSearch={handleSearch} isLoading={isLoading} />;
    }
  };

  return <div className="w-full h-full flex items-center justify-center">{renderScreen()}</div>;
}
