
import type { CheckedInPassenger } from "@/lib/types";

const SaudiaLogo = () => (
    <div className="flex items-center gap-2">
        <span className="font-extrabold text-xl" style={{ color: '#5a6a58' }}>SAUDIA</span>
        <div className="text-xs font-bold leading-tight" style={{ color: '#5a6a58' }}>
            <span>السعودية</span>
        </div>
    </div>
);

const Barcode = () => (
    <div className="flex items-center justify-center space-x-1.5 text-gray-400">
      <span>|||</span>
      <span>|</span>
      <span>||</span>
      <span>|||</span>
      <span>|</span>
      <span>|</span>
      <span>|||</span>
    </div>
);


const InfoBlock = ({ label, value, large = false }: { label: string, value: string | number, large?: boolean }) => (
    <div>
        <h4 className="text-[10px] text-gray-500 font-semibold tracking-wider">{label}</h4>
        <p className={`font-bold ${large ? 'text-2xl' : 'text-lg'}`}>{value}</p>
    </div>
);

const FlightLeg = ({ direction, airport, terminal, date, time }: { direction: string, airport: string, terminal: string, date: string, time: string }) => (
    <div className="flex items-start gap-3">
        <div className="text-3xl mt-1 text-blue-500 transform scale-x-[-1]">
             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.521,12.353a2.4,2.4,0,0,1,3.394,0L9.83,16.267,22.4,3.7" stroke="none" fill="#4a90e2"/>
                <path d="M14.6,8.2,5.2,17.6a.9.9,0,0,0,1.2,1.2L16,9.4,18.8,11a2.4,2.4,0,0,0,3.1-4.1,2.4,2.4,0,0,0-4.1,3.1Z" fill="#4a90e2"/>
            </svg>
        </div>
        <div>
            <h4 className="text-[10px] text-gray-500 font-semibold tracking-wider">{direction}</h4>
            <p className="font-bold text-sm">{airport}</p>
            <p className="text-xs text-gray-700 mt-1">Terminal {terminal}</p>
            <p className="text-xs text-gray-700">{date}</p>
            <p className="text-xs text-gray-700">{time}</p>
        </div>
    </div>
);


export function BoardingPassPrint({ passenger }: { passenger: CheckedInPassenger }) {
    if (!passenger) return null;

    const boardingDate = new Date();
    boardingDate.setHours(parseInt(passenger.departure.split(':')[0]));
    boardingDate.setMinutes(parseInt(passenger.departure.split(':')[1]));

    const boardingTime = new Date(boardingDate.getTime() - 45 * 60000);
    const boardingTimeString = boardingTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    const arrivalTime = new Date(boardingDate.getTime() + 95 * 60000); // Assuming 1h 35m flight
    const arrivalTimeString = arrivalTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    
    const formattedDate = boardingDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ');


  return (
    <div className="font-sans text-black bg-white w-full h-full p-4 flex justify-center items-center">
        <div className="w-[28rem] p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
                <SaudiaLogo />
                <Barcode />
            </div>
            
            {/* Passenger Info */}
            <div className="text-left mb-4">
                <h2 className="text-lg font-bold">Boarding Pass</h2>
                <p className="text-md">{passenger.nameEn}</p>
            </div>
            
            <div className="text-left mb-1">
                 <h4 className="text-[10px] text-gray-400 font-semibold tracking-wider">FLIGHT INFORMATION</h4>
            </div>
            {/* Flight Information */}
            <div className="flex justify-between items-center py-2 border-b border-gray-300">
                <InfoBlock label="FLIGHT" value={passenger.flight} large />
                <InfoBlock label="SEAT" value={passenger.seat} large />
                <InfoBlock label="ZONE" value="4" />
                <InfoBlock label="BOARDING TIME" value={boardingTimeString} />
                <InfoBlock label="GATE" value={passenger.finalGate || passenger.gate} />
            </div>

            {/* From / To */}
            <div className="grid grid-cols-2 gap-4 mt-4">
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
                    terminal="5" // Assuming destination terminal 5 as per image
                    date={formattedDate}
                    time={arrivalTimeString}
                />
            </div>
             <div className="text-left mt-3">
                <p className="text-xs text-gray-600">Baggage: {passenger.checkedBags} pc / {passenger.totalBaggageWeight} kg</p>
                {passenger.specialAssistance === 'wheelchair' && (
                    <p className="text-xs font-bold text-blue-600">Wheelchair assistance requested</p>
                )}
            </div>

        </div>
    </div>
  );
}
