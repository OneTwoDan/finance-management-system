export interface TablePaginationProps {
  currentCount: number;
  totalCount: number;
  label: string;
  variant?: "icons" | "text";
}

export function TablePagination({ currentCount, totalCount, label, variant = "icons" }: TablePaginationProps) {
  return (
    <div className={`px-6 py-4 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 ${variant === "text" ? "bg-slate-50 dark:bg-slate-800/50" : ""}`}>
      <p className="text-xs text-slate-500 font-medium">
        Mostrando {currentCount} de {totalCount} {label}
      </p>
      <div className="flex items-center gap-2">
        {variant === "icons" ? (
          <>
            <button className="p-1.5 border border-slate-200 dark:border-slate-800 rounded hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 disabled:opacity-50" disabled>
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            <button className="p-1.5 border border-slate-200 dark:border-slate-800 rounded hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400">
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </>
        ) : (
          <>
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold hover:bg-white dark:hover:bg-slate-800 transition-colors disabled:opacity-50" disabled>
              Anterior
            </button>
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold hover:bg-white dark:hover:bg-slate-800 transition-colors">
              Siguiente
            </button>
          </>
        )}
      </div>
    </div>
  );
}
