
"use client";

import { useState } from "react";
import { SupervisorLogin } from "@/components/supervisor-login";
import { CounterStatusBoard } from "@/components/counter-status-board";
import { AirportHeader } from "@/components/airport-header";
import { AirportFooter } from "@/components/airport-footer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <SupervisorLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AirportHeader />
      <main className="flex-1 p-4 md:p-10">
        <div className="mx-auto h-full flex flex-col gap-10">
            <div className="flex-grow">
              <CounterStatusBoard isInteractive={true} />
            </div>
            <div className="text-center">
              <Button onClick={() => router.push('/')} variant="outline">Back to Check-in</Button>
            </div>
        </div>
      </main>
      <AirportFooter />
    </div>
  );
}
