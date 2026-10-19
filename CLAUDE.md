# Portfolio 2026

Max's personal portfolio. Copied from the previous repo `portfolio-vx`.

Max is looking for work as a **Design Engineer** (design + front end), with interest in
product roles such as Platform Product Designer at Revolut. Case studies should read for
that audience: product decisions first, then how they were built.

## Stack

- Remix 1.16 (v2 route convention) + MDX + Tailwind, deployed on Netlify (`netlify.toml`).
- Case studies are MDX routes: `app/routes/projects.<id>.mdx`.
- The project list (cards, order) lives in `app/data/projects.ts`. Newest/featured goes first.
- Case study styles: `app/styles/projects.css`.

## Technical notes

- MDX has **no remark-gfm**: Markdown tables don't render. Use lists instead.
- Images: old case studies use `i.ibb.co` URLs. New images go in `public/` and are referenced
  by absolute path, e.g. `/case-studies/fy25/cover.svg`.
- Optimize images before committing them (reasonable size, compressed).

## Case studies

- `projects.web-menu-redesign.mdx` — Pide Directo.
- `projects.pos-redesign.mdx`, `projects.taconomics.mdx`, `projects.persona-lamps.mdx`,
  `projects.cemex.mdx` — older cases.

## Drafts (unpublished)

`drafts/` sits outside `app/` and `public/`, so Remix builds no route for it and nothing in it
is served. Note: the GitHub repo is public, so drafts are still readable there.

- **Epicor FY25 Design System** — paused, not published.
  - Case: `drafts/projects.fy25-design-system.mdx`. 3-tier token architecture
    (168 primitive / 400 semantic / 520 component tokens), 42 components.
  - Assets: `drafts/fy25-assets/` (`cover.svg`, `architecture.svg`).
  - Missing: Figma screenshots, marked with `{/* TODO */}` in the MDX (4 places). Optimize them
    and put them in `public/case-studies/fy25/` when resuming.
  - To publish again:
    1. Move the MDX back to `app/routes/projects.fy25-design-system.mdx`.
    2. Move `drafts/fy25-assets/` back to `public/case-studies/fy25/` (the MDX and card reference
       `/case-studies/fy25/...`).
    3. Add the entry back at the top of `projects` in `app/data/projects.ts`:
       `{ id: 'fy25-design-system', title: 'Epicor FY25 Design System', images: ['/case-studies/fy25/cover.svg'] }`
    4. Run `npm run build`.

## Content rules

- **Never invent metrics, results or data.** If a fact is missing, ask Max.
- Write in English. Short, direct sentences. No filler.
- Lead with decisions and outcomes, not with what wasn't done.
- Max's title is **Design Engineer** (matches the CV).
