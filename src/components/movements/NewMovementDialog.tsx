import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReactNode } from "react";

export function NewMovementDialog({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger render={typeof children === 'string' ? undefined : (children as any)}>
        {typeof children === 'string' ? children : undefined}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-0 gap-0 [&>button]:hidden">
        <DialogHeader className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex flex-row items-center justify-between w-full">
          <div className="flex flex-col text-left space-y-1.5 text-slate-900 dark:text-white">
            <DialogTitle className="text-lg font-bold leading-none">Nuevo Movimiento</DialogTitle>
            <DialogDescription className="text-xs text-slate-500 mt-1.5 hidden">
              Completa los detalles de la transacción financiera.
            </DialogDescription>
            <p className="text-xs text-slate-500 mt-1.5">Completa los detalles de la transacción financiera.</p>
          </div>
          <DialogClose render={<button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><span className="material-symbols-outlined">close</span></button>} />
        </DialogHeader>
        <form className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Concepto</label>
            <Input 
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all h-auto" 
              placeholder="Ej. Pago Proveedor, Venta directa..." 
              type="text"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Monto</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                <Input 
                  className="w-full pl-7 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all h-auto" 
                  placeholder="0.00" 
                  step="0.01" 
                  type="number"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Tipo</label>
              <Select defaultValue="ingreso">
                <SelectTrigger className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all h-auto">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ingreso">Ingreso (+)</SelectItem>
                  <SelectItem value="egreso">Egreso (-)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Fecha</label>
            <div className="relative">
              <Input 
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-sm focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all h-auto block" 
                type="date"
              />
            </div>
          </div>
          <div className="pt-4 flex items-center justify-end gap-3">
            <DialogClose render={<Button variant="ghost" className="px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" type="button">Cancelar</Button>} />
            <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg font-bold text-sm shadow-md transition-all h-auto" type="submit">
              Guardar Transacción
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
