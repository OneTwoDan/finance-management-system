import { Layout } from "@/components/layout/Layout";
import { HomeCards } from "@/components/home/HomeCards";
import { RecentActivity } from "@/components/home/RecentActivity";

export default function HomePage() {
  return (
    <Layout>
      {/* Welcome Hero */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl text-balance">
          Bienvenido al <span className="text-primary">Sistema de Gestión Financiera</span>
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
          Centraliza y optimiza el control de tus operaciones financieras desde un solo lugar.
        </p>
      </div>

      <HomeCards />
      <RecentActivity />
    </Layout>
  );
}
