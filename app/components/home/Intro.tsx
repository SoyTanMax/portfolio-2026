/** Short, work-first intro: what Max does, not a big name. The name lives in the nav. */
export default function Intro({ projectCount }: { projectCount: number }) {
  return (
    <div className="relative overflow-hidden">
      {/* Decorative glow in the logo's blue */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-48 h-[520px] w-[520px] rounded-full bg-[#1A54E8] opacity-30 blur-[160px] md:h-[720px] md:w-[720px]"
      />
      <div className="relative mx-auto max-w-[1440px] px-6 pb-8 pt-32 sm:px-16 md:px-24 md:pb-10 md:pt-44">
        <p className="font-mono text-xs uppercase tracking-wider text-[#48BDFF]">Design Engineer · Monterrey, Nuevo León</p>
        <h1 className="mt-5 max-w-[880px] font-display text-[34px] font-semibold leading-[1.08] text-white md:mt-6 md:text-[56px]">
          I design and build product interfaces, from websites to apps.
        </h1>
        <p className="mt-5 max-w-[720px] text-lg leading-relaxed text-white/70 md:mt-6 md:text-[22px]">
          I look for ways to simplify flows and layouts so everything is easier to use, and to remove friction along the
          way.
        </p>
        <div className="mt-12 flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs uppercase tracking-wider md:mt-16">
          <span className="text-white/70">Selected work</span>
          <span className="text-white/50">{String(projectCount).padStart(2, "0")} projects</span>
        </div>
      </div>
    </div>
  );
}
