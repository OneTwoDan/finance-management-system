import { Movement } from "@/types";

// Mock Data
let mockMovements: Movement[] = [
  {
    id: "1",
    concept: "Pago de Cliente #012",
    amount: 2500.0,
    date: "2023-10-12",
    userId: "1",
    createdAt: new Date("2023-10-12T10:00:00Z").toISOString(),
  },
  {
    id: "2",
    concept: "Alquiler Oficina Central",
    amount: -1200.0,
    date: "2023-10-10",
    userId: "1",
    createdAt: new Date("2023-10-10T14:30:00Z").toISOString(),
  },
  {
    id: "3",
    concept: "Suscripción SaaS (AWS)",
    amount: -49.0,
    date: "2023-10-08",
    userId: "1",
    createdAt: new Date("2023-10-08T09:15:00Z").toISOString(),
  },
];

export class MovementService {
  /**
   * getMovements
   * Fetches the list of all mocked movements
   */
  static async getMovements(): Promise<Movement[]> {
    return [...mockMovements];
  }

  /**
   * createMovement
   * Appends a new movement to the mock data array
   */
  static async createMovement(
    data: Omit<Movement, "id" | "createdAt">
  ): Promise<Movement> {
    const newMovement: Movement = {
      ...data,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
    };
    
    // Simulate insertion
    mockMovements = [newMovement, ...mockMovements];
    
    return newMovement;
  }
}
