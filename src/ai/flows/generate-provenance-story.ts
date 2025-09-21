// src/ai/flows/generate-provenance-story.ts
'use server';

/**
 * @fileOverview Generates a narrative summary of a product's provenance.
 *
 * - generateProvenanceStory - A function that generates the provenance story.
 * - GenerateProvenanceStoryInput - The input type for the generateProvenanceStory function.
 * - GenerateProvenanceStoryOutput - The return type for the generateProvenanceStory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProvenanceStoryInputSchema = z.object({
  batchId: z.string().describe('The ID of the harvest batch.'),
  farmName: z.string().describe('The name of the farm.'),
  location: z.string().describe('The location of the farm.'),
  harvestDate: z.string().describe('The harvest date.'),
  processingDetails: z.string().describe('Details about the processing steps.'),
  additionalDetails: z.string().optional().describe('Any additional details about the product.'),
});
export type GenerateProvenanceStoryInput = z.infer<typeof GenerateProvenanceStoryInputSchema>;

const GenerateProvenanceStoryOutputSchema = z.object({
  story: z.string().describe('A narrative summary of the product\u0027s provenance.'),
});
export type GenerateProvenanceStoryOutput = z.infer<typeof GenerateProvenanceStoryOutputSchema>;

export async function generateProvenanceStory(input: GenerateProvenanceStoryInput): Promise<GenerateProvenanceStoryOutput> {
  return generateProvenanceStoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProvenanceStoryPrompt',
  input: {schema: GenerateProvenanceStoryInputSchema},
  output: {schema: GenerateProvenanceStoryOutputSchema},
  prompt: `You are a storyteller crafting engaging narratives about product origins.

  Based on the following information, create a short and captivating story about the product's journey from farm to consumer.

  Batch ID: {{{batchId}}}
  Farm Name: {{{farmName}}}
  Location: {{{location}}}
  Harvest Date: {{{harvestDate}}}
  Processing Details: {{{processingDetails}}}
  Additional Details: {{{additionalDetails}}}

  Tell the story in a way that highlights the product's authenticity and journey.
  `,
});

const generateProvenanceStoryFlow = ai.defineFlow(
  {
    name: 'generateProvenanceStoryFlow',
    inputSchema: GenerateProvenanceStoryInputSchema,
    outputSchema: GenerateProvenanceStoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
