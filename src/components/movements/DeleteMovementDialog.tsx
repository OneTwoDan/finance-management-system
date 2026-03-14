import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Movement } from "@/types";

export interface DeleteMovementDialogProps {
  movement: Movement | null;
  onClose: () => void;
  onDeleted: (id: string) => void;
}

export function DeleteMovementDialog({ movement, onClose, onDeleted }: DeleteMovementDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!movement) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/movements/${movement.id}`, { method: "DELETE" });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.details || errorData.error || "Failed to delete");
      }
      onDeleted(movement.id);
      onClose();
    } catch (err: any) {
      console.error(err);
      const errorMsg = err.message || "Error al eliminar el movimiento. Por favor intenta de nuevo.";
      alert(errorMsg);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={movement !== null} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-[24rem] bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-0 gap-0 [&>button]:hidden rounded-xl">
        <DialogHeader className="px-6 py-4 border-b border-slate-100 dark:border-slate-900 flex flex-row items-center justify-between w-full m-0">
          <div className="flex flex-col text-left space-y-1.5">
            <DialogTitle className="text-lg font-bold leading-none text-slate-900 dark:text-white">
              Eliminar Movimiento
            </DialogTitle>
            <DialogDescription className="hidden">Confirmar eliminación.</DialogDescription>
          </div>
          <DialogClose render={<button type="button" className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><span className="material-symbols-outlined">close</span></button>} />
        </DialogHeader>

        <div className="p-8 space-y-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="size-14 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-red-600 text-3xl">delete_forever</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                ¿Deseas eliminar este movimiento?
              </p>
              {movement && (
                <p className="text-xs text-slate-500 mt-1">
                  <span className="font-bold">{movement.concept}</span> — esta acción no se puede deshacer.
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 h-11 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium rounded-lg"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 h-11 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-base">delete</span>
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
