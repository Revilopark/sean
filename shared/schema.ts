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
  recommended_skills: z.array(z.string()).optional(),
  recommended_courses: z.array(z.object({
    title: z.string(),
    provider: z.string(),
    url: z.string()
  })).optional(),
});

export type Opportunity = z.infer<typeof opportunitySchema>;

export const insertOpportunitySchema = opportunitySchema.omit({ id: true });

export const mentorSchema = z.object({
  id: z.number(),
  name: z.string(),
  role: z.string(),
  organization: z.string(),
  category: z.string(),
  bio: z.string(),
  imageUrl: z.string().optional(),
  contactUrl: z.string(),
  availability: z.string()
});

export type Mentor = z.infer<typeof mentorSchema>;
export type InsertOpportunity = z.infer<typeof insertOpportunitySchema>;
