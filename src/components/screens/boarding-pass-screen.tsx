"use client";

import type { CheckedInPassenger, AircraftWeightInfo } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ScreenWrapper } from "@/components/screen-wrapper";
import { CheckCircle, Printer, Weight, RotateCcw, AlertTriangle } from "lucide-react";
import { BoardingPassPrint } from "../boarding-pass-print";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


interface BoardingPassScreenProps {
  passenger: CheckedInPassenger;
  onPrint: () => void;
  onNewCheckin: () => void;
  onShowWeight: () => void;
}

const InfoRow = ({ label, value, subValue, className }: { label: string; value: string | number, subValue?: string, className?:string }) => (
    <div className={`text-right ${className}`}>
        <h4 className="text-sm uppercase tracking-wider text-primary/70">{label}</h4>
        <p className="text-xl font-bold text-gray-800">{value}</p>
        {subValue && <p className="text-xs text-gray-500">{subValue}</p>}
    </div>
);


export function BoardingPassScreen({ passenger, onPrint, onNewCheckin, onShowWeight }: BoardingPassScreenProps) {
  const currentDate = new Date().toLocaleDateString('en-CA');
  const gateChanged = passenger.hasGateChange;
  const finalGate = passenger.finalGate || passenger.gate;

  return (
    <ScreenWrapper className="max-w-xl text-center">
       <div className="text-center mb-6">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-600">تم تسجيل الوصول بنجاح</h2>
        <p className="text-lg text-muted-foreground">Check-in Successful</p>
      </div>

      {gateChanged && (
        <Alert variant="destructive" className="mb-6 text-right">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>تنبيه: تغيير البوابة</AlertTitle>
            <AlertDescription>
                يرجى العلم أنه تم تغيير بوابة المغادرة. البوابة الجديدة هي <span className="font-bold">{finalGate}</span>.
            </AlertDescription>
        </Alert>
      )}

      <div id="boarding-pass" className="relative bg-gradient-to-br from-white to-gray-50 border-2 border-dashed border-primary/50 rounded-2xl p-6 my-6 text-right shadow-inner">
        <div className="flex justify-between items-center pb-4 mb-4 border-b-2 border-dashed border-gray-300">
           <div className="text-left">
             <h3 className="text-2xl font-bold text-primary">بطاقة الصعود</h3>
             <p className="text-sm text-muted-foreground">Boarding Pass</p>
           </div>
            <div className="font-bold text-primary">SAUDIA</div>
        </div>

        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
            <InfoRow label="المسافر / Passenger" value={passenger.nameEn} subValue={`PNR: ${passenger.bookingRef}`} />
            <InfoRow label="الرحلة / Flight" value={passenger.flight} subValue={currentDate} />
            <InfoRow label="من / From" value={passenger.originEn} subValue={passenger.origin} />
            <InfoRow label="إلى / To" value={passenger.destinationEn} subValue={passenger.destination} />
            <InfoRow 
              label="الإقلاع / Departure" 
              value={passenger.departure} 
              subValue={gateChanged ? `Original Gate: ${passenger.gate}` : `Gate: ${finalGate}`}
            />
             <InfoRow 
                label="البوابة الجديدة / New Gate" 
                value={finalGate}
                className={gateChanged ? "text-red-600 font-bold animate-pulse" : ""}
            />
            <InfoRow label="المقعد / Seat" value={passenger.seat} subValue={passenger.classEn} />
            <InfoRow label="الأمتعة / Baggage" value={`${passenger.checkedBags} Bags`} subValue={`${passenger.totalBaggageWeight} kg`} />
        </div>
        
        <div className="absolute top-1/2 -left-3 w-6 h-6 bg-card rounded-full transform -translate-y-1/2"></div>
        <div className="absolute top-1/2 -right-3 w-6 h-6 bg-card rounded-full transform -translate-y-1/2"></div>
      </div>
      
      <p className="text-muted-foreground mb-8">يرجى الوصول إلى البوابة قبل 30 دقيقة من موعد الإقلاع</p>

      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Button onClick={onPrint} size="lg" className="font-bold btn-primary-gradient"><Printer /> طباعة</Button>
        <Button onClick={onShowWeight} size="lg" className="font-bold btn-muted-gradient"><Weight/> عرض وزن الطائرة</Button>
        <Button onClick={onNewCheckin} size="lg" className="font-bold btn-muted-gradient"><RotateCcw /> تسجيل وصول جديد</Button>
      </div>

      <div className="printable-area">
          <BoardingPassPrint passenger={passenger} />
      </div>
    </ScreenWrapper>
  );
}
