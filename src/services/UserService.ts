import { User, Role } from "@/types";
import { UserRepository } from "@/repositories/UserRepository";

export class UserService {
  static async getUsers(): Promise<User[]> {
    const users = await UserRepository.findAll();
    return users.map((user) => ({
      ...user,
      createdAt: user.createdAt.toISOString(),
      phone: user.phone || "",
      isActive: user.isActive !== false,
    })) as User[];
  }

  static async updateUser(
    id: string,
    updates: { name?: string; phone?: string; role?: Role; isActive?: boolean }
  ): Promise<User | null> {
    try {
      const updatedUser = await UserRepository.update(id, updates);
      return {
        ...updatedUser,
        createdAt: updatedUser.createdAt.toISOString(),
        phone: updatedUser.phone || "",
        isActive: updatedUser.isActive,
      } as User;
    } catch (error) {
      console.error("Failed to update user:", error);
      return null;
    }
  }

  static async createUser(
    data: { name: string; email: string; phone?: string; role?: Role }
  ): Promise<User | null> {
    try {
      const newUser = await UserRepository.create({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        role: data.role || "USER",
        emailVerified: true,
      });
      return {
        ...newUser,
        createdAt: newUser.createdAt.toISOString(),
        phone: newUser.phone || "",
        isActive: newUser.isActive,
      } as User;
    } catch (error) {
      console.error("Failed to create user:", error);
      return null;
    }
  }
}
