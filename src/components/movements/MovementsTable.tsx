import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TablePagination } from "@/components/TablePagination";

const mockMovements = [
  {
    id: 1,
    concept: "Pago de Cliente #012",
    amount: "+$2,500.00",
    date: "12 Oct 2023",
    user: "Juan Pérez",
    type: "ingreso",
    icon: "payments",
    iconBgClass: "bg-green-100 text-green-600",
    amountClass: "text-green-600",
  },
  {
    id: 2,
    concept: "Alquiler Oficina Central",
    amount: "-$1,200.00",
    date: "10 Oct 2023",
    user: "Admin",
    type: "egreso",
    icon: "home",
    iconBgClass: "bg-red-100 text-red-600",
    amountClass: "text-red-600",
  },
  {
    id: 3,
    concept: "Suscripción SaaS (AWS)",
    amount: "-$49.00",
    date: "08 Oct 2023",
    user: "Sistemas",
    type: "egreso",
    icon: "cloud",
    iconBgClass: "bg-red-100 text-red-600",
    amountClass: "text-red-600",
  },
  {
    id: 4,
    concept: "Venta Producto X",
    amount: "+$850.00",
    date: "05 Oct 2023",
    user: "Maria Garcia",
    type: "ingreso",
    icon: "inventory_2",
    iconBgClass: "bg-green-100 text-green-600",
    amountClass: "text-green-600",
  },
];

export function MovementsTable() {
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
              <TableHead className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider h-auto">Usuario</TableHead>
              <TableHead className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right h-auto">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100 dark:divide-slate-800">
            {mockMovements.map((movement) => (
              <TableRow key={movement.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors border-0">
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`size-8 rounded-full flex items-center justify-center ${movement.iconBgClass}`}>
                      <span className="material-symbols-outlined text-[16px]">{movement.icon}</span>
                    </div>
                    <span className="text-sm font-medium">{movement.concept}</span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span className={`text-sm font-bold ${movement.amountClass}`}>{movement.amount}</span>
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-slate-500">
                  {movement.date}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                    {movement.user}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors">
                    <span className="material-symbols-outlined text-slate-400 text-[18px]">more_vert</span>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <TablePagination 
        currentCount={mockMovements.length} 
        totalCount={125} 
        label="movimientos" 
      />
    </div>
  );
}
