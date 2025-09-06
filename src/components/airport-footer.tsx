
import { Button } from "./ui/button";
import { Users } from "lucide-react";

interface AirportFooterProps {
    onShowManifest: () => void;
}

export function AirportFooter({ onShowManifest }: AirportFooterProps) {
  return (
    <footer className="bg-card text-muted-foreground text-xs py-3 px-10 no-print border-t border-border flex justify-between items-center">
        <div>
            <p>Amadeus Altea DCS v1.0 | For training purposes only</p>
            <p className="mt-1">By : Naif Alharbi</p>
        </div>
        <Button variant="outline" size="sm" onClick={onShowManifest} className="font-bold">
            <Users className="mr-2 h-4 w-4" />
            Passenger Manifest
        </Button>
    </footer>
  );
}
