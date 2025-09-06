
"use client";

import { Button } from "./ui/button";
import { UserCog } from "lucide-react";
import { useRouter } from "next/navigation";


export function AirportFooter() {
  const router = useRouter();

  const handleSupervisorLoginClick = () => {
    router.push('/admin');
  };

  return (
    <footer className="bg-card text-muted-foreground text-xs py-3 px-10 no-print border-t border-border flex justify-center items-center relative">
        <div className="text-center font-bold">
            <p>Amadeus Altea DCS v1.0 | For training purposes only</p>
            <p className="mt-1">By : Naif Alharbi</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleSupervisorLoginClick} className="font-bold absolute right-10">
            <UserCog className="mr-2 h-4 w-4" />
            Supervisor Login
        </Button>
    </footer>
  );
}
