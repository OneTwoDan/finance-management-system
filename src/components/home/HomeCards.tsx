import { DashboardCard } from "@/components/DashboardCard";

export function HomeCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <DashboardCard
        href="/movements"
        icon="account_balance"
        iconBgClass="bg-primary/10"
        iconColorClass="text-primary"
        title="Gestión de Movimientos"
        description="Registra, categoriza y supervisa todos los ingresos y egresos de tu organización en tiempo real."
        linkText="Ir a movimientos"
        linkColorClass="text-primary"
      />

      <DashboardCard
        href="/users"
        icon="manage_accounts"
        iconBgClass="bg-indigo-100"
        iconColorClass="text-indigo-600"
        title="Gestión de Usuarios"
        description="Administra roles, permisos y perfiles de acceso para garantizar la seguridad de la información financiera."
        linkText="Gestionar equipo"
        linkColorClass="text-indigo-600"
      />

      <DashboardCard
        href="/reports"
        icon="insights"
        iconBgClass="bg-emerald-100"
        iconColorClass="text-emerald-600"
        title="Reportes Analíticos"
        description="Visualiza estados de cuenta, balances generales y análisis predictivos mediante gráficos interactivos."
        linkText="Ver analíticas"
        linkColorClass="text-emerald-600"
      />
    </div>
  );
}
