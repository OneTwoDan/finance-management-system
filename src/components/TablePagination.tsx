export interface TablePaginationProps {
  currentCount: number;
  totalCount: number;
  label: string;
}

export function TablePagination({ currentCount, totalCount, label }: TablePaginationProps) {
  return (
    <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
      <p className="text-xs text-slate-500 font-medium">
        Mostrando {currentCount} de {totalCount} {label}
      </p>
      <div className="flex items-center gap-2">
        <button className="p-1.5 border border-slate-200 dark:border-slate-800 rounded hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400">
          <span className="material-symbols-outlined text-[16px]">chevron_left</span>
        </button>
        <button className="p-1.5 border border-slate-200 dark:border-slate-800 rounded hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400">
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
