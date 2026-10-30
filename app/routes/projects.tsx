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
  const [viewer, setViewer] = useState<{ index: number; images: { src: string; alt: string }[] } | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  // Image viewer: every case image opens full size on click or Enter.
  useEffect(() => {
    const root = caseRef.current;
    if (!root) return;
    const imgs = Array.from(root.querySelectorAll("img")) as HTMLImageElement[];
    for (const img of imgs) {
      img.setAttribute("data-zoomable", "");
      img.tabIndex = 0;
      img.setAttribute("role", "button");
      img.setAttribute("aria-haspopup", "dialog");
      img.setAttribute("aria-label", `View larger: ${img.alt}`);
    }
    const open = (img: HTMLImageElement) => {
      openerRef.current = img;
      setViewer({ index: imgs.indexOf(img), images: imgs.map((i) => ({ src: i.getAttribute("src") || i.src, alt: i.alt })) });
    };
    const onClick = (e: MouseEvent) => {
      if (e.target instanceof HTMLImageElement && imgs.includes(e.target)) open(e.target);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "Enter" || e.key === " ") && e.target instanceof HTMLImageElement && imgs.includes(e.target)) {
        e.preventDefault();
        open(e.target);
      }
    };
    root.addEventListener("click", onClick);
    root.addEventListener("keydown", onKey);
    return () => {
      root.removeEventListener("click", onClick);
      root.removeEventListener("keydown", onKey);
    };
  }, [pathname]);

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

      {viewer && (
        <ImageViewer
          images={viewer.images}
          index={viewer.index}
          onIndex={(index) => setViewer({ ...viewer, index })}
          onClose={() => {
            setViewer(null);
            openerRef.current?.focus();
          }}
        />
      )}
    </div>
  );
}

type ViewerProps = {
  images: { src: string; alt: string }[];
  index: number;
  onIndex: (index: number) => void;
  onClose: () => void;
};

/** Full-screen view of one case image. Tall images scroll; arrows move between the case's images. */
function ImageViewer({ images, index, onIndex, onClose }: ViewerProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const image = images[index];
  const many = images.length > 1;
  const go = (step: number) => onIndex((index + step + images.length) % images.length);

  useEffect(() => {
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        // Keep focus inside the viewer while it's open.
        const focusable = Array.from(document.querySelectorAll<HTMLElement>('[role="dialog"] button')).filter((el) => el.getClientRects().length > 0);
        const i = focusable.indexOf(document.activeElement as HTMLElement);
        e.preventDefault();
        focusable[(i + (e.shiftKey ? -1 : 1) + focusable.length) % focusable.length]?.focus();
      } else if (e.key === "Escape") onClose();
      else if (many && e.key === "ArrowRight") go(1);
      else if (many && e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const control = "rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#48BDFF]";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt || "Image"}
      className="fixed inset-0 z-50 flex flex-col bg-[#07080B] motion-safe:animate-[fadein_200ms_ease-out]"
    >
      <div className="flex items-center gap-4 px-4 py-3 sm:px-6">
        {many && (
          <p className="font-mono text-xs uppercase tracking-wider text-white/60">
            {index + 1} / {images.length}
          </p>
        )}
        <p className="min-w-0 flex-1 truncate text-sm text-white/80">{image.alt}</p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className={control}>
          <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 3l10 10M13 3L3 13" />
          </svg>
        </button>
      </div>

      {/* Clicking the dark area around the image closes the viewer. */}
      <div
        ref={scrollRef}
        className="relative flex-1 overflow-auto px-4 pb-6 sm:px-20"
        onClick={(e) => {
          if (!(e.target instanceof HTMLImageElement)) onClose();
        }}
      >
        {/* Short images sit in the middle; tall ones start at the top and scroll. */}
        <div className="flex min-h-full items-center justify-center">
          <img src={image.src} alt={image.alt} className="block h-auto w-auto max-w-full rounded-xl" />
        </div>
      </div>

      {many && (
        <>
          {/* Phones: arrows in a bar below the image. Larger screens: on the sides. */}
          <div className="flex justify-center gap-4 pb-5 sm:hidden">
            <ArrowButton dir="prev" onClick={() => go(-1)} className={control} />
            <ArrowButton dir="next" onClick={() => go(1)} className={control} />
          </div>
          <ArrowButton dir="prev" onClick={() => go(-1)} className={`${control} fixed left-5 top-1/2 hidden -translate-y-1/2 sm:block`} />
          <ArrowButton dir="next" onClick={() => go(1)} className={`${control} fixed right-5 top-1/2 hidden -translate-y-1/2 sm:block`} />
        </>
      )}
    </div>
  );
}

function ArrowButton({ dir, onClick, className }: { dir: "prev" | "next"; onClick: () => void; className: string }) {
  return (
    <button type="button" onClick={onClick} aria-label={dir === "prev" ? "Previous image" : "Next image"} className={className}>
      <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d={dir === "prev" ? "M10 3L5 8l5 5" : "M6 3l5 5-5 5"} />
      </svg>
    </button>
  );
}
