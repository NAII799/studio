"use client";

import { AirportHeader } from "@/components/airport-header";
import { AirportFooter } from "@/components/airport-footer";
import { CheckInFlow } from "@/components/check-in-flow";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AirportHeader />
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-10">
        <CheckInFlow />
      </main>
      <AirportFooter />
    </div>
  );
}
