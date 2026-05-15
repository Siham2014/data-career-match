import { cn } from "@/lib/utils";

export function ScoreBadge({ score, className }: { score: number; className?: string }) {
  const tone =
    score >= 70 ? "bg-success/15 text-success border-success/30"
    : score >= 40 ? "bg-warning/15 text-warning border-warning/40"
    : "bg-danger/15 text-danger border-danger/30";
  return (
    <span className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold tabular-nums",
      tone, className
    )}>
      {score}% match
    </span>
  );
}
