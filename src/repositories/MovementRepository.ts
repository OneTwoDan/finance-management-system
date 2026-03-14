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

  /**
   * update
   * Updates an existing movement by id
   */
  static async update(id: string, data: Prisma.MovementUncheckedUpdateInput) {
    return prisma.movement.update({
      where: { id },
      data,
      include: { user: true },
    });
  }

  /**
   * remove
   * Deletes a movement by id
   */
  static async remove(id: string) {
    return prisma.movement.delete({
      where: { id },
    });
  }
}
