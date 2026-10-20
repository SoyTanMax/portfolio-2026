type SummaryProps = {
  /** What Max did, and with whom. */
  role: string;
  /** What shipped or what the result was. Facts only. */
  outcome: string;
  /** The one decision worth reading the case for. */
  decision: string;
};

const ROWS: { key: keyof SummaryProps; label: string }[] = [
  { key: "role", label: "Role" },
  { key: "outcome", label: "Outcome" },
  { key: "decision", label: "Key decision" },
];

/** Three-line overview at the top of a case study, for readers who skim. */
export default function Summary(props: SummaryProps) {
  return (
    <dl className="my-8 grid gap-4 rounded-xl border border-white/20 bg-white/[0.04] p-5 sm:grid-cols-[9rem_1fr] sm:gap-x-6">
      {ROWS.map(({ key, label }) => (
        <div key={key} className="contents">
          <dt className="font-mono text-xs uppercase tracking-wider text-white/60 sm:pt-0.5">{label}</dt>
          <dd className="-mt-3 text-[15px] leading-relaxed text-white sm:mt-0">{props[key]}</dd>
        </div>
      ))}
    </dl>
  );
}
