
"use client";

import { useState } from "react";
import { AirportHeader } from "@/components/airport-header";
import { AirportFooter } from "@/components/airport-footer";
import { CheckInFlow } from "@/components/check-in-flow";
import { BoardingPassPrint } from "@/components/boarding-pass-print";
import { BaggageTagPrint } from "@/components/baggage-tag-print";
import type { CheckedInPassenger } from "@/lib/types";
import { FlightInfoBoard } from "@/components/flight-info-board";
import { PassengerManifest } from "@/components/passenger-manifest";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export default function Home() {
  const [passenger, setPassenger] = useState<CheckedInPassenger | null>(null);
  const [printView, setPrintView] = useState<'boardingPass' | 'baggageTag' | null>(null);
  const [isManifestOpen, setIsManifestOpen] = useState(false);

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
        <main className="flex-1 flex flex-col md:flex-row items-stretch justify-center p-4 md:p-10 gap-10 overflow-hidden">
          <div className="md:w-1/3 flex-shrink-0 flex flex-col h-full overflow-hidden">
            <FlightInfoBoard />
          </div>
          <div className="flex-1 flex items-center justify-center">
             <CheckInFlow 
              onCheckinComplete={handleCheckinComplete}
              onPrintRequest={handlePrintRequest}
              onNewCheckin={handleNewCheckin}
              checkedInPassenger={passenger}
              onShowManifest={() => setIsManifestOpen(true)}
            />
          </div>
        </main>
        <AirportFooter />
      </div>

      <Sheet open={isManifestOpen} onOpenChange={setIsManifestOpen}>
        <SheetContent className="w-full sm:max-w-2xl p-0">
          <PassengerManifest />
        </SheetContent>
      </Sheet>

      {showPrintable && (
        <div className="printable-area">
            {printView === 'boardingPass' && <BoardingPassPrint passenger={passenger} />}
            {printView === 'baggageTag' && <BaggageTagPrint passenger={passenger} />}
        </div>
      )}
    </>
  );
}
