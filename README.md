# 🚀 Job Portal (MERN Stack)

A full-stack Job Portal application with authentication, role-based access control, and job application system.

---

## 🔥 Features

- 🔐 JWT Authentication (Login / Register)
- 👤 Role-based access (Admin / User)
- 🧑‍💼 Admin can create jobs
- 📩 Users can apply for jobs
- 🚫 Prevent duplicate applications
- 📊 Track applicants in MongoDB

---

## 🧠 Tech Stack

- Frontend: React, CSS  
- Backend: Node.js, Express.js  
- Database: MongoDB (Mongoose)  
- Authentication: JWT, bcrypt  

---

## ⚙️ Project Structure

job-portal/

├── backend/
 ── controllers/
 ── models/
 ── routes/
 ── middleware/
 ── server.js

├── frontend/
 ── src/
 ── public/
 
---

## 🔐 Authentication Flow

1. User logs in → JWT token generated  
2. Token stored in frontend  
3. Protected routes verify token using middleware  
4. Role-based access (admin / user)

---

## 📌 Key Logic

Job applications are stored as:

```js
job.applicants = [userId]
