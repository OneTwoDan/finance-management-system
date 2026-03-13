import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockActivity = [
  {
    id: 1,
    description: "Pago AWS - Infraestructura",
    category: "Tecnología",
    date: "12 Jun 2024",
    amount: "-$1,240.00",
    isExpense: true,
    icon: "shopping_cart",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    id: 2,
    description: "Venta Plan Enterprise - Cliente X",
    category: "Ventas",
    date: "11 Jun 2024",
    amount: "+$4,500.00",
    isExpense: false,
    icon: "payments",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
  },
  {
    id: 3,
    description: "Renta Oficinas - Junio",
    category: "Operación",
    date: "10 Jun 2024",
    amount: "-$2,800.00",
    isExpense: true,
    icon: "apartment",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
];

export function ReportsRecentActivity() {
  return (
    <Card className="bg-white dark:bg-slate-900 rounded-xl border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-0 gap-0">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-lg font-bold">Últimos movimientos</h3>
      </div>
      <div className="overflow-x-auto">
        <Table className="w-full text-left">
          <TableHeader>
            <TableRow className="text-xs uppercase text-slate-400 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 border-0">
              <TableHead className="px-6 py-3 font-semibold h-auto">Descripción</TableHead>
              <TableHead className="px-6 py-3 font-semibold h-auto">Categoría</TableHead>
              <TableHead className="px-6 py-3 font-semibold h-auto">Fecha</TableHead>
              <TableHead className="px-6 py-3 font-semibold text-right h-auto">Monto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100 dark:divide-slate-800">
            {mockActivity.map((activity) => (
              <TableRow key={activity.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors border-0">
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-lg ${activity.iconBg} ${activity.iconColor} flex items-center justify-center`}>
                      <span className="material-symbols-outlined !text-sm">{activity.icon}</span>
                    </div>
                    <span className="text-sm font-medium">{activity.description}</span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
                    {activity.category}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-slate-500">
                  {activity.date}
                </TableCell>
                <TableCell className={`px-6 py-4 text-sm font-bold text-right ${activity.isExpense ? "text-red-600" : "text-emerald-600"}`}>
                  {activity.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
