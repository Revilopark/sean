import { z } from "zod";

export const opportunitySchema = z.object({
  id: z.number(),
  title: z.string(),
  organization: z.string(),
  location: z.string(),
  type: z.string(),
  category: z.string(),
  salary: z.string(),
  requirements: z.string(),
  benefits: z.string(),
  url: z.string(),
  distance_from_bakersfield: z.string(),
});

export type Opportunity = z.infer<typeof opportunitySchema>;

export const insertOpportunitySchema = opportunitySchema.omit({ id: true });
export type InsertOpportunity = z.infer<typeof insertOpportunitySchema>;
