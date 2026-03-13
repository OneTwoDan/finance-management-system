import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart } from "@/components/BarChart";

export function ReportsChart() {
  const chartData = [
    { day: "Lun", value: "15k", height: "30%", color: "bg-primary/20 hover:bg-primary/40" },
    { day: "Mar", value: "35k", height: "70%", color: "bg-primary/60 hover:bg-primary/80" },
    { day: "Mie", value: "25k", height: "50%", color: "bg-primary/40 hover:bg-primary/60" },
    { day: "Jue", value: "15k", height: "30%", color: "bg-primary/20 hover:bg-primary/40" },
    { day: "Vie", value: "42k", height: "85%", color: "bg-primary" },
    { day: "Sab", value: "20k", height: "40%", color: "bg-primary/30 hover:bg-primary/50" },
    { day: "Dom", value: "28k", height: "55%", color: "bg-primary/45 hover:bg-primary/65" },
  ];

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
          data={chartData.map(d => ({
            label: d.day,
            value: `$${d.value}`,
            height: d.height,
            colorClass: d.color
          }))}
          yAxisLabels={["$50k", "$40k", "$30k", "$20k", "$10k", "0"]}
        />
      </div>
    </Card>
  );
}
