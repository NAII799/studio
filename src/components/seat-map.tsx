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
          seatGrid.push(<div key={`aisle-${i}-${j}`} className="w-full h-10"></div>);
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
              "w-full h-10 border-2 rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-300",
              {
                "bg-green-100 border-green-500 text-green-800 hover:bg-green-200 cursor-pointer": !isOccupied && !isSelected,
                "bg-red-100 border-red-400 text-red-800 cursor-not-allowed": isOccupied,
                "bg-primary border-primary text-primary-foreground transform scale-110 ring-2 ring-accent": isSelected,
              }
            )}
          >
            {seatLabel}
          </button>
        );
      }
    }
    return seatGrid;
  };

  return (
    <div className="text-center">
      <h3 className="text-xl font-bold text-primary mb-4">اختر مقعدك</h3>
      <div className="grid grid-cols-7 gap-2 max-w-sm mx-auto my-4">
        {renderSeats()}
      </div>
      <div className="flex justify-center gap-4 text-xs mt-4 text-muted-foreground">
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-green-100 border-2 border-green-500"></div> متاح</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-red-100 border-2 border-red-400"></div> محجوز</div>
        <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-primary border-2 border-primary"></div> مختار</div>
      </div>
    </div>
  );
}
