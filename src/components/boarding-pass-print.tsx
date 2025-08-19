import type { CheckedInPassenger } from "@/lib/types";

const SaudiaLogo = () => (
    <div className="flex items-center gap-2">
        <span className="font-extrabold text-xl text-[#5a6a58]">SAUDIA</span>
        <div className="text-xs font-bold text-[#5a6a58] leading-tight">
            <span>السعودية</span>
        </div>
    </div>
);

const Barcode = () => (
  <div className="w-48 h-8 bg-black flex items-center justify-center text-white font-mono text-xs tracking-widest overflow-hidden">
      ||| | || ||| | | | |||
  </div>
);

const InfoBlock = ({ label, value, large = false }: { label: string, value: string | number, large?: boolean }) => (
    <div>
        <h4 className="text-[10px] text-gray-500 font-semibold">{label}</h4>
        <p className={`font-bold ${large ? 'text-2xl' : 'text-md'}`}>{value}</p>
    </div>
);

const FlightLeg = ({ direction, airport, terminal, date, time }: { direction: string, airport: string, terminal: string, date: string, time: string }) => (
    <div className="flex items-start gap-3">
        <div className="text-3xl mt-2 transform scale-x-[-1]">✈</div>
        <div>
            <h4 className="text-[10px] text-gray-500 font-semibold">{direction}</h4>
            <p className="font-bold text-sm">{airport}</p>
            <p className="text-xs text-gray-700 mt-1">Terminal {terminal}</p>
            <p className="text-xs text-gray-700">{date}</p>
            <p className="text-xs text-gray-700">{time}</p>
        </div>
    </div>
);


export function BoardingPassPrint({ passenger }: BoardingPassPrintProps) {
    const boardingDate = new Date();
    boardingDate.setHours(parseInt(passenger.departure.split(':')[0]));
    boardingDate.setMinutes(parseInt(passenger.departure.split(':')[1]));
    
    // Calculate boarding time (45 mins before departure)
    const boardingTime = new Date(boardingDate.getTime() - 45 * 60000);
    const boardingTimeString = boardingTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    // Calculate arrival time (assuming a 1h 35m flight for the example)
     const arrivalTime = new Date(boardingDate.getTime() + 95 * 60000);
     const arrivalTimeString = arrivalTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    const formattedDate = boardingDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ');


  return (
    <div className="font-sans text-black bg-white w-full h-full p-4 flex justify-center items-center">
        <div className="w-[28rem] p-3 border border-gray-300 rounded-lg shadow-md bg-white">
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
                <SaudiaLogo />
                <Barcode />
            </div>
            
            {/* Passenger Info */}
            <div className="text-left mb-3">
                <h2 className="text-lg font-bold">Boarding Pass</h2>
                <p className="text-lg">{passenger.nameEn}</p>
            </div>
            
            {/* Flight Information */}
            <div className="bg-[#bcb5a2] p-1 text-white text-xs font-bold w-full">
                FLIGHT INFORMATION
            </div>
            <div className="flex justify-between items-center py-2 px-1 border-b border-gray-300">
                <InfoBlock label="FLIGHT" value={passenger.flight} large />
                <InfoBlock label="SEAT" value={passenger.seat} large />
                <InfoBlock label="ZONE" value="4" />
                <InfoBlock label="BOARDING TIME" value={boardingTimeString} />
                <InfoBlock label="GATE" value={passenger.finalGate || passenger.gate} />
            </div>

            {/* From / To */}
            <div className="grid grid-cols-2 gap-4 mt-3">
                 <FlightLeg 
                    direction="FROM"
                    airport={`${passenger.originEn} King Abdulaziz Intl`}
                    terminal={passenger.terminal}
                    date={formattedDate}
                    time={passenger.departure}
                />
                 <FlightLeg 
                    direction="TO"
                    airport={`${passenger.destinationEn} King Khalid Intl`}
                    terminal="5"
                    date={formattedDate}
                    time={arrivalTimeString}
                />
            </div>
             <div className="text-left mt-2">
                <p className="text-xs">Baggage: {passenger.checkedBags} pc / {passenger.totalBaggageWeight} kg</p>
                {passenger.specialAssistance === 'wheelchair' && (
                    <p className="text-xs font-bold text-blue-600">Wheelchair assistance requested</p>
                )}
            </div>

        </div>
    </div>
  );
}
