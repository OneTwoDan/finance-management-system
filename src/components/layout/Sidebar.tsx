import { SidebarLink } from "./SidebarLink";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/router";

export function Sidebar() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); // redirect to login page
        },
      },
    });
  };

  const user = session?.user;

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hidden md:flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-primary p-2 rounded-lg">
          <span className="material-symbols-outlined text-white">account_balance_wallet</span>
        </div>
        <h2 className="font-bold text-lg tracking-tight">SGF Pro</h2>
      </div>
      <nav className="flex-1 px-4 space-y-1 mt-4">
        <SidebarLink href="/home" icon="home" label="Inicio" active />
        <SidebarLink href="/movements" icon="swap_horiz" label="Movimientos" />
        <SidebarLink href="/users" icon="group" label="Usuarios" />
        <SidebarLink href="/reports" icon="bar_chart" label="Reportes" />
      </nav>
      {user && (
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div 
            onClick={handleLogout}
            className="flex items-center gap-3 p-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Avatar className="size-10">
              <AvatarImage src={user.image || undefined} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-sm">logout</span>
          </div>
        </div>
      )}
    </aside>
  );
}
