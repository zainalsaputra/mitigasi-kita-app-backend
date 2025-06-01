# MITIGASIKITA APPLICATION API

- **Framework**: Express.js
- **Language**: TypeScript
- **Package Manager**: NPM v10.9.2
- **Node Version**: 22.15.1 LTS
- **Architecture**: RESTful API
- **Design Pattern**: Layered Architecture
- **Database**: PostgreSQL & MongoDB
- **ORM**: Prisma Client

## Production URL [AWS]

- [](upcoming)

## **Tools**

### **Backend**

- Prisma ORM
- ESLint
- Amazon Web Services (AWS)
- Vercel (for development pre-production)
- Swagger
- Nodemon
- dotenv
- ZOD
- Morgan
- Winston
- helmet
- body-parser
- cookie-parser
- express-rate-limit
- jsonwebtoken (JWT)
- bcryptjs
- PM2 (Process Management)
- Nginx (Reverse Proxy)
- Certbot (SSL/TLS HTTPS)
- Crontab (Auto SSL Renewal)

### **AI Server**

-

### **RDBMS Cloud Server**

-

### **Deployment Infrastructure (AWS)**

-

## **Features**

### **Authentication & Authorizations**

-

### **Activity Log**

-

## **Application History**

-

## **PostgreSql Extension**

- uuid-ossp

## **Database Management**

-

## **Todo (Next Milestones)**

-

### Steps to Setup

```bash
# 1. Clone the repository
git clone https://github.com/zainalsaputra/mitigasi-kita-app-backend
cd mitigasi-kita-app-backend

# 2. Install all dependencies
npm install

# 3. Create and configure the environment variables
cp .env.example .env
# → Edit .env file to match your database and JWT configurations

# 4. Generate the Prisma client
npx prisma generate

# 5. Run the database migrations
npx prisma migrate dev --name init

# 6. Run development server
npm run start

---

## ❓ FAQ

**Q: Aplikasi tidak connect ke DB?**
A: Periksa `.env` → pastikan configurasi database (PostgreSql & MongoDB) sesuai dengan yang anda gunakan.

---
```
