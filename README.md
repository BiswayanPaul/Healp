# 🩺 HEALP - Healthcare Search & Booking Platform

Healp is a modern, full-stack healthcare web application that helps users find doctors, hospitals, and health packages easily, with intelligent fuzzy search support. It also allows users to book appointments and explore medical services through a clean and responsive UI.

[🌐 Live Demo](https://healp.vercel.app)

---

## 🚀 Features

- 🔍 **Global Fuzzy Search** (powered by Fuse.js) for doctors, hospitals, and packages
- 🏥 Browse hospitals and doctors with specializations and ratings
- 🧑‍⚕️ Doctor profiles with degree and specialty
- 📅 Appointment booking interface (WIP)
- 🌓 Dark mode support with persistent theme toggle
- 🔐 Authentication using **Clerk**
- 🧠 Smart routing based on keyword intent (e.g., "find hospitals in Hyderabad")
- 💻 Fully responsive design with Tailwind CSS

---

## 🛠️ Tech Stack

| Layer        | Tech                                   |
|--------------|----------------------------------------|
| Frontend     | Next.js App Router (v15)               |
| UI           | Tailwind CSS + Radix UI + Lucide Icons |
| Backend      | API Routes via Next.js (Server Actions)|
| Database     | PostgreSQL + Prisma ORM                |
| Auth         | Clerk                                  |
| Search       | Fuse.js (fuzzy search)                 |
| Deployment   | Vercel                                  |

---

 ## 🔧 Getting Started – Local Setup To run this project on your local machine, follow these steps: 
 
 ### 1. Clone the Repository 
 ```bash 
 git clone https://github.com/BiswayanPaul/Healp.git cd Healp 
 ``` 
 ### 2. Install Dependencies 
 ```bash 
 npm install 
 ``` 
 
 ### 3. Setup Environment Variables 
 Copy the `.env.example` file and create a `.env` file with your actual credentials: 
 ```bash 
 cp .env.example .env 
 ``` 
 Open the `.env` file and replace the placeholder values: 
 ```
 env 
 # Clerk Configuration NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/signin/ NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/ NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/ NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key CLERK_SECRET_KEY=your_clerk_secret_key 
 ``` 
 > 🧠 You can get the Clerk keys from your [Clerk dashboard](https://dashboard.clerk.com/). 
 ### 4. Generate Prisma Client 
 ```bash 
 npx prisma generate 
 ```
### 5. Run the Development Server 
```bash 
npm run dev 
``` 

Visit [http://localhost:3000](http://localhost:3000) in your browser — you're now up and running! 🚀
