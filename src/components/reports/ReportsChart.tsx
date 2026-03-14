import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart } from "@/components/BarChart";
import { ReportSummary } from "@/types";

export interface ReportsChartProps {
  data: ReportSummary["movementsSummary"];
}

export function ReportsChart({ data }: ReportsChartProps) {
  // Find max amount to calculate heights
  const maxAmount = Math.max(...data.map(d => d.amount), 50000); // minimum 50k scale

  // Calculate colors and heights depending on amount relative to maxAmount
  const mappedChartData = data.map(d => {
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
          <Button variant="ghost" className="px-3 py-1 text-xs font-semibold rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors h-auto">
            Semana
          </Button>
          <Button variant="ghost" className="px-3 py-1 text-xs font-semibold rounded text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors h-auto">
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
