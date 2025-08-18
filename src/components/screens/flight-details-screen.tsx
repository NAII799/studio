"use client";

import type { CheckedInPassenger } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScreenWrapper } from "@/components/screen-wrapper";
import { SeatMap } from "@/components/seat-map";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Armchair, Plane } from "lucide-react";

const Wheelchair = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="9" cy="4" r="2"/>
        <path d="M19 13.5a2.5 2.5 0 0 1-5 0V7H9.5a5.5 5.5 0 0 0-5.23 7.21L5.5 22H7l1-3,2-9h3.5"/>
        <circle cx="17.5" cy="18.5" r="2.5"/>
        <path d="M14 8h5"/>
    </svg>
);


interface FlightDetailsScreenProps {
  passenger: CheckedInPassenger;
  selectedSeat: string;
  onSeatSelect: (seat: string) => void;
  baggageCount: number;
  onBaggageCountChange: (count: number) => void;
  onConfirm: () => void;
  onBack: () => void;
}

const InfoRow = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-300/50 last:border-b-0">
    <span className="font-bold text-primary">{label}</span>
    <span className="text-gray-700 font-semibold">{value}</span>
  </div>
);

export function FlightDetailsScreen({
  passenger,
  selectedSeat,
  onSeatSelect,
  baggageCount,
  onBaggageCountChange,
  onConfirm,
  onBack,
}: FlightDetailsScreenProps) {

  const isOverAllowance = baggageCount > passenger.baggageAllowance.count;
  const extraBags = baggageCount - passenger.baggageAllowance.count;
  const extraFee = extraBags * 150; // 150 SAR per extra bag
  const isSeatSelected = !!selectedSeat;


  return (
    <div className="w-full max-w-5xl animate-in fade-in-0 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Info */}
        <div className="space-y-6">
          <ScreenWrapper className="w-full max-w-full">
            <h3 className="text-2xl font-bold text-primary mb-4 text-center">معلومات المسافر والرحلة</h3>
            {passenger.specialAssistance === 'wheelchair' && (
                <Alert className="mb-4 bg-blue-100 border-blue-300">
                    <Wheelchair className="h-5 w-5 text-blue-600" />
                    <AlertTitle className="text-blue-800">طلب مساعدة خاصة</AlertTitle>
                    <AlertDescription className="text-blue-700">
                        تم تسجيل طلب كرسي متحرك. يرجى التوجه إلى موظفي الخدمة للمساعدة.
                    </AlertDescription>
                </Alert>
            )}
            <Card className="bg-white/50">
              <CardHeader><CardTitle className="text-lg text-primary">Passenger Information</CardTitle></CardHeader>
              <CardContent>
                <InfoRow label="الاسم / Name" value={passenger.name} />
                <InfoRow label="رقم الحجز / PNR" value={passenger.bookingRef} />
                <InfoRow label="الدرجة / Class" value={`${passenger.class} / ${passenger.classEn}`} />
              </CardContent>
            </Card>
            <Card className="bg-white/50 mt-4">
              <CardHeader><CardTitle className="text-lg text-primary">Flight Information</CardTitle></CardHeader>
              <CardContent>
                 <InfoRow label="رقم الرحلة / Flight" value={passenger.flight} />
                 <InfoRow label="الطائرة / Aircraft" value={passenger.aircraftModel} />
                 <InfoRow label="من / From" value={`${passenger.origin} / ${passenger.originEn}`} />
                 <InfoRow label="إلى / To" value={`${passenger.destination} / ${passenger.destinationEn}`} />
                 <InfoRow label="الإقلاع / Departure" value={passenger.departure} />
                 <InfoRow label="البوابة / Gate" value={passenger.gate} />
              </CardContent>
            </Card>
          </ScreenWrapper>
        </div>

        {/* Right Column: Actions */}
        <div className="space-y-6">
          <ScreenWrapper className="w-full max-w-full">
            <SeatMap selectedSeat={selectedSeat} onSeatSelect={onSeatSelect} assignedSeat={passenger.seat} />
            {!isSeatSelected && (
              <Alert className="mt-4 border-accent/50 bg-accent/10 text-center">
                  <Armchair className="h-4 w-4" />
                  <AlertTitle className="font-bold text-accent-foreground/80">تأكيد المقعد</AlertTitle>
                  <AlertDescription className="text-accent-foreground/90">
                      الرجاء اختيار مقعد من الخريطة أعلاه لتفعيل زر التأكيد.
                  </AlertDescription>
              </Alert>
            )}
          </ScreenWrapper>
          <ScreenWrapper className="w-full max-w-full">
            <div className="baggage-section text-center">
              <h3 className="text-xl font-bold text-primary mb-4">تسجيل الأمتعة</h3>
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 mb-4 max-w-md mx-auto">
                 <p>الحد المسموح به: <span className="font-bold">{passenger.baggageAllowance.count}</span> قطع</p>
                 <p>الوزن لكل قطعة: <span className="font-bold">{passenger.baggageAllowance.weight}</span> كجم</p>
              </div>
              <div className="space-y-2 max-w-xs mx-auto">
                 <Label htmlFor="baggageCount" className="font-bold text-primary">عدد الحقائب</Label>
                 <Input 
                   type="number" 
                   id="baggageCount" 
                   min="0"
                   max="10" 
                   value={baggageCount}
                   onChange={(e) => onBaggageCountChange(Math.max(0, parseInt(e.target.value) || 0))}
                   className="h-12 text-center text-xl font-bold rounded-lg"
                 />
              </div>
              {isOverAllowance && (
                 <Alert variant="destructive" className="mt-4 max-w-md mx-auto text-right">
                   <AlertTriangle className="h-4 w-4" />
                   <AlertTitle>تنبيه: أمتعة زائدة</AlertTitle>
                   <AlertDescription>
                    لقد تجاوزت الحد المسموح به بعدد {extraBags} حقيبة. الرسوم الإضافية المستحقة هي <span className="font-bold">{extraFee} ريال سعودي</span>. للدفع، يرجى التوجه إلى كاونتر خدمة العملاء.
                   </AlertDescription>
                 </Alert>
              )}
            </div>
          </ScreenWrapper>
        </div>
      </div>
      <div className="flex gap-4 justify-center mt-8">
        <Button onClick={onConfirm} size="xl" className="font-bold btn-success-gradient rounded-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300" disabled={!isSeatSelected}>
          تأكيد تسجيل الوصول
        </Button>
        <Button onClick={onBack} size="xl" variant="outline" className="font-bold rounded-full bg-card hover:bg-muted/80 hover:-translate-y-1 transition-all duration-300">
          رجوع
        </Button>
      </div>
    </div>
  );
}
