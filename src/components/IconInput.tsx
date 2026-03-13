import { InputHTMLAttributes, ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface IconInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: string | ReactNode;
  label?: string;
}

export function IconInput({ icon, label, id, className, ...props }: IconInputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="relative">
        {icon && typeof icon === "string" ? (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <span className="material-symbols-outlined text-lg">{icon}</span>
          </div>
        ) : icon ? (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            {icon}
          </div>
        ) : null}
        
        <Input
          id={id}
          className={cn(
            "w-full pr-3 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all sm:text-sm h-auto",
            icon ? "pl-10" : "pl-3",
            className
          )}
          {...props}
        />
      </div>
    </div>
  );
}
