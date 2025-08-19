
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BrainCircuit, Loader2 } from "lucide-react";
import { explainCheckinStep, type ExplainStepInput } from "@/ai/flows/explain-step-flow";

interface AiExplainerProps {
  step: ExplainStepInput['step'];
  className?: string;
}

export function AiExplainer({ step, className }: AiExplainerProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExplain = async () => {
    setIsGenerating(true);
    setExplanation(null);
    setError(null);
    try {
      const result = await explainCheckinStep({ step });
      setExplanation(result.explanation);
    } catch (e) {
      console.error(e);
      setError("Sorry, an error occurred. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={className}>
      <Button 
        onClick={handleExplain} 
        size="sm" 
        variant="outline" 
        className="font-bold btn-muted-gradient text-xs" 
        disabled={isGenerating}
      >
        {isGenerating ? <Loader2 className="animate-spin" /> : <BrainCircuit />}
        Explain this step
      </Button>

      {(explanation || error) && (
        <Alert dir="rtl" className={`mt-4 text-right ${error ? 'bg-red-900/50 border-red-700' : 'bg-blue-900/50 border-blue-700'}`}>
          <BrainCircuit className={`h-5 w-5 ${error ? 'text-red-300' : 'text-blue-300'}`} />
          <AlertTitle className={`font-bold ${error ? 'text-red-200' : 'text-blue-200'}`}>
            {error ? 'Error' : 'شرح الخطوة بواسطة الذكاء الاصطناعي'}
          </AlertTitle>
          <AlertDescription className={`whitespace-pre-wrap ${error ? 'text-red-300' : 'text-blue-300'}`}>
            {error || explanation}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
