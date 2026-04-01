import { vi, describe, it, expect, beforeEach } from "vitest";
import { ReportService } from "@/services/ReportService";
import { MovementRepository } from "@/repositories/MovementRepository";

vi.mock("@/repositories/MovementRepository", () => ({
  MovementRepository: {
    findAll: vi.fn(),
  },
}));

describe("Balance Calculation (via ReportService)", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return 0 for an empty movements list", async () => {
    vi.mocked(MovementRepository.findAll).mockResolvedValue([]);
    const summary = await ReportService.getReportSummary();
    expect(summary.currentBalance).toBe(0);
  });

  it("should sum income correctly", async () => {
    vi.mocked(MovementRepository.findAll).mockResolvedValue([
      { id: "1", concept: "Ingreso A", amount: 1000, date: new Date("2024-01-01"), userId: "u1", createdAt: new Date() },
      { id: "2", concept: "Ingreso B", amount: 500,  date: new Date("2024-01-02"), userId: "u1", createdAt: new Date() },
    ] as any);
    const summary = await ReportService.getReportSummary();
    expect(summary.currentBalance).toBe(1500);
  });

  it("should subtract expenses correctly", async () => {
    vi.mocked(MovementRepository.findAll).mockResolvedValue([
      { id: "1", concept: "Ingreso",  amount: 2000,  date: new Date("2024-01-01"), userId: "u1", createdAt: new Date() },
      { id: "2", concept: "Alquiler", amount: -1200, date: new Date("2024-01-02"), userId: "u1", createdAt: new Date() },
    ] as any);
    
    const summary = await ReportService.getReportSummary();
    expect(summary.currentBalance).toBe(800);
  });

  it("should handle a negative balance", async () => {
    vi.mocked(MovementRepository.findAll).mockResolvedValue([
      { id: "1", concept: "Gasto grande", amount: -5000, date: new Date("2024-01-01"), userId: "u1", createdAt: new Date() },
    ] as any);
    const summary = await ReportService.getReportSummary();
    expect(summary.currentBalance).toBe(-5000);
  });
});
