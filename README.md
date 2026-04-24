# 📡 FrontPage Feed Reader

FrontPage is a modern, full-stack RSS Feed Reader application designed for a seamless content consumption experience. Built with the latest web technologies, it offers a fast, responsive, and intuitive interface for managing your daily information flow.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Better-Auth](https://img.shields.io/badge/Better--Auth-Security-blue?style=for-the-badge)

## ✨ Features

- **🚀 Real-time Feed Fetching**: Stay updated with the latest content from your favorite RSS sources.
- **📁 Smart Categorization**: Organize your subscriptions into custom categories (Tech, News, Design, etc.).
- **🔖 Save for Later**: Bookmark important articles to your "Saved" collection with a single click.
- **🔍 Discover Hub**: Explore curated feed recommendations and expand your horizons.
- **🔐 Secure Authentication**: Robust login system featuring:
  - Email & Password
  - Social Login (GitHub & Google) via Better-Auth.
- **🌓 Dynamic Theme**: Beautifully designed interface with full Dark and Light mode support.
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile viewing.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Database**: [PostgreSQL (Neon)](https://neon.tech/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [Better-Auth](https://better-auth.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone git@github.com:iheb1919/frontpage-feed-reader-main.git
cd frontpage-feed-reader-main
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory and add the following variables:

```env
# Database (Neon/PostgreSQL/etc)
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# Better-Auth Configuration
BETTER_AUTH_SECRET="your_random_secret_here"
BETTER_AUTH_URL="http://localhost:3000"



### 4. Database Initialization

Sync your database schema and generate the Prisma client:

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the Application

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## 📂 Project Structure

- `app/`: Next.js App Router (Pages and Layouts)
- `components/`: Reusable UI and App-specific components
- `lib/`: Core logic, Auth configuration, and Prisma client
- `prisma/`: Database schema and migrations
- `hooks/`: Custom React hooks for state and interactions

## 📄 License

This project is open-source and available under the MIT License.
