
import type { CheckedInPassenger } from "@/lib/types";

const SaudiaLogo = () => (
    <div className="flex items-center gap-2">
        <span className="font-extrabold text-xl" style={{ color: '#003366' }}>SAUDIA</span>
        <div className="text-xs font-bold leading-tight" style={{ color: '#003366' }}>
            <span>السعودية</span>
        </div>
    </div>
);

const Barcode = () => (
    <div className="h-8 w-24 bg-gray-300 flex items-center justify-center">
      <p className="text-xs text-gray-500 transform scale-75 -rotate-90 tracking-widest">BOARDING PASS</p>
    </div>
);


const InfoBlock = ({ label, value, large = false }: { label: string, value: string | number, large?: boolean }) => (
    <div>
        <h4 className="text-[10px] text-gray-500 font-semibold tracking-wider">{label}</h4>
        <p className={`font-bold ${large ? 'text-2xl' : 'text-lg'}`}>{value}</p>
    </div>
);

const FlightLeg = ({ direction, airport, terminal, date, time }: { direction: string, airport: string, terminal: string, date: string, time: string }) => (
    <div>
        <h4 className="text-[10px] text-gray-500 font-semibold tracking-wider">{direction}</h4>
        <p className="font-bold text-sm">{airport}</p>
        <p className="text-xs text-gray-700 mt-1">Terminal {terminal}</p>
        <p className="text-xs text-gray-700">{date}</p>
        <p className="text-xs text-gray-700">{time}</p>
    </div>
);


export function BoardingPassPrint({ passenger }: { passenger: CheckedInPassenger }) {
    if (!passenger) return null;

    const boardingDate = new Date();
    // This is a mock, so let's set a fixed date for consistency in print output
    boardingDate.setFullYear(2024, 6, 28); // Month is 0-indexed, so 6 is July
    
    boardingDate.setHours(parseInt(passenger.departure.split(':')[0]));
    boardingDate.setMinutes(parseInt(passenger.departure.split(':')[1]));

    const boardingTime = new Date(boardingDate.getTime() - 45 * 60000);
    const boardingTimeString = boardingTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    const arrivalTime = new Date(boardingDate.getTime() + 95 * 60000); // Assuming 1h 35m flight
    const arrivalTimeString = arrivalTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    
    const formattedDate = boardingDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ');


  return (
    <div className="font-sans text-black bg-white w-full h-full p-4 flex justify-center items-center">
        <div className="w-[28rem] p-3 border-2 border-gray-400 rounded-lg bg-white shadow-none">
            
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
                <SaudiaLogo />
                <div className="text-right">
                    <p className="font-bold text-sm">ECONOMY CLASS</p>
                    <p className="text-xs text-gray-600">First Class</p>
                </div>
            </div>
            
            {/* Passenger Info */}
            <div className="text-left mb-2 p-2 bg-gray-100 border-y border-gray-300">
                <p className="text-xs text-gray-600 font-medium">PASSENGER NAME</p>
                <p className="text-lg font-bold tracking-wider">{passenger.nameEn}</p>
            </div>
            
            {/* Flight Information */}
            <div className="grid grid-cols-5 gap-2 items-end py-2 px-2" style={{ backgroundColor: '#e8f0f6' }}>
                <div className="col-span-1"><InfoBlock label="FLIGHT" value={passenger.flight} large /></div>
                <div className="col-span-1"><InfoBlock label="SEAT" value={passenger.seat} large /></div>
                <div className="col-span-1"><InfoBlock label="ZONE" value="4" /></div>
                <div className="col-span-1"><InfoBlock label="BOARDING TIME" value={boardingTimeString} /></div>
                <div className="col-span-1"><InfoBlock label="GATE" value={passenger.finalGate || passenger.gate} /></div>
            </div>

            {/* From / To */}
            <div className="grid grid-cols-[1fr_auto_1fr] gap-4 mt-3 items-center">
                 <FlightLeg 
                    direction="FROM"
                    airport={`${passenger.originEn} (JED)`}
                    terminal={passenger.terminal}
                    date={formattedDate}
                    time={passenger.departure}
                />
                <div className="text-3xl text-gray-400 transform scale-x-[-1] -rotate-45">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 20.5l2.5-2.5m0 0L8 14.5s1.5-1.5 3.5-1.5 3.5 1.5 3.5 1.5L22 3.5"/>
                    </svg>
                </div>
                 <FlightLeg 
                    direction="TO"
                    airport={`${passenger.destinationEn} (RUH)`}
                    terminal="5"
                    date={formattedDate}
                    time={arrivalTimeString}
                />
            </div>
             <div className="text-left mt-3 pt-2 border-t border-gray-200 flex justify-between items-center">
                <div>
                    <p className="text-xs text-gray-600"><span className="font-bold">Baggage:</span> {passenger.checkedBags} pc / {passenger.totalBaggageWeight} kg</p>
                    <p className="text-xs text-gray-600"><span className="font-bold">PNR:</span> {passenger.bookingRef}</p>
                    {passenger.specialAssistance === 'wheelchair' && (
                        <p className="text-xs font-bold text-blue-600 mt-1">Wheelchair assistance requested</p>
                    )}
                </div>
                <Barcode />
            </div>

        </div>
    </div>
  );
}
