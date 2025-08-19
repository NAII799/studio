
"use client";

import { useState } from "react";
import { AirportHeader } from "@/components/airport-header";
import { AirportFooter } from "@/components/airport-footer";
import { CheckInFlow } from "@/components/check-in-flow";
import { BoardingPassPrint } from "@/components/boarding-pass-print";
import { BaggageTagPrint } from "@/components/baggage-tag-print";
import type { CheckedInPassenger } from "@/lib/types";

export default function Home() {
  const [passenger, setPassenger] = useState<CheckedInPassenger | null>(null);
  const [printView, setPrintView] = useState<'boardingPass' | 'baggageTag' | null>(null);

  const handleCheckinComplete = (p: CheckedInPassenger) => {
    setPassenger(p);
  };
  
  const handlePrintRequest = (type: 'boardingPass' | 'baggageTag') => {
    setPrintView(type);
    setTimeout(() => {
        window.print();
        setPrintView(null);
    }, 100);
  };

  const handleNewCheckin = () => {
    setPassenger(null);
    setPrintView(null);
  };

  const showPrintable = printView && passenger;

  return (
    <>
      <div className={`flex flex-col min-h-screen bg-background ${showPrintable ? 'no-print' : ''}`}>
        <AirportHeader />
        <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-10">
          <CheckInFlow 
            onCheckinComplete={handleCheckinComplete}
            onPrintRequest={handlePrintRequest}
            onNewCheckin={handleNewCheckin}
            checkedInPassenger={passenger}
          />
        </main>
        <AirportFooter />
      </div>
      {showPrintable && (
        <div className="printable-area">
            {printView === 'boardingPass' && <BoardingPassPrint passenger={passenger} />}
            {printView === 'baggageTag' && <BaggageTagPrint passenger={passenger} />}
        </div>
      )}
    </>
  );
}
