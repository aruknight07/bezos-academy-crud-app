# 🧾 Bezos academy Logs App

A basic full-stack application that provides Create, Read, Update, and Delete (CRUD) operations for managing logs. Built using modern web technologies including **React**, **TypeScript**, **Node.js**, **Express**, and **better-sqlite3**.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (v7 or higher)

### Installation

```
git clone https://github.com/aruknight07/bezos-academy-crud-app.git
cd bezos-academy-crud-app
cd /server
npm install
cd ../client
npm install
```

## Run the App
This project uses a single command to run both the Vite dev server (for React) and the Express server. In the root directory, execute the following command:
```
npm run dev
```

This will:

- Start the Vite development server for the frontend
- Start the Express server with SQLite for backend operations

After the command has been executed, open the `http://localhost:5173/` address in a browser in order to interact with the application.

## 🛠️ Technologies Used
- Language | JavaScript / TypeScript  
- Frontend | React, Vite  
- Backend | Node.js, Express  
- Database | better-sqlite3

## Project structure
```
/client       → Frontend React App (Vite)
/server       → Backend Express App
```

## ✅ Features
- Add new logs
- View existing logs
- Update log entries
- Delete logs
- Simple, fast local development setup
