import Link from "next/link";

export interface SidebarLinkProps {
  href: string;
  icon: string;
  label: string;
  active?: boolean;
}

export function SidebarLink({ href, icon, label, active }: SidebarLinkProps) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-medium ${
        active 
          ? "bg-primary/10 text-primary" 
          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
      }`}
    >
      <span className="material-symbols-outlined">{icon}</span>
      {label}
    </Link>
  );
}
