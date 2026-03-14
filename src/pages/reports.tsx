import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ReportsSummaryCards } from "@/components/reports/ReportsSummaryCards";
import { ReportsChart } from "@/components/reports/ReportsChart";
import { ReportsRecentActivity } from "@/components/reports/ReportsRecentActivity";
import { Movement, ReportSummary } from "@/types";

export default function ReportsPage() {
  const [reportSummary, setReportSummary] = useState<ReportSummary | null>(null);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [summaryRes, movementsRes] = await Promise.all([
          fetch("/api/reports"),
          fetch("/api/movements"),
        ]);
        const summaryData = await summaryRes.json();
        const movementsData = await movementsRes.json();
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


  const handleDownloadCsv = async () => {
    try {
      const response = await fetch("/api/reports/csv");
      if (!response.ok) throw new Error("Failed to download CSV");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `movements-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download CSV:", error);
    }
  };

  const headerActions = (
    <button
      onClick={handleDownloadCsv}
      className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors ml-2"
    >
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
