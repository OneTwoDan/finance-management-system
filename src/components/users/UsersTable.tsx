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

const mockUsers = [
  {
    id: 1,
    initials: "JP",
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    phone: "+34 600 000 001",
    role: "viewer"
  },
  {
    id: 2,
    initials: "MG",
    name: "María García",
    email: "maria.g@example.com",
    phone: "+34 600 000 002",
    role: "editor"
  },
  {
    id: 3,
    initials: "CR",
    name: "Carlos Ruiz",
    email: "c.ruiz@example.com",
    phone: "+34 600 000 003",
    role: "admin"
  },
  {
    id: 4,
    initials: "AL",
    name: "Ana López",
    email: "ana.l@example.com",
    phone: "+34 600 000 004",
    role: "support"
  },
];

export function UsersTable() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <Table className="w-full text-left border-collapse">
          <TableHeader>
            <TableRow className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
              <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 h-auto">Nombre</TableHead>
              <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 h-auto">Correo</TableHead>
              <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 h-auto">Teléfono</TableHead>
              <TableHead className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right h-auto">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100 dark:divide-slate-800">
            {mockUsers.map((user) => (
              <TableRow key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors border-0">
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-medium text-xs">
                      {user.initials}
                    </div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">
                  {user.email}
                </TableCell>
                <TableCell className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                  {user.phone}
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <EditUserDialog defaultName={user.name} defaultRole={user.role}>
                    <button className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                      Editar
                    </button>
                  </EditUserDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        currentCount={mockUsers.length}
        totalCount={24}
        label="usuarios"
        variant="text"
      />
    </div>
  );
}
