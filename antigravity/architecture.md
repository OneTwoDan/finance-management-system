# Architecture Specification

This document defines the architecture that must be followed when implementing the application.

The AI agent must follow this structure strictly.

---

# Architecture Style

The application follows a **layered architecture**.

Layers:

UI
API
Services
Repositories
Database

Each layer has a clear responsibility.

---

# Project Structure

The repository must follow this structure.

src

components
lib
pages
repositories
services
types
utils

API routes must be placed in:

pages/api

---

# Components Layer

Location:

src/components

Responsibilities:

UI rendering only.

Components must:

- not contain business logic
- not access the database
- not implement RBAC

Components may:

- receive props
- call API endpoints
- manage local UI state

---

# Pages Layer

Location:

src/pages

Responsibilities:

Page composition.

Pages must:

- assemble UI components
- fetch data from API routes
- handle navigation

Pages must not contain business logic.

---

# API Layer

Location:

pages/api

Responsibilities:

Expose REST endpoints.

API routes must:

- validate authentication
- enforce RBAC rules
- call services for business logic

API routes must not access Prisma directly.

---

# Services Layer

Location:

src/services

Responsibilities:

Business logic.

Examples:

MovementService
UserService
ReportService

Services must:

- contain domain logic
- orchestrate repositories
- implement calculations

---

# Repository Layer

Location:

src/repositories

Responsibilities:

Database queries.

Repositories interact directly with Prisma.

Examples:

MovementRepository
UserRepository

Repositories must not contain business logic.

---

# Database Layer

Database provider:

PostgreSQL via Supabase.

ORM:

Prisma.

Tables:

Users
Movements
Sessions

---

# Entity Models

User

Fields:

id
name
email
phone
role
createdAt

Roles allowed:

USER
ADMIN

For testing purposes:

All new users must automatically receive role ADMIN.

---

Movement

Fields:

id
concept
amount
date
userId
createdAt

---

# API Contracts

Movements

GET /api/movements

Response

array of movements

---

POST /api/movements

Body

concept
amount
date

Response

created movement

---

Users

GET /api/users

Response

array of users

---

PATCH /api/users/:id

Body

name
role

Response

updated user

---

Reports

GET /api/reports

Response

current_balance
movements_summary

---

# RBAC Implementation

RBAC must be enforced in the API layer.

Rules:

Movements

USER → allowed
ADMIN → allowed

Users

USER → forbidden
ADMIN → allowed

Reports

USER → forbidden
ADMIN → allowed

---

# Utility Modules

Location:

src/utils

Examples:

csvExporter
balanceCalculator

---

# Types

Location:

src/types

Define shared types used across the application.

Examples:

User
Movement
Role

---

# API Documentation

Swagger documentation must be available at:

/api/docs

Every endpoint must include:

summary
parameters
request schema
response schema
example responses

---

# Charts

Reports page must display a financial chart.

The chart should visualize movements over time.

---

# CSV Export

Reports page must allow downloading a CSV file containing:

concept
amount
date
user

---

# Security

The backend must:

- reject unauthenticated requests
- enforce RBAC
- validate request payloads

Authentication must rely on server-side session validation.

---

# Testing

At least three unit tests must be implemented.

Recommended targets:

Balance calculation
Movement creation service
RBAC permission logic

Testing framework:

Vitest or Jest.
