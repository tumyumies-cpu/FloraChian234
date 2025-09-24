
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
  language: z.string().optional().describe("The language for the output, e.g., 'English', 'Spanish', 'Hindi'."),
});
export type DiagnosePlantHealthInput = z.infer<typeof DiagnosePlantHealthInputSchema>;

const DiagnosePlantHealthOutputSchema = z.object({
  isPlant: z.boolean().describe('Whether the image appears to contain a plant or not.'),
  identification: z.object({
    commonName: z.string().describe("The common name of the plant. 'N/A' if not a plant."),
    latinName: z.string().describe("The Latin (scientific) name of the plant. 'N/A' if not a plant."),
    description: z.string().describe("A brief, one or two-sentence description of the identified plant. If it's not a plant, briefly describe what is in the image instead."),
  }),
  healthAssessment: z.object({
    isHealthy: z.boolean().describe('If the image is a plant, this indicates if it appears to be healthy.'),
    diagnosis: z.string().describe("A detailed diagnosis of the plant's health, noting any visible signs of disease, pests, or nutrient deficiencies."),
    potentialCauses: z.array(z.string()).describe("A list of potential causes for any identified health issues."),
    recommendations: z.array(z.string()).describe("A list of actionable recommendations or precautions for the farmer to take based on the diagnosis."),
  }),
  careGuide: z.object({
    title: z.string().describe("The title for the care guide section, e.g., 'Care Guide for [Plant Name]'."),
    guide: z.string().describe("General cultivation and care information for the identified plant species. Provide key details about soil, water, light, and nutrients. Keep it concise but informative."),
  }),
});
export type DiagnosePlantHealthOutput = z.infer<typeof DiagnosePlantHealthOutputSchema>;

export async function diagnosePlantHealth(input: DiagnosePlantHealthInput): Promise<DiagnosePlantHealthOutput> {
  return diagnosePlantHealthFlow(input);
}

const prompt = ai.definePrompt({
  name: 'diagnosePlantHealthPrompt',
  input: {schema: DiagnosePlantHealthInputSchema},
  output: {schema: DiagnosePlantHealthOutputSchema},
  prompt: `You are an expert botanist and agricultural advisor. A farmer has provided a photo of a plant for analysis. Respond in the requested language: {{{language}}}.

  Analyze the provided image and respond with a detailed JSON object.

  1.  **Initial Assessment**: First, determine if the image actually contains a plant. Set the 'isPlant' field to true or false.

  2.  **If it IS a plant**:
      a.  **Identification**: Identify the plant's common and scientific (Latin) name. Provide a brief one-sentence description.
      b.  **Health Assessment**:
          i.  Examine the plant for any signs of disease, pests, or nutrient deficiencies (e.g., discoloration, spots, wilting, insects).
          ii. Set the 'isHealthy' field to true or false.
          iii. **Diagnosis**: Write a detailed diagnosis. If healthy, state that and praise the farmer's care. If unhealthy, clearly describe the issue.
          iv. **Potential Causes**: List the most likely causes for the problem (e.g., "Overwatering," "Fungal infection (Powdery Mildew)," "Aphid infestation").
          v.  **Recommendations**: Provide a list of clear, actionable recommendations. Include both immediate treatments (e.g., "Spray with a neem oil solution") and preventative measures (e.g., "Improve air circulation around the plants").
      c.  **Care Guide**: Provide a general, concise care and cultivation guide for the identified plant species, including basics on soil, water, and light.

  3.  **If it is NOT a plant**:
      a.  Set 'isPlant' to false.
      b.  In the 'identification.description' field, briefly describe what is in the image.
      c.  Fill all other fields with appropriate "N/A" or empty values.

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
