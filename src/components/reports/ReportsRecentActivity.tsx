import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Movement } from "@/types";

export interface ReportsRecentActivityProps {
  movements: Movement[];
}

export function ReportsRecentActivity({ movements }: ReportsRecentActivityProps) {
  // Only take the first 5 movements for recent activity
  const recentMovements = movements.slice(0, 5);

  const getIconData = (amount: number) => {
    if (amount >= 0) {
      return {
        icon: "payments",
        iconColor: "text-emerald-600",
        iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
        amountClass: "text-emerald-600",
        formattedAmount: `+$${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
      };
    } else {
      return {
        icon: "shopping_cart",
        iconColor: "text-red-600",
        iconBg: "bg-red-100 dark:bg-red-900/30",
        amountClass: "text-red-600",
        formattedAmount: `-$${Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}`
      };
    }
  };

  return (
    <Card className="bg-white dark:bg-slate-900 rounded-xl border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-0 gap-0">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
        <h3 className="text-lg font-bold">Últimos movimientos</h3>
      </div>
      <div className="overflow-x-auto">
        <Table className="w-full text-left">
          <TableHeader>
            <TableRow className="text-xs uppercase text-slate-400 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-0">
              <TableHead className="px-6 py-3 font-semibold h-auto">Descripción</TableHead>
              <TableHead className="px-6 py-3 font-semibold h-auto">Fecha</TableHead>
              <TableHead className="px-6 py-3 font-semibold text-right h-auto">Monto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentMovements.map((activity) => {
              const { icon, iconBg, iconColor, amountClass, formattedAmount } = getIconData(activity.amount);
              
              return (
                <TableRow key={activity.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors border-0">
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-lg ${iconBg} ${iconColor} flex items-center justify-center`}>
                        <span className="material-symbols-outlined !text-sm">{icon}</span>
                      </div>
                      <span className="text-sm font-medium">{activity.concept}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-slate-500">
                    {activity.date}
                  </TableCell>
                  <TableCell className={`px-6 py-4 text-sm font-bold text-right ${amountClass}`}>
                    {formattedAmount}
                  </TableCell>
                </TableRow>
              );
            })}
            
            {recentMovements.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="px-6 py-8 text-center text-slate-500">
                  No hay movimientos registrados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
