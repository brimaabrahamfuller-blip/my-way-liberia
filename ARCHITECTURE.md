# CareerPath Liberia - Architecture & Setup Guide

## 🎯 Project Overview

**Myway** is a professional career development platform built with Next.js 14, connecting:
- **Students** - Career guidance, job search, resume building, mentorship
- **Employers** - Job posting, candidate search, hiring pipeline
- **Counselors** - Mentee management, match requests, student progress tracking

---

## 📁 Complete Project Structure

```
CareerPathLiberia/
├── src/
│   ├── app/
│   │   ├── (auth)/                    # Authentication pages
│   │   │   └── signin/page.tsx
│   │   │   └── signup/page.tsx
│   │   ├── dashboard/
│   │   │   ├── student/page.tsx       # Student dashboard
│   │   │   ├── employer/page.tsx      # Employer dashboard
│   │   │   └── counselor/page.tsx     # Counselor dashboard
│   │   ├── api/
│   │   │   ├── resume/route.ts        # Resume CRUD endpoints
│   │   │   ├── experience/route.ts    # Work experience endpoints
│   │   │   ├── education/route.ts     # Education endpoints
│   │   │   ├── applications/route.ts  # Job applications
│   │   │   └── [...auth]/route.ts     # NextAuth routes
│   │   ├── career-quiz/page.tsx       # Career persona quiz
│   │   ├── jobs/page.tsx              # Job search
│   │   ├── resume/page.tsx            # Resume builder
│   │   ├── post-job/page.tsx          # Post job (employer)
│   │   ├── candidate-search/page.tsx  # Search candidates (employer)
│   │   ├── ai-coach/page.tsx          # AI career coach
│   │   ├── messages/page.tsx          # Messaging
│   │   ├── mentorship-request/page.tsx
│   │   ├── student-registry/page.tsx
│   │   ├── match-requests/page.tsx
│   │   ├── achievements/page.tsx
│   │   ├── learning-paths/page.tsx
│   │   ├── layout.tsx                 # Root layout
│   │   ├── page.tsx                   # Home/landing page
│   │   ├── error.tsx                  # Error boundary
│   │   └── not-found.tsx              # 404 page
│   ├── lib/
│   │   ├── prisma.ts                  # Prisma client instance
│   │   ├── auth.ts                    # NextAuth configuration
│   │   ├── auth-utils.ts              # Auth helper functions
│   │   ├── claude.ts                  # Claude AI configuration
│   │   ├── api-error.ts               # API error utilities
│   │   ├── validation.ts              # Input validation helpers
│   │   ├── validation.test.ts
│   │   └── api-error.test.ts
│   ├── components/
│   │   └── Navbar.tsx                 # Navigation component
│   └── middleware.ts                  # NextAuth middleware
├── prisma/
│   └── schema.prisma                  # Database schema
├── public/                            # Static assets
├── jest.config.js                     # Testing configuration
├── jest.setup.js
├── tsconfig.json
├── tailwind.config.ts
├── package.json
└── README.md
```

---

## 🔑 Key Features Implemented

### ✅ Authentication & Authorization
- **NextAuth.js v4** with JWT strategy
- Role-based access control (STUDENT, EMPLOYER, COUNSELOR)
- Protected routes with middleware
- Credentials provider (email/password)

### ✅ Database (Prisma)
- PostgreSQL with proper relationships
- Models: User, Profile, Resume, Experience, Education, Application, Job, Message, Skill
- Cascading deletes for data integrity
- Database indexes for performance

### ✅ Resume Builder
- Save professional title, summary, skills
- Add/edit/delete work experience
- Add/edit/delete education entries
- All changes persist to database
- CRUD API endpoints

### ✅ Role-Based Dashboards
- **Student Dashboard** - 8 feature cards (career quiz, AI coach, job search, etc.)
- **Employer Dashboard** - Post jobs, search candidates
- **Counselor Dashboard** - Manage mentees, handle requests

### ✅ Feature Pages (Implemented)
- Career Quiz - Interactive persona discovery
- Job Search - Browse and filter opportunities
- Post Job - Employer job posting form
- Candidate Search - Find talent by skills
- Resume Builder - Full resume management
- Messaging - Placeholder for real-time chat
- Mentorship - Request mentors
- Achievements - Track milestones

### ✅ Error Handling & Validation
- Global error boundary (error.tsx)
- 404 handling (not-found.tsx)
- Input validation utilities
- API error response formatting
- Unauthorized access page

### ✅ Testing Framework
- Jest configuration
- Testing Library setup
- Example unit tests for validation and errors
- Ready for integration tests

---

## 🚀 Getting Started

### 1. **Install Dependencies**
```bash
npm install
```

### 2. **Setup Environment Variables**
Create `.env.local`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/myway"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
ANTHROPIC_API_KEY="your-claude-api-key"
```

### 3. **Setup Database**
```bash
npm run db:push          # Push schema to database
npm run db:generate      # Generate Prisma client
npm run db:studio       # Open Prisma Studio (GUI)
```

### 4. **Run Development Server**
```bash
npm run dev
```
Visit `http://localhost:3000`

### 5. **Run Tests**
```bash
npm test                # Run all tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
```

---

## 🔐 Route Protection & Access Control

### Public Routes
- `/` - Home/landing page
- `/auth/signin` - Sign in
- `/auth/signup` - Sign up

### Protected Routes (Requires Authentication)
- `/dashboard/*` - All dashboards
- `/resume/*` - Resume builder
- `/jobs` - Job search
- `/messages` - Messaging
- etc.

### Role-Specific Routes
```typescript
// Student-only routes
/dashboard/student
/career-quiz
/resume

// Employer-only routes
/dashboard/employer
/post-job
/candidate-search

// Counselor-only routes
/dashboard/counselor
/student-registry
/match-requests
```

---

## 📊 API Endpoints

### Resume Endpoints
```
GET    /api/resume           - Fetch user's resume
POST   /api/resume           - Create resume
PUT    /api/resume           - Update resume
DELETE /api/resume           - Delete resume
```

### Experience Endpoints
```
GET    /api/experience       - List all experience entries
POST   /api/experience       - Add experience
PUT    /api/experience       - Update experience
DELETE /api/experience?id=   - Delete experience
```

### Education Endpoints
```
GET    /api/education        - List all education entries
POST   /api/education        - Add education
PUT    /api/education        - Update education
DELETE /api/education?id=    - Delete education
```

### Applications Endpoints
```
GET    /api/applications     - List user's applications
POST   /api/applications     - Apply to job
PUT    /api/applications     - Update application
DELETE /api/applications?id= - Remove application
```

---

## 🔧 Technology Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 14.2 |
| Language | TypeScript 5 |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth.js v4 |
| Styling | Tailwind CSS |
| AI Integration | Claude (Anthropic SDK) |
| Testing | Jest + React Testing Library |
| Email | Resend |
| Hashing | bcryptjs |
| Validation | Zod |

---

## 📝 Database Schema Highlights

### User Model
```typescript
id           String    @id @default(cuid())
name         String?
email        String    @unique
password     String?
role         Role      @default(STUDENT)  // STUDENT, EMPLOYER, COUNSELOR
isPremium    Boolean   @default(false)
createdAt    DateTime  @default(now())
updatedAt    DateTime  @updatedAt
profile      Profile?
resume       Resume?
experience   Experience[]
education    Education[]
applications Application[]
```

### Resume Model
```typescript
id              String        @id @default(cuid())
userId          String        @unique
title           String?
summary         String?
skills          String[]
certifications  String[]
languages       String[]
experience      Experience[]
education       Education[]
createdAt       DateTime      @default(now())
updatedAt       DateTime      @updatedAt
```

---

## 🎨 UI/UX Features

- **Responsive Design** - Mobile-first approach with Tailwind
- **Role-Based Colors** - Student (blue), Employer (green), Counselor (purple)
- **Consistent Navigation** - Navbar on all pages
- **Tab-Based Forms** - Resume builder with organized sections
- **Loading States** - User feedback during async operations
- **Error Messages** - Clear error boundaries and messages
- **Progress Indicators** - Quiz progress bars, file upload status

---

## 🔄 Next Steps (Priority Order)

### P0 - Critical
- [ ] Setup and verify database connection
- [ ] Test all API endpoints with Postman/Insomnia
- [ ] Create sign-up/signin pages
- [ ] Test role-based access on protected routes

### P1 - Important
- [ ] Connect AI Coach to Claude API with streaming
- [ ] Implement Stripe for premium features
- [ ] Add email notifications (Resend)
- [ ] Setup real-time messaging (Socket.io or Supabase Realtime)

### P2 - Enhancement
- [ ] Add PDF export for resumes
- [ ] Implement job application statuses
- [ ] Add progress analytics
- [ ] Setup logging/monitoring (Sentry)

### P3 - Polish
- [ ] Add rich text editor for job descriptions
- [ ] Implement file upload (CV, profile picture)
- [ ] Add search filters and sorting
- [ ] Create admin dashboard

---

## 📞 Support & Resources

- **Next.js**: https://nextjs.org/docs
- **Prisma**: https://www.prisma.io/docs
- **NextAuth**: https://next-auth.js.org
- **Tailwind**: https://tailwindcss.com/docs
- **Claude API**: https://docs.anthropic.com

---

## ✅ Development Checklist

- [x] Project structure setup
- [x] Database schema with Prisma
- [x] Authentication with NextAuth
- [x] Role-based access control
- [x] Resume builder with persistence
- [x] API routes for CRUD operations
- [x] Error handling and validation
- [x] Unit tests setup
- [x] Role dashboards created
- [x] Feature pages scaffolded
- [ ] Environment variables configured
- [ ] Database deployed
- [ ] Authentication fully tested
- [ ] Deployed to production

---

**Last Updated:** March 30, 2026  
**Status:** Ready for Development  
**Next Action:** Setup environment variables and database connection
