import { Card } from "@/components/ui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface MetricCardProps {
  title: string;
  value: string;
  footer?: ReactNode;
  icon?: string;
  prominent?: boolean;
  className?: string;
}

export function MetricCard({ title, value, footer, icon, prominent = false, className }: MetricCardProps) {
  return (
    <Card className={cn("p-6 relative overflow-hidden group bg-white dark:bg-slate-900 rounded-xl border-slate-200 dark:border-slate-800 shadow-sm", className)}>
      <div className="relative z-10">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <h2 className={cn("mt-2", prominent ? "text-4xl font-black text-primary tracking-tight" : "text-2xl font-bold")}>
          {value}
        </h2>
        {footer && <div className="mt-4">{footer}</div>}
      </div>
      {icon && (
        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
          <span className="material-symbols-outlined !text-9xl">{icon}</span>
        </div>
      )}
    </Card>
  );
}
