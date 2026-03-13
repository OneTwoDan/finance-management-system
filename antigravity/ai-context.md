# AI Context

This document provides technical context for the AI agent working on this repository.

The goal is to build a **Fullstack Financial Management System**.

Users can:

- Manage financial movements (income and expenses)
- Manage users
- View financial reports

The system must include authentication, RBAC security, and API documentation.

---

# Tech Stack

Frontend

Next.js (Pages Router)
TypeScript
Tailwind CSS
shadcn/ui

Backend

Next.js API Routes
Prisma ORM
PostgreSQL (Supabase)

Authentication

Better Auth
GitHub OAuth provider
Prisma session adapter

Deployment

Vercel

---

# Core Entities

Users
Movements

---

# Business Logic

Movements represent financial transactions.

Movement fields:

- concept
- amount
- date
- userId

Reports must calculate:

current_balance = sum(income) - sum(expenses)

The system must also allow exporting the movements to CSV.

---

# Authentication Behavior

Users authenticate with GitHub.

All newly created users must automatically receive role:

ADMIN

This simplifies testing.

---

# Authorization

RBAC must be enforced server-side.

Permissions:

USER

- Can view movements

ADMIN

- Can manage movements
- Can manage users
- Can view reports

---

# UI Structure

Pages required:

Home
Movements
Users
Reports

Each page should follow a dashboard layout.

Use Tailwind and shadcn components.

Responsive design is not required.
