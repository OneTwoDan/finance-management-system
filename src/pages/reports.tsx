import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ReportsSummaryCards } from "@/components/reports/ReportsSummaryCards";
import { ReportsChart } from "@/components/reports/ReportsChart";
import { ReportsRecentActivity } from "@/components/reports/ReportsRecentActivity";
import { MovementService } from "@/services/MovementService";
import { ReportService } from "@/services/ReportService";
import { Movement, ReportSummary } from "@/types";

export default function ReportsPage() {
  const [reportSummary, setReportSummary] = useState<ReportSummary | null>(null);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [summaryData, movementsData] = await Promise.all([
          ReportService.getReportSummary(),
          MovementService.getMovements(),
        ]);
        setReportSummary(summaryData);
        setMovements(movementsData);
      } catch (error) {
        console.error("Failed to fetch report data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const headerActions = (
    <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors ml-2">
      <span className="material-symbols-outlined !text-lg">download</span>
      Descargar CSV
    </button>
  );

  return (
    <Layout headerActions={headerActions}>
      <div className="space-y-8">
        {/* Title & Actions */}
        <PageHeader
          title="Reportes y Estadísticas"
          description="Monitorea el flujo de caja y rendimiento financiero en tiempo real."
        >
          <div className="flex items-center gap-2 text-sm text-slate-500 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800">
            <span className="material-symbols-outlined !text-lg">calendar_today</span>
            <span>Enero 2024 - Junio 2024</span>
          </div>
        </PageHeader>

        {isLoading ? (
          <div className="py-20 text-center text-slate-500">Cargando reportes...</div>
        ) : reportSummary ? (
          <>
            <ReportsSummaryCards 
              currentBalance={reportSummary.currentBalance}
              incomeThisMonth={reportSummary.incomeThisMonth}
              expensesThisMonth={reportSummary.expensesThisMonth}
            />
            <ReportsChart data={reportSummary.movementsSummary} />
            <ReportsRecentActivity movements={movements} />
          </>
        ) : (
          <div className="py-20 text-center text-red-500">Error al cargar los datos.</div>
        )}
      </div>
    </Layout>
  );
}
