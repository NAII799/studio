
"use client";

import { useState } from "react";
import { AirportHeader } from "@/components/airport-header";
import { AirportFooter } from "@/components/airport-footer";
import { CheckInFlow } from "@/components/check-in-flow";
import { BoardingPassPrint } from "@/components/boarding-pass-print";
import type { CheckedInPassenger } from "@/lib/types";

export default function Home() {
  const [passengerToPrint, setPassengerToPrint] = useState<CheckedInPassenger | null>(null);

  return (
    <>
      <div className="flex flex-col min-h-screen bg-background no-print">
        <AirportHeader />
        <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-10">
          <CheckInFlow onPrintRequest={setPassengerToPrint} />
        </main>
        <AirportFooter />
      </div>
      {passengerToPrint && (
        <div className="printable-area">
          <BoardingPassPrint passenger={passengerToPrint} />
        </div>
      )}
    </>
  );
}
