import { useCounter } from "@/hooks/use-counter";

export function StatCounter({
  target,
  suffix = "+",
  decimals = 0,
  label,
}: {
  target: number;
  suffix?: string;
  decimals?: number;
  label: string;
}) {
  const { ref, value } = useCounter(target, 1800, decimals);
  return (
    <div className="bg-background/60 backdrop-blur p-6 md:p-8 text-center group">
      <div className="font-display text-3xl md:text-5xl">
        <span ref={ref} className="text-warm tabular-nums">
          {value}
        </span>
        <span className="text-warm">{suffix}</span>
      </div>
      <div className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mt-3">
        {label}
      </div>
    </div>
  );
}
