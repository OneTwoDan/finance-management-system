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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { IconInput } from "@/components/IconInput";
import { InfoCard } from "@/components/InfoCard";
import Link from "next/link";
import { FormEvent, ReactNode, useState } from "react";
import { User, Role } from "@/types";
import { UserService } from "@/services/UserService";

export interface EditUserDialogProps {
  children: ReactNode;
  user: User;
  onUserUpdated?: () => void;
}

export function EditUserDialog({ children, user, onUserUpdated }: EditUserDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState<Role>(user.role);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !role) return;

    await UserService.updateUser(user.id, {
      name,
      role
    });

    setIsOpen(false);
    
    if (onUserUpdated) {
      onUserUpdated();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={typeof children === 'string' ? undefined : (children as any)}>
        {typeof children === 'string' ? children : undefined}
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-2xl p-0 rounded-xl overflow-hidden [&>button]:top-6 [&>button]:right-6 [&>button]:text-slate-400 [&>button:hover]:text-slate-600 dark:[&>button:hover]:text-slate-200 gap-0">
        <DialogHeader className="p-8 border-b border-slate-100 dark:border-slate-800 text-left space-y-0 relative">
          <DialogTitle className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Editar Usuario</DialogTitle>
          <DialogDescription className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Modifica los detalles y permisos del usuario en la plataforma.
          </DialogDescription>
        </DialogHeader>

        <div className="p-8 overflow-y-auto max-h-[70vh]">
          {/* Form Section */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-semibold text-lg">Información Personal</h3>
              <p className="text-sm text-slate-500">Actualiza los datos básicos de acceso.</p>
            </div>
            <form className="p-6 space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Field: Nombre */}
                <IconInput
                  id="nombre"
                  name="nombre"
                  type="text"
                  label="Nombre Completo"
                  icon="person"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                {/* Field: Email */}
                <IconInput
                  id="email"
                  name="email"
                  type="email"
                  label="Correo Electrónico"
                  icon="mail"
                  defaultValue={user.email}
                  disabled
                  className="bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                />

                {/* Field: Rol */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Rol de Usuario
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 z-10">
                      <span className="material-symbols-outlined text-lg">verified_user</span>
                    </div>
                    <Select value={role} onValueChange={(val) => setRole(val as Role)}>
                      <SelectTrigger
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm h-auto [&>svg]:hidden relative"
                      >
                        <SelectValue placeholder="Seleccionar rol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ADMIN">Administrador</SelectItem>
                        <SelectItem value="USER">Usuario</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                      <span className="material-symbols-outlined text-lg">expand_more</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-1.5">
                    Para propósitos de prueba de la arquitectura todos tienen roles ADMIN o USER.
                  </p>
                </div>

                {/* Field: Estado */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="estado">
                    Estado de la cuenta
                  </label>
                  <div className="flex items-center gap-3 h-[42px]">
                    <Switch id="estado" defaultChecked />
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-400 cursor-pointer" htmlFor="estado">
                      Activo
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                <DialogClose render={<Button type="button" variant="ghost" className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors h-[38px] flex items-center box-border pt-1">Cancelar</Button>} />
                <Button
                  className="px-6 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 focus-visible:ring-4 focus-visible:ring-primary/20 transition-all shadow-md shadow-primary/20 h-auto"
                  type="submit"
                >
                  Guardar Cambios
                </Button>
              </div>
            </form>
          </div>

          <InfoCard title="¿Necesitas ayuda con los permisos?" className="mt-8">
            Consulta nuestra{" "}
            <Link href="#" className="font-medium underline hover:text-primary transition-colors">
              guía de roles y permisos
            </Link>{" "}
            para entender qué acciones puede realizar cada usuario según su asignación.
          </InfoCard>
        </div>
      </DialogContent>
    </Dialog>
  );
}
