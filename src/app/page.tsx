
"use client";

import { useState, useEffect } from "react";
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
    setTimeout(() => window.print(), 100); 
  };

  const handlePrintComplete = () => {
    setPrintView(null);
  }

  useEffect(() => {
    if (printView) {
      window.onafterprint = () => {
        handlePrintComplete();
      };
      return () => {
        window.onafterprint = null;
      };
    }
  }, [printView]);


  const handleNewCheckin = () => {
    setPassenger(null);
    setPrintView(null);
    setIsCountersVisible(true);
  };

  const showPrintable = printView && passenger;
  const showMainUI = !showPrintable;

  return (
    <>
      {showMainUI && (
        <div className="flex flex-col min-h-screen bg-background">
          <AirportHeader />
          <main className="flex-1 p-4 md:p-10">
            <div className="mx-auto max-w-[100rem]">
              <div className="grid grid-cols-1 xl:grid-cols-[auto_1fr_auto] items-stretch justify-center gap-10">
                <div className="flex-shrink-0 flex flex-col h-full w-full max-w-md mx-auto xl:mx-0">
                  <FlightInfoBoard />
                </div>
                <div className="flex-1 flex items-start justify-center">
                  <CheckInFlow 
                    onCheckinComplete={handleCheckinComplete}
                    onPrintRequest={handlePrintRequest}
                    onNewCheckin={handleNewCheckin}
                    checkedInPassenger={passenger}
                    onShowManifest={() => setIsManifestOpen(true)}
                    onSearchStart={() => setIsCountersVisible(false)}
                  />
                </div>
                <div className="flex-shrink-0 flex flex-col h-full w-full max-w-3xl mx-auto xl:mx-0">
                  {isCountersVisible && <CounterStatusBoard isInteractive={false} />}
                </div>
              </div>
            </div>
          </main>
          <AirportFooter />
        </div>
      )}

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
