import Link from "next/link";
import Image from "next/image";
import { SidebarLink } from "./SidebarLink";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/router";

type NavLink = { href: string; icon: string; label: string; roles?: string[] };

const NAV_LINKS: NavLink[] = [
  { href: "/movements", icon: "swap_horiz", label: "Movimientos"                   },
  { href: "/users",     icon: "group",      label: "Usuarios",    roles: ["ADMIN"] },
  { href: "/reports",   icon: "bar_chart",  label: "Reportes",    roles: ["ADMIN"] },
];

export function Sidebar() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  const user = session?.user;
  const role = (user as any)?.role as string | undefined;

  const visibleLinks = NAV_LINKS.filter(
    (link) => !link.roles || (role && link.roles.includes(role as "ADMIN"))
  );

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hidden md:flex flex-col">
      <Link href="/home" className="p-5 flex items-center cursor-pointer">
        <Image src="/logo.png" alt="SGF Pro" width={210} height={40} priority />
      </Link>
      <nav className="flex-1 px-4 space-y-1 mt-4">
        {visibleLinks.map((link) => (
          <SidebarLink
            key={link.href}
            href={link.href}
            icon={link.icon}
            label={link.label}
            active={router.pathname === link.href}
          />
        ))}
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

