
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
  isPlant: z.boolean().describe('Whether the image appears to contain a plant or not.'),
  isHealthy: z.boolean().describe('If the image is a plant, this indicates if it appears to be healthy.'),
  diagnosis: z.string().describe("A brief, one or two-sentence diagnosis of the plant's health, noting any visible signs of disease, pests, or nutrient deficiencies. If it is not a plant, explain what is in the image instead."),
});
export type DiagnosePlantHealthOutput = z.infer<typeof DiagnosePlantHealthOutputSchema>;

export async function diagnosePlantHealth(input: DiagnosePlantHealthInput): Promise<DiagnosePlantHealthOutput> {
  return diagnosePlantHealthFlow(input);
}

const prompt = ai.definePrompt({
  name: 'diagnosePlantHealthPrompt',
  input: {schema: DiagnosePlantHealthInputSchema},
  output: {schema: DiagnosePlantHealthOutputSchema},
  prompt: `You are an expert botanist. Analyze the provided image.

  1. First, determine if the image contains a plant. Set the 'isPlant' field accordingly.
  2. If it is a plant, provide a brief, one or two-sentence diagnosis of its health.
     - Determine if the plant is generally healthy and set the 'isHealthy' field.
     - Note any visible signs of disease, pests, or nutrient deficiencies.
     - Keep the diagnosis concise and easy for a farmer to understand.
  3. If it is NOT a plant, set 'isPlant' to false, 'isHealthy' to false, and use the 'diagnosis' field to briefly describe what is in the image instead.

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

