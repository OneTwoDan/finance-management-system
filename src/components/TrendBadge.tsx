import { cn } from "@/lib/utils";

export interface TrendBadgeProps {
  trend: "up" | "down" | "flat";
  value: string;
  className?: string;
}

const trendConfig = {
  up: {
    icon: "trending_up",
    color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30",
  },
  down: {
    icon: "trending_down",
    color: "text-red-600 bg-red-100 dark:bg-red-900/30",
  },
  flat: {
    icon: "trending_flat",
    color: "text-amber-600 bg-amber-100 dark:bg-amber-900/30",
  },
};

export function TrendBadge({ trend, value, className }: TrendBadgeProps) {
  const config = trendConfig[trend];
  
  return (
    <span className={cn(`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${config.color}`, className)}>
      <span className="material-symbols-outlined !text-xs">{config.icon}</span>
      {value}
    </span>
  );
}
