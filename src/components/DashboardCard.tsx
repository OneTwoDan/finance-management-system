import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export interface DashboardCardProps {
  href: string;
  icon: string;
  iconBgClass: string;
  iconColorClass: string;
  title: string;
  description: string;
  linkText: string;
  linkColorClass: string;
}

export function DashboardCard({
  href,
  icon,
  iconBgClass,
  iconColorClass,
  title,
  description,
  linkText,
  linkColorClass,
}: DashboardCardProps) {
  return (
    <Link href={href} className="block group">
      <Card className="h-full border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-pointer bg-white dark:bg-slate-900 p-0">
        <CardContent className="p-8">
          <div className={`${iconBgClass} ${iconColorClass} w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
            <span className="material-symbols-outlined text-3xl">{icon}</span>
          </div>
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            {description}
          </p>
          <div className={`mt-6 flex items-center ${linkColorClass} font-semibold text-sm`}>
            {linkText}
            <span className="material-symbols-outlined ml-1 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
