# Portfolio 2026

Max's personal portfolio. Copied from the previous repo `portfolio-vx`.

Max is looking for work as a **Design Engineer** (design + front end), with interest in
product roles such as Platform Product Designer at Revolut. Case studies should read for
that audience: product decisions first, then how they were built.

## Stack

- Remix 1.16 (v2 route convention) + MDX + Tailwind, deployed on Vercel (standard Remix build, no custom server).
- Case studies are MDX routes: `app/routes/projects.<id>.mdx`.
- The project list (cards, order) lives in `app/data/projects.ts`. Newest/featured goes first.
- Case study styles: `app/styles/projects.css`.

## Technical notes

- MDX has **no remark-gfm**: Markdown tables don't render. Use lists instead.
- Images: old case studies use `i.ibb.co` URLs. New images go in `public/` and are referenced
  by absolute path, e.g. `/case-studies/fy25/cover.svg`.
- Optimize images before committing them (reasonable size, compressed).

## Case studies

- `projects.fy25-design-system.mdx` — Epicor FY25 design system (lead case): 3-tier tokens
  (198 primitive / 137 semantic / 248 component after the cleanup; were 168 / 400 / 520; light + dark), 42 components. Figma files are
  on Max's Epicor account (FY25-DESIGN-SYSTEM, FY23-Components). The 54-token "Blocks" collection is
  intentionally left out of the case (it is just component combinations).
- `projects.web-menu-redesign.mdx` — Pide Directo.
- `projects.pos-redesign.mdx` — Pide Directo POS, Version 1 (solo design + React, 2 weeks) and Version 2
  checkout (solo design, frontend implemented with help). Both shipped.
- `projects.cemex.mdx` — CEMEX Vertua. Max's role: UX Researcher and UX/UI Designer.
- `projects.taconomics.mdx`, `projects.persona-lamps.mdx` — older freelance/Web3 cases.
  Persona Lamps is archived (listed under "More work", not a home card); Max designed and built it (Vue.js).

## Drafts

None right now. A case can be kept unpublished in a `drafts/` folder at the repo root (outside
`app/` and `public/`), so Remix builds no route for it. The GitHub repo is public, so drafts are
still readable there.

## Content rules

- **Never invent metrics, results or data.** If a fact is missing, ask Max.
- Write in English. Short, direct sentences. No filler.
- Lead with decisions and outcomes, not with what wasn't done.
- Max's title is **Design Engineer** (matches the CV).
