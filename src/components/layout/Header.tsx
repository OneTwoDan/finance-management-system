import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface HeaderProps {
  breadcrumbs?: Breadcrumb[];
  headerActions?: React.ReactNode;
}

export function Header({ breadcrumbs, headerActions }: HeaderProps) {
  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-10 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <Button variant="ghost" size="icon" className="md:hidden">
          <span className="material-symbols-outlined">menu</span>
        </Button>
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="material-symbols-outlined text-xs">chevron_right</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-primary transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slate-900 dark:text-slate-100 font-medium">
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>
        ) : (
          <div className="relative w-full max-w-md hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
            <Input 
              className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus-visible:ring-2 focus-visible:ring-primary/20" 
              placeholder="Buscar movimientos, usuarios..." 
              type="text"
            />
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        {headerActions}
        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>
        <div className="h-8 w-[1px] bg-slate-200 dark:border-slate-800"></div>
        <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs overflow-hidden border border-slate-200 dark:border-slate-700">
          <img alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHIwNZ2eWe5XAsjryP7Ogd7b0IkM6K-iGw4lRdHhPmvXeOLu7mcaEXCcGDPQ5tKWsi1Z5f9S4RdqEEfKeKQMYxhf5iiLjOPgeuBt8XnXuGNwE53g1bAFtQsS05XADQ7Irc5jmEj-0TaX3R8YVCoCJRWMrjoJVUL9z6QXWCxQORI13mJ9AT8CJYXTu1m98mpBDzAefnceduoDhiw1X9FVsloTn28KaspPj15POfDd2qAklXJ8_BmRIicEf7UEgZN-9PA3odKPwIGGqT" />
        </div>
      </div>
    </header>
  );
}
