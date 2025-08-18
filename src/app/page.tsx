"use client";

import { AirportHeader } from "@/components/airport-header";
import { AirportFooter } from "@/components/airport-footer";
import { CheckInFlow } from "@/components/check-in-flow";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <AirportHeader />
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-10 relative overflow-hidden">
        <div 
            className="absolute inset-0 z-0"
            style={{
                backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.05)"/></svg>')`,
                backgroundRepeat: 'repeat',
                animation: 'float 20s infinite linear',
            }}
        />
        <CheckInFlow />
      </main>
      <AirportFooter />
    </div>
  );
}
