
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
import { CounterStatusBoard } from "@/components/counter-status-board";

export default function Home() {
  const [passenger, setPassenger] = useState<CheckedInPassenger | null>(null);
  const [printView, setPrintView] = useState<'boardingPass' | 'baggageTag' | null>(null);
  const [isManifestOpen, setIsManifestOpen] = useState(false);
  const [isCountersVisible, setIsCountersVisible] = useState(true);


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
    setIsCountersVisible(true);
  };

  const showPrintable = printView && passenger;

  return (
    <>
      <div className={`flex flex-col min-h-screen bg-background ${showPrintable ? 'no-print' : ''}`}>
        <AirportHeader />
        <main className="flex-1 grid grid-cols-1 xl:grid-cols-[1fr,auto,1fr] items-start justify-center p-4 md:p-10 gap-10 overflow-hidden">
          <div className="xl:col-span-1 flex-shrink-0 flex flex-col h-full overflow-hidden max-w-2xl mx-auto w-full">
            <FlightInfoBoard />
          </div>
          <div className="xl:col-span-1 flex-1 flex items-start justify-center">
             <CheckInFlow 
              onCheckinComplete={handleCheckinComplete}
              onPrintRequest={handlePrintRequest}
              onNewCheckin={handleNewCheckin}
              checkedInPassenger={passenger}
              onShowManifest={() => setIsManifestOpen(true)}
              onSearchStart={() => setIsCountersVisible(false)}
            />
          </div>
           <div className="xl:col-span-1 flex-shrink-0 flex flex-col h-full overflow-auto max-w-3xl mx-auto w-full">
            {isCountersVisible && <CounterStatusBoard isInteractive={false} />}
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
