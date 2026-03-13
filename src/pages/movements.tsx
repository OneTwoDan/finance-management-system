import { Layout } from "@/components/layout/Layout";
import { MovementsSummary } from "@/components/movements/MovementsSummary";
import { MovementsTable } from "@/components/movements/MovementsTable";
import { NewMovementDialog } from "@/components/movements/NewMovementDialog";

export default function MovementsPage() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Page Title & CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Movimientos Financieros</h1>
            <p className="text-slate-500 mt-1">Administra tus flujos de caja de forma eficiente.</p>
          </div>
          <NewMovementDialog>
            <button className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              Nuevo Movimiento
            </button>
          </NewMovementDialog>
        </div>

        {/* Summary Cards */}
        <MovementsSummary />

        {/* Table Component */}
        <MovementsTable />
      </div>
    </Layout>
  );
}
