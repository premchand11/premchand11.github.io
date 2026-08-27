"use client";

import { useEffect, useRef, useState } from "react";

export type VisualItem = {
  title: string;
  kind: "poster" | "behance" | "commission";
  image: string | null;
  href: string | null;
  year: string;
};

const kindLabel: Record<VisualItem["kind"], string> = {
  poster: "poster",
  behance: "behance",
  commission: "commission",
};

function VisualCard({ item }: { item: VisualItem }) {
  const [failed, setFailed] = useState(false);
  const showImage = item.image && !failed;

  const inner = (
    <>
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md border border-[color:var(--color-line)] bg-[color:var(--accent-soft)]">
        {showImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image!}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-3 text-center">
            <span className="font-handwritten text-lg text-[color:var(--accent)]">
              {item.title}
            </span>
            <span className="text-[10px] uppercase tracking-[0.1em] text-[color:var(--ink-soft)]">
              {kindLabel[item.kind]}
            </span>
          </div>
        )}
      </div>
      <div className="mt-2 flex items-baseline justify-between gap-2 px-0.5">
        <p className="min-w-0 truncate text-xs text-[color:var(--ink-fg)]">
          {item.title}
        </p>
        <span className="shrink-0 text-[10px] tabular-nums text-[color:var(--ink-soft)]">
          {item.year}
        </span>
      </div>
      <p className="px-0.5 text-[10px] uppercase tracking-[0.08em] text-[color:var(--ink-soft)]">
        {kindLabel[item.kind]}
      </p>
    </>
  );

  const className =
    "group visual-card shrink-0 snap-start w-[9.5rem] sm:w-[10.5rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 rounded-md";

  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={`Open ${item.title} on ${kindLabel[item.kind]}`}
      >
        {inner}
      </a>
    );
  }

  return <div className={className}>{inner}</div>;
}

export function VisualScroll({ items }: { items: VisualItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atEnd, setAtEnd] = useState(false);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 12);
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [items]);

  if (items.length === 0) return null;

  const showHint = items.length > 1 && !atEnd;

  return (
    <div className="relative">
      <div className="relative -mx-6 px-6">
        {showHint && (
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-[calc(100%-0.5rem)] w-10 bg-gradient-to-l from-[color:var(--bg-base)] to-transparent"
            aria-hidden
          />
        )}
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="visual-scroll flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth"
        >
          {items.map((item) => (
            <VisualCard key={item.title + item.year} item={item} />
          ))}
        </div>
      </div>
      {showHint && (
        <p className="mt-1 text-right text-[10px] uppercase tracking-[0.12em] text-[color:var(--ink-soft)]">
          scroll →
        </p>
      )}
    </div>
  );
}
