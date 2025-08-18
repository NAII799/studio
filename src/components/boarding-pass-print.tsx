import type { CheckedInPassenger } from "@/lib/types";

interface BoardingPassPrintProps {
  passenger: CheckedInPassenger;
}

export function BoardingPassPrint({ passenger }: BoardingPassPrintProps) {
  const currentDate = new Date().toLocaleDateString('en-CA');

  return (
    <div className="font-sans text-black bg-white p-4" style={{ width: '80mm', direction: 'rtl', textAlign: 'right' }}>
      <div className="text-center pb-2 mb-2 border-b border-dashed border-black">
        <h2 className="font-bold text-lg text-primary">بطاقة الصعود - Boarding Pass</h2>
        <p className="text-xs">مطار الملك عبدالعزيز الدولي</p>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-2 text-xs">
        <div>
          <h4 className="font-bold uppercase text-primary/80 text-[10px]">المسافر</h4>
          <p className="font-bold text-sm">{passenger.nameEn}</p>
          <p className="text-[10px]">PNR: {passenger.bookingRef}</p>
        </div>
        <div>
          <h4 className="font-bold uppercase text-primary/80 text-[10px]">الرحلة</h4>
          <p className="font-bold text-sm">{passenger.flight}</p>
          <p className="text-[10px]">{currentDate}</p>
        </div>
        <div>
          <h4 className="font-bold uppercase text-primary/80 text-[10px]">من</h4>
          <p className="font-bold text-sm">{passenger.originEn}</p>
        </div>
        <div>
          <h4 className="font-bold uppercase text-primary/80 text-[10px]">إلى</h4>
          <p className="font-bold text-sm">{passenger.destinationEn}</p>
        </div>
         <div>
          <h4 className="font-bold uppercase text-primary/80 text-[10px]">الإقلاع</h4>
          <p className="font-bold text-sm">{passenger.departure}</p>
          <p className="text-[10px]">البوابة: {passenger.gate}</p>
        </div>
        <div>
          <h4 className="font-bold uppercase text-primary/80 text-[10px]">المقعد</h4>
          <p className="font-bold text-sm">{passenger.seat}</p>
          <p className="text-[10px]">{passenger.classEn}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 mb-2 text-xs">
         <div>
          <h4 className="font-bold uppercase text-primary/80 text-[10px]">الأمتعة</h4>
          <p className="font-bold text-sm">{passenger.checkedBags} حقيبة / {passenger.totalBaggageWeight} كجم</p>
        </div>
      </div>

      <div className="text-center pt-2 mt-2 border-t border-dashed border-black">
        <div className="w-full h-12 bg-black flex items-center justify-center text-white font-mono text-xs tracking-widest overflow-hidden">
            ||| | || ||| | | | |||
        </div>
        <p className="text-[10px] mt-1 font-mono">{passenger.bookingRef}{passenger.flight.replace('SV', '')}{passenger.seat}</p>
        <p className="text-xs font-bold mt-2">يرجى التوجه إلى البوابة قبل 30 دقيقة من الإقلاع</p>
      </div>
    </div>
  );
}
