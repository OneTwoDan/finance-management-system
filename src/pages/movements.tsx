import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { MovementsSummary } from "@/components/movements/MovementsSummary";
import { MovementsTable } from "@/components/movements/MovementsTable";
import { NewMovementDialog } from "@/components/movements/NewMovementDialog";
import { PageHeader } from "@/components/PageHeader";
import { Movement } from "@/types";

export default function MovementsPage() {
  const [movements, setMovements] = useState<Movement[]>([]);

  const fetchMovements = async () => {
    try {
      const res = await fetch("/api/movements");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setMovements(data);
    } catch (error) {
      console.error("Failed to fetch movements", error);
    }
  };

  useEffect(() => {
    fetchMovements();
  }, []);


  return (
    <Layout>
      <div className="space-y-8">
        {/* Page Title & CTA */}
        <PageHeader 
          title="Movimientos Financieros" 
          description="Administra tus flujos de caja de forma eficiente."
        >
          <NewMovementDialog onMovementCreated={fetchMovements}>
            <button className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              Nuevo Movimiento
            </button>
          </NewMovementDialog>
        </PageHeader>

        {/* Summary Cards */}
        <MovementsSummary />

        {/* Table Component */}
        <MovementsTable movements={movements} />
      </div>
    </Layout>
  );
}
