
import type { CheckedInPassenger } from "@/lib/types";

const BarcodePlaceholder = ({ className }: { className?: string }) => (
    <div className={`w-full h-16 bg-gray-200 flex items-center justify-center ${className}`}>
        <svg width="95%" height="80%" viewBox="0 0 250 50" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <rect x="0" y="0" width="250" height="50" fill="#f3f4f6"/>
            <g fill="#374151">
                {[...Array(30)].map((_, i) => (
                    <rect key={i} x={5 + i * 8} y="5" width={Math.random() * 4 + 1} height="40" />
                ))}
            </g>
        </svg>
    </div>
);


export function BaggageTagPrint({ passenger }: { passenger: CheckedInPassenger }) {
    if (!passenger) return null;

    const formattedDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }).toUpperCase().replace(' ', '');

    return (
        <div className="font-mono text-black bg-white w-full h-full p-4 flex justify-center items-center">
            <div className="w-[28rem] h-[10rem] border-2 border-black grid grid-cols-3 gap-2 p-2">
                
                {/* Left Side */}
                <div className="col-span-1 flex flex-col justify-between border-r-2 border-dashed border-black pr-2">
                    <div className="text-center">
                        <p className="font-extrabold text-3xl">{passenger.destinationEn.slice(0, 3).toUpperCase()}</p>
                        <p className="font-bold text-lg">{passenger.flight}</p>
                        <p className="text-xs">{formattedDate}</p>
                    </div>
                    <div className="text-center">
                        <p className="font-bold text-lg">SAUDIA</p>
                        <p className="text-xs">{passenger.nameEn.split(' ').pop()}</p>
                    </div>
                </div>

                {/* Center Side */}
                <div className="col-span-1 flex flex-col justify-between items-center text-center">
                     <p className="font-extrabold text-5xl">{passenger.destinationEn.slice(0, 3).toUpperCase()}</p>
                     <div>
                        <p className="font-bold text-lg">{passenger.flight}</p>
                        <p className="text-xs">{passenger.nameEn.split(' ').pop()}</p>
                     </div>
                </div>

                {/* Right Side */}
                <div className="col-span-1 flex flex-col justify-between items-end text-right pl-2 border-l-2 border-dashed border-black">
                    <div className="text-right">
                         <p className="font-extrabold text-3xl">{passenger.destinationEn.slice(0, 3).toUpperCase()}</p>
                         <p className="font-bold text-lg">{passenger.flight}</p>
                    </div>
                     <div className="w-full text-center">
                        <p className="text-xs">Bags: {passenger.checkedBags}</p>
                        <p className="text-xs">Weight: {passenger.totalBaggageWeight}kg</p>
                        <BarcodePlaceholder className="mt-1" />
                        <p className="text-[8px] font-sans tracking-tighter -mt-1">{passenger.bookingRef}{Math.floor(1000 + Math.random() * 9000)}</p>
                     </div>
                </div>
            </div>
        </div>
    );
}
