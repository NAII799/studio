
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
  output: {
    schema: ExplainWeightOutputSchema,
  },
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
    const {output} = await prompt({});
    return output!;
  }
);
