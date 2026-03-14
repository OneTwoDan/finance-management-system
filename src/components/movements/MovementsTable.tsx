import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TablePagination } from "@/components/TablePagination";
import { Movement } from "@/types";

export interface MovementsTableProps {
  movements: Movement[];
}

export function MovementsTable({ movements }: MovementsTableProps) {
  // Helpers to assign styling based on monto and type
  const getIconData = (amount: number) => {
    if (amount >= 0) {
      return {
        icon: "payments",
        iconBgClass: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30",
        amountClass: "text-emerald-600",
        formattedAmount: `+$${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
      };
    } else {
      return {
        icon: "shopping_cart",
        iconBgClass: "bg-red-100 text-red-600 dark:bg-red-900/30",
        amountClass: "text-red-600",
        formattedAmount: `-$${Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}`
      };
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <h3 className="font-bold text-slate-800 dark:text-slate-200">Historial Reciente</h3>
        <button className="text-xs font-bold text-primary hover:underline">Ver todo</button>
      </div>
      <div className="overflow-x-auto">
        <Table className="w-full text-left border-collapse">
          <TableHeader>
            <TableRow className="bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <TableHead className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider h-auto">Concepto</TableHead>
              <TableHead className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider h-auto">Monto</TableHead>
              <TableHead className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider h-auto">Fecha</TableHead>
              <TableHead className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider h-auto">Usuario ID</TableHead>
              <TableHead className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right h-auto">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100 dark:divide-slate-800">
            {movements.map((movement) => {
              const { icon, iconBgClass, amountClass, formattedAmount } = getIconData(movement.amount);
              
              return (
                <TableRow key={movement.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors border-0">
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`size-8 rounded-full flex items-center justify-center ${iconBgClass}`}>
                        <span className="material-symbols-outlined text-[16px]">{icon}</span>
                      </div>
                      <span className="text-sm font-medium">{movement.concept}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span className={`text-sm font-bold ${amountClass}`}>{formattedAmount}</span>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-slate-500">
                    {movement.date}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                      User {movement.userId}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors">
                      <span className="material-symbols-outlined text-slate-400 text-[18px]">more_vert</span>
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
            
            {movements.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  No hay movimientos registrados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination 
        currentCount={movements.length} 
        totalCount={movements.length} 
        label="movimientos" 
      />
    </div>
  );
}
