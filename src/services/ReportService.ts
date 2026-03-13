import { ReportSummary } from "@/types";

export class ReportService {
  /**
   * getReportSummary
   * Resolves with a mocked structure summarizing income and expenses
   */
  static async getReportSummary(): Promise<ReportSummary> {
    return {
      currentBalance: 125430.0,
      incomeThisMonth: 45200.0,
      expensesThisMonth: 12850.0,
      movementsSummary: [
        { day: "Lun", amount: 15000 },
        { day: "Mar", amount: 35000 },
        { day: "Mie", amount: 25000 },
        { day: "Jue", amount: 15000 },
        { day: "Vie", amount: 42000 },
        { day: "Sab", amount: 20000 },
        { day: "Dom", amount: 28000 },
      ],
    };
  }
}
