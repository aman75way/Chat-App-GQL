
Here’s a **`README.md`** for your **Chat App (GraphQL + Apollo Server + Prisma)**:

----------

# **Chat App (GraphQL + Apollo Server + Prisma)**

A **real-time chat application** built with **React, Apollo Client, GraphQL, Prisma, and PostgreSQL**. This project replaces **REST + Socket.IO** with **GraphQL Queries, Mutations, and Subscriptions** while maintaining all core functionalities.

----------

## 🚀 **Features**

✅ **User Authentication** (JWT-based with access & refresh tokens)  
✅ **One-on-One Messaging** (Real-time with GraphQL Subscriptions)  
✅ **Conversations List** (Fetch user’s chat history)  
✅ **Search Users** (Find users by name)  
✅ **Optimistic UI Updates** (Seamless chat experience)  
✅ **Prisma ORM** (Efficient database queries)  
✅ **Apollo Client for GraphQL** (Cache, Queries & Mutations)

----------

## 🛠️ **Tech Stack**

### **Frontend**

-   **React + TypeScript** (⚛️ Modern UI)
-   **Apollo Client** (GraphQL Queries & Subscriptions)
-   **Zustand** (State Management)
-   **Tailwind CSS** (Responsive UI)

### **Backend**

-   **GraphQL (Apollo Server)** (🔗 Queries, Mutations & Subscriptions)
-   **Prisma ORM** (Efficient DB Queries)
-   **PostgreSQL** (Scalable database)
-   **JWT Authentication** (Access & Refresh Tokens)
-   **GraphQL Context Middleware** (Protects API routes)

----------

## 🔧 **Setup Instructions**

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/aman75way/Chat-App-GQL.git
cd Chat-App-GQL

```

### **2️⃣ Install Dependencies**

#### **Frontend**

```sh
cd frontend
npm install

```

#### **Backend**

```sh
cd backend
npm install

```

### **3️⃣ Set Up Environment Variables**

Create a `.env` file in the **backend** folder with the following:

```env
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/chatapp
JWT_SECRET=your_jwt_secret
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret

```

### **4️⃣ Start the Development Server**

#### **Backend**

```sh
cd backend
npm run dev

```

#### **Frontend**

```sh
cd frontend
npm run dev

```

Open **`http://localhost:3000`** to view the chat app.

----------

## 🎯 **GraphQL API Endpoints**

### 🔹 **User Authentication**

-   `me(Token Based)`
-   `lgouot(Token Based)`
-   `registerUser(username, email, password, gender)`
-   `loginUser(email, password)`

### 🔹 **Messaging**

-   `getMessage`
-   `sendMessage(conversationId, message)`
-   `getConversations(conversationId)`

### 🔹 **Search**


----------

## 🛠️ **Future Enhancements**

✅ **Message Read Receipts**  
✅ **Typing Indicators**  
✅ **Group Chats**

----------