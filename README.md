# 🏢 Society Management System

A full-featured web application designed to streamline society management by providing separate panels for **Admins** and **Owners**. Built using the **MERN stack**, this system handles everything from room information and visitor tracking to complaints, notices, and online payments with **Stripe**. It also uses **Nodemailer** to send automatic confirmation emails upon successful maintenance payments.

---

## 🚀 Features

### 👨‍💼 Admin Panel
- 🔍 **View Room Information**  
- 🚪 **View Visitors Info**  
- 💰 **View Payment Info (Maintenance)**  
- 📢 **Send Notices to Owners**  
- 🛠️ **View Complaints from Owners**

### 🏠 Owner Panel
- 📝 **Send Complaints to Admin**  
- 🧾 **View Notices from Admin**  
- 💳 **Pay Maintenance Fees via Stripe**

Upon successful payment, an automatic confirmation email is sent to the owner's registered email address using **Nodemailer**.

---

## 🛠️ Tech Stack

| Technology     | Role                                  |
|----------------|---------------------------------------|
| MongoDB        | Database                              |
| Express.js     | Backend framework                     |
| React.js       | Frontend framework                    |
| Node.js        | Runtime environment                   |
| Stripe         | Payment processing (Maintenance Fees) |
| Nodemailer     | Sends email confirmations             |

---

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/suhanichavan30/Society-Management-System.git
   cd Society-Management-System
   cd Backend
   npm install
   cd Frontend
   npm install

   Backend:npm start
   Frontend (using Vite):npm run dev

💡 Usage
Admin logs in using admin credentials to manage society-related data and operations.

Owners can register, log in, view notices, lodge complaints, and pay maintenance fees.

Upon payment, a Stripe transaction is triggered, and Nodemailer sends a confirmation email to the user.

🔐 Security
.env files are not tracked in Git using .gitignore

Stripe secret keys and email credentials are securely stored in .env

Push protection is enabled to prevent accidental secret leaks


