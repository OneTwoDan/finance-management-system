import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockActivities = [
  {
    id: 1,
    description: "Pago Proveedor ABC",
    date: "24 Mayo, 2024",
    status: "Completado",
    amount: "-$1,250.00",
    icon: "shopping_cart",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    amountColor: "text-red-600",
  },
  {
    id: 2,
    description: "Ingreso por Servicios",
    date: "23 Mayo, 2024",
    status: "Completado",
    amount: "+$3,400.00",
    icon: "payments",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    amountColor: "text-emerald-600",
  },
  {
    id: 3,
    description: "Factura Pendiente XYZ",
    date: "22 Mayo, 2024",
    status: "Pendiente",
    amount: "$850.00",
    icon: "description",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    amountColor: "text-slate-900 dark:text-slate-100",
  },
];

export function RecentActivity() {
  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Resumen de Actividad Reciente</h2>
        <button className="text-sm font-medium text-primary hover:underline">Ver todo el historial</button>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
            <TableRow className="border-slate-200 dark:border-slate-800 hover:bg-transparent">
              <TableHead className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider h-auto">Descripción</TableHead>
              <TableHead className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider h-auto">Fecha</TableHead>
              <TableHead className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider h-auto">Estado</TableHead>
              <TableHead className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right h-auto">Monto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-200 dark:divide-slate-800">
            {mockActivities.map((activity) => (
              <TableRow key={activity.id} className="border-slate-200 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/25 border-b-0">
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`size-8 rounded flex items-center justify-center ${activity.iconBg}`}>
                      <span className={`material-symbols-outlined text-sm ${activity.iconColor}`}>{activity.icon}</span>
                    </div>
                    <span className="text-sm font-medium">{activity.description}</span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-slate-500">
                  {activity.date}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    activity.status === "Completado" 
                      ? "bg-emerald-100 text-emerald-700" 
                      : "bg-amber-100 text-amber-700"
                  }`}>
                    {activity.status}
                  </span>
                </TableCell>
                <TableCell className={`px-6 py-4 text-sm font-bold text-right ${activity.amountColor}`}>
                  {activity.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
