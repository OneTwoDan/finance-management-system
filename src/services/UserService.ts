import { User, Role } from "@/types";
import { UserRepository } from "@/repositories/UserRepository";

export class UserService {
  /**
   * getUsers
   * Returns a list of active users from the database
   */
  static async getUsers(): Promise<User[]> {
    const users = await UserRepository.findAll();
    return users.map((user) => ({
      ...user,
      createdAt: user.createdAt.toISOString(),
      phone: user.phone || "",
    })) as User[];
  }

  /**
   * updateUser
   * Updates fields for an existing user in the database
   */
  static async updateUser(
    id: string,
    updates: { name?: string; role?: Role }
  ): Promise<User | null> {
    try {
      const updatedUser = await UserRepository.update(id, updates);
      return {
        ...updatedUser,
        createdAt: updatedUser.createdAt.toISOString(),
        phone: updatedUser.phone || "",
      } as User;
    } catch (error) {
      console.error("Failed to update user:", error);
      return null;
    }
  }
}
