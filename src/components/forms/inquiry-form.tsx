"use client";

import { useMemo, useState } from "react";
import { services } from "@/data/site";
import { inquirySchema, type InquiryFormValues } from "@/lib/validation";

const initialValues: InquiryFormValues = {
  name: "",
  email: "",
  company: "",
  service: "",
  projectDescription: "",
  budget: "",
  timeline: "",
};

const serviceOptions = services.map((service) => service.title);

export function InquiryForm() {
  const [values, setValues] = useState<InquiryFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFormValues, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const isReady = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { value } = event.target;
    const name = event.target.name as keyof InquiryFormValues;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[name];
      return next;
    });
    setStatus("idle");
    setMessage("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = inquirySchema.safeParse(values);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof InquiryFormValues, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof InquiryFormValues;
        fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus("error");
      setMessage("Please fix the highlighted fields before sending your inquiry.");
      return;
    }

    setStatus("loading");
    setMessage("Sending your project details...");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const payload = await response.json();

      if (!response.ok || payload?.success !== true) {
        throw new Error(payload?.message || "Submission failed.");
      }

      setStatus("success");
      setMessage(
        payload?.message ||
          "Thanks! Your inquiry is ready for review. We’ll follow up soon.",
      );
      setValues(initialValues);
      setErrors({});
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while sending the inquiry.",
      );
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6 rounded-[28px] border border-black/5 bg-white p-5 shadow-[0_18px_50px_rgba(23,25,22,0.05)] md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#171916]">Name <span aria-hidden="true">*</span></label>
          <input id="name" name="name" autoComplete="name" required aria-required="true" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} value={values.name} onChange={handleChange} className="w-full rounded-xl border border-black/10 bg-[#f7f7f3] px-4 py-3 outline-none transition focus:border-[#171916]" />
          {errors.name ? <p id="name-error" className="mt-1 text-sm text-red-600">{errors.name}</p> : null}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#171916]">Email <span aria-hidden="true">*</span></label>
          <input id="email" type="email" name="email" autoComplete="email" required aria-required="true" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} value={values.email} onChange={handleChange} className="w-full rounded-xl border border-black/10 bg-[#f7f7f3] px-4 py-3 outline-none transition focus:border-[#171916]" />
          {errors.email ? <p id="email-error" className="mt-1 text-sm text-red-600">{errors.email}</p> : null}
        </div>

        <div>
          <label htmlFor="company" className="mb-2 block text-sm font-medium text-[#171916]">Company (optional)</label>
          <input id="company" name="company" autoComplete="organization" value={values.company} onChange={handleChange} className="w-full rounded-xl border border-black/10 bg-[#f7f7f3] px-4 py-3 outline-none transition focus:border-[#171916]" />
        </div>

        <div>
          <label htmlFor="service" className="mb-2 block text-sm font-medium text-[#171916]">Requested service <span aria-hidden="true">*</span></label>
          <select id="service" name="service" required aria-required="true" aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "service-error" : undefined} value={values.service} onChange={handleChange} className="w-full rounded-xl border border-black/10 bg-[#f7f7f3] px-4 py-3 outline-none transition focus:border-[#171916]">
            <option value="">Select a service</option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors.service ? <p id="service-error" className="mt-1 text-sm text-red-600">{errors.service}</p> : null}
        </div>
      </div>

      <div>
        <label htmlFor="projectDescription" className="mb-2 block text-sm font-medium text-[#171916]">Project description <span aria-hidden="true">*</span></label>
        <textarea id="projectDescription" name="projectDescription" required aria-required="true" aria-invalid={Boolean(errors.projectDescription)} aria-describedby={errors.projectDescription ? "projectDescription-error" : undefined} value={values.projectDescription} onChange={handleChange} rows={6} className="w-full rounded-xl border border-black/10 bg-[#f7f7f3] px-4 py-3 outline-none transition focus:border-[#171916]" />
        {errors.projectDescription ? <p id="projectDescription-error" className="mt-1 text-sm text-red-600">{errors.projectDescription}</p> : null}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="budget" className="mb-2 block text-sm font-medium text-[#171916]">Budget range (optional)</label>
          <input id="budget" name="budget" value={values.budget} onChange={handleChange} className="w-full rounded-xl border border-black/10 bg-[#f7f7f3] px-4 py-3 outline-none transition focus:border-[#171916]" />
        </div>

        <div>
          <label htmlFor="timeline" className="mb-2 block text-sm font-medium text-[#171916]">Timeline (optional)</label>
          <input id="timeline" name="timeline" value={values.timeline} onChange={handleChange} className="w-full rounded-xl border border-black/10 bg-[#f7f7f3] px-4 py-3 outline-none transition focus:border-[#171916]" />
        </div>
      </div>

      {message ? (
        <p
          role={status === "error" ? "alert" : "status"}
          aria-live={status === "error" ? "assertive" : "polite"}
          className={
            status === "success"
              ? "rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
              : status === "error"
                ? "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                : "rounded-xl border border-black/5 bg-[#f5f5ef] px-4 py-3 text-sm text-[#171916]"
          }
        >
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading" || !isReady}
        className="inline-flex w-full items-center justify-center rounded-full bg-[#171916] px-5 py-3 text-sm font-medium text-[#F5F5EF] transition hover:bg-[#2a2d27] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send inquiry"}
      </button>
    </form>
  );
}
