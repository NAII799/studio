
import type { CheckedInPassenger } from "@/lib/types";

const SaudiaLogo = ({ className }: { className?: string }) => (
    <div className={`flex items-center gap-2 ${className}`}>
        <span className="font-extrabold text-xl" style={{ color: '#003366' }}>SAUDIA</span>
        <div className="text-xs font-bold leading-tight" style={{ color: '#003366' }}>
            <span>السعودية</span>
        </div>
    </div>
);

const BarcodePlaceholder = ({ className }: { className?: string }) => (
    <div className={`w-full h-10 bg-gray-200 flex items-center justify-center ${className}`}>
        <svg width="90%" height="80%" viewBox="0 0 150 30" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <rect x="0" y="0" width="150" height="30" fill="#f3f4f6"/>
            <g fill="#374151">
                <rect x="5" y="5" width="2" height="20" /> <rect x="9" y="5" width="1" height="20" />
                <rect x="12" y="5" width="4" height="20" /> <rect x="18" y="5" width="2" height="20" />
                <rect x="22" y="5" width="1" height="20" /> <rect x="25" y="5" width="3" height="20" />
                <rect x="30" y="5" width="1" height="20" /> <rect x="33" y="5" width="2" height="20" />
                <rect x="37" y="5" width="5" height="20" /> <rect x="44" y="5" width="1" height="20" />
                <rect x="47" y="5" width="3" height="20" /> <rect x="52" y="5" width="2" height="20" />
                <rect x="56" y="5" width="1" height="20" /> <rect x="59" y="5" width="4" height="20" />
                <rect x="65" y="5" width="2" height="20" /> <rect x="69" y="5" width="1" height="20" />
                <rect x="72" y="5" width="3" height="20" /> <rect x="77" y="5" width="1" height="20" />
                <rect x="80" y="5" width="2" height="20" /> <rect x="84" y="5" width="5" height="20" />
                <rect x="91" y="5" width="1" height="20" /> <rect x="94" y="5" width="3" height="20" />
                <rect x="99" y="5" width="2" height="20" /> <rect x="103" y="5" width="1" height="20" />
                <rect x="106" y="5" width="4" height="20" /> <rect x="112" y="5" width="2" height="20" />
                <rect x="116" y="5" width="1" height="20" /> <rect x="119" y="5" width="3" height="20" />
                <rect x="124" y="5" width="1" height="20" /> <rect x="127" y="5" width="2" height="20" />
                <rect x="131" y="5" width="5" height="20" /> <rect x="138" y="5" width="1" height="20" />
                <rect x="141" y="5" width="3" height="20" />
            </g>
        </svg>
    </div>
);

const InfoBlock = ({ label, value, valueClassName, largeValue = false }: { label: string, value: string | number, valueClassName?: string, largeValue?: boolean }) => (
    <div className="flex flex-col items-center justify-center text-center">
        <h4 className="text-[9px] text-gray-600 font-semibold tracking-wider uppercase">{label}</h4>
        <p className={`font-bold ${largeValue ? 'text-4xl' : 'text-base'} ${valueClassName}`}>{value}</p>
    </div>
);


export function BoardingPassPrint({ passenger }: { passenger: CheckedInPassenger }) {
    if (!passenger) return null;

    const boardingDate = new Date();
    boardingDate.setFullYear(2024, 6, 28);
    boardingDate.setHours(parseInt(passenger.departure.split(':')[0]));
    boardingDate.setMinutes(parseInt(passenger.departure.split(':')[1]));

    const boardingTime = new Date(boardingDate.getTime() - 45 * 60000);
    const boardingTimeString = boardingTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    
    const formattedDate = boardingDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }).toUpperCase().replace(' ', '');
    const passengerNameParts = passenger.nameEn.split(' ');
    const firstNameLine = passengerNameParts.slice(0, 3).join(' ');
    const lastNameLine = passengerNameParts.slice(3).join(' ');

  return (
    <div className="font-sans text-black bg-white w-full h-full p-4 flex justify-center items-center">
        <div className="w-[26rem] border border-gray-300 rounded-lg bg-white shadow-none grid grid-cols-[2fr_1fr]">
            
            {/* Main Part */}
            <div className="p-3 flex flex-col justify-between">
                <div>
                    <SaudiaLogo />
                    <div className="mt-2">
                        <p className="text-[10px] text-gray-500 font-medium tracking-wide">NAME OF PASSENGER</p>
                        <p className="text-sm font-bold tracking-wider leading-tight">{firstNameLine}</p>
                        <p className="text-sm font-bold tracking-wider leading-tight">{lastNameLine}</p>
                    </div>
                </div>

                <BarcodePlaceholder className="my-2"/>
                
                <div className="flex justify-between items-center text-center">
                    <div>
                        <p className="font-extrabold text-3xl text-gray-800">JED</p>
                        <p className="text-[10px] text-gray-500">DEPARTURE {passenger.departure}</p>
                    </div>
                     <div className="text-2xl text-gray-400 self-center">
                         <svg width="48" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 20.5l2.5-2.5m0 0L8 14.5s1.5-1.5 3.5-1.5 3.5 1.5L22 3.5"/>
                        </svg>
                    </div>
                     <div>
                        <p className="font-extrabold text-3xl text-gray-800">RUH</p>
                        <p className="text-[10px] text-gray-500">ARRIVAL {passenger.arrival}</p>
                    </div>
                </div>
                
                <div className="border-t border-b border-gray-200 py-1 mt-2">
                    <div className="grid grid-cols-4 gap-1 text-center">
                        <InfoBlock label="Flight" value={passenger.flight} />
                        <InfoBlock label="Date" value={formattedDate} />
                        <InfoBlock label="Seat" value={passenger.seat} />
                        <InfoBlock label="Class" value={passenger.class.charAt(0)} />
                    </div>
                </div>

                <div className="border-t-2 border-dashed border-gray-300 -mx-3 mt-2"></div>
                
                <div className="grid grid-cols-5 gap-1 pt-2 text-center">
                   <InfoBlock label="Boarding Time" value={boardingTimeString} valueClassName="text-blue-600" largeValue={true} />
                   <InfoBlock label="Gate" value={passenger.finalGate || passenger.gate} valueClassName="text-blue-600" largeValue={true} />
                   <InfoBlock label="Seat" value={passenger.seat} largeValue={true} />
                   <InfoBlock label="Zone" value="4" largeValue={true} />
                   <InfoBlock label="Seq" value="157" largeValue={true} />
                </div>
            </div>

            {/* Stub Part */}
            <div className="border-l-2 border-dashed border-gray-300 p-2 flex flex-col relative text-center">
                 <div className="text-center">
                    <p className="font-bold text-xs">BOARDING PASS</p>
                    <p className="text-[10px] text-gray-600">بطاقة صعود الطائرة</p>
                </div>
                <SaudiaLogo className="justify-center mt-1"/>

                <div className="flex-grow flex flex-col justify-center items-center space-y-2 mt-2">
                    <InfoBlock label="Flight" value={passenger.flight} />
                    <InfoBlock label="Date" value={formattedDate} />
                    <InfoBlock label="Seat" value={passenger.seat} />
                </div>
                
                <BarcodePlaceholder className="h-8 w-full mt-2"/>

                <div className="shrink-0 text-center text-xs text-gray-600 mt-2">
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

    

    