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

Images-
![m1](https://github.com/user-attachments/assets/a6214ad5-576a-47c4-b524-a66554bd19c4)
![m6](https://github.com/user-attachments/assets/f9026798-fd19-4011-89d2-75cb29de3511)
![m12](https://github.com/user-attachments/assets/97ea5ee2-674b-40b1-ab83-c3f1969d25b0)
![m7](https://github.com/user-attachments/assets/1e077162-71b3-49b4-b7c1-879f1cecf437)
![m8](https://github.com/user-attachments/assets/7a6289c8-0951-4025-b431-b54c37737bf3)
![m9](https://github.com/user-attachments/assets/f59fcfd6-1ee9-4ebd-9e39-8fc89f7462e3)
![n3](https://github.com/user-attachments/assets/d9bd1f91-f30d-4d03-81c5-650f57fb8067)
![m11](https://github.com/user-attachments/assets/a53eef3b-7dab-47b6-96ec-b51ec7d0407c)
![m13](https://github.com/user-attachments/assets/44045855-2b93-4993-8c6f-640e344f6cf8)
![m14](https://github.com/user-attachments/assets/6e19a665-71d6-48e6-8540-274f29106532)
![m15](https://github.com/user-attachments/assets/37273dfc-c9d4-4a08-b4c3-7cd12a46cc5d)
![m16](https://github.com/user-attachments/assets/7d579527-4315-4952-82a4-a5b8a0cb4821)
![n4](https://github.com/user-attachments/assets/646c778a-ca43-41e4-bca1-f871af874a3a)















