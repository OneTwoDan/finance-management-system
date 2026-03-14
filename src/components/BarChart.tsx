import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface BarChartData {
  label: string;
  value: string;
  height: string;
  colorClass: string;
}

export interface BarChartProps {
  data: BarChartData[];
  yAxisLabels: string[];
  className?: string;
}

export function BarChart({ data, yAxisLabels, className }: BarChartProps) {
  return (
    <div className={cn("h-[320px] w-full flex items-end justify-between gap-4 px-4 border-l border-b border-slate-200 dark:border-slate-800 relative", className)}>
      {/* Y-Axis Labels */}
      <div className="absolute -left-10 top-0 h-full flex flex-col justify-between text-[10px] text-slate-400 py-1">
        {yAxisLabels.map((label, idx) => (
          <span key={idx}>{label}</span>
        ))}
      </div>

      {/* Bars */}
      {data.map((item, idx) => (
        <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
          <div 
            className={cn("w-full rounded-t-lg transition-all duration-300 relative", item.colorClass)} 
            style={{ height: item.height }}
            title={`${item.label}: ${item.value}`}
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
              {item.value}
            </div>
          </div>
          <span className="text-[10px] font-bold text-slate-500 uppercase">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
