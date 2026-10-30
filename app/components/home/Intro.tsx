/** Short, work-first intro: what Max does, not a big name. The name lives in the nav. */
export default function Intro() {
  return (
    <div className="relative">
      {/* Decorative glow in the logo's blue, centered behind the headline. A radial gradient instead of a
          blur filter: large blurs are expensive on iOS Safari and made it skip painting while scrolling. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-[radial-gradient(ellipse_60%_55%_at_50%_0%,rgba(26,84,232,0.32),transparent_70%)] md:h-[820px]"
      />
      <div className="relative mx-auto max-w-[1440px] px-6 pb-0 pt-32 sm:px-16 md:px-24 md:pb-0 md:pt-44">
        <div className="mx-auto flex max-w-[880px] flex-col items-center text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-[#48BDFF]">Design Engineer · Monterrey, Nuevo León</p>
          <h1 className="mt-5 font-display text-[40px] font-semibold leading-[1.05] text-white md:mt-6 md:text-[72px]">
            From idea to a working product.
          </h1>
          <p className="mt-5 max-w-[640px] text-lg leading-relaxed text-white/70 md:mt-6 md:text-[22px]">
            I design and build internal tools, design systems and web products, from Figma to production.
          </p>
        </div>
        <h2 className="mt-20 font-display text-[28px] font-semibold leading-tight text-white md:mt-28 md:text-[40px]">My work</h2>
      </div>
    </div>
  );
}
