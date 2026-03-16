import { ReportSummary } from "@/types";
import { MovementRepository } from "@/repositories/MovementRepository";

export class ReportService {
  static async getReportSummary(): Promise<ReportSummary> {
    const rawMovements = await MovementRepository.findAll();

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    let currentBalance = 0;
    let incomeThisMonth = 0;
    let expensesThisMonth = 0;

    const days = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
    const movementsSummary = days.map((day) => ({ day, amount: 0 }));

    rawMovements.forEach((m) => {
      currentBalance += m.amount;

      const mDate = new Date(m.date);
      if (mDate.getFullYear() === currentYear && mDate.getMonth() === currentMonth) {
        if (m.amount > 0) {
          incomeThisMonth += m.amount;
        } else {
          expensesThisMonth += Math.abs(m.amount);
        }

        let dayOfWeek = mDate.getDay() - 1;
        if (dayOfWeek === -1) dayOfWeek = 6;

        movementsSummary[dayOfWeek].amount += m.amount;
      }
    });

    const movements = rawMovements.map((m) => ({
      ...m,
      date: m.date instanceof Date ? m.date.toISOString() : String(m.date),
      createdAt: m.createdAt instanceof Date ? m.createdAt.toISOString() : String(m.createdAt),
    }));

    return {
      currentBalance,
      incomeThisMonth,
      expensesThisMonth,
      movementsSummary,
      movements,
    };
  }
}
