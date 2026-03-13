import { MetricCard } from "@/components/MetricCard";
import { TrendBadge } from "@/components/TrendBadge";
import { Progress } from "@/components/ui/progress";

export function ReportsSummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        title="Saldo Actual"
        value="$125,430.00"
        prominent
        icon="account_balance_wallet"
        className="md:col-span-1"
        footer={
          <div className="flex items-center gap-2">
            <TrendBadge trend="up" value="+12.5%" />
            <span className="text-xs text-slate-400">vs. mes anterior</span>
          </div>
        }
      />

      <MetricCard
        title="Ingresos del Mes"
        value="$45,200.00"
        footer={
          <>
            <Progress value={70} className="w-full h-1.5 [&>div]:bg-primary bg-slate-100 dark:bg-slate-800" />
            <p className="text-[10px] text-slate-400 mt-2">70% de la meta mensual alcanzada</p>
          </>
        }
      />

      <MetricCard
        title="Gastos Operativos"
        value="$12,850.00"
        footer={
          <div className="flex items-center gap-2">
            <TrendBadge trend="flat" value="Estable" />
            <span className="text-xs text-slate-400">Promedio diario: $428</span>
          </div>
        }
      />
    </div>
  );
}
