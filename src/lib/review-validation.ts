import { z } from "zod";

export const reviewSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100, "Your name must be 100 characters or fewer."),
  rating: z.number().int().min(1, "Choose a rating from 1 to 5.").max(5),
  review: z.string().trim().min(20, "Please write at least 20 characters.").max(1200, "Please keep your review under 1,200 characters."),
});

export const publishedReviewSchema = reviewSchema.extend({
  id: z.string().uuid(),
  created_at: z.string().datetime(),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;
export type PublishedReview = z.infer<typeof publishedReviewSchema>;
