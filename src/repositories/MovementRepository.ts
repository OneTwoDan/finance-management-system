import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class MovementRepository {
  /**
   * findAll
   * Fetches all movements ordered strictly by latest created
   */
  static async findAll() {
    return prisma.movement.findMany({
      orderBy: {
        date: "desc",
      },
      include: {
        user: true,
      },
    });
  }

  /**
   * create
   * Creates a new movement targeting a specific user ID
   */
  static async create(data: Prisma.MovementUncheckedCreateInput) {
    return prisma.movement.create({
      data,
    });
  }
}
