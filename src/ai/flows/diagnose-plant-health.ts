
'use server';
/**
 * @fileOverview An AI flow for diagnosing plant health from a photo.
 *
 * - diagnosePlantHealth - A function that handles the plant diagnosis process.
 * - DiagnosePlantHealthInput - The input type for the diagnosePlantHealth function.
 * - DiagnosePlantHealthOutput - The return type for the diagnosePlantHealth function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DiagnosePlantHealthInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a plant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type DiagnosePlantHealthInput = z.infer<typeof DiagnosePlantHealthInputSchema>;

const DiagnosePlantHealthOutputSchema = z.object({
  isHealthy: z.boolean().describe('Whether the plant appears to be healthy.'),
  diagnosis: z.string().describe("A brief, one or two-sentence diagnosis of the plant's health, noting any visible signs of disease, pests, or nutrient deficiencies."),
});
export type DiagnosePlantHealthOutput = z.infer<typeof DiagnosePlantHealthOutputSchema>;

// This function now immediately returns a mocked response to avoid API rate limits.
export async function diagnosePlantHealth(input: DiagnosePlantHealthInput): Promise<DiagnosePlantHealthOutput> {
  console.log("Returning mocked plant health diagnosis to avoid API rate limits.");
  return Promise.resolve({
    isHealthy: true,
    diagnosis: "Mocked response: The plant appears to be in good health with no visible signs of stress or disease."
  });
}

// The original flow and prompt are kept below for easy restoration.
// To re-enable the live API call, change the diagnosePlantHealth function to:
// export async function diagnosePlantHealth(input: DiagnosePlantHealthInput): Promise<DiagnosePlantHealthOutput> {
//   return diagnosePlantHealthFlow(input);
// }

const prompt = ai.definePrompt({
  name: 'diagnosePlantHealthPrompt',
  input: {schema: DiagnosePlantHealthInputSchema},
  output: {schema: DiagnosePlantHealthOutputSchema},
  prompt: `You are an expert botanist. Analyze the provided image of a plant and provide a brief, one or two-sentence diagnosis of its health. 

  - Determine if the plant is generally healthy.
  - Note any visible signs of disease, pests, or nutrient deficiencies.
  - Keep the diagnosis concise and easy for a farmer to understand.

  Photo: {{media url=photoDataUri}}`,
});

const diagnosePlantHealthFlow = ai.defineFlow(
  {
    name: 'diagnosePlantHealthFlow',
    inputSchema: DiagnosePlantHealthInputSchema,
    outputSchema: DiagnosePlantHealthOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
