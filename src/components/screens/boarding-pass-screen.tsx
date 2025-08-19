"use client";

import type { CheckedInPassenger } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ScreenWrapper } from "@/components/screen-wrapper";
import { CheckCircle, Printer, Weight, RotateCcw, AlertTriangle } from "lucide-react";
import { BoardingPassPrint } from "../boarding-pass-print";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface BoardingPassScreenProps {
  passenger: CheckedInPassenger;
  onPrint: () => void;
  onNewCheckin: () => void;
  onShowWeight: () => void;
}

const InfoRow = ({ label, value, subValue, className }: { label: string; value: string | number, subValue?: string, className?:string }) => (
    <div className={`text-left ${className}`}>
        <h4 className="text-xs uppercase tracking-wider text-muted-foreground">{label}</h4>
        <p className="text-lg font-bold text-foreground">{value}</p>
        {subValue && <p className="text-xs text-muted-foreground">{subValue}</p>}
    </div>
);

export function BoardingPassScreen({ passenger, onPrint, onNewCheckin, onShowWeight }: BoardingPassScreenProps) {
  const currentDate = new Date().toLocaleDateString('en-CA');
  const gateChanged = passenger.hasGateChange;
  const finalGate = passenger.finalGate || passenger.gate;

  return (
    <ScreenWrapper className="max-w-xl text-center">
       <div className="text-center mb-6">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-400">Check-in Successful</h2>
        <p className="text-lg text-muted-foreground">Boarding Pass Issued</p>
      </div>

      {gateChanged && (
        <Alert variant="destructive" className="mb-6 text-left">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Gate Change Alert</AlertTitle>
            <AlertDescription>
                Please be advised that the departure gate has changed. The new gate is <span className="font-bold">{finalGate}</span>.
            </AlertDescription>
        </Alert>
      )}

      <div id="boarding-pass" className="relative bg-secondary/50 border-2 border-dashed border-border rounded-lg p-6 my-6 text-left shadow-inner">
        <div className="flex justify-between items-center pb-4 mb-4 border-b-2 border-dashed border-gray-600">
           <div className="text-left">
             <h3 className="text-2xl font-bold text-primary">Boarding Pass</h3>
           </div>
            <div className="font-bold text-primary text-xl">SAUDIA</div>
        </div>

        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <InfoRow label="Passenger" value={passenger.nameEn} subValue={`PNR: ${passenger.bookingRef}`} />
            <InfoRow label="Flight" value={passenger.flight} subValue={currentDate} />
            <InfoRow label="From" value={passenger.originEn} />
            <InfoRow label="To" value={passenger.destinationEn} />
            <InfoRow 
              label="Departure" 
              value={passenger.departure} 
              subValue={gateChanged ? `Original Gate: ${passenger.gate}` : `Gate: ${finalGate}`}
            />
             <InfoRow 
                label="New Gate" 
                value={finalGate}
                className={gateChanged ? "text-red-400 font-bold animate-pulse" : ""}
            />
            <InfoRow label="Seat" value={passenger.seat} subValue={passenger.classEn} />
            <InfoRow label="Baggage" value={`${passenger.checkedBags} Bags`} subValue={`${passenger.totalBaggageWeight} kg`} />
        </div>
        
        <div className="absolute top-1/2 -left-3 w-6 h-6 bg-card rounded-full transform -translate-y-1/2 border-2 border-dashed border-border"></div>
        <div className="absolute top-1/2 -right-3 w-6 h-6 bg-card rounded-full transform -translate-y-1/2 border-2 border-dashed border-border"></div>
      </div>
      
      <p className="text-muted-foreground mb-8">Please be at the gate 30 minutes before departure time.</p>

      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Button onClick={onPrint} size="lg" className="font-bold btn-primary-gradient"><Printer /> Print</Button>
        <Button onClick={onShowWeight} size="lg" className="font-bold btn-muted-gradient"><Weight/> Aircraft Weight</Button>
        <Button onClick={onNewCheckin} size="lg" className="font-bold btn-muted-gradient"><RotateCcw /> New Check-in</Button>
      </div>

      <div className="printable-area">
          <BoardingPassPrint passenger={passenger} />
      </div>
    </ScreenWrapper>
  );
}
