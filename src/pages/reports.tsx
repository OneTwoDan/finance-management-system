import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ReportsSummaryCards } from "@/components/reports/ReportsSummaryCards";
import { ReportsChart } from "@/components/reports/ReportsChart";
import { ReportsRecentActivity } from "@/components/reports/ReportsRecentActivity";
import { ReportSummary } from "@/types";

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <svg
        className="animate-spin h-10 w-10 text-indigo-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-label="Cargando"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      <span className="text-sm text-slate-500">Cargando reportes...</span>
    </div>
  );
}

export default function ReportsPage() {
  const [reportSummary, setReportSummary] = useState<ReportSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Single request — movements are now included in the report summary
        // response, so we avoid a second round-trip + auth session check.
        const res = await fetch("/api/reports");
        const data: ReportSummary = await res.json();
        setReportSummary(data);
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

  return (
    <Layout>
      <div className="space-y-8">
        {/* Title & Actions */}
        <PageHeader
          title="Reportes y Estadísticas"
          description="Monitorea el flujo de caja y rendimiento financiero en tiempo real."
        >
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadCsv}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors bg-white dark:bg-slate-900 shadow-sm"
            >
              <span className="material-symbols-outlined !text-lg">download</span>
              Descargar CSV
            </button>
            <div className="flex items-center gap-2 text-sm text-slate-500 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="material-symbols-outlined !text-lg">calendar_today</span>
              <span>Enero 2024 - Junio 2024</span>
            </div>
          </div>
        </PageHeader>

        {isLoading ? (
          <LoadingSpinner />
        ) : reportSummary ? (
          <>
            <ReportsSummaryCards
              currentBalance={reportSummary.currentBalance}
              incomeThisMonth={reportSummary.incomeThisMonth}
              expensesThisMonth={reportSummary.expensesThisMonth}
            />
            <ReportsChart data={reportSummary.movementsSummary} />
            <ReportsRecentActivity movements={reportSummary.movements} />
          </>
        ) : (
          <div className="py-20 text-center text-red-500">Error al cargar los datos.</div>
        )}
      </div>
    </Layout>
  );
}
