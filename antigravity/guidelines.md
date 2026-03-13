# AI Development Guidelines

This document defines the rules and architecture that the AI agent must follow when generating or modifying code in this repository.

The agent must follow these guidelines strictly to maintain consistency across the project.

---

# Project Overview

This project is a **Fullstack Financial Management System**.

The system allows users to:

- Manage income and expense movements
- Manage users
- Generate financial reports

The system includes authentication, role-based access control (RBAC), API documentation, and reporting.

---

# Tech Stack

Frontend

- Next.js (Pages Router)
- TypeScript
- Tailwind CSS
- shadcn/ui

Backend

- Next.js API Routes
- Prisma ORM
- PostgreSQL (Supabase)

Authentication

- Better Auth
- GitHub OAuth
- Prisma Session Adapter

Deployment

- Vercel

---

# Core Functional Requirements

The application must support:

1. Financial Movements Management
2. User Management
3. Financial Reports
4. Authentication with GitHub
5. Role-Based Access Control
6. API Documentation with Swagger
7. CSV Export for Reports

---

# Roles

Two roles exist.

USER

- Can access movements

ADMIN

- Can access movements
- Can access users management
- Can access reports

IMPORTANT

For testing purposes:

All newly created users must automatically be assigned the role:

ADMIN

---

# Application Routes

Home Page

/home

Movements

/movements

Users

/users

Reports

/reports

---

# API Routes

All backend logic must be implemented using:

Next.js API routes.

Example endpoints:

GET /api/movements
POST /api/movements
GET /api/users
PATCH /api/users/:id

---

# API Documentation

The project must expose Swagger documentation at:

/api/docs

Each endpoint must include:

- summary
- parameters
- request body schema
- response schema
- example responses

---

# RBAC Rules

The backend must enforce RBAC.

Movements

USER → allowed
ADMIN → allowed

Users

USER → forbidden
ADMIN → allowed

Reports

USER → forbidden
ADMIN → allowed

RBAC validation must happen on the server.

Never rely only on frontend validation.

---

# Database

Database provider:

PostgreSQL (Supabase)

ORM:

Prisma

Required tables:

Users
Movements
Sessions

---

# Movements Table

Fields

id
concept
amount
date
userId
createdAt

---

# Users Table

Fields

id
name
email
phone
role
createdAt

---

# Pages Requirements

Movements Page

- Show table of movements
- Columns:

Concept
Amount
Date
User

ADMIN users must see a:

New Movement button

---

New Movement Form

Fields:

Amount
Concept
Date

Button:

Save Movement

---

Users Page

ADMIN only.

Table columns:

Name
Email
Phone
Actions

Action:

Edit user

---

Edit User Form

Fields:

Name
Role

Button:

Save changes

---

Reports Page

ADMIN only.

Must include:

Financial chart
Current balance
Download CSV button

---

# CSV Export

Reports must generate CSV with fields:

concept
amount
date
user

---

# Project Structure

The agent must follow this structure.

src

components
pages
services
repositories
lib
types
utils

API routes must live in:

pages/api

---

# Architecture Rules

Components

- Must be UI-only
- No business logic

Services

- Contain domain logic

Repositories

- Handle database queries

API Routes

- Call services
- Do not contain heavy business logic

---

# UI Rules

The UI must:

- Use Tailwind CSS
- Use shadcn/ui components
- Follow a dashboard layout

Responsive design is NOT required.

---

# Authentication

Authentication must be implemented with:

Better Auth + GitHub provider.

Sessions must be stored in the database via Prisma.

Backend endpoints must reject requests from unauthenticated users.

---

# Testing

At least 3 unit tests must be implemented.

Recommended targets:

- balance calculation
- movement creation logic
- RBAC permission validation

Testing framework:

Vitest or Jest.

---

# Deployment

The application must be deployed to:

Vercel

---

# Repository Requirements

The repository must include:

README.md

README must contain:

- local setup instructions
- required environment variables
- deployment instructions

---

# Environment Variables

Required variables:

DATABASE_URL

GITHUB_CLIENT_ID

GITHUB_CLIENT_SECRET

BETTER_AUTH_SECRET

---

# Coding Standards

- Use TypeScript strictly
- Avoid any type when possible
- Prefer small reusable components
- Use clear naming conventions
- Avoid duplicated logic

---

# Agent Instructions

When generating code, the agent must:

1. Respect the architecture rules.
2. Avoid mixing UI and business logic.
3. Ensure RBAC validation exists in backend routes.
4. Document every API endpoint in Swagger.
5. Keep code modular and maintainable.
