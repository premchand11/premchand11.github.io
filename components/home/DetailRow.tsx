"use client";

import type { ReactNode, MouseEvent } from "react";
import { useState } from "react";

export function DetailRow({
  left,
  right,
  details,
  variant = "bullets",
  href,
}: {
  left: ReactNode;
  right: ReactNode;
  details: string[];
  variant?: "bullets" | "peek";
  /** If set, clicking the row opens this URL (links inside still work normally). */
  href?: string | null;
}) {
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const open = pinned || hovered;

  const onRowClick = (event: MouseEvent<HTMLLIElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("a")) return;
    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    setPinned((value) => !value);
  };

  return (
    <li
      className="detail-row py-1 px-2 -mx-2 text-sm rounded-md hover:bg-(--hover-bg) transition-colors duration-150 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onRowClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          if (href) {
            window.open(href, "_blank", "noopener,noreferrer");
            return;
          }
          setPinned((value) => !value);
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={open}
    >
      <div className="flex justify-between items-baseline gap-4">
        <span className="text-[color:var(--ink-fg)] min-w-0">{left}</span>
        <span className="text-[color:var(--ink-soft)] tabular-nums shrink-0">
          {right}
        </span>
      </div>
      <div
        className="detail-panel grid transition-[grid-template-rows,opacity] duration-200 ease-out"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          {variant === "peek" ? (
            <p className="mt-2 mb-1 text-[color:var(--ink-mid)] leading-relaxed italic">
              {details[0]}
            </p>
          ) : (
            <ul className="mt-2 mb-1 flex flex-col gap-1.5 text-[color:var(--ink-mid)] leading-relaxed pl-0">
              {details.map((line) => (
                <li key={line} className="flex gap-2">
                  <span
                    className="text-[color:var(--ink-soft)] shrink-0"
                    aria-hidden
                  >
                    –
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </li>
  );
}
