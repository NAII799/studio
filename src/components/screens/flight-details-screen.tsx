"use client";

import type { CheckedInPassenger } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScreenWrapper } from "@/components/screen-wrapper";
import { SeatMap } from "@/components/seat-map";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

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

  const baggageWeight = baggageCount * passenger.baggageAllowance.weight;
  const isOverAllowance = baggageCount > passenger.baggageAllowance.count;

  return (
    <div className="w-full max-w-5xl animate-in fade-in-0 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Info */}
        <div className="space-y-6">
          <ScreenWrapper className="w-full max-w-full">
            <h3 className="text-2xl font-bold text-primary mb-4 text-center">معلومات المسافر والرحلة</h3>
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
                    لقد تجاوزت الحد المسموح به للأمتعة. قد يتم تطبيق رسوم إضافية.
                   </AlertDescription>
                 </Alert>
              )}
            </div>
          </ScreenWrapper>
        </div>
      </div>
      <div className="flex gap-4 justify-center mt-8">
        <Button onClick={onConfirm} size="xl" className="font-bold btn-success-gradient rounded-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          تأكيد تسجيل الوصول
        </Button>
        <Button onClick={onBack} size="xl" variant="outline" className="font-bold rounded-full bg-card hover:bg-muted/80 hover:-translate-y-1 transition-all duration-300">
          رجوع
        </Button>
      </div>
    </div>
  );
}
