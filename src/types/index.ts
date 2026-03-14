export type Role = "USER" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  createdAt: string;
}

export interface Movement {
  id: string;
  concept: string;
  amount: number;
  date: string;
  userId: string;
  userName?: string;
  createdAt: string;
}

export interface ReportSummary {
  currentBalance: number;
  incomeThisMonth: number;
  expensesThisMonth: number;
  movementsSummary: {
    day: string;
    amount: number;
  }[];
  movements: Movement[];
}
