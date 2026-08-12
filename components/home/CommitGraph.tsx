"use client";

import { useState, useRef, useEffect, useMemo, useLayoutEffect, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { CommitDay, CommitSource } from "@/lib/commits";

function levelColor(count: number): string {
  if (count <= 0) return "var(--graph-0)";
  if (count === 1) return "var(--graph-1)";
  if (count === 2) return "var(--graph-2)";
  if (count === 3) return "var(--graph-3)";
  return "var(--graph-4)";
}

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(y, m - 1, d, 12);
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
  }).format(dt);
}

const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

export function CommitGraph({
  days,
  source,
  username,
}: {
  days: CommitDay[];
  source: CommitSource;
  username: string;
}) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [offsets, setOffsets] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRefs = useRef<(HTMLDivElement | null)[]>([]);

  const total = useMemo(
    () => days.reduce((sum, d) => sum + d.count, 0),
    [days],
  );

  useEffect(() => {
    if (reduced) {
      setMounted(true);
      return;
    }
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, [reduced]);

  useLayoutEffect(() => {
    if (!mounted) return;
    const compute = () => {
      const container = containerRef.current;
      if (!container) return;
      const cw = container.getBoundingClientRect().width;
      const next = days.map((_, i) => {
        const tip = tooltipRefs.current[i];
        const bar = container.children[i] as HTMLElement | undefined;
        if (!tip || !bar) return 0;
        const tipW = tip.offsetWidth;
        const barCenter = bar.offsetLeft + bar.offsetWidth / 2;
        const left = barCenter - tipW / 2;
        const right = barCenter + tipW / 2;
        if (left < 0) return -left;
        if (right > cw) return cw - right;
        return 0;
      });
      setOffsets(next);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [mounted, days]);

  const handleEnter = useCallback((i: number) => {
    setHovered((prev) => (prev === i ? prev : i));
  }, []);

  const handleLeave = useCallback(() => {
    setHovered(null);
  }, []);

  return (
    <section className="mt-6 flex flex-col gap-3">
      <div ref={containerRef} className="relative flex gap-[3px]">
        {days.map((day, i) => {
          const isHovered = hovered === i;
          const offset = offsets[i] ?? 0;
          return (
            <div
              key={day.date}
              className="relative flex-1 group h-5 flex items-center"
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={handleLeave}
            >
              <div
                className="w-full rounded-[3px]"
                style={{
                  height: 20,
                  backgroundColor: levelColor(day.count),
                  transform: mounted
                    ? isHovered
                      ? "scaleY(1.6) translateY(-2px)"
                      : "scaleY(1)"
                    : "scaleY(0)",
                  transformOrigin: "center bottom",
                  transition: reduced
                    ? "none"
                    : mounted
                      ? `transform 220ms ${SPRING}`
                      : `transform 400ms ${SPRING} ${i * 20}ms`,
                }}
              />
              <div
                ref={(el) => {
                  tooltipRefs.current[i] = el;
                }}
                className="absolute bottom-full left-1/2 mb-2 z-50 pointer-events-none"
                style={{
                  transform: `translateX(calc(-50% + ${offset}px))`,
                  opacity: isHovered ? 1 : 0,
                  transition: "opacity 150ms ease",
                }}
              >
                <div
                  className="text-xs rounded-md px-2.5 py-1.5 whitespace-nowrap shadow-lg"
                  style={{
                    backgroundColor: "var(--tooltip-bg)",
                    color: "var(--tooltip-fg)",
                  }}
                >
                  <p>{formatDate(day.date)}</p>
                  {day.count > 0 ? (
                    <p style={{ color: "var(--tooltip-muted)" }}>
                      {day.count} commit{day.count !== 1 ? "s" : ""}
                      {day.topRepo ? ` · ${day.topRepo}` : ""}
                    </p>
                  ) : (
                    <p style={{ color: "var(--tooltip-muted)" }}>No commits</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-[color:var(--ink-soft)] inline-flex items-center gap-1.5">
          Last 30 days
          {source === "github" && (
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.08em] hover:opacity-80"
              style={{ color: "var(--live)" }}
              aria-label={`View ${username} on GitHub`}
              title={`From github.com/${username} at last build`}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "var(--live)" }}
              />
              live
            </a>
          )}
        </span>
        <span className="text-xs text-[color:var(--ink-soft)] tabular-nums">
          {total} commit{total !== 1 ? "s" : ""}
        </span>
      </div>
    </section>
  );
}
