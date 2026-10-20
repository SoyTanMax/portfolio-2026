import { Link } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import type { Project, StoryVisual } from "~/types/Project";

// How much scrolling each beat gets while the story is pinned: less on phones, where a swipe
// covers fewer pixels and long pinned sections feel slow. Set in the className below.

type Props = {
  project: Project & { story: NonNullable<Project["story"]> };
  index: number;
  total: number;
  /** Where the "keep going" link points: the next story, or "More work" after the last one. */
  next: { id: string; label: string };
};

/**
 * One project told in four beats. The section is taller than the screen; its content sticks
 * to the viewport while you scroll through it, and the scroll position picks the active beat.
 */
export default function ProjectStory({ project, index, total, next }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [entered, setEntered] = useState(false);
  const { story } = project;
  const beats = story.beats;
  const last = beats.length - 1;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;
      const scrollable = rect.height - viewport;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
      setActive(Math.min(last, Math.floor(progress * beats.length)));
      if (rect.top < viewport * 0.8) setEntered(true);
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
  }, [beats.length, last]);

  const reveal = `transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-opacity ${
    entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 motion-reduce:translate-y-0"
  }`;
  const number = String(index + 1).padStart(2, "0");
  const titleId = `${project.id}-title`;

  return (
    <section
      id={project.id}
      ref={sectionRef}
      aria-labelledby={titleId}
      style={{ ["--beats" as string]: beats.length }}
      className="relative h-[calc(100svh_+_var(--beats)_*_30svh)] md:h-[calc(100vh_+_var(--beats)_*_45vh)]"
    >
      <div className="sticky top-0 flex h-[100svh] items-start">
        <div className="mx-auto w-full max-w-[1440px] px-6 pb-6 pt-20 sm:px-16 md:grid md:grid-cols-[minmax(0,440px)_minmax(0,1fr)] md:gap-x-16 md:px-24 md:pb-0 md:pt-24">
          {/* Header */}
          <header className={`${reveal} md:col-start-1 md:row-start-1 md:self-end`}>
            <p className="font-mono text-xs uppercase tracking-wider text-[#48BDFF]">
              {number} / {String(total).padStart(2, "0")} · {story.eyebrow}
            </p>
            <h2 id={titleId} className="mt-2 font-display text-[28px] font-semibold leading-tight text-white md:mt-3 md:text-[40px]">
              {project.title}
            </h2>
          </header>

          {/* Stage: one layer per beat, cross-fading as the active beat changes */}
          <div
            className={`${reveal} relative mt-4 h-[34svh] overflow-hidden rounded-2xl md:col-start-2 md:row-span-2 md:row-start-1 md:mt-0 md:h-[min(640px,72svh)] md:rounded-3xl`}
            style={{ backgroundColor: story.stage }}
          >
            {beats.map((beat, i) => (
              <div
                key={beat.label}
                aria-hidden={i !== active}
                className={`absolute inset-0 transition duration-500 ease-out motion-reduce:transition-opacity ${
                  i === active
                    ? "opacity-100 translate-y-0"
                    : `opacity-0 motion-reduce:translate-y-0 ${i < active ? "-translate-y-4" : "translate-y-4"}`
                }`}
              >
                <Visual visual={beat.visual} eager={index === 0 && i === 0} />
              </div>
            ))}
          </div>

          {/* Beats */}
          <div className="mt-5 md:col-start-1 md:row-start-2 md:mt-8 md:self-start">
            <ol className="flex flex-col gap-4 md:gap-5">
              {beats.map((beat, i) => (
                <li
                  key={beat.label}
                  // On phones only the active beat is shown; on desktop all labels stay as an outline.
                  className={`${i === active ? "flex" : "hidden md:flex"} gap-4`}
                  aria-current={i === active ? "step" : undefined}
                >
                  <span
                    aria-hidden
                    className={`hidden w-0.5 shrink-0 rounded-full transition-colors duration-300 md:block ${
                      i === active ? "bg-[#48BDFF]" : "bg-white/20"
                    }`}
                  />
                  <div className="min-w-0">
                    <p
                      className={`font-mono text-xs uppercase tracking-wider transition-colors duration-300 ${
                        i === active ? "text-white" : "text-white/40"
                      }`}
                    >
                      {beat.label}
                    </p>
                    {/* grid-rows 0fr → 1fr animates the height of the body open and closed */}
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none ${
                        i === active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <p className="overflow-hidden pt-2 text-[16px] leading-relaxed text-white md:text-[17px]">{beat.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-1.5" aria-hidden>
                {beats.map((beat, i) => (
                  <span
                    key={beat.label}
                    className={`h-[3px] rounded-full transition-all duration-300 ${
                      i === active ? "w-8 bg-[#48BDFF]" : i < active ? "w-3 bg-[#48BDFF]" : "w-3 bg-white/20"
                    }`}
                  />
                ))}
              </div>
              {/* Scroll hint: tells people the story continues; gives way to the exits on the last beat. */}
              <p
                aria-hidden={active === last}
                className={`flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-white/60 transition-opacity duration-300 ${
                  active === last ? "opacity-0" : "opacity-100"
                }`}
              >
                Keep scrolling
                <span aria-hidden className="inline-block motion-safe:animate-bounce">
                  ↓
                </span>
              </p>
            </div>

            {/* Exits: read the full case, or keep scrolling */}
            <div
              className={`mt-6 flex flex-col items-stretch gap-3 transition duration-500 sm:flex-row sm:items-center sm:gap-6 ${
                active === last ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <Link
                to={`/projects/${project.id}`}
                tabIndex={active === last ? 0 : -1}
                className="rounded-full bg-white px-5 py-3 text-center text-sm font-medium text-[#07080B] transition hover:bg-white/80"
              >
                Read the full case <span aria-hidden>→</span>
              </Link>
              <a
                href={`#${next.id}`}
                tabIndex={active === last ? 0 : -1}
                className="text-center text-sm text-white/70 transition hover:text-white"
              >
                {next.label} <span aria-hidden>↓</span>
              </a>
            </div>
            {/* The full case is always reachable, even before the last beat. */}
            <Link
              to={`/projects/${project.id}`}
              className={`mt-3 inline-block text-sm text-white/50 underline-offset-4 transition hover:text-white hover:underline md:mt-4 ${
                active === last ? "hidden" : ""
              }`}
            >
              Skip to the full case
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Visual({ visual, eager }: { visual: StoryVisual; eager: boolean }) {
  if (visual.type === "image") {
    return (
      <img
        src={visual.src}
        alt={visual.alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={`h-full w-full object-contain ${visual.tight ? "p-3 md:p-6" : "p-5 md:p-12"}`}
      />
    );
  }
  if (visual.type === "stat") {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center text-[#0B0D12]">
        <p className="font-display text-[88px] font-semibold leading-none md:text-[160px]">{visual.value}</p>
        <p className="mt-3 text-base opacity-70 md:text-xl">{visual.label}</p>
      </div>
    );
  }
  return (
    <div className="flex h-full items-center justify-center gap-3 p-4 md:gap-6 md:p-12">
      {visual.items.map((item) => (
        <div key={item.title} className="flex-1 rounded-xl bg-white p-4 text-[#0B0D12] md:max-w-[300px] md:rounded-2xl md:p-7">
          <p className="font-display text-lg font-semibold leading-tight md:text-[28px]">{item.title}</p>
          <p className="mt-2 text-sm opacity-70 md:mt-3 md:text-base">{item.body}</p>
        </div>
      ))}
    </div>
  );
}
