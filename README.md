# Google Forms Lite Clone

A simplified Google Forms clone implemented as a monorepo project using React, TypeScript, Redux Toolkit (RTK Query), and a GraphQL server with an in-memory data store.

---

## Overview

This project demonstrates:

- Monorepo setup (client + server)
- GraphQL API with queries and mutations
- React application with TypeScript
- State management using Redux Toolkit and RTK Query
- Proper cache invalidation
- Clean component structure
- Dynamic form rendering based on question types

The goal was to implement core Google Forms functionality in a clean, scalable way.

---

## Tech Stack

### Front-End

- React
- TypeScript
- Redux Toolkit
- RTK Query
- React Router
- Tailwind CSS

### Back-End

- Node.js
- GraphQL (GraphQL Yoga)
- In-memory data store

---

## Project Structure

```
google-form-clone/
│
├── client/        # React + RTK Query application
│
├── server/        # GraphQL API (Yoga)
│
└── package.json   # Root workspace configuration
```

The project is configured using **npm workspaces**.

---

## Features

### 1️⃣ Form Builder

- Create a new form
- Add title and description
- Add multiple question types:
  - TEXT
  - DATE
  - MULTIPLE_CHOICE
  - CHECKBOX
- Add and remove options for selectable questions
- Mark questions as required
- Delete questions
- Client-side validation before form creation

---

### 2️⃣ Form Filling

- Dynamic question rendering based on type
- Controlled form state via custom hook
- Supports:
  - Text input
  - Date input
  - Radio buttons
  - Checkboxes
- Submit responses via GraphQL mutation
- Success screen after submission

---

### 3️⃣ Responses Page

- View all responses for a specific form
- Answers mapped to corresponding question titles
- Automatic cache invalidation using RTK Query
- Empty state handling

---

## Architecture Decisions

- **Server state** is managed via RTK Query.
- **Local form state** is handled with React hooks.
- Cache invalidation is implemented using `tagTypes`.
- The backend uses a simple in-memory store for clarity.
- No authentication was implemented (as required).
- Form validation is enforced primarily on the server.

---

## Getting Started

### 1️⃣ Install dependencies

From the project root:

```bash
npm install
```

---

### 2️⃣ Run the project

```bash
npm run dev
```

This will start both:

- Frontend: http://localhost:5173
- GraphQL Server: http://localhost:4000/graphql

---

## GraphQL Operations

### Queries

- `forms`
- `form(id: ID!)`
- `responses(formId: ID!)`

### Mutations

- `createForm`
- `submitResponse`

---

## Notes

- Data is stored in memory and will reset when the server restarts.
- The project focuses on clean architecture, type safety, and maintainability.
- RTK Query is used instead of Apollo Client to demonstrate alternative GraphQL state management.

---

## 👨‍💻 Author

Oleksii Mishchenko
