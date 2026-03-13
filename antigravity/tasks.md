# Development Tasks

The AI agent must implement the project in the following order.

Do not skip steps.

---

# Step 1 — Project Setup

Install dependencies:

Prisma
Better Auth
Swagger tools
CSV export library
Chart library

---

# Step 2 — Database Setup

Configure Prisma.

Create models:

User
Movement
Session

Run Prisma migration.

Connect database to Supabase PostgreSQL.

---

# Step 3 — Authentication

Implement authentication with:

Better Auth + GitHub provider.

Ensure:

Sessions stored in database via Prisma.

Automatically assign role:

ADMIN

to new users.

---

# Step 4 — RBAC

Implement role validation utilities.

Create middleware or helper functions to enforce RBAC.

Protect API routes.

---

# Step 5 — API Routes

Create endpoints.

Movements

GET /api/movements
POST /api/movements

Users

GET /api/users
PATCH /api/users/:id

Reports

GET /api/reports

---

# Step 6 — Swagger Documentation

Expose API documentation at:

/api/docs

All endpoints must include:

- parameters
- request body
- response schema
- examples

---

# Step 7 — UI Implementation

Create pages:

/home
/movements
/users
/reports

Use shadcn components.

---

Movements page

- table of movements
- new movement button
- create movement form

---

Users page

- table of users
- edit user form

---

Reports page

- financial chart
- balance display
- CSV export button

---

# Step 8 — CSV Export

Implement CSV generation for movements.

File must include:

concept, amount, date, user

---

# Step 9 — Unit Tests

Implement at least 3 tests.

Recommended tests:

balance calculation
movement creation logic
RBAC validation

---

# Step 10 — Deployment

Deploy project to Vercel.

Ensure environment variables are configured.

---

# Step 11 — Documentation

Create README including:

setup instructions
environment variables
deployment instructions
