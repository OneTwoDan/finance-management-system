import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Movement } from "@/types";

const PAGE_SIZE = 6;

type SortKey = "concept" | "amount" | "date" | "userName";
type SortDir = "asc" | "desc";

export interface MovementsTableProps {
  movements: Movement[];
  isLoading?: boolean;
}

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function SortIcon({ dir, active }: { dir: SortDir; active: boolean }) {
  return (
    <span
      className={`material-symbols-outlined text-[14px] transition-colors ${
        active ? "text-primary" : "text-slate-400"
      }`}
    >
      {active && dir === "desc" ? "arrow_downward" : "arrow_upward"}
    </span>
  );
}

export function MovementsTable({ movements, isLoading = false }: MovementsTableProps) {
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  const sorted = [...movements].sort((a, b) => {
    let aVal: string | number = "";
    let bVal: string | number = "";
    if (sortKey === "concept") { aVal = a.concept.toLowerCase(); bVal = b.concept.toLowerCase(); }
    if (sortKey === "amount")  { aVal = a.amount; bVal = b.amount; }
    if (sortKey === "date")    { aVal = a.date; bVal = b.date; }
    if (sortKey === "userName"){ aVal = (a.userName ?? "").toLowerCase(); bVal = (b.userName ?? "").toLowerCase(); }
    if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
    if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const getIconData = (amount: number) => {
    if (amount >= 0) {
      return {
        icon: "payments",
        iconBgClass: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30",
        amountClass: "text-emerald-600",
        formattedAmount: `+$${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      };
    } else {
      return {
        icon: "shopping_cart",
        iconBgClass: "bg-red-100 text-red-600 dark:bg-red-900/30",
        amountClass: "text-red-600",
        formattedAmount: `-$${Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      };
    }
  };

  const SortableHead = ({
    label,
    sortField,
    className = "",
  }: {
    label: string;
    sortField: SortKey;
    className?: string;
  }) => (
    <TableHead
      className={`px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider h-auto cursor-pointer select-none hover:text-slate-800 dark:hover:text-slate-200 transition-colors ${className}`}
      onClick={() => handleSort(sortField)}
    >
      <div className="flex items-center gap-1">
        {label}
        <SortIcon dir={sortDir} active={sortKey === sortField} />
      </div>
    </TableHead>
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <h3 className="font-bold text-slate-800 dark:text-slate-200">Historial Reciente</h3>
      </div>
      <div className="overflow-x-auto">
        <Table className="w-full text-left border-collapse">
          <TableHeader>
            <TableRow className="bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <SortableHead label="Concepto"  sortField="concept" />
              <SortableHead label="Monto"     sortField="amount" />
              <SortableHead label="Fecha"     sortField="date" />
              <SortableHead label="Usuario"   sortField="userName" />
              <TableHead className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right h-auto">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100 dark:divide-slate-800">
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <svg
                      className="animate-spin size-7 text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    <span className="text-sm font-medium">Cargando movimientos...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  No hay movimientos registrados.
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((movement) => {
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
                      {formatDate(movement.date)}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                        {movement.userName ?? "—"}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors">
                        <span className="material-symbols-outlined text-slate-400 text-[18px]">more_vert</span>
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
        <p className="text-xs text-slate-500 font-medium">
          {isLoading ? "—" : `Mostrando ${paginated.length} de ${movements.length} movimientos`}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || isLoading}
            className="p-1.5 border border-slate-200 dark:border-slate-800 rounded hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">chevron_left</span>
          </button>
          <span className="text-xs text-slate-500 font-medium px-1">
            {isLoading ? "— / —" : `${page} / ${totalPages}`}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || isLoading}
            className="p-1.5 border border-slate-200 dark:border-slate-800 rounded hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}
