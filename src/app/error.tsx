"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-3xl items-center justify-center px-4 py-16">
      <div className="rounded-[28px] border border-red-200 bg-white p-8 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-red-600">Error</p>
        <h2 className="mt-4 text-3xl tracking-[-0.06em] text-[#171916]">Something went wrong.</h2>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-full bg-[#171916] px-5 py-3 text-sm font-medium text-[#F5F5EF]"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
