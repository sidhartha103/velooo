'use server';
/**
 * @fileOverview This file defines a Genkit flow to suggest optimal times and locations for photo and video shoots.
 *
 * - suggestOptimalShootTime - A function that suggests optimal shoot times and locations.
 * - SuggestOptimalShootTimeInput - The input type for the suggestOptimalShootTime function.
 * - SuggestOptimalShootTimeOutput - The return type for the suggestOptimalShootTime function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestOptimalShootTimeInputSchema = z.object({
  userPreferences: z
    .string()
    .describe('The user\s preferences for the shoot, including desired style, location types, and preferred times of day.'),
  trendingData: z
    .string()
    .describe('Trending data for photo and video shoots, including popular locations, times, and styles.'),
});
export type SuggestOptimalShootTimeInput = z.infer<typeof SuggestOptimalShootTimeInputSchema>;

const SuggestOptimalShootTimeOutputSchema = z.object({
  optimalTime: z
    .string()
    .describe('The suggested optimal time for the shoot, based on user preferences and trending data.'),
  optimalLocation: z
    .string()
    .describe('The suggested optimal location for the shoot, based on user preferences and trending data.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the suggested optimal time and location.'),
});
export type SuggestOptimalShootTimeOutput = z.infer<typeof SuggestOptimalShootTimeOutputSchema>;

export async function suggestOptimalShootTime(
  input: SuggestOptimalShootTimeInput
): Promise<SuggestOptimalShootTimeOutput> {
  return suggestOptimalShootTimeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestOptimalShootTimePrompt',
  input: {schema: SuggestOptimalShootTimeInputSchema},
  output: {schema: SuggestOptimalShootTimeOutputSchema},
  prompt: `You are an AI assistant designed to suggest the optimal time and location for photo and video shoots based on user preferences and trending data.

  User Preferences: {{{userPreferences}}}
  Trending Data: {{{trendingData}}}

  Based on the user preferences and trending data, suggest an optimal time and location for the shoot, and explain your reasoning.

  Output the optimal time, optimal location, and reasoning in a JSON format.
  `,
});

const suggestOptimalShootTimeFlow = ai.defineFlow(
  {
    name: 'suggestOptimalShootTimeFlow',
    inputSchema: SuggestOptimalShootTimeInputSchema,
    outputSchema: SuggestOptimalShootTimeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
