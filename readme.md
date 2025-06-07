# MITIGASIKITA APPLICATION API

---

## General Information

- **Framework**: Express.js  
- **Language**: TypeScript  
- **Package Manager**: NPM v10.9.2  
- **Node Version**: 22.15.1 LTS  
- **Architecture**: RESTful API  
- **Design Pattern**: Layered Architecture  
- **Databases**: PostgreSQL & MongoDB  
- **ORM**: Prisma Client  
- **Production Server**: Railway  

---

## Production URL [Takedown on June 30, 2025]

**URL:** [https://mitigasi-kita-app-backend-production.up.railway.app/](https://mitigasi-kita-app-backend-production.up.railway.app/)

---

## Tools & Dependencies

### Backend Libraries

- `express`  
- `prisma` (ORM)  
- `jsonwebtoken` (JWT)  
- `zod` (schema validation)  
- `bcryptjs` (password hashing)  
- `dotenv`  
- `helmet` (security middleware)  
- `body-parser`  
- `cookie-parser`  
- `express-rate-limit`  
- `morgan` (HTTP logging)  
- `winston`, `winston-mongodb` (logging system)  
- `nodemon`
- `eslint` (linter)  
- `swagger` (API documentation)
- `nodemailer` (mailer)

### Cloud Database Services

- **PostgreSQL** via [Neon](https://neon.tech)  
- **MongoDB** via [MongoDB Atlas](https://www.mongodb.com/atlas)

---

## Features

- Authentication & Authorizations
- Forgot Password & Reset Password
- Activity Logging
- Application History

---

## PostgreSQL Extensions

*To be updated with required extensions such as `uuid-ossp`, `pgcrypto`, etc.*

---

## Database Management

*Details on schema design, ERD, and Prisma model definitions to be added.*

---

## Roadmap / Todo (Next Milestones)

- [+++] 

---

## Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/zainalsaputra/mitigasi-kita-app-backend
cd mitigasi-kita-app-backend

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# → Edit the .env file to match your database and JWT configurations

# 4. Generate Prisma client
npm run generate:postgres

# 5. Run database migrations
npm prisma migrate dev --name first-migration

# 6. Start the development server
npm run start
```
---

## FAQ (Frequently Asked Questions)

**Q: The application is not connecting to the database. What should I do?**
**A**: Please check your .env file. Ensure that your PostgreSQL and MongoDB connection strings are correct and accessible.

---

## License

> MIT License - Use freely with attribution.
