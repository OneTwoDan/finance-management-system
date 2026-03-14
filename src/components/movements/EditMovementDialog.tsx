import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Movement } from "@/types";

export interface EditMovementDialogProps {
  movement: Movement | null;
  onClose: () => void;
  onSaved: (updated: Movement) => void;
}

export function EditMovementDialog({ movement, onClose, onSaved }: EditMovementDialogProps) {
  const isOpen = movement !== null;

  const [type, setType] = useState<"INGRESO" | "EGRESO">("INGRESO");
  const [concept, setConcept] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Sync form when a movement is loaded
  useEffect(() => {
    if (movement) {
      setConcept(movement.concept);
      setAmount(String(Math.abs(movement.amount)));
      setType(movement.amount >= 0 ? "INGRESO" : "EGRESO");
      // Date from ISO -> yyyy-MM-dd for the input
      setDate(movement.date.slice(0, 10));
    }
  }, [movement]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!movement || !concept || !amount || !date || isSaving) return;

    setIsSaving(true);
    try {
      const parsedAmount = parseFloat(amount);
      const finalAmount = type === "INGRESO" ? Math.abs(parsedAmount) : -Math.abs(parsedAmount);

      const res = await fetch(`/api/movements/${movement.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concept, amount: finalAmount, date }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.details || errorData.error || "Failed to update");
      }
      const updated: Movement = await res.json();
      onSaved(updated);
      onClose();
    } catch (err: any) {
      console.error(err);
      // Try to extract server message
      const errorMsg = err.message || "Error al actualizar el movimiento. Por favor intenta de nuevo.";
      alert(errorMsg);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-[32rem] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-0 gap-0 [&>button]:hidden rounded-xl">
        <DialogHeader className="px-6 py-4 border-b border-slate-100 dark:border-slate-900 flex flex-row items-center justify-between w-full m-0">
          <div className="flex flex-col text-left space-y-1.5 text-slate-900 dark:text-white">
            <DialogTitle className="text-lg font-bold leading-none">Editar Movimiento</DialogTitle>
            <DialogDescription className="hidden">Modifica los detalles del movimiento.</DialogDescription>
          </div>
          <DialogClose render={<button type="button" className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><span className="material-symbols-outlined">close</span></button>} />
        </DialogHeader>

        <form className="p-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Concepto */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="edit-concepto">Concepto</label>
              <Input
                id="edit-concepto"
                className="w-full h-12 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 text-sm"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Monto */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="edit-monto">Monto</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-slate-400">$</span>
                  </div>
                  <Input
                    id="edit-monto"
                    className="w-full h-12 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-8 pr-4 text-sm font-medium"
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Fecha */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="edit-fecha">Fecha</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-400 text-xl">calendar_today</span>
                  </div>
                  <Input
                    id="edit-fecha"
                    className="w-full h-12 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 pr-10 text-sm appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Tipo */}
            <div className="space-y-2 pt-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Tipo de movimiento</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setType("INGRESO")}
                  className={`flex items-center justify-center gap-2 h-10 rounded-lg border-2 text-xs font-bold transition-all ${
                    type === "INGRESO"
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600"
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
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600"
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
            <Button
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
              disabled={isSaving}
            >
              <span className="material-symbols-outlined text-xl">save</span>
              {isSaving ? "Guardando..." : "Guardar Cambios"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="w-full h-10 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-sm font-medium transition-colors hover:bg-transparent"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
