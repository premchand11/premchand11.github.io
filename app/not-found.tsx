import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-handwritten text-lg text-[color:var(--ink-soft)]">
          lost
        </p>
        <p className="mt-2 text-sm text-[color:var(--ink-mid)]">
          nothing here.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-sm underline decoration-dotted decoration-current/30 underline-offset-4 text-[color:var(--ink-fg)] hover:decoration-current/60"
        >
          go home
        </Link>
      </div>
    </main>
  );
}
