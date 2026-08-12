import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-handwritten text-lg text-[color:var(--accent)] mb-3 lowercase">
      {children}
    </h2>
  );
}
