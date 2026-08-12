import type { ReactNode } from "react";

export function SimpleRow({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <li className="flex justify-between items-baseline gap-4 py-1 px-2 -mx-2 text-sm rounded-md hover:bg-(--hover-bg) transition-colors duration-150">
      <span className="text-[color:var(--ink-fg)] min-w-0">{left}</span>
      <span className="text-[color:var(--ink-soft)] tabular-nums shrink-0">
        {right}
      </span>
    </li>
  );
}
