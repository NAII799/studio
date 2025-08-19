"use client";

import type { CheckedInPassenger } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScreenWrapper } from "@/components/screen-wrapper";
import { SeatMap } from "@/components/seat-map";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Armchair, Plane, ChevronRight, Check } from "lucide-react";

const Wheelchair = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="9" cy="4" r="2"/>
        <path d="M19 13.5a2.5 2.5 0 0 1-5 0V7H9.5a5.5 5.5 0 0 0-5.23 7.21L5.5 22H7l1-3,2-9h3.5"/>
        <circle cx="17.5" cy="18.5" r="2.5"/>
        <path d="M14 8h5"/>
    </svg>
);


interface FlightDetailsScreenProps {
  passenger: CheckedInPassenger;
  selectedSeat: string;
  onSeatSelect: (seat: string) => void;
  baggageCount: number;
  onBaggageCountChange: (count: number) => void;
  onConfirm: () => void;
  onBack: () => void;
}

const InfoRow = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0 text-sm">
    <span className="font-medium text-muted-foreground">{label}</span>
    <span className="font-semibold text-foreground">{value}</span>
  </div>
);

export function FlightDetailsScreen({
  passenger,
  selectedSeat,
  onSeatSelect,
  baggageCount,
  onBaggageCountChange,
  onConfirm,
  onBack,
}: FlightDetailsScreenProps) {

  const isOverAllowance = baggageCount > passenger.baggageAllowance.count;
  const extraBags = baggageCount - passenger.baggageAllowance.count;
  const extraFee = extraBags * 150; // 150 SAR per extra bag
  const isSeatSelected = !!selectedSeat;


  return (
    <div className="w-full max-w-6xl animate-in fade-in-0 duration-500 text-foreground">
        <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-primary">Flight Details & Seat Selection</h2>
            <p className="text-muted-foreground">Verify details, select a seat, and add baggage.</p>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column: Info */}
        <div className="lg:col-span-2 space-y-6">
          <ScreenWrapper className="w-full max-w-full p-0">
             <Card className="bg-transparent border-0">
              <CardHeader className="p-4"><CardTitle className="text-base">Passenger Information</CardTitle></CardHeader>
              <CardContent className="p-4 pt-0">
                <InfoRow label="Name" value={passenger.nameEn} />
                <InfoRow label="PNR" value={passenger.bookingRef} />
                <InfoRow label="Class" value={passenger.classEn} />
              </CardContent>
            </Card>
             <Card className="bg-transparent border-0 border-t rounded-none">
              <CardHeader className="p-4"><CardTitle className="text-base">Flight Information</CardTitle></CardHeader>
              <CardContent className="p-4 pt-0">
                 <InfoRow label="Flight" value={passenger.flight} />
                 <InfoRow label="Aircraft" value={passenger.aircraftModel} />
                 <InfoRow label="From" value={passenger.originEn} />
                 <InfoRow label="To" value={passenger.destinationEn} />
                 <InfoRow label="Departure" value={passenger.departure} />
                 <InfoRow label="Gate" value={passenger.gate} />
              </CardContent>
            </Card>
            {passenger.specialAssistance === 'wheelchair' && (
                <div className="p-4 border-t border-border">
                <Alert className="bg-blue-900/50 border-blue-700">
                    <Wheelchair className="h-5 w-5 text-blue-300" />
                    <AlertTitle className="text-blue-200">Special Assistance Request</AlertTitle>
                    <AlertDescription className="text-blue-300">
                        Wheelchair assistance has been recorded for this passenger.
                    </AlertDescription>
                </Alert>
                </div>
            )}
          </ScreenWrapper>
          <ScreenWrapper className="w-full max-w-full">
            <div className="baggage-section text-center">
              <h3 className="text-lg font-bold text-primary mb-4">Baggage Registration</h3>
              <div className="bg-secondary/50 p-3 rounded-md border border-border mb-4 max-w-md mx-auto text-sm">
                 <p>Allowance: <span className="font-bold">{passenger.baggageAllowance.count}</span> piece(s)</p>
                 <p>Weight per piece: <span className="font-bold">{passenger.baggageAllowance.weight}</span> kg</p>
              </div>
              <div className="space-y-2 max-w-xs mx-auto">
                 <Label htmlFor="baggageCount" className="font-semibold">Number of Bags</Label>
                 <Input 
                   type="number" 
                   id="baggageCount" 
                   min="0"
                   max="10" 
                   value={baggageCount}
                   onChange={(e) => onBaggageCountChange(Math.max(0, parseInt(e.target.value) || 0))}
                   className="h-12 text-center text-xl font-bold rounded-lg bg-input"
                 />
              </div>
              {isOverAllowance && (
                 <Alert variant="destructive" className="mt-4 max-w-md mx-auto text-left text-sm">
                   <AlertTriangle className="h-4 w-4" />
                   <AlertTitle>Excess Baggage Warning</AlertTitle>
                   <AlertDescription>
                    Allowance exceeded by {extraBags} bag(s). Fee: <span className="font-bold">{extraFee} SAR</span>. Please proceed to a service counter for payment.
                   </AlertDescription>
                 </Alert>
              )}
            </div>
          </ScreenWrapper>
        </div>

        {/* Right Column: Actions */}
        <div className="lg:col-span-3">
          <ScreenWrapper className="w-full max-w-full">
            <SeatMap selectedSeat={selectedSeat} onSeatSelect={onSeatSelect} assignedSeat={passenger.seat} />
            {!isSeatSelected && (
              <Alert className="mt-4 border-yellow-500/50 bg-yellow-900/30 text-center">
                  <Armchair className="h-4 w-4 text-yellow-400" />
                  <AlertTitle className="font-bold text-yellow-300">Confirm Seat</AlertTitle>
                  <AlertDescription className="text-yellow-400">
                      Please select a seat from the map to enable the confirmation button.
                  </AlertDescription>
              </Alert>
            )}
          </ScreenWrapper>
        </div>
      </div>
      <div className="flex gap-4 justify-center mt-8">
         <Button onClick={onBack} size="xl" variant="outline" className="font-bold rounded-md bg-secondary hover:bg-secondary/80 hover:-translate-y-px transition-all duration-300">
          Back
        </Button>
        <Button onClick={onConfirm} size="xl" className="font-bold btn-success-gradient rounded-md hover:shadow-xl hover:-translate-y-px transition-all duration-300" disabled={!isSeatSelected}>
          <Check className="mr-2"/>
          Confirm Check-in
        </Button>
      </div>
    </div>
  );
}
