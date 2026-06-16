# 🏥 Healthcare Record Management System

A secure full-stack healthcare application that enables patients to manage medical records and control doctor access through a permission-based workflow.

Built using the MERN stack with authentication, role-based access control, and secure record handling.

---

## 🚀 Features

### Authentication & Authorization

* Secure user registration and login
* Cookie-based authentication
* Backend authentication verification on every request
* Role-based access control

### Patient Dashboard

* Register as a patient
* Upload healthcare records
* View uploaded records
* Delete records
* Manage access permissions
* Approve or reject doctor requests

### Doctor Dashboard

* Register as a doctor
* Search patients using unique User ID
* Send access requests
* View records only after patient approval
* Track request status

### Record Management

* Secure record storage
* Controlled access workflow
* Permission-based record visibility

---

## 🛠 Tech Stack

### Frontend

* React.js
* Redux
* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Authentication

* JWT
* Cookies

### Cloud Services

* ImageKit

---

## 🔄 Application Workflow

### Registration

User registers and selects:

* Patient
* Doctor

### Patient Flow

Register → Login → Upload Records → Manage Permissions → Approve/Reject Requests

### Doctor Flow

Register → Login → Search Patient → Send Request → Access Approved Records

---

## 🔐 Security Features

* Cookie-based authentication
* Protected routes
* Backend token verification
* Role-based authorization
* Secure record access workflow

---

## 📸 Screenshots

Add screenshots here:

### Landing Page

(Add image)

### Patient Dashboard

(Add image)

### Doctor Dashboard

(Add image)

### Access Request Workflow

(Add image)

---

## ⚙️ Installation

Clone repository

```bash
git clone YOUR_REPOSITORY_URL
```

Install dependencies

```bash
npm install
```

Start frontend

```bash
npm run dev
```

Start backend

```bash
npm start
```

---

## 🔑 Environment Variables

Create a `.env` file:

```env
PORT=
MONGODB_URI=
JWT_SECRET=
IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
CLIENT_URL=
```

---

## 📌 Future Improvements

* Notifications for access requests
* Email verification
* AI-powered medical record summary
* Appointment booking
* Admin dashboard

---

## 👨‍💻 Author

Anurag Singh

GitHub:
https://github.com/AnuragSingh-git
