import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { MovementsSummary } from "@/components/movements/MovementsSummary";
import { MovementsTable } from "@/components/movements/MovementsTable";
import { NewMovementDialog } from "@/components/movements/NewMovementDialog";
import { PageHeader } from "@/components/PageHeader";
import { Movement } from "@/types";

// Module-level cache: persists across re-mounts (navigating away and back)
// but is cleared on a hard refresh. Acts as a simple stale-while-revalidate store.
let movementsCache: Movement[] | null = null;

export default function MovementsPage() {
  const [movements, setMovements] = useState<Movement[]>(movementsCache ?? []);
  // Only show the spinner when there is no cached data yet
  const [isLoading, setIsLoading] = useState(movementsCache === null);

  const fetchMovements = async ({ silent = false } = {}) => {
    if (!silent) setIsLoading(true);
    try {
      const res = await fetch("/api/movements");
      if (!res.ok) throw new Error("Failed to fetch");
      const data: Movement[] = await res.json();
      movementsCache = data;
      setMovements(data);
    } catch (error) {
      console.error("Failed to fetch movements", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMovementCreated = (optimistic: Movement) => {
    // Show the new movement instantly (optimistic update)
    setMovements((prev) => [optimistic, ...prev]);
    // Re-fetch silently in background to get real data (userName, id, etc.)
    fetchMovements({ silent: true });
  };

  const handleMovementsChange = (updated: Movement[]) => {
    movementsCache = updated;
    setMovements(updated);
  };

  useEffect(() => {
    if (movementsCache !== null) {
      // Data already cached — refresh silently in background, no spinner
      fetchMovements({ silent: true });
    } else {
      // First visit — fetch and show spinner
      fetchMovements();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="space-y-8">
        {/* Page Title & CTA */}
        <PageHeader
          title="Movimientos Financieros"
          description="Administra tus flujos de caja de forma eficiente."
        >
          <NewMovementDialog onMovementCreated={handleMovementCreated}>
            <button className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              Nuevo Movimiento
            </button>
          </NewMovementDialog>
        </PageHeader>

        {/* Summary Cards */}
        <MovementsSummary movements={movements} />

        {/* Table Component */}
        <MovementsTable
          movements={movements}
          isLoading={isLoading}
          onMovementsChange={handleMovementsChange}
        />
      </div>
    </Layout>
  );
}
