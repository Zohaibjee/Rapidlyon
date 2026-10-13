import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-4xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[28px] border border-black/5 bg-white p-8 text-center shadow-[0_18px_40px_rgba(23,25,22,0.04)]">
        <p className="text-xs uppercase tracking-[0.2em] text-[#73776D]">404</p>
        <h1 className="mt-4 text-4xl tracking-[-0.07em] text-[#171916]">This page could not be found.</h1>
        <p className="mt-4 text-base leading-8 text-[#4f544d]">
          The page you are looking for may have moved, or it may not exist in this version of the studio website.
        </p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-[#171916] px-5 py-3 text-sm font-medium text-[#F5F5EF]">
          Return home
        </Link>
      </div>
    </div>
  );
}
