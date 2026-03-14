import { SummaryCard } from "@/components/SummaryCard";
import { Movement } from "@/types";

interface MovementsSummaryProps {
  movements: Movement[];
}

function formatCurrency(value: number): string {
  return value.toLocaleString("es-MX", { style: "currency", currency: "MXN" });
}

export function MovementsSummary({ movements }: MovementsSummaryProps) {
  const totalIngresos = movements
    .filter((m) => m.amount > 0)
    .reduce((sum, m) => sum + m.amount, 0);

  const totalEgresos = movements
    .filter((m) => m.amount < 0)
    .reduce((sum, m) => sum + Math.abs(m.amount), 0);

  const balanceNeto = totalIngresos - totalEgresos;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SummaryCard
        title="Total Ingresos"
        icon="trending_up"
        iconBgClass="bg-green-100 dark:bg-green-900/30"
        iconColorClass="text-green-600"
        value={formatCurrency(totalIngresos)}
        trendColorClass="text-green-600"
      />

      <SummaryCard
        title="Total Egresos"
        icon="trending_down"
        iconBgClass="bg-red-100 dark:bg-red-900/30"
        iconColorClass="text-red-600"
        value={formatCurrency(totalEgresos)}
        trendColorClass="text-red-600"
      />

      <SummaryCard
        title="Balance Neto"
        icon="account_balance_wallet"
        iconBgClass="bg-primary/10"
        iconColorClass="text-primary"
        value={formatCurrency(balanceNeto)}
        valueColorClass={balanceNeto >= 0 ? "text-green-600" : "text-red-600"}
        trendColorClass="text-primary"
      />
    </div>
  );
}
