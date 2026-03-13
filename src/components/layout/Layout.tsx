import { Sidebar } from "./Sidebar";
import { Header, Breadcrumb } from "./Header";
import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
  breadcrumbs?: Breadcrumb[];
}

export function Layout({ children, breadcrumbs }: LayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header breadcrumbs={breadcrumbs} />
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
