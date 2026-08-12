export type CommitDay = {
  date: string;
  count: number;
  topRepo: string | null;
};

export type CommitSource = "fallback" | "github";

export type CommitData = {
  username: string;
  days: CommitDay[];
  source: CommitSource;
};

const USERNAME = "premchand11";
const DAY_COUNT = 30;

type GhEvent = {
  type: string;
  created_at: string;
  repo?: { name?: string };
  payload?: { size?: number };
};

function dateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

function emptyDays(): CommitDay[] {
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  return Array.from({ length: DAY_COUNT }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (DAY_COUNT - 1 - i));
    return { date: dateKey(d), count: 0, topRepo: null };
  });
}

function mulberry32(seed: number) {
  let s = seed;
  return function () {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function fallbackDays(): CommitDay[] {
  const rng = mulberry32(11);
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  return Array.from({ length: DAY_COUNT }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (DAY_COUNT - 1 - i));
    const r = rng();
    const count = r < 0.35 ? 0 : Math.min(4, Math.floor(r * 5));
    return { date: dateKey(d), count, topRepo: null };
  });
}

export async function fetchCommits(): Promise<CommitData> {
  const fallback: CommitData = {
    username: USERNAME,
    days: fallbackDays(),
    source: "fallback",
  };

  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
    };
    const token = process.env.GITHUB_TOKEN;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(
      `https://api.github.com/users/${USERNAME}/events/public?per_page=100`,
      { headers },
    );
    if (!res.ok) return fallback;

    const events = (await res.json()) as GhEvent[];
    const days = emptyDays();
    const dayIndex = new Map(days.map((d, i) => [d.date, i]));
    const repoCounts = new Map<string, Map<string, number>>();

    for (const ev of events) {
      if (ev.type !== "PushEvent") continue;
      const repo = ev.repo?.name?.split("/").pop() ?? "";
      const created = new Date(ev.created_at);
      const k = dateKey(created);
      const idx = dayIndex.get(k);
      if (idx === undefined) continue;
      const size = ev.payload?.size ?? 1;
      days[idx].count += size;
      const m = repoCounts.get(k) ?? new Map<string, number>();
      m.set(repo, (m.get(repo) ?? 0) + size);
      repoCounts.set(k, m);
    }

    for (const day of days) {
      const m = repoCounts.get(day.date);
      if (!m) continue;
      let top: string | null = null;
      let max = 0;
      for (const [name, n] of m) {
        if (n > max) {
          max = n;
          top = name;
        }
      }
      day.topRepo = top;
    }

    const sum = days.reduce((s, d) => s + d.count, 0);
    if (sum === 0) return fallback;

    return { username: USERNAME, days, source: "github" };
  } catch {
    return fallback;
  }
}
