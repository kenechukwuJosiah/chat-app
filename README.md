# Chat App Setup Guide

## Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (Recommended: v16 or later)
- **pnpm** (Install with: `npm install -g pnpm`)
- **PostgreSQL** (Ensure it's running and accessible)

---

## 1️⃣ Install Dependencies

Run the following command to install all required packages:

```bash
pnpm i
```

---

## 2️⃣ Configure Environment Variables

Create a `.env` file in the project root and add the following values:

```env
# JWT Configuration
JWT_SECRET=ZmRmYjRkODRlODEwZDAzMTgxOGI3MzJiYTVhMzcyMrott

# Database Configuration
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=chat_app

# Application Port
APP_PORT=4000
```

> Replace `your_username` and `your_password` with your actual database credentials.

---

## 3️⃣ Set Up the Database & Run Migrations

Run the following command to generate migrations:

```bash
pnpm migration:generate
```

Apply the migrations to the database:

```bash
pnpm migration:run
```

> If needed, you can revert a migration with:

```bash
pnpm migration:revert
```

---

## 4️⃣ Seed the Database

To seed initial data into the database, run:

```bash
pnpm db:seed
```

---

## 5️⃣ Start the Application

Run the application in development mode:

```bash
pnpm start:dev
```

The server should now be running on `http://localhost:4000`.

**Available Routes:**

- **Base Path:** `/v1/chat-app`
- **Authentication:** `/v1/chat-app/auth/login` (POST)
- **Rooms:**
  - Create Room: `/v1/chat-app/rooms` (POST)
  - Get Rooms: `/v1/chat-app/rooms` (GET)

Once the app starts, you should see logs confirming successful startup:

```
[Nest] 21532  - 02/28/2025, 1:28:21 PM     LOG [NestApplication] Nest application successfully started
[Nest] 21532  - 02/28/2025, 1:28:21 PM     LOG APP IS LISTENING ON 4000
```

---

## 6️⃣ Additional Database Commands

### Create a New Migration

```bash
pnpm migration:create
```

### Revert Last Migration

```bash
pnpm migration:revert
```

---

## 🚀 You're all set!
