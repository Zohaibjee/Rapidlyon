import { z } from "zod";

export const discoveryServices = [
  "UX/UI & Product Design",
  "Website Development",
  "SEO & Website Optimization",
  "Other / not sure yet",
  // Retain legacy values so existing submissions and browser drafts remain readable.
  "UX research and UX/UI design",
  "Website design",
  "Website development",
  "Mobile app design",
  "Product strategy and consulting",
  "Existing product redesign",
  "Other digital product requirements",
] as const;

export const discoveryServiceCategories = discoveryServices.slice(0, 4);

export const discoveryMethods = [
  "Self-guided discovery",
  "Discovery interview",
  "Live demo or product walkthrough",
] as const;

const answersSchema = z.record(z.string(), z.union([z.string().max(5000), z.array(z.string().max(200)).max(50)]));

export const discoverySubmissionSchema = z.object({
  idempotencyKey: z.string().uuid(),
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  company: z.string().trim().min(1).max(160),
  website: z.string().trim().max(500),
  country: z.string().trim().min(2).max(100),
  timeZone: z.string().trim().min(1).max(100),
  industry: z.string().trim().min(1).max(120),
  businessStage: z.string().trim().min(1).max(100),
  businessModel: z.string().trim().max(2000),
  services: z.array(z.enum(discoveryServices)).min(1).max(discoveryServices.length),
  answers: answersSchema,
  projectOverview: z.string().trim().min(20).max(5000),
  objectives: z.string().trim().max(5000),
  mustHaveFeatures: z.string().trim().max(5000),
  niceToHaveFeatures: z.string().trim().max(5000),
  constraints: z.string().trim().max(5000),
  budget: z.string().trim().max(100),
  timeline: z.string().trim().max(200),
  productUrl: z.string().trim().max(500),
  competitorReferences: z.string().trim().max(2000),
  discoveryMethod: z.enum(discoveryMethods),
  preferredTimes: z.string().trim().max(2000),
  consent: z.literal(true),
});

export const discoveryDraftSchema = discoverySubmissionSchema
  .omit({ idempotencyKey: true, consent: true })
  .partial()
  .extend({
    idempotencyKey: z.string().optional(),
    consent: z.boolean().optional(),
  });

export type DiscoverySubmission = z.infer<typeof discoverySubmissionSchema>;

export const discoveryStatuses = [
  "New",
  "In Review",
  "Awaiting Client Information",
  "Meeting Requested",
  "Discovery Completed",
  "Proposal In Progress",
  "Closed",
] as const;

export const discoveryStatusSchema = z.enum(discoveryStatuses);

export const discoveryAdminSummarySchema = z.object({
  id: z.string().uuid(),
  full_name: z.string(),
  email: z.string().email(),
  company: z.string(),
  services: z.array(z.enum(discoveryServices)),
  discovery_method: z.enum(discoveryMethods),
  status: discoveryStatusSchema,
  created_at: z.string().datetime(),
  next_action: z.string().nullable(),
  follow_up_at: z.string().nullable(),
});

export const discoveryAdminRecordSchema = discoveryAdminSummarySchema.extend({
  submission: z.record(z.string(), z.unknown()),
  attachment_paths: z.array(z.string()),
  internal_notes: z.string(),
});

export type DiscoveryAdminSummary = z.infer<typeof discoveryAdminSummarySchema>;
export type DiscoveryAdminRecord = z.infer<typeof discoveryAdminRecordSchema>;
