"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { publishedReviewSchema, reviewSchema, type PublishedReview, type ReviewFormValues } from "@/lib/review-validation";
import { SectionHeading } from "@/components/ui/section-heading";

const initialValues: ReviewFormValues = { name: "", rating: 0, review: "" };

type ReviewStatus = "idle" | "loading" | "success" | "error";

export function ReviewsSection() {
  const [reviews, setReviews] = useState<PublishedReview[]>([]);
  const [reviewsStatus, setReviewsStatus] = useState<"loading" | "loaded" | "error">("loading");
  const [reviewsMessage, setReviewsMessage] = useState("");
  const [values, setValues] = useState<ReviewFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof ReviewFormValues, string>>>({});
  const [status, setStatus] = useState<ReviewStatus>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadReviews() {
      try {
        const response = await fetch("/api/reviews", { signal: controller.signal });
        const payload = await response.json();

        if (!response.ok || payload?.success !== true) {
          throw new Error(payload?.message || "Published reviews could not be loaded.");
        }

        const parsedReviews = publishedReviewSchema.array().safeParse(payload.reviews);
        if (!parsedReviews.success) {
          throw new Error("Published reviews were returned in an unexpected format.");
        }

        setReviews(parsedReviews.data);
        setReviewsStatus("loaded");
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        setReviewsMessage(error instanceof Error ? error.message : "Published reviews could not be loaded.");
        setReviewsStatus("error");
      }
    }

    void loadReviews();
    return () => controller.abort();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = event.target.name as keyof ReviewFormValues;
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
    setStatus("idle");
    setMessage("");
  };

  const handleRating = (rating: number) => {
    setValues((current) => ({ ...current, rating }));
    setErrors((current) => {
      const next = { ...current };
      delete next.rating;
      return next;
    });
    setStatus("idle");
    setMessage("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = reviewSchema.safeParse(values);

    if (!parsed.success) {
      const nextErrors: Partial<Record<keyof ReviewFormValues, string>> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof ReviewFormValues;
        nextErrors[field] = issue.message;
      }
      setErrors(nextErrors);
      setStatus("error");
      setMessage("Please fix the highlighted fields before sending your review.");
      return;
    }

    setStatus("loading");
    setMessage("Sending your review...");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const payload = await response.json();

      if (!response.ok || payload?.success !== true) {
        throw new Error(payload?.message || "Your review could not be submitted.");
      }

      setStatus("success");
      setMessage(payload.message);
      setValues(initialValues);
      setErrors({});
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Your review could not be submitted.");
    }
  };

  return (
    <section className="bg-white py-20" aria-labelledby="reviews-title">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div>
          <SectionHeading
          eyebrow="Reviews"
            title="Honest feedback, shared with permission."
            description="Reviews are submitted by visitors and checked before publication. We do not claim ratings or client endorsements that have not been received."
          />

          <div className="mt-8 space-y-4" aria-live="polite">
            {reviewsStatus === "loading" ? (
              <p className="rounded-2xl border border-black/10 bg-[#F5F5EF] p-5 text-sm text-[#4f544d]">Loading published reviews…</p>
            ) : reviewsStatus === "error" ? (
              <p role="status" className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
                {reviewsMessage || "Published reviews are temporarily unavailable."}
              </p>
            ) : reviews.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-black/15 bg-[#F5F5EF] p-6">
                <p className="font-medium text-[#171916]">No published reviews yet.</p>
                <p className="mt-2 text-sm leading-6 text-[#4f544d]">
                  If you have worked with Rapidlyon, you can share your experience. Reviews are not shown publicly until they have been moderated.
                </p>
              </div>
            ) : (
              reviews.map((review) => (
                <article key={review.id} className="rounded-2xl border border-black/10 bg-[#F5F5EF] p-6">
                  <div className="flex gap-1" role="img" aria-label={`${review.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star key={index} aria-hidden="true" size={16} className={index < review.rating ? "fill-[#d3a625] text-[#d3a625]" : "text-[#a3a69e]"} />
                    ))}
                  </div>
                  <p className="mt-4 leading-7 text-[#30332e]">{review.review}</p>
                  <p className="mt-4 text-sm font-semibold text-[#171916]">{review.name}</p>
                  <p className="mt-1 text-xs text-[#62665e]">Submitted review · not independently verified</p>
                </article>
              ))
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="rounded-[28px] border border-black/5 bg-[#F5F5EF] p-6 md:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#62665e]">Share your experience</p>
          <h2 id="reviews-title" className="mt-3 text-2xl font-semibold text-[#171916]">Leave a review</h2>
          <p className="mt-2 text-sm leading-6 text-[#4f544d]">Please only submit feedback about work you have personally experienced.</p>

          <div className="mt-6">
            <label htmlFor="review-name" className="mb-2 block text-sm font-medium text-[#171916]">Name <span aria-hidden="true">*</span></label>
            <input id="review-name" name="name" autoComplete="name" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "review-name-error" : undefined} value={values.name} onChange={handleChange} className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#171916]" />
            {errors.name ? <p id="review-name-error" className="mt-1 text-sm text-red-700">{errors.name}</p> : null}
          </div>

          <fieldset className="mt-5">
            <legend className="mb-2 text-sm font-medium text-[#171916]">Rating <span aria-hidden="true">*</span></legend>
            <div className="flex gap-2">
              {Array.from({ length: 5 }, (_, index) => {
                const rating = index + 1;
                return (
                  <label key={rating} htmlFor={`review-rating-${rating}`} className="cursor-pointer rounded-lg p-1 text-[#b08a1f] outline-offset-2 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[#171916]">
                    <input
                      id={`review-rating-${rating}`}
                      className="peer sr-only"
                      type="radio"
                      name="rating"
                      value={rating}
                      checked={values.rating === rating}
                      onChange={() => handleRating(rating)}
                    />
                    <Star aria-hidden="true" size={25} className={rating <= values.rating ? "fill-current" : ""} />
                    <span className="sr-only">{rating} {rating === 1 ? "star" : "stars"}</span>
                  </label>
                );
              })}
            </div>
            {errors.rating ? <p className="mt-1 text-sm text-red-700">{errors.rating}</p> : null}
          </fieldset>

          <div className="mt-5">
            <label htmlFor="review-text" className="mb-2 block text-sm font-medium text-[#171916]">Your review <span aria-hidden="true">*</span></label>
            <textarea id="review-text" name="review" required aria-invalid={Boolean(errors.review)} aria-describedby={errors.review ? "review-text-error" : undefined} value={values.review} onChange={handleChange} rows={5} maxLength={1200} className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#171916]" />
            {errors.review ? <p id="review-text-error" className="mt-1 text-sm text-red-700">{errors.review}</p> : null}
          </div>

          {message ? (
            <p role={status === "error" ? "alert" : "status"} aria-live={status === "error" ? "assertive" : "polite"} className={`mt-5 rounded-xl px-4 py-3 text-sm ${status === "success" ? "border border-emerald-200 bg-emerald-50 text-emerald-800" : status === "error" ? "border border-red-200 bg-red-50 text-red-800" : "border border-black/10 bg-white text-[#30332e]"}`}>
              {message}
            </p>
          ) : null}

          <button type="submit" disabled={status === "loading"} className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#171916] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#30332e] disabled:cursor-wait disabled:opacity-60">
            {status === "loading" ? "Submitting…" : "Submit for review"}
          </button>
          <p className="mt-3 text-xs leading-5 text-[#62665e]">Reviews are moderated before publication. No rating is displayed until a review is approved.</p>
        </form>
      </div>
    </section>
  );
}
