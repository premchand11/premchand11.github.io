# premchand11.github.io

Personal site for Premchand Panku. Built with Next.js 16, TypeScript, and Tailwind v4. Statically exported and deployed to GitHub Pages.

Live: <https://premchand11.github.io>

## Run

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Content

Edit JSON under `content/` — no JSX changes needed:

| File | Purpose |
|------|---------|
| `content/site.json` | name, tagline, bio, about, email, resume, CTA |
| `content/socials.json` | always links (github / linkedin) + creative-only (substack / behance) + email |
| `content/experience.json` | intern → engineer → senior |
| `content/projects.json` | proof of work |
| `content/skills.json` | tech by group |
| `content/writing.json` | blog / notes |
| `content/creative.json` | designs shown in creative mode |
| `content/education.json` | school |

Top-right controls: **dark/light** theme, and **creative →** to swap into the design side.

The 30-day commit graph sits at the bottom under **activity**. It is fetched from GitHub at **build time** (username `premchand11`) and refreshes on each deploy.

## Deploy

Push to `main`. GitHub Actions builds the static export (`out/`) and publishes it.

In the repo settings, set **Pages → Source** to **GitHub Actions**.

## Notes

- `sarthak.wtf-2/` is a design reference only. It is not part of the build.
- Color theme persists in `localStorage["premchand.theme"]` (`light` / `dark`).
- Creative / engineer mode persists in `localStorage["premchand.mode"]`.
- Edit company names and dates in `content/experience.json` when you have them.
