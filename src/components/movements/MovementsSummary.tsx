import { SummaryCard } from "@/components/SummaryCard";

export function MovementsSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SummaryCard
        title="Total Ingresos"
        icon="trending_up"
        iconBgClass="bg-green-100 dark:bg-green-900/30"
        iconColorClass="text-green-600"
        value="$12,450.00"
        trend="+12%"
        trendColorClass="text-green-600"
      />

      <SummaryCard
        title="Total Egresos"
        icon="trending_down"
        iconBgClass="bg-red-100 dark:bg-red-900/30"
        iconColorClass="text-red-600"
        value="$8,200.00"
        trend="-5%"
        trendColorClass="text-red-600"
      />

      <SummaryCard
        title="Balance Neto"
        icon="account_balance_wallet"
        iconBgClass="bg-primary/10"
        iconColorClass="text-primary"
        value="$4,250.00"
        valueColorClass="text-primary"
        trend="+7%"
        trendColorClass="text-primary"
      />
    </div>
  );
}
