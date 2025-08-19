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
  <div className={`flex justify-between items-center py-3 border-b border-border/50 last:border-b-0 ${className}`}>
    <div className="flex items-center gap-4">
        {icon}
        <span className="font-semibold text-lg text-foreground">{label}</span>
    </div>
    <span className="font-mono font-bold text-lg">{value} kg</span>
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
        setExplanation("Sorry, an error occurred while trying to explain the importance of weight. Please try again.");
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <ScreenWrapper className="max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-primary mb-2">Aircraft Total Weight</h2>
        <p className="text-muted-foreground mb-8">Aggregated weight information for the flight.</p>
        
        <div className="bg-secondary/50 p-6 rounded-lg border border-border text-left space-y-2">
            <InfoRow 
                label="Passengers Weight" 
                value={weightInfo.passengerWeight.toLocaleString()}
                icon={<Users className="w-7 h-7 text-primary"/>}
             />
            <InfoRow 
                label="Baggage Weight" 
                value={weightInfo.baggageWeight.toLocaleString()}
                icon={<Luggage className="w-7 h-7 text-primary"/>}
             />
            <InfoRow 
                label="Cargo Weight" 
                value={weightInfo.cargoWeight.toLocaleString()}
                icon={<Plane className="w-7 h-7 text-primary"/>}
            />
             <InfoRow 
                label="Total Weight" 
                value={weightInfo.totalWeight.toLocaleString()}
                icon={<Weight className="w-7 h-7 text-green-400"/>}
                className="bg-green-900/30 rounded-lg px-4 -mx-4"
            />
        </div>

        {explanation && (
            <Alert className="mt-6 text-left bg-blue-900/50 border-blue-700">
                <BrainCircuit className="h-5 w-5 text-blue-300" />
                <AlertTitle className="text-blue-200 font-bold">Why is aircraft weight important?</AlertTitle>
                <AlertDescription className="text-blue-300 whitespace-pre-wrap">{explanation}</AlertDescription>
            </Alert>
        )}

        <div className="mt-8 flex gap-4 justify-center">
             <Button onClick={onBack} size="lg" className="font-bold btn-muted-gradient">
                Back
            </Button>
             <Button onClick={handleExplain} size="lg" className="font-bold btn-primary-gradient" disabled={isGenerating}>
                {isGenerating ? <Loader2 className="animate-spin" /> : <BrainCircuit />}
                Why is weight important?
            </Button>
        </div>
    </ScreenWrapper>
  );
}
