import { MetricCard } from "@/components/MetricCard";

export interface ReportsSummaryCardsProps {
  currentBalance: number;
}

export function ReportsSummaryCards({ currentBalance }: ReportsSummaryCardsProps) {
  const formatMoney = (val: number) => `$${val.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        title="Saldo Actual"
        value={formatMoney(currentBalance)}
        prominent
        icon="account_balance_wallet"
        className="md:col-span-1"
      />
    </div>
  );
}
