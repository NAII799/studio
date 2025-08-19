
import type { CheckedInPassenger } from "@/lib/types";

const SaudiaLogo = ({ className }: { className?: string }) => (
    <div className={`flex items-center gap-2 ${className}`}>
        <span className="font-extrabold text-xl" style={{ color: '#003366' }}>SAUDIA</span>
        <div className="text-xs font-bold leading-tight" style={{ color: '#003366' }}>
            <span>السعودية</span>
        </div>
    </div>
);

const BarcodeStub = () => (
    <div className="w-16 border-l-2 border-dashed border-gray-300 flex flex-col ml-2 pl-2 text-center h-full">
        <SaudiaLogo className="mb-4"/>
        <div className="space-y-2">
            <div>
                 <p className="text-[8px] text-gray-500">FLIGHT</p>
                 <p className="font-bold text-sm">SV154</p>
            </div>
             <div>
                 <p className="text-[8px] text-gray-500">DATE</p>
                 <p className="font-bold text-sm">28JUL</p>
            </div>
            <div>
                 <p className="text-[8px] text-gray-500">SEAT</p>
                 <p className="font-bold text-sm">6A</p>
            </div>
        </div>
        <div className="mt-auto text-xs text-gray-600">
            <p>ECONOMY</p>
        </div>
    </div>
);


const InfoBlock = ({ label, value, large = false, valueClassName }: { label: string, value: string | number, large?: boolean, valueClassName?: string }) => (
    <div className="flex flex-col items-center justify-center text-center">
        <h4 className="text-[10px] text-gray-500 font-semibold tracking-wider">{label}</h4>
        <p className={`font-bold ${large ? 'text-2xl' : 'text-lg'} ${valueClassName}`}>{value}</p>
    </div>
);

const FlightLeg = ({ airport, label, time }: { airport: string, label: string, time: string }) => (
    <div className="text-center">
        <p className="font-bold text-4xl text-gray-800">{airport}</p>
        <p className="text-xs text-gray-500">{label} {time}</p>
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
        <div className="w-[26rem] h-[16rem] p-3 border border-gray-300 rounded-lg bg-white shadow-none flex flex-col justify-between">
            
            {/* Top section */}
            <div className="flex-none">
                <div className="flex justify-between items-start">
                    <SaudiaLogo />
                    <div className="text-right">
                        <p className="font-bold text-sm">BOARDING PASS</p>
                        <p className="text-xs text-gray-600">بطاقة صعود الطائرة</p>
                    </div>
                </div>
                <div className="mt-1">
                    <p className="text-xs text-gray-500 font-medium">NAME OF PASSENGER</p>
                    <p className="text-base font-bold tracking-wider">{passenger.nameEn}</p>
                </div>
            </div>

            {/* Middle Section */}
            <div className="flex-grow flex flex-col justify-center">
                 <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center -mt-2">
                    <FlightLeg 
                        airport="JED"
                        label="DEPARTURE"
                        time={passenger.departure}
                    />
                    <div className="text-2xl text-gray-400 self-center">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 20.5l2.5-2.5m0 0L8 14.5s1.5-1.5 3.5-1.5 3.5 1.5 3.5 1.5L22 3.5"/>
                        </svg>
                    </div>
                    <FlightLeg 
                        airport="RUH"
                        label="ARRIVAL"
                        time={passenger.arrival}
                    />
                </div>
            </div>
            
            {/* Bottom section */}
            <div className="flex-none">
                <div className="border-t border-b border-gray-300 py-1">
                    <div className="grid grid-cols-4 gap-1 text-center">
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

                <div className="border-t-2 border-dashed border-gray-300 -mx-3 mt-2"></div>
                
                <div className="grid grid-cols-5 gap-1 pt-1 text-center">
                   <InfoBlock label="BOARDING TIME" value={boardingTimeString} valueClassName="text-blue-600" />
                   <InfoBlock label="GATE" value={passenger.finalGate || passenger.gate} valueClassName="text-blue-600" />
                   <InfoBlock label="SEAT" value={passenger.seat} />
                   <InfoBlock label="ZONE" value="4" />
                   <InfoBlock label="SEQ" value="157" />
                </div>
            </div>

            {/* This is the perforated stub on the right. It's positioned absolutely. */}
            <div className="absolute top-3 bottom-3 right-3 w-24 border-l-2 border-dashed border-gray-300 flex flex-col p-2">
                <SaudiaLogo className="shrink-0"/>
                <div className="flex-grow flex flex-col justify-center items-center space-y-3 text-center">
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
                </div>
                <div className="shrink-0 text-center text-xs text-gray-600">
                    <p>ECONOMY</p>
                </div>
                <div className="absolute bottom-0 right-0 h-full w-4 flex items-center justify-center -rotate-180">
                   <p className="text-[8px] text-gray-500 transform rotate-90 whitespace-nowrap tracking-wider">BOARDING PASS / بطاقة صعود الطائرة</p>
                </div>
            </div>
        </div>
    </div>
  );
}
