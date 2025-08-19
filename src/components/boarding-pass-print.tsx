
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
    <div className="h-full w-24 bg-gray-300 flex items-center justify-center -rotate-180 p-1">
        <p className="text-[8px] text-gray-600 transform scale-75 rotate-90 tracking-widest whitespace-nowrap">BOARDING PASS / بطاقة صعود الطائرة</p>
    </div>
);


const InfoBlock = ({ label, value, large = false, valueClassName }: { label: string, value: string | number, large?: boolean, valueClassName?: string }) => (
    <div className="flex flex-col items-center justify-center text-center">
        <h4 className="text-[10px] text-gray-500 font-semibold tracking-wider">{label}</h4>
        <p className={`font-bold ${large ? 'text-2xl' : 'text-lg'} ${valueClassName}`}>{value}</p>
    </div>
);

const FlightLeg = ({ direction, airport, time }: { direction: string, airport: string, time: string }) => (
    <div className="text-center">
        <p className="font-bold text-2xl">{airport}</p>
        <p className="text-xs text-gray-500">{direction} {time}</p>
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
    
    const formattedDate = boardingDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }).toUpperCase().replace(' ', '');


  return (
    <div className="font-sans text-black bg-white w-full h-full p-4 flex justify-center items-center">
        <div className="w-[26rem] h-[16rem] p-3 border border-gray-300 rounded-lg bg-white shadow-none flex flex-col">
            
            <div className="flex-1 flex">
                {/* Main content */}
                <div className="flex-1 flex flex-col pr-2">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-2">
                        <SaudiaLogo />
                        <div className="text-right">
                            <p className="font-bold text-sm text-right">BOARDING PASS</p>
                            <p className="text-xs text-gray-600 text-right">بطاقة صعود الطائرة</p>
                        </div>
                    </div>
                    
                    {/* Passenger Info */}
                    <div className="text-left mb-2">
                        <p className="text-xs text-gray-500 font-medium">NAME OF PASSENGER</p>
                        <p className="text-base font-bold tracking-wider">{passenger.nameEn}</p>
                    </div>

                    {/* From / To */}
                    <div className="grid grid-cols-[1fr_auto_1fr] gap-2 my-1 items-center">
                        <FlightLeg 
                            direction="DEPARTURE"
                            airport="JED"
                            time={passenger.departure}
                        />
                        <div className="text-2xl text-gray-400">
                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 20.5l2.5-2.5m0 0L8 14.5s1.5-1.5 3.5-1.5 3.5 1.5 3.5 1.5L22 3.5"/>
                            </svg>
                        </div>
                        <FlightLeg 
                            direction="ARRIVAL"
                            airport="RUH"
                            time={passenger.arrival}
                        />
                    </div>
                    
                    {/* Details */}
                    <div className="grid grid-cols-4 gap-1 mt-auto border-t pt-2">
                        <div>
                             <p className="text-[9px] text-gray-500">FLIGHT</p>
                             <p className="font-bold text-base">{passenger.flight}</p>
                        </div>
                         <div>
                             <p className="text-[9px] text-gray-500">DATE</p>
                             <p className="font-bold text-base">{formattedDate}</p>
                        </div>
                        <div>
                             <p className="text-[9px] text-gray-500">SEAT</p>
                             <p className="font-bold text-base">{passenger.seat}</p>
                        </div>
                         <div>
                             <p className="text-[9px] text-gray-500">CLASS</p>
                             <p className="font-bold text-base">{passenger.class.charAt(0)}</p>
                        </div>
                    </div>
                </div>

                {/* Right Barcode Stub */}
                <div className="w-16 border-l-2 border-dashed border-gray-300 flex flex-col ml-2 pl-2 text-center">
                    <SaudiaLogo />
                    <div className="mt-4 space-y-2">
                        <div>
                             <p className="text-[8px] text-gray-500">FLIGHT</p>
                             <p className="font-bold text-sm">{passenger.flight}</p>
                        </div>
                         <div>
                             <p className="text-[8px] text-gray-500">DATE</p>
                             <p className="font-bold text-sm">{formattedDate}</p>
                        </div>
                        <div>
                             <p className="text-[8px] text-gray-500">SEAT</p>
                             <p className="font-bold text-sm">{passenger.seat}</p>
                        </div>
                    </div>
                    <div className="mt-auto text-xs text-gray-600">
                        <p>ECONOMY</p>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="h-12 mt-2 border-t-2 border-dashed border-gray-300 flex items-center" style={{ backgroundColor: '#e8f4f8' }}>
                <div className="grid grid-cols-5 gap-1 flex-1 px-2">
                   <InfoBlock label="BOARDING TIME" value={boardingTimeString} valueClassName="text-blue-600" />
                   <InfoBlock label="GATE" value={passenger.finalGate || passenger.gate} valueClassName="text-blue-600" />
                   <InfoBlock label="SEAT" value={passenger.seat} />
                   <InfoBlock label="ZONE" value="4" />
                   <InfoBlock label="SEQ" value="157" />
                </div>
                <div className="h-full">
                    <Barcode />
                </div>
            </div>

        </div>
    </div>
  );
}
