import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface InfoCardProps {
  title: string;
  icon?: string;
  children: ReactNode;
  className?: string;
}

export function InfoCard({ title, icon = "info", children, className }: InfoCardProps) {
  return (
    <div className={cn("p-6 bg-primary/5 border border-primary/10 rounded-xl flex items-start gap-4", className)}>
      <div className="p-2 bg-primary/10 rounded-lg text-primary">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-primary">{title}</h4>
        <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {children}
        </div>
      </div>
    </div>
  );
}
