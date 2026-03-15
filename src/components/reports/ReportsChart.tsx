import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart } from "@/components/BarChart";
import { ReportSummary, Movement } from "@/types";

export interface ReportsChartProps {
  data: ReportSummary["movementsSummary"];
  movements?: Movement[];
}

export function ReportsChart({ data, movements = [] }: ReportsChartProps) {
  const [filter, setFilter] = useState<"week" | "month">("week");

  const monthlyData = useMemo(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    let week1 = 0, week2 = 0, week3 = 0, week4 = 0;
    
    movements.forEach(m => {
      const d = new Date(m.date);
      if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
        const dayOfMonth = d.getDate();
        if (dayOfMonth <= 7) week1 += m.amount;
        else if (dayOfMonth <= 14) week2 += m.amount;
        else if (dayOfMonth <= 21) week3 += m.amount;
        else week4 += m.amount;
      }
    });
    
    return [
      { day: "Sem 1", amount: week1 },
      { day: "Sem 2", amount: week2 },
      { day: "Sem 3", amount: week3 },
      { day: "Sem 4", amount: week4 }
    ];
  }, [movements]);

  const activeData = filter === "week" ? data : monthlyData;

  // Find max amount to calculate heights
  const maxAmount = Math.max(...activeData.map(d => d.amount), 50000); // minimum 50k scale

  // Calculate colors and heights depending on amount relative to maxAmount
  const mappedChartData = activeData.map(d => {
    const percentage = (d.amount / maxAmount) * 100;
    let colorClass = "bg-primary/20 hover:bg-primary/40";
    
    if (percentage > 80) colorClass = "bg-primary";
    else if (percentage > 60) colorClass = "bg-primary/60 hover:bg-primary/80";
    else if (percentage > 40) colorClass = "bg-primary/40 hover:bg-primary/60";
    else if (percentage > 30) colorClass = "bg-primary/30 hover:bg-primary/50";

    return {
      label: d.day,
      value: `$${(d.amount / 1000).toFixed(0)}k`,
      height: `${Math.max(percentage, 5)}%`, // At least 5% height to be visible
      colorClass
    };
  });

  return (
    <Card className="bg-white dark:bg-slate-900 rounded-xl border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-0 gap-0">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">Gráfico de movimientos financieros</h3>
          <p className="text-sm text-slate-500">Actividad económica semanal detallada</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            onClick={() => setFilter("week")}
            className={`px-3 py-1 text-xs font-semibold rounded h-auto transition-colors ${filter === "week" ? "bg-slate-100 dark:bg-slate-800" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
          >
            Semana
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => setFilter("month")}
            className={`px-3 py-1 text-xs font-semibold rounded h-auto transition-colors ${filter === "month" ? "bg-slate-100 dark:bg-slate-800" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
          >
            Mes
          </Button>
        </div>
      </div>
      <div className="p-8">
        <BarChart 
          data={mappedChartData}
          yAxisLabels={["$50k", "$40k", "$30k", "$20k", "$10k", "0"]}
        />
      </div>
    </Card>
  );
}
