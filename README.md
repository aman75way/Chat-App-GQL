# Project Name: 75 Chat App

## Overview

75 Chat App is a real-time chat application built using the PERN stack (PostgreSQL, Express.js, React, Node.js). The application provides users with the ability to create accounts, log in, and engage in real-time messaging with other users. It features a responsive UI, real-time updates via WebSockets, and secure authentication mechanisms.

## Technologies Used

- **Frontend:**
  - React with TypeScript
  - Zustand for state management
  - React Router DOM for navigation
  - Tailwind CSS for styling
  - Socket.IO for real-time communication
  - Vite for development server and build tool

- **Backend:**
  - Node.js with Express.js
  - Prisma ORM for database interaction
  - bcryptjs for password hashing
  - JSON Web Tokens for authentication
  - Socket.IO for real-time communication

- **Database:**
  - PostgreSQL with Prisma as the ORM

## Folder Structure

```
project-root/
│
├── backend/
│   ├── app/
│   │   ├── common/
│   │   ├── message/
│   │   └── user/
│   ├── prisma/
│   └── index.ts
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       ├── pages/
│       ├── types/
│       └── zustand/
│
└── README.md
```

## Running the Project

### Prerequisites

- Node.js and npm installed
- PostgreSQL database setup and running

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database with Prisma:
   ```bash
   npx prisma migrate dev
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

### Accessing the Application

- Open your browser and navigate to `http://localhost:5173` to access the chat application.

### Swagger Documentation

- Open your browser and navigate to `http://localhost:5000/api/docs` to access the Swagger documentation for the backend API.

### Endpoints

- `POST /auth/signup`: Signup endpoint to create a new user.
- `POST /auth/login`: Login endpoint to authenticate a user.
- `GET /auth`: Get endpoint to retrieve the current user's details.
- `POST /auth/logout`: Logout endpoint to log out a user.
  
- `GET /message/conversations`: Get endpoint to retrieve a list of users for the sidebar.
- `GET /message/:id`: Get endpoint to retrieve a list of messages for a specific conversation.
- `POST /message/send/:id`: Post endpoint to send a new message to a specific conversation.




/src
 ├── common
 │   ├── middlewares
 │   │   ├── auth.middleware.ts
 │   ├── helper
 │   │   ├── catch-error.helper.ts
 │   ├── services
 │   │   ├── database.service.ts
 │   ├── dto
 │   │   ├── base.dto.ts
 │   │   ├── user.dto.ts
 │   │   ├── message.dto.ts
 ├── modules
 │   ├── user
 │   │   ├── user.controller.ts
 │   │   ├── user.service.ts
 │   │   ├── user.schema.ts  (GraphQL TypeDefs & Resolvers)
 │   ├── message
 │   │   ├── message.controller.ts
 │   │   ├── message.service.ts
 │   │   ├── message.schema.ts (GraphQL TypeDefs & Resolvers)
 ├── prisma
 │   ├── schema.prisma
 ├── index.ts  (Apollo Server Setup)
 ├── graphql.ts (GraphQL Schema Loader)
