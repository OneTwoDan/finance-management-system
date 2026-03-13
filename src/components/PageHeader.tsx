import { ReactNode } from "react";

export interface PageHeaderProps {
  title: string;
  description: string;
  children?: ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          {title}
        </h1>
        <p className="text-slate-500 mt-1">{description}</p>
      </div>
      {children && <div>{children}</div>}
    </div>
  );
}
