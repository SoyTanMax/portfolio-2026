import type { LinksFunction } from "@remix-run/node";
import { Outlet, useLocation } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import projectStylesUrl from "~/styles/projects.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: projectStylesUrl }];

type Section = { id: string; label: string };

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Layout for every case study. The MDX stays plain; this layout adds the reading aids:
 * blocks that fade in as they enter the screen, a section index that tracks where you are,
 * and a progress bar. Everything is added after hydration, so without JS the case reads normally.
 */
export default function Project() {
  const caseRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const [sections, setSections] = useState<Section[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // Reveal on scroll: every top-level block of the case fades up the first time it's seen.
  useEffect(() => {
    const root = caseRef.current;
    if (!root) return;
    const blocks = Array.from(root.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    for (const block of blocks) {
      block.setAttribute("data-reveal", "");
      observer.observe(block);
    }
    return () => observer.disconnect();
  }, [pathname]);

  // Section index: one entry per h2, with stable ids for anchor links.
  useEffect(() => {
    const root = caseRef.current;
    if (!root) return;
    const found = (Array.from(root.querySelectorAll("h2")) as HTMLElement[]).map((h) => {
      h.id ||= slugify(h.textContent ?? "");
      return { id: h.id, label: h.textContent ?? "" };
    });
    setSections(found);
  }, [pathname]);

  // Active section and reading progress, from the scroll position.
  useEffect(() => {
    const root = caseRef.current;
    if (!root) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const viewport = window.innerHeight;
      const total = rect.height - viewport;
      setProgress(total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1);
      // The current section is the last heading that has crossed 40% of the screen.
      let current: string | null = null;
      for (const h of Array.from(root.querySelectorAll("h2")) as HTMLElement[]) {
        if (h.getBoundingClientRect().top < viewport * 0.4) current = h.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname, sections.length]);

  return (
    <div className="min-h-screen w-full bg-[#07080B] px-6 py-[120px]">
      {/* Reading progress */}
      <div aria-hidden className="fixed inset-x-0 top-0 z-20 h-[2px] bg-white/10">
        <div className="h-full origin-left bg-[#48BDFF]" style={{ transform: `scaleX(${progress})` }} />
      </div>

      {/* Section index, like a slide counter you can click (wide screens only) */}
      {sections.length > 1 && (
        <nav aria-label="Case sections" className="fixed left-8 top-1/2 z-10 hidden w-48 -translate-y-1/2 xl:block 2xl:left-16">
          <ol className="flex flex-col gap-3">
            {sections.map((s, i) => {
              const isActive = s.id === active;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`group flex items-center gap-3 text-sm transition-colors ${
                      isActive ? "text-white" : "text-white/40 hover:text-white/80"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`h-[2px] rounded-full transition-all duration-300 ${
                        isActive ? "w-6 bg-[#48BDFF]" : "w-3 bg-white/20 group-hover:bg-white/50"
                      }`}
                    />
                    <span className="font-mono text-[11px] uppercase tracking-wider">{String(i + 1).padStart(2, "0")}</span>
                    <span className="truncate">{s.label}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      )}

      <div ref={caseRef} className="case mx-auto w-full max-w-[768px]">
        <Outlet />
      </div>
    </div>
  );
}
