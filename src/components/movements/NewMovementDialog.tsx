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
import { ReactNode, useState } from "react";
import { MovementService } from "@/services/MovementService";

export interface NewMovementDialogProps {
  children: ReactNode;
  onMovementCreated?: () => void;
}

export function NewMovementDialog({ children, onMovementCreated }: NewMovementDialogProps) {
  const [type, setType] = useState<"INGRESO" | "EGRESO">("INGRESO");
  const [concept, setConcept] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!concept || !amount || !date) return;

    const parsedAmount = parseFloat(amount);
    const finalAmount = type === "INGRESO" ? Math.abs(parsedAmount) : -Math.abs(parsedAmount);

    await MovementService.createMovement({
      concept,
      amount: finalAmount,
      date,
      userId: "1", // Hardcoded mock user ID
    });

    setConcept("");
    setAmount("");
    setDate("");
    setIsOpen(false);
    
    if (onMovementCreated) {
      onMovementCreated();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={typeof children === 'string' ? undefined : (children as any)}>
        {typeof children === 'string' ? children : undefined}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[32rem] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-0 gap-0 [&>button]:hidden rounded-xl">
        <DialogHeader className="px-6 py-4 border-b border-slate-100 dark:border-slate-900 flex flex-row items-center justify-between w-full m-0">
          <div className="flex flex-col text-left space-y-1.5 text-slate-900 dark:text-white">
            <DialogTitle className="text-lg font-bold leading-none">Nuevo Movimiento de Dinero</DialogTitle>
            <DialogDescription className="hidden">Completa los detalles de la transacción financiera.</DialogDescription>
          </div>
          <DialogClose render={<button type="button" className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><span className="material-symbols-outlined">close</span></button>} />
        </DialogHeader>

        <form className="p-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Concepto Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="concepto">
                Concepto
              </label>
              <div className="relative">
                <Input
                  id="concepto"
                  className="w-full h-12 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 text-sm focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all placeholder:text-slate-400"
                  placeholder="Ej. Pago de servicios mensual"
                  type="text"
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Monto Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="monto">
                  Monto
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-slate-400 group-focus-within:text-primary transition-colors">$</span>
                  </div>
                  <Input
                    id="monto"
                    className="w-full h-12 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-8 pr-4 text-sm focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all placeholder:text-slate-400 font-medium"
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Fecha Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="fecha">
                  Fecha
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-400 text-xl group-focus-within:text-primary transition-colors">calendar_today</span>
                  </div>
                  <Input
                    id="fecha"
                    className="w-full h-12 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 pr-10 text-sm focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Optional Transaction Type */}
            <div className="space-y-2 pt-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Tipo de movimiento
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setType("INGRESO")}
                  className={`flex items-center justify-center gap-2 h-10 rounded-lg border-2 text-xs font-bold transition-all ${
                    type === "INGRESO"
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-transparent bg-slate-100 dark:bg-slate-900 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800"
                  }`}
                >
                  <span className="material-symbols-outlined text-base">arrow_upward</span>
                  INGRESO
                </button>
                <button
                  type="button"
                  onClick={() => setType("EGRESO")}
                  className={`flex items-center justify-center gap-2 h-10 rounded-lg border-2 text-xs font-bold transition-all ${
                    type === "EGRESO"
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-transparent bg-slate-100 dark:bg-slate-900 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800"
                  }`}
                >
                  <span className="material-symbols-outlined text-base">arrow_downward</span>
                  EGRESO
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2" type="submit">
              <span className="material-symbols-outlined text-xl">add_circle</span>
              Ingresar Movimiento
            </Button>
            <DialogClose render={<Button type="button" variant="ghost" className="w-full h-10 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-sm font-medium transition-colors hover:bg-transparent">Cancelar</Button>} />
          </div>
        </form>

        <div className="px-8 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-900 text-center">
          <p className="text-[11px] text-slate-400 uppercase tracking-widest font-semibold">
            Se guardará en la cuenta principal de ahorros
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
