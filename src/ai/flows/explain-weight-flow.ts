'use server';
/**
 * @fileOverview A flow to explain the importance of aircraft weight.
 *
 * - explainWeight - A function that returns an explanation.
 * - ExplainWeightOutput - The return type for the explainWeight function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainWeightOutputSchema = z.object({
  explanation: z.string().describe('An explanation in Arabic about the importance of aircraft weight.'),
});
export type ExplainWeightOutput = z.infer<typeof ExplainWeightOutputSchema>;

export async function explainWeight(): Promise<ExplainWeightOutput> {
  return explainWeightFlow();
}

const prompt = ai.definePrompt({
  name: 'explainWeightPrompt',
  prompt: `You are an expert pilot and aviation educator. 
Your task is to first generate an explanation in English about the importance of aircraft weight and balance for flight safety.
The explanation should be simple, engaging, and educational, suitable for students learning about aviation.
Keep it concise, around 2-3 short paragraphs.
Start with a fun fact or an engaging question.
After generating the English text, you MUST translate the entire explanation into Arabic.
You must output a JSON object with a single key "explanation" containing only the Arabic translation.
Example output format:
{
  "explanation": "النص المترجم هنا..."
}`,
});

const explainWeightFlow = ai.defineFlow(
  {
    name: 'explainWeightFlow',
    outputSchema: ExplainWeightOutputSchema,
  },
  async () => {
    const response = await prompt({});
    const rawText = response.text;
    
    try {
      const parsedOutput = JSON.parse(rawText);
      // Validate the parsed object against the Zod schema
      const validatedOutput = ExplainWeightOutputSchema.parse(parsedOutput);
      return validatedOutput;
    } catch (error) {
      console.error("Failed to parse AI response:", error);
      console.error("Raw AI response:", rawText);
      // Fallback or error handling
      return { explanation: "حدث خطأ أثناء معالجة الاستجابة من الذكاء الاصطناعي." };
    }
  }
);
