"use client";

import { useEffect, useState } from "react";
import { CommitGraph } from "@/components/home/CommitGraph";
import { DetailRow } from "@/components/home/DetailRow";
import { SectionLabel } from "@/components/home/SectionLabel";
import { SimpleRow } from "@/components/home/SimpleRow";
import { ThemeToggle } from "@/components/home/ThemeToggle";
import type { CommitDay, CommitSource } from "@/lib/commits";

const linkClass =
  "underline decoration-dotted decoration-[color:var(--accent)]/35 underline-offset-4 text-[color:var(--ink-fg)] hover:text-[color:var(--accent)] hover:decoration-[color:var(--accent)]/70 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 rounded-sm";

export type HomeViewProps = {
  site: {
    name: string;
    tagline: string;
    bio: string[];
    email: string;
    resumeUrl: string;
    cta: string;
  };
  socials: {
    always: { label: string; href: string }[];
    creative: { label: string; href: string }[];
    email: string;
  };
  projects: {
    title: string;
    blurb: string;
    site: string | null;
    source: string;
    details: string[];
  }[];
  experience: {
    role: string;
    company: string;
    href: string | null;
    date: string;
    details: string[];
  }[];
  education: {
    degree: string;
    school: string;
    date: string | null;
    details: string[];
  }[];
  skills: { group: string; items: string[] }[];
  writing: {
    title: string;
    blurb: string;
    href: string | null;
    year: string;
    sneakPeek: string;
  }[];
  creative: {
    title: string;
    blurb: string;
    href: string | null;
    kind: string;
    details: string[];
  }[];
  commits: {
    days: CommitDay[];
    source: CommitSource;
    username: string;
  };
};

export function HomeView({
  site,
  socials,
  projects,
  experience,
  education,
  skills,
  writing,
  creative,
  commits,
}: HomeViewProps) {
  const [mode, setMode] = useMode();

  const email = site.email || socials.email;
  const mailHref = email ? `mailto:${email}` : null;
  const ctaHref =
    mailHref ?? socials.always[1]?.href ?? socials.always[0]?.href;

  const headerLinks: { label: string; href: string }[] = [
    ...socials.always,
    ...(mailHref ? [{ label: "mail", href: mailHref }] : []),
    ...(site.resumeUrl ? [{ label: "resume", href: site.resumeUrl }] : []),
    ...(mode === "creative" ? socials.creative : []),
  ];

  return (
    <main className="relative min-h-screen text-[color:var(--ink-fg)]">
      <div className="max-w-xl mx-auto px-6 py-16">
        <div
          className="fade-in flex items-start justify-between gap-4"
          style={{ animationDelay: "0ms" }}
        >
          <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--ink-fg)]">
            {site.name}
          </h1>
          <div className="flex shrink-0 items-center gap-3 pt-1">
            <ThemeToggle />
            <button
              type="button"
              onClick={() =>
                setMode(mode === "engineer" ? "creative" : "engineer")
              }
              className={`text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 rounded-sm ${
                mode === "creative"
                  ? "text-[color:var(--accent)]"
                  : "text-[color:var(--ink-soft)] hover:text-[color:var(--accent)]"
              }`}
              aria-pressed={mode === "creative"}
            >
              {mode === "engineer" ? "creative →" : "← engineer"}
            </button>
          </div>
        </div>

        <p
          className="fade-in mt-2 text-sm text-[color:var(--ink-soft)]"
          style={{ animationDelay: "20ms" }}
        >
          {site.tagline}
        </p>

        <div
          className="fade-in mt-4 flex flex-col gap-3 text-sm leading-relaxed text-[color:var(--ink-mid)]"
          style={{ animationDelay: "40ms" }}
        >
          {site.bio.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>

        <p
          className="fade-in mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm text-[color:var(--ink-mid)]"
          style={{ animationDelay: "60ms" }}
        >
          {headerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                link.href.startsWith("mailto:")
                  ? undefined
                  : "noopener noreferrer"
              }
              className={linkClass}
            >
              {link.label}
            </a>
          ))}
        </p>

        {mode === "engineer" ? (
          <>
            <section
              className="fade-in mt-12"
              style={{ animationDelay: "120ms" }}
            >
              <SectionLabel>places i&apos;ve been</SectionLabel>
              <ul className="focus-list flex flex-col">
                {experience.map((item) => (
                  <DetailRow
                    key={item.role + item.company + item.date}
                    left={
                      <>
                        {item.role}
                        {item.company ? (
                          <>
                            {" · "}
                            {item.href ? (
                              <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={linkClass}
                              >
                                {item.company}
                              </a>
                            ) : (
                              item.company
                            )}
                          </>
                        ) : null}
                      </>
                    }
                    right={item.date}
                    details={item.details}
                  />
                ))}
              </ul>
            </section>

            <section
              className="fade-in mt-12"
              style={{ animationDelay: "150ms" }}
            >
              <SectionLabel>proof of work</SectionLabel>
              <ul className="focus-list flex flex-col">
                {projects.map((item) => (
                  <DetailRow
                    key={item.title}
                    left={
                      <span>
                        <span className="text-[color:var(--ink-fg)]">
                          {item.title}
                        </span>
                        <span className="text-[color:var(--ink-soft)]">
                          {" "}
                          · {item.blurb}
                        </span>
                      </span>
                    }
                    right={
                      <span className="flex gap-2">
                        {item.site && (
                          <a
                            href={item.site}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkClass}
                          >
                            site
                          </a>
                        )}
                        <a
                          href={item.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkClass}
                        >
                          source
                        </a>
                      </span>
                    }
                    details={item.details}
                  />
                ))}
              </ul>
            </section>

            <section
              className="fade-in mt-12"
              style={{ animationDelay: "180ms" }}
            >
              <SectionLabel>things i know</SectionLabel>
              <ul className="focus-list flex flex-col">
                {skills.map((group) => (
                  <li
                    key={group.group}
                    className="grid grid-cols-[minmax(7.5rem,10.5rem)_minmax(0,1fr)] gap-x-4 items-baseline py-1.5 px-2 -mx-2 text-sm rounded-md hover:bg-(--hover-bg) transition-colors duration-150"
                  >
                    <span className="text-[color:var(--ink-soft)] lowercase shrink-0">
                      {group.group}
                    </span>
                    <span className="text-[color:var(--ink-fg)] leading-relaxed min-w-0">
                      {group.items.join(", ")}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section
              className="fade-in mt-12"
              style={{ animationDelay: "210ms" }}
            >
              <SectionLabel>writing</SectionLabel>
              <ul className="focus-list flex flex-col">
                {writing.map((item) => (
                  <DetailRow
                    key={item.title}
                    left={
                      item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkClass}
                        >
                          {item.title}
                          <span className="text-[color:var(--ink-soft)]">
                            {" "}
                            · {item.blurb}
                          </span>
                        </a>
                      ) : (
                        <span>
                          <span className="text-[color:var(--ink-fg)]">
                            {item.title}
                          </span>
                          <span className="text-[color:var(--ink-soft)]">
                            {" "}
                            · {item.blurb}
                          </span>
                        </span>
                      )
                    }
                    right={item.year}
                    details={[item.sneakPeek]}
                    variant="peek"
                  />
                ))}
              </ul>
            </section>

            <section
              className="fade-in mt-12"
              style={{ animationDelay: "240ms" }}
            >
              <SectionLabel>education</SectionLabel>
              <ul className="focus-list flex flex-col">
                {education.map((item) => (
                  <DetailRow
                    key={item.school}
                    left={
                      <>
                        {item.degree}
                        {" · "}
                        {item.school}
                      </>
                    }
                    right={item.date ?? ""}
                    details={item.details}
                  />
                ))}
              </ul>
            </section>
          </>
        ) : (
          <section
            className="fade-in mt-12"
            style={{ animationDelay: "120ms" }}
          >
            <SectionLabel>creative</SectionLabel>
            <p className="mb-4 text-sm leading-relaxed text-[color:var(--ink-mid)]">
              Designs, sketches, and visual experiments. Hover for a peek —
              click a row to open the work.
            </p>
            <ul className="focus-list flex flex-col">
              {creative.map((item) => (
                <DetailRow
                  key={item.title}
                  left={
                    <span>
                      <span className="text-[color:var(--ink-fg)]">
                        {item.title}
                      </span>
                      <span className="text-[color:var(--ink-soft)]">
                        {" "}
                        · {item.blurb}
                      </span>
                    </span>
                  }
                  right={
                    item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        view
                      </a>
                    ) : (
                      item.kind
                    )
                  }
                  details={item.details}
                  href={item.href}
                />
              ))}
            </ul>
          </section>
        )}

        <div className="fade-in mt-12" style={{ animationDelay: "280ms" }}>
          <SectionLabel>activity</SectionLabel>
          <CommitGraph
            days={commits.days}
            source={commits.source}
            username={commits.username}
          />
        </div>

        {ctaHref && (
          <p
            className="fade-in mt-16 text-sm"
            style={{ animationDelay: "300ms" }}
          >
            <a
              href={ctaHref}
              target={ctaHref.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                ctaHref.startsWith("mailto:")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="underline decoration-dotted decoration-[color:var(--accent)]/40 underline-offset-4 text-[color:var(--accent)] hover:decoration-[color:var(--accent)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 rounded-sm"
            >
              {site.cta}
            </a>
          </p>
        )}
      </div>
    </main>
  );
}

function useMode() {
  const [mode, setMode] = useState<"engineer" | "creative">("engineer");

  useEffect(() => {
    const stored = localStorage.getItem("premchand.mode");
    if (stored === "creative" || stored === "engineer") {
      setMode(stored);
    }
  }, []);

  const update = (next: "engineer" | "creative") => {
    setMode(next);
    localStorage.setItem("premchand.mode", next);
  };

  return [mode, update] as const;
}
