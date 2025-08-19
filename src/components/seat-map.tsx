"use client";

import { cn } from "@/lib/utils";
import { occupiedSeatsForFlight } from "@/lib/data";

interface SeatMapProps {
  selectedSeat: string;
  onSeatSelect: (seat: string) => void;
  assignedSeat: string;
}

export function SeatMap({ selectedSeat, onSeatSelect, assignedSeat }: SeatMapProps) {
  const rows = 10;
  const cols = ['A', 'B', 'C', '', 'D', 'E', 'F'];

  const renderSeats = () => {
    const seatGrid = [];
    for (let i = 1; i <= rows; i++) {
      for (let j = 0; j < cols.length; j++) {
        const col = cols[j];
        if (col === '') {
          seatGrid.push(<div key={`aisle-${i}-${j}`} className="w-full h-8 flex items-center justify-center text-muted-foreground text-xs font-mono">{i}</div>);
          continue;
        }

        const seatLabel = `${i}${col}`;
        const isOccupied = occupiedSeatsForFlight.includes(seatLabel) && seatLabel !== assignedSeat;
        const isSelected = seatLabel === selectedSeat;
        
        seatGrid.push(
          <button
            key={seatLabel}
            onClick={() => onSeatSelect(seatLabel)}
            disabled={isOccupied}
            className={cn(
              "w-full h-8 border rounded-md flex items-center justify-center font-bold text-xs transition-all duration-200",
              {
                "bg-secondary border-border text-foreground hover:bg-primary/20 hover:border-primary cursor-pointer": !isOccupied && !isSelected,
                "bg-red-900/50 border-red-700 text-red-300 cursor-not-allowed line-through": isOccupied,
                "bg-primary border-primary-foreground text-primary-foreground transform scale-110 ring-2 ring-primary-foreground": isSelected,
              }
            )}
          >
            {col}
          </button>
        );
      }
    }
    return seatGrid;
  };

  return (
    <div className="text-center">
      <h3 className="text-lg font-bold text-primary mb-4">Seat Map</h3>
      <div className="grid grid-cols-7 gap-1.5 max-w-sm mx-auto my-4 p-4 bg-secondary/30 rounded-lg border border-border">
        {renderSeats()}
      </div>
      <div className="flex justify-center gap-4 text-xs mt-4 text-muted-foreground">
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-sm bg-secondary border border-border"></div> Available</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-sm bg-red-900/50 border border-red-700"></div> Occupied</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-sm bg-primary border-primary-foreground"></div> Selected</div>
      </div>
    </div>
  );
}
