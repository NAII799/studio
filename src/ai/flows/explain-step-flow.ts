
'use server';
/**
 * @fileOverview A flow to explain a step in the check-in process.
 *
 * - explainCheckinStep - A function that returns an explanation for a given step.
 * - ExplainStepInput - The input type for the explainCheckinStep function.
 * - ExplainStepOutput - The return type for the explainCheckinStep function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainStepInputSchema = z.object({
  step: z.enum(['checkinForm', 'flightDetails', 'boardingPass', 'securityQuestions']).describe("The specific step of the check-in process to explain."),
});
export type ExplainStepInput = z.infer<typeof ExplainStepInputSchema>;

const ExplainStepOutputSchema = z.object({
  explanation: z.string().describe('An educational explanation in simple Arabic about the given check-in step.'),
});
export type ExplainStepOutput = z.infer<typeof ExplainStepOutputSchema>;

export async function explainCheckinStep(input: ExplainStepInput): Promise<ExplainStepOutput> {
  return explainStepFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainStepPrompt',
  input: {
    schema: ExplainStepInputSchema,
  },
  output: {
    schema: ExplainStepOutputSchema,
  },
  prompt: `You are an expert aviation instructor specializing in airport ground operations and passenger services.
Your student is learning to use the Amadeus Altea DCS (Departure Control System) via a mockup.
Your task is to provide a simple, clear, and educational explanation in ARABIC for a specific step in the passenger check-in process.

The student has requested an explanation for the '{{step}}' screen.

Based on the step, provide a 2-3 paragraph explanation covering:
1.  **Purpose:** What is the main goal of this screen for the check-in agent?
2.  **Key Actions:** What are the most important actions the agent performs here? (e.g., verifying identity, selecting seats, registering baggage).
3.  **Importance:** Why is this step critical for a smooth and safe departure?

Keep the tone encouraging and educational. Address the student directly.
The entire output must be in Arabic and in a JSON object with a single key "explanation".

Step-specific guidance:
- **checkinForm:** Focus on how the agent finds the passenger's booking (PNR). This is the starting point.
- **flightDetails:** This is the core of the process. Emphasize seat assignment and baggage registration as key tasks.
- **boardingPass:** This is the final output. Explain its importance as a document for the passenger to board the plane.
- **securityQuestions:** Explain that these are standard, mandatory questions to ensure flight safety. Focus on the agent's responsibility to ask them clearly and get confirmation from the passenger.
`,
});

const explainStepFlow = ai.defineFlow(
  {
    name: 'explainStepFlow',
    inputSchema: ExplainStepInputSchema,
    outputSchema: ExplainStepOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
