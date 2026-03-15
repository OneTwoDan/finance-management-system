import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class UserRepository {
  /**
   * findAll
   * Fetches all registered users
   */
  static async findAll() {
    return prisma.user.findMany();
  }

  /**
   * update
   * Updates partial fields for a user
   */
  static async update(id: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  /**
   * create
   * Creates a new user
   */
  static async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
    });
  }

  /**
   * delete
   * Deletes a user by id
   */
  static async delete(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  }
}
