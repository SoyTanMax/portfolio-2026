/** Short, work-first intro: what Max does, not a big name. The name lives in the nav. */
export default function Intro() {
  return (
    <div className="relative">
      {/* Decorative glow in the logo's blue, centered behind the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-56 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#1A54E8] opacity-30 blur-[160px] md:h-[720px] md:w-[900px]"
      />
      <div className="relative mx-auto max-w-[1440px] px-6 pb-8 pt-32 sm:px-16 md:px-24 md:pb-10 md:pt-44">
        <div className="mx-auto flex max-w-[880px] flex-col items-center text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-[#48BDFF]">Design Engineer · Monterrey, Nuevo León</p>
          <h1 className="mt-5 font-display text-[40px] font-semibold leading-[1.05] text-white md:mt-6 md:text-[72px]">
            From idea to a working product.
          </h1>
          <p className="mt-5 max-w-[640px] text-lg leading-relaxed text-white/70 md:mt-6 md:text-[22px]">
            I design and build websites and apps, from the first concept to something people can actually use.
          </p>
        </div>
        <h2 className="mt-20 font-display text-[28px] font-semibold leading-tight text-white md:mt-28 md:text-[40px]">My work</h2>
      </div>
    </div>
  );
}
