import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/PageHeader";
import { UsersTable } from "@/components/users/UsersTable";
import { UserService } from "@/services/UserService";
import { User } from "@/types";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const data = await UserService.getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        <PageHeader 
          title="Administración de Usuarios"
          description="Gestione los accesos, roles e información personal de su equipo."
        >
          <button className="bg-primary text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-primary/90 flex items-center gap-2 transition-colors shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-[20px]">person_add</span>
            Nuevo Usuario
          </button>
        </PageHeader>
        
        <UsersTable users={users} onUserUpdated={fetchUsers} />
      </div>
    </Layout>
  );
}
