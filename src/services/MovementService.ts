import { Movement } from "@/types";
import { MovementRepository } from "@/repositories/MovementRepository";

export class MovementService {
  /**
   * getMovements
   * Fetches the list of all movements from the database
   */
  static async getMovements(): Promise<Movement[]> {
    const movements = await MovementRepository.findAll();
    return movements.map((m) => ({
      ...m,
      userName: m.user?.name ?? undefined,
      date: m.date.toISOString(),
      createdAt: m.createdAt.toISOString(),
    }));
  }

  /**
   * createMovement
   * Appends a new movement to the database
   */
  static async createMovement(
    data: Omit<Movement, "id" | "createdAt" | "date"> & { date: string }
  ): Promise<Movement> {
    const newMovement = await MovementRepository.create({
      concept: data.concept,
      amount: data.amount,
      date: new Date(data.date),
      userId: data.userId,
    });
    
    return {
      ...newMovement,
      date: newMovement.date.toISOString(),
      createdAt: newMovement.createdAt.toISOString(),
    };
  }
  static async updateMovement(
    id: string,
    data: Partial<Pick<Movement, "concept" | "amount">> & { date?: string }
  ): Promise<Movement> {
    const updated = await MovementRepository.update(id, {
      ...(data.concept !== undefined && { concept: data.concept }),
      ...(data.amount !== undefined && { amount: data.amount }),
      ...(data.date !== undefined && { date: new Date(data.date) }),
    });
    return {
      ...updated,
      userName: updated.user?.name ?? undefined,
      date: updated.date.toISOString(),
      createdAt: updated.createdAt.toISOString(),
    };
  }

  static async deleteMovement(id: string): Promise<void> {
    await MovementRepository.remove(id);
  }
}
