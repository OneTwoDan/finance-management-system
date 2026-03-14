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
        { day: "Lun", amount: 22000 },
        { day: "Mar", amount: 18000 },
        { day: "Mie", amount: 40000 },
        { day: "Jue", amount: 30000 },
        { day: "Vie", amount: 25000 },
        { day: "Sab", amount: 35000 },
        { day: "Dom", amount: 10000 },
      ],
    };
  }
}
