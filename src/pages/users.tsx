import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PageHeader } from "@/components/PageHeader";
import { UsersTable } from "@/components/users/UsersTable";
import { NewUserDialog } from "@/components/users/NewUserDialog";
import { User } from "@/types";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async ({ silent = false } = {}) => {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserCreated = (newUser: User) => {
    setUsers((prev) => [newUser, ...prev]);
    fetchUsers({ silent: true });
  };

  const handleUserUpdated = (updatedUser: User) => {
    setUsers((prev) => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    fetchUsers({ silent: true });
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        <PageHeader 
          title="Administración de Usuarios"
          description="Gestione los accesos, roles e información personal de su equipo."
        >
          <NewUserDialog onUserCreated={handleUserCreated}>
            <button className="bg-primary text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-primary/90 flex items-center gap-2 transition-colors shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-[20px]">person_add</span>
              Nuevo Usuario
            </button>
          </NewUserDialog>
        </PageHeader>
        
        <UsersTable 
          users={users} 
          onUserUpdated={handleUserUpdated} 
        />
      </div>
    </Layout>
  );
}
