"use client";

import type { AircraftWeightInfo } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ScreenWrapper } from "@/components/screen-wrapper";
import { Weight, Plane, Luggage, Users, BrainCircuit, Loader2 } from "lucide-react";
import { useState } from "react";
import { explainWeight } from "@/ai/flows/explain-weight-flow";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface AircraftWeightScreenProps {
  weightInfo: AircraftWeightInfo;
  onBack: () => void;
}

const InfoRow = ({ label, value, icon, className }: { label: string; value: string | number, icon: React.ReactNode, className?: string }) => (
  <div className={`flex justify-between items-center py-4 border-b border-primary/20 last:border-b-0 ${className}`}>
    <div className="flex items-center gap-4">
        {icon}
        <span className="font-bold text-primary text-lg">{label}</span>
    </div>
    <span className="text-gray-800 font-bold text-lg">{value} كجم</span>
  </div>
);


export function AircraftWeightScreen({ weightInfo, onBack }: AircraftWeightScreenProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);

  const handleExplain = async () => {
    setIsGenerating(true);
    setExplanation(null);
    try {
      const result = await explainWeight();
      setExplanation(result.explanation);
    } catch(e) {
        console.error(e);
        setExplanation("عذراً، حدث خطأ أثناء محاولة شرح أهمية الوزن. يرجى المحاولة مرة أخرى.");
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <ScreenWrapper className="max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-primary font-headline mb-6">الوزن الكلي للطائرة</h2>
        <p className="text-muted-foreground mb-8">Aircraft Total Weight Information</p>
        
        <div className="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 text-right space-y-2">
            <InfoRow 
                label="وزن الركاب / Passengers" 
                value={weightInfo.passengerWeight.toLocaleString()}
                icon={<Users className="w-8 h-8 text-primary"/>}
             />
            <InfoRow 
                label="وزن الأمتعة / Baggage" 
                value={weightInfo.baggageWeight.toLocaleString()}
                icon={<Luggage className="w-8 h-8 text-primary"/>}
             />
            <InfoRow 
                label="وزن الشحن / Cargo" 
                value={weightInfo.cargoWeight.toLocaleString()}
                icon={<Plane className="w-8 h-8 text-primary"/>}
            />
             <InfoRow 
                label="الإجمالي / Total" 
                value={weightInfo.totalWeight.toLocaleString()}
                icon={<Weight className="w-8 h-8 text-blue-600"/>}
                className="bg-blue-600/10 rounded-lg px-4 -mx-4"
            />
        </div>

        {explanation && (
            <Alert className="mt-6 text-right bg-amber-50 border-amber-300">
                <BrainCircuit className="h-5 w-5 text-amber-600" />
                <AlertTitle className="text-amber-800 font-bold">لماذا وزن الطائرة مهم؟</AlertTitle>
                <AlertDescription className="text-amber-700 whitespace-pre-wrap">{explanation}</AlertDescription>
            </Alert>
        )}

        <div className="mt-8 flex gap-4 justify-center">
             <Button onClick={onBack} size="lg" className="font-bold btn-muted-gradient">
                العودة
            </Button>
             <Button onClick={handleExplain} size="lg" className="font-bold btn-primary-gradient" disabled={isGenerating}>
                {isGenerating ? <Loader2 className="animate-spin" /> : <BrainCircuit />}
                لماذا الوزن مهم؟
            </Button>
        </div>
    </ScreenWrapper>
  );
}
