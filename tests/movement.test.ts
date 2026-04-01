import { vi, describe, it, expect, beforeEach } from "vitest";
import { MovementService } from "@/services/MovementService";
import { MovementRepository } from "@/repositories/MovementRepository";

vi.mock("@/repositories/MovementRepository", () => ({
  MovementRepository: {
    create: vi.fn(),
    findAll: vi.fn(),
  },
}));

describe("MovementService Tests", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("createMovement", () => {
    it("should successfully create a movement and map the dates to ISO string", async () => {
      const mockDate = new Date("2024-01-15T12:00:00.000Z");
      vi.mocked(MovementRepository.create).mockResolvedValue({
        id: "new-1",
        concept: "Pago de servicio",
        amount: 500,
        date: mockDate,
        userId: "user-1",
        createdAt: mockDate,
      } as any);

      const result = await MovementService.createMovement({
        concept: "Pago de servicio",
        amount: 500,
        date: "2024-01-15T12:00:00.000Z",
        userId: "user-1",
      });

      expect(MovementRepository.create).toHaveBeenCalledWith({
        concept: "Pago de servicio",
        amount: 500,
        date: new Date("2024-01-15T12:00:00.000Z"),
        userId: "user-1",
      });
      
      expect(result.id).toBe("new-1");
      expect(result.date).toBe(mockDate.toISOString());
      expect(result.createdAt).toBe(mockDate.toISOString());
    });
  });

  describe("getMovements", () => {
    it("should correctly fetch movements and map the username properly", async () => {
      const mockDate = new Date("2024-01-15T12:00:00.000Z");
      vi.mocked(MovementRepository.findAll).mockResolvedValue([
        {
          id: "mov-1",
          concept: "Salario",
          amount: 2000,
          date: mockDate,
          userId: "user-1",
          createdAt: mockDate,
          user: { name: "Admin User", id: "user-1" },
        },
      ] as any);

      const movements = await MovementService.getMovements();

      expect(MovementRepository.findAll).toHaveBeenCalledOnce();
      expect(movements).toHaveLength(1);
      expect(movements[0].userName).toBe("Admin User");
      expect(movements[0].date).toBe(mockDate.toISOString());
    });
  });
});
