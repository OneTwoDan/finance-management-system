import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-8 z-10">
      <div className="flex items-center gap-4 flex-1">
        <Button variant="ghost" size="icon" className="md:hidden">
          <span className="material-symbols-outlined">menu</span>
        </Button>
        <div className="relative w-full max-w-md hidden sm:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
          <Input 
            className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus-visible:ring-2 focus-visible:ring-primary/20" 
            placeholder="Buscar movimientos, usuarios..." 
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>
        <button className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </div>
    </header>
  );
}
