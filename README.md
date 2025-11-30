# Task Management App - Backend

## Overview
This is the backend of the Task Management Application. It provides RESTful APIs for user authentication and task management. Built using **Node.js**, **Express**, and **MongoDB** with **Mongoose** for object modeling. JWT authentication is used for secure access.

---

## **Technology Stack**
- **Node.js / Express**
- **MongoDB** as the database
- **Mongoose** for schema modeling
- **JWT** for authentication

---

## **Features**
1. **Authentication**
   - User Registration (`POST /api/auth/register`)
   - User Login (`POST /api/auth/login`) returning JWT
   - Middleware to protect routes

2. **Task Management**
   - CRUD operations on tasks:
     - `GET /api/tasks` – get all tasks for the logged-in user
     - `POST /api/tasks` – create a new task
     - `PUT /api/tasks/:id` – update task
     - `DELETE /api/tasks/:id` – delete task
   - Tasks have:
     - `title` (string)
     - `description` 
     - `status` (pending/completed)
   - Users can only manage their own tasks

3. **Validation**
   - Request body validation (can use `express-validator`)
   - Graceful error handling

---

## **Getting Started**

### **Prerequisites**
- Node.js >= 18
- npm installed
- MongoDB running locally or remotely

### **Installation**
```bash
git clone <repository-url>
cd backend
npm install
# or
yarn install
