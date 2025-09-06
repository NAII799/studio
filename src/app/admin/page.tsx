
"use client";

import { useState }.
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
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-10 gap-10">
        <div className="w-full max-w-6xl">
            <CounterStatusBoard />
        </div>
        <Button onClick={() => router.push('/')} variant="outline">Back to Check-in</Button>
      </main>
      <AirportFooter />
    </div>
  );
}
