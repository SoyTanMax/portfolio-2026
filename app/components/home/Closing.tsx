import { Link } from "@remix-run/react";
import type { Project } from "~/types/Project";

const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/max-lopez-dev/" },
  { label: "GitHub", href: "https://github.com/SoyTanMax" },
];

/** "More work" list, the quote that used to open the site, and the footer. */
export default function Closing({ more }: { more: Project[] }) {
  return (
    <div className="mx-auto max-w-[1440px] px-6 sm:px-16 md:px-24">
      {more.length > 0 && (
        <section id="more-work" aria-labelledby="more-work-title" className="scroll-mt-24 pt-16 md:pt-24">
          <h2 id="more-work-title" className="font-mono text-xs uppercase tracking-wider text-white/70">
            More work
          </h2>
          <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
            {more.map((p) => (
              <li key={p.id}>
                <Link
                  to={`/projects/${p.id}`}
                  className="flex flex-col gap-1 py-5 text-white transition hover:text-white/80 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="font-medium">{p.title}</span>
                  <span className="text-sm text-white/60">
                    {p.tagline} <span aria-hidden>→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <figure className="pt-28 md:pt-40">
        <blockquote className="max-w-[720px] text-lg leading-relaxed text-white/70 md:text-[22px]">
          “Form follows function — that has been misunderstood. Form and function should be one, joined in a spiritual
          union.”
        </blockquote>
        <figcaption className="mt-4 font-mono text-xs uppercase tracking-wider text-white/50">Frank Lloyd Wright</figcaption>
      </figure>

      <footer className="flex flex-col gap-4 pb-12 pt-20 font-mono text-xs uppercase tracking-wider sm:flex-row sm:items-center sm:justify-between md:pt-24">
        <span className="text-white/50">Max López · Monterrey, Nuevo León</span>
        <span className="flex gap-6">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="text-white/70 transition hover:text-white">
              {l.label}
            </a>
          ))}
        </span>
      </footer>
    </div>
  );
}
