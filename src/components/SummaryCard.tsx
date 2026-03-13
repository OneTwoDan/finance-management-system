import { Card, CardContent } from "@/components/ui/card";

export interface SummaryCardProps {
  title: string;
  icon: string;
  iconBgClass: string;
  iconColorClass: string;
  value: string;
  valueColorClass?: string;
  trend: string;
  trendColorClass: string;
}

export function SummaryCard({
  title,
  icon,
  iconBgClass,
  iconColorClass,
  value,
  valueColorClass = "",
  trend,
  trendColorClass,
}: SummaryCardProps) {
  return (
    <Card className="rounded-xl shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-0">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</span>
          <div className={`size-8 rounded-lg flex items-center justify-center ${iconBgClass} ${iconColorClass}`}>
            <span className="material-symbols-outlined text-[20px]">{icon}</span>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className={`text-2xl font-black ${valueColorClass}`}>{value}</span>
          <span className={`text-xs font-bold ${trendColorClass}`}>{trend}</span>
        </div>
      </CardContent>
    </Card>
  );
}
