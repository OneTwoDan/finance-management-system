import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditUserDialog } from "@/components/users/EditUserDialog";
import { TablePagination } from "@/components/TablePagination";
import { User } from "@/types";

export interface UsersTableProps {
  users: User[];
  isLoading?: boolean;
  onUserUpdated?: (updatedUser: User) => void;
}

export function UsersTable({ users, isLoading, onUserUpdated }: UsersTableProps) {
  // Helper to extract initials
  const getInitials = (name: string) => {
    return name.split(" ")
      .map(n => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <Table className="w-full text-left border-collapse">
          <TableHeader>
            <TableRow className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
              <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 h-auto">Nombre</TableHead>
              <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 h-auto">Correo</TableHead>
              <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 h-auto">Estado</TableHead>
              <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 h-auto">Teléfono</TableHead>
              <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right h-auto">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100 dark:divide-slate-800">
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors border-0">
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-medium text-xs">
                      {getInitials(user.name)}
                    </div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                  {user.email}
                </TableCell>
                <TableCell className="px-6 py-4 text-sm">
                  {user.isActive !== false ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      Activo
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                      Inactivo
                    </span>
                  )}
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                  {user.phone}
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <EditUserDialog user={user} onUserUpdated={onUserUpdated}>
                      <button className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                        Editar
                      </button>
                    </EditUserDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <span className="material-symbols-outlined animate-spin text-primary text-4xl">refresh</span>
                    <p className="text-sm font-medium">Cargando usuarios...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  No hay usuarios registrados.
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        currentCount={users.length}
        totalCount={users.length}
        label="usuarios"
        variant="text"
      />
    </div>
  );
}
