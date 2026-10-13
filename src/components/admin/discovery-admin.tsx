"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { discoveryAdminRecordSchema, discoveryAdminSummarySchema, discoveryStatuses, type DiscoveryAdminRecord, type DiscoveryAdminSummary } from "@/lib/discovery";

function dateLabel(value: string) {
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function displayValue(value: unknown): string {
  if (typeof value === "string") return value || "Not provided";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.map(displayValue).join(", ");
  if (value && typeof value === "object") return JSON.stringify(value, null, 2);
  return value == null ? "Not provided" : String(value);
}

export function DiscoveryAdmin() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<DiscoveryAdminSummary[]>([]);
  const [selected, setSelected] = useState<DiscoveryAdminRecord | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<DiscoveryAdminRecord["status"]>("New");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const [attachmentBusy, setAttachmentBusy] = useState("");

  const loadSubmissions = useCallback(async () => {
    try {
      const query = new URLSearchParams();
      if (search) query.set("q", search);
      if (statusFilter) query.set("status", statusFilter);
      const response = await fetch(`/api/admin/discovery?${query}`, { cache: "no-store" });
      const payload = await response.json();
      setError("");
      if (response.status === 401) {
        router.replace("/admin/discovery/login");
        return;
      }
      if (!response.ok || payload?.success !== true || !Array.isArray(payload.submissions)) {
        throw new Error(payload?.message || "Submissions could not be loaded.");
      }
      const parsed = discoveryAdminSummarySchema.array().safeParse(payload.submissions);
      if (!parsed.success) throw new Error("The submission list had an unexpected format.");
      setSubmissions(parsed.data);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Submissions could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, [router, search, statusFilter]);

  useEffect(() => {
    // This async fetch synchronizes the list with the current server-side filters.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadSubmissions();
  }, [loadSubmissions]);

  const openSubmission = async (id: string) => {
    setSelected(null);
    setDetailLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/discovery/${id}`, { cache: "no-store" });
      const payload = await response.json();
      if (response.status === 401) {
        router.replace("/admin/discovery/login");
        return;
      }
      if (!response.ok || payload?.success !== true) {
        throw new Error(payload?.message || "Submission could not be loaded.");
      }
      const parsed = discoveryAdminRecordSchema.safeParse(payload.submission);
      if (!parsed.success) throw new Error("Submission details had an unexpected format.");
      setSelected(parsed.data);
      setSelectedStatus(parsed.data.status);
      setNotes(parsed.data.internal_notes);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Submission could not be loaded.");
    } finally {
      setDetailLoading(false);
    }
  };

  const saveUpdates = async () => {
    if (!selected) return;
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch(`/api/admin/discovery/${selected.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: selectedStatus, internalNotes: notes }),
      });
      const payload = await response.json();
      if (!response.ok || payload?.success !== true) {
        throw new Error(payload?.message || "Changes could not be saved.");
      }
      const parsed = discoveryAdminRecordSchema.safeParse(payload.submission);
      if (!parsed.success) throw new Error("The updated record had an unexpected format.");
      setSelected(parsed.data);
      setNotice("Status and internal notes saved.");
      await loadSubmissions();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Changes could not be saved.");
    } finally {
      setSaving(false);
    }
  };

  const openAttachment = async (path: string) => {
    if (!selected) return;
    setAttachmentBusy(path);
    setError("");
    try {
      const response = await fetch(`/api/admin/discovery/${selected.id}/attachments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path }),
      });
      const payload = await response.json();
      if (!response.ok || payload?.success !== true || typeof payload.url !== "string") {
        throw new Error(payload?.message || "Attachment could not be opened.");
      }
      window.open(payload.url, "_blank", "noopener,noreferrer");
    } catch (attachmentError) {
      setError(attachmentError instanceof Error ? attachmentError.message : "Attachment could not be opened.");
    } finally {
      setAttachmentBusy("");
    }
  };

  const signOut = async () => {
    await fetch("/api/admin/session", { method: "DELETE" });
    router.replace("/admin/discovery/login");
    router.refresh();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#73776D]">Private · Discovery</p>
          <h1 className="mt-2 text-3xl font-semibold">Project submissions</h1>
          <p className="mt-2 text-sm text-[#62665e]">Only authenticated administrators can view these client details.</p>
        </div>
        <button type="button" onClick={signOut} className="rounded-full border border-black/15 px-4 py-2 text-sm font-medium">Sign out</button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.2fr)]">
        <section className="rounded-[24px] border border-black/5 bg-white p-5">
          <form onSubmit={(event) => { event.preventDefault(); setLoading(true); setSearch(searchInput.trim()); }} className="flex gap-2">
            <label htmlFor="submission-search" className="sr-only">Search submissions</label>
            <input id="submission-search" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="Search name, email, company" className="min-w-0 flex-1 rounded-xl border border-black/10 px-3 py-2 text-sm" />
            <button className="rounded-xl bg-[#171916] px-4 py-2 text-sm font-medium text-white">Search</button>
          </form>
          <label htmlFor="submission-status-filter" className="sr-only">Filter by status</label>
          <select id="submission-status-filter" value={statusFilter} onChange={(event) => { setLoading(true); setStatusFilter(event.target.value); }} className="mt-3 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm">
            <option value="">All statuses</option>
            {discoveryStatuses.map((status) => <option key={status}>{status}</option>)}
          </select>

          {loading ? <p className="py-8 text-center text-sm text-[#62665e]">Loading submissions…</p> : null}
          {!loading && submissions.length === 0 ? (
            <div className="py-10 text-center">
              <p className="font-medium">No discovery submissions found.</p>
              <p className="mt-2 text-sm text-[#62665e]">New requests will appear here after the database is configured.</p>
            </div>
          ) : null}
          <ul className="mt-4 divide-y divide-black/10">
            {submissions.map((submission) => (
              <li key={submission.id}>
                <button type="button" onClick={() => void openSubmission(submission.id)} className={`w-full rounded-xl px-3 py-4 text-left hover:bg-[#F5F5EF] ${selected?.id === submission.id ? "bg-[#F5F5EF]" : ""}`}>
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-semibold">{submission.full_name}</span>
                    <span className="rounded-full bg-[#EAF3C9] px-2 py-1 text-[10px] font-medium">{submission.status}</span>
                  </span>
                  <span className="mt-1 block truncate text-sm text-[#62665e]">{submission.company} · {submission.email}</span>
                  <span className="mt-1 block text-xs text-[#73776D]">{dateLabel(submission.created_at)}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="min-h-96 rounded-[24px] border border-black/5 bg-white p-5 sm:p-7">
          {detailLoading ? <p className="py-16 text-center text-sm text-[#62665e]">Loading client requirements…</p> : null}
          {!detailLoading && !selected ? (
            <div className="flex min-h-80 flex-col items-center justify-center text-center">
              <h2 className="text-xl font-semibold">Select a submission</h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-[#62665e]">Client details, project answers, meeting preferences, and private notes will appear here.</p>
            </div>
          ) : null}
          {selected ? (
            <div>
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-black/10 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[#73776D]">{dateLabel(selected.created_at)}</p>
                  <h2 className="mt-2 text-2xl font-semibold">{selected.full_name}</h2>
                  <p className="mt-1 text-sm text-[#62665e]">{selected.company}</p>
                  <a href={`mailto:${selected.email}`} className="mt-2 inline-block text-sm underline underline-offset-2">{selected.email}</a>
                </div>
                <div>
                  <label htmlFor="submission-status" className="mb-1 block text-xs font-medium">Status</label>
                  <select id="submission-status" value={selectedStatus} onChange={(event) => setSelectedStatus(event.target.value as DiscoveryAdminRecord["status"])} className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm">
                    {discoveryStatuses.map((status) => <option key={status}>{status}</option>)}
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-sm font-semibold">Selected services</h3>
                <div className="mt-2 flex flex-wrap gap-2">{selected.services.map((service) => <span key={service} className="rounded-full bg-[#F5F5EF] px-3 py-1.5 text-xs">{service}</span>)}</div>
                <p className="mt-3 text-sm text-[#62665e]">Discovery method: {selected.discovery_method}</p>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold">Client requirements</h3>
                <dl className="mt-3 divide-y divide-black/5 rounded-xl border border-black/5">
                  {Object.entries(selected.submission).filter(([key]) => !["consent", "idempotencyKey"].includes(key)).map(([key, value]) => (
                    <div key={key} className="grid gap-1 p-3 text-sm sm:grid-cols-[11rem_1fr]">
                      <dt className="font-medium capitalize text-[#62665e]">{key.replace(/([A-Z])/g, " $1")}</dt>
                      <dd className="whitespace-pre-wrap break-words">{displayValue(value)}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold">Private attachments</h3>
                {selected.attachment_paths.length ? (
                  <ul className="mt-2 space-y-2">
                    {selected.attachment_paths.map((path) => (
                      <li key={path}>
                        <button type="button" disabled={attachmentBusy === path} onClick={() => void openAttachment(path)} className="text-sm font-medium text-[#171916] underline underline-offset-4 disabled:opacity-50">
                          {attachmentBusy === path ? "Preparing secure link…" : `Open ${path.split("/").at(-1)}`}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : <p className="mt-2 text-sm text-[#62665e]">No attachments.</p>}
              </div>

              <div className="mt-6">
                <label htmlFor="internal-notes" className="text-sm font-semibold">Private internal notes</label>
                <textarea id="internal-notes" rows={5} maxLength={10000} value={notes} onChange={(event) => setNotes(event.target.value)} className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-[#171916]" />
                <button type="button" disabled={saving} onClick={() => void saveUpdates()} className="mt-3 rounded-full bg-[#171916] px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50">
                  {saving ? "Saving…" : "Save status and notes"}
                </button>
                {notice ? <p role="status" className="mt-3 text-sm text-emerald-800">{notice}</p> : null}
              </div>
            </div>
          ) : null}
        </section>
      </div>
      {error ? <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p> : null}
    </div>
  );
}
