import { ReportSummary } from "@/types";
import { MovementRepository } from "@/repositories/MovementRepository";

export class ReportService {
  /**
   * getReportSummary
   * Resolves with a calculated summary of income and expenses based on Database movements
   */
  static async getReportSummary(): Promise<ReportSummary> {
    const movements = await MovementRepository.findAll();

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    let currentBalance = 0;
    let incomeThisMonth = 0;
    let expensesThisMonth = 0;

    // We'll initialize an array to represent Mon-Sun
    const days = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
    const movementsSummary = days.map((day) => ({ day, amount: 0 }));

    movements.forEach((m) => {
      currentBalance += m.amount;

      const mDate = new Date(m.date);
      if (mDate.getFullYear() === currentYear && mDate.getMonth() === currentMonth) {
        if (m.amount > 0) {
          incomeThisMonth += m.amount;
        } else {
          expensesThisMonth += Math.abs(m.amount);
        }

        // JS getDay() returns 0 for Sunday, 1 for Monday...
        // We want 0=Lun, 6=Dom
        let dayOfWeek = mDate.getDay() - 1;
        if (dayOfWeek === -1) dayOfWeek = 6;
        
        movementsSummary[dayOfWeek].amount += m.amount;
      }
    });

    return {
      currentBalance,
      incomeThisMonth,
      expensesThisMonth,
      movementsSummary,
    };
  }
}
