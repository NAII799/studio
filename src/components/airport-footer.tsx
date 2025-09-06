
import { Button } from "./ui/button";
import { Monitor } from "lucide-react";


export function AirportFooter({ onShowCounters }: { onShowCounters: () => void }) {
  return (
    <footer className="bg-card text-muted-foreground text-xs py-3 px-10 no-print border-t border-border flex justify-between items-center">
        <div>
            <p>Amadeus Altea DCS v1.0 | For training purposes only</p>
            <p className="mt-1">By : Naif Alharbi</p>
        </div>
        <Button variant="outline" size="sm" onClick={onShowCounters} className="font-bold">
            <Monitor className="mr-2 h-4 w-4" />
            Counter Management
        </Button>
    </footer>
  );
}
