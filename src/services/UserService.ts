import { User, Role } from "@/types";

let mockUsers: User[] = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    phone: "+123456789",
    role: "ADMIN",
    createdAt: new Date("2023-01-01T00:00:00Z").toISOString(),
  },
  {
    id: "2",
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    phone: "+987654321",
    role: "USER",
    createdAt: new Date("2023-02-15T00:00:00Z").toISOString(),
  },
  {
    id: "3",
    name: "Carlos Rodriguez",
    email: "carlos.rod@example.com",
    phone: "+112233445",
    role: "USER",
    createdAt: new Date("2023-05-10T00:00:00Z").toISOString(),
  },
];

export class UserService {
  /**
   * getUsers
   * Returns a list of mocked active users
   */
  static async getUsers(): Promise<User[]> {
    return [...mockUsers];
  }

  /**
   * updateUser
   * Updates fields for an existing mock user
   */
  static async updateUser(
    id: string,
    updates: { name?: string; role?: Role }
  ): Promise<User | null> {
    const userIndex = mockUsers.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return null;
    }

    const updatedUser = {
      ...mockUsers[userIndex],
      ...updates,
    };

    mockUsers[userIndex] = updatedUser;
    
    return updatedUser;
  }
}
