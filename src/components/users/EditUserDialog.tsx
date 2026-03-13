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

export interface EditUserDialogProps {
  children: ReactNode;
  defaultName?: string;
  defaultRole?: string;
}

export function EditUserDialog({ children, defaultName = "Juan Pérez", defaultRole = "viewer" }: EditUserDialogProps) {
  return (
    <Dialog>
      <DialogTrigger render={typeof children === 'string' ? undefined : (children as any)}>
        {typeof children === 'string' ? children : undefined}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-2xl p-8 rounded-xl [&>button]:top-6 [&>button]:right-6 [&>button]:text-slate-400 [&>button:hover]:text-slate-600 dark:[&>button:hover]:text-slate-200">
        <DialogHeader className="mb-6 text-left space-y-0">
          <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white mb-2">Editar Usuario</DialogTitle>
          <DialogDescription className="text-sm text-slate-500 dark:text-slate-400">
            Actualice la información del perfil del usuario y su rol en el sistema.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="user-name">
              Nombre Completo
            </label>
            <Input
              id="user-name"
              type="text"
              defaultValue={defaultName}
              className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="user-role">
              Rol del Sistema
            </label>
            <div className="relative">
              <Select defaultValue={defaultRole}>
                <SelectTrigger className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all cursor-pointer h-auto [&>svg]:hidden">
                  <SelectValue placeholder="Selecciona un rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Lector (Viewer)</SelectItem>
                  <SelectItem value="support">Soporte</SelectItem>
                </SelectContent>
              </Select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-sm">
                unfold_more
              </span>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-8 pt-3">
            <DialogClose render={<Button type="button" variant="ghost" className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancelar</Button>} />
            <Button
              type="submit"
              className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 h-auto"
            >
              Guardar Cambios
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
