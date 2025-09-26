
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
  language: z.string().optional().describe("The language for the output, e.g., 'English', 'Spanish', 'Hindi', 'Telugu', 'Tamil'."),
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
    healthStatus: z.enum(['Healthy', 'Moderate Concern', 'Unhealthy']).describe("A classification of the plant's health. 'Unhealthy' if issues are critical, widespread, or untreatable."),
    healthScore: z.number().min(0).max(100).describe("A score from 0-100 representing the plant's health. 100 is perfect health."),
    diagnosis: z.string().describe("A detailed diagnosis of the plant's health, noting any visible signs of disease, pests, or nutrient deficiencies."),
    potentialCauses: z.array(z.string()).describe("A list of potential causes for any identified health issues."),
    recommendations: z.array(z.string()).describe("A list of actionable recommendations or precautions for the farmer to take based on the diagnosis."),
  }),
  farmingGuide: z.object({
    suggestedFertilizers: z.array(z.string()).describe("A list of suggested fertilizers or soil amendments based on the diagnosis and plant type."),
    careGuide: z.string().describe("General cultivation and care information for the identified plant species. Provide key details about soil, water, light, and nutrients."),
  }),
  marketValue: z.object({
      estimatedPrice: z.string().describe("An estimated market price for the harvested product (e.g., '$5-7 per kg') based on the visual quality. State 'N/A' if not a plant or if quality is too low to sell."),
      priceRationale: z.string().describe("A brief explanation for the estimated price, considering the plant's health, appearance, and potential yield quality.")
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

  1.  **Initial Assessment**: Determine if the image contains a plant. Set 'isPlant' to true or false.

  2.  **If it IS a plant**:
      a.  **Identification**: Identify the common and Latin name, and a brief description.
      b.  **Health Assessment**:
          i.  Examine the plant for any signs of disease, pests, or deficiencies.
          ii. **Health Status, Score, & Rationale**: Assign a 'healthStatus' ('Healthy', 'Moderate Concern', 'Unhealthy') and a 'healthScore' (0-100). A plant with minor, treatable issues should be 'Moderate Concern'. A plant with severe, widespread, or untreatable issues that make it commercially non-viable should be 'Unhealthy'.
          iii. **Diagnosis**: Write a detailed diagnosis.
          iv. **Potential Causes**: List likely causes for any issues.
          v.  **Recommendations**: Provide clear, actionable recommendations.
      c.  **Farming Guide**:
          i. **Fertilizers**: Suggest specific fertilizers or soil treatments based on the diagnosis.
          ii. **Care Guide**: Provide a general, concise care guide for the plant.
      d. **Market Value**:
         i. Provide an 'estimatedPrice' for the harvest based on its visual quality (e.g., per kg or per lb). If the status is 'Unhealthy', state 'Not commercially viable'.
         ii. Briefly explain the 'priceRationale', citing quality, health, and appearance.

  3.  **If it is NOT a plant**:
      a.  Set 'isPlant' to false.
      b.  In 'identification.description', briefly describe the image.
      c.  Fill all other fields with appropriate "N/A" or empty/zero values, with 'healthStatus' as 'Unhealthy' and 'healthScore' as 0.

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
