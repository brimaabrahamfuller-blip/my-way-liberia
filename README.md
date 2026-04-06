# Myway - Career Platform for Liberia

A comprehensive career guidance and job matching platform built for Liberian students, employers, and counselors.

## 🎯 Features

- **For Students:** Career quizzes, job search, AI coaching, resume building, mentorship
- **For Employers:** Job posting, candidate search, talent management
- **For Counselors:** Student guidance, mentee management, analytics
- **For Everyone:** AI-powered career coaching, offline support, mobile-first design

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Express.js (optional)
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js with JWT strategy
- **AI:** Anthropic Claude API
- **Deployment:** Vercel

## 📋 Prerequisites

- Node.js 18+ or 20+
- npm, yarn, or pnpm
- PostgreSQL database
- Anthropic API key

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/brimaabrahamfuller-blip/my-way-liberia.git
cd my-way-liberia
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Set Up Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/myway"
DIRECT_URL="postgresql://user:password@localhost:5432/myway"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"

# Anthropic AI
ANTHROPIC_API_KEY="sk-ant-api03-..."
```

### 4. Set Up Database

```bash
# Run migrations
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate
```

### 5. Run Development Server

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Project Structure

```
my-way-liberia/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── api/               # API routes
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # User dashboards
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   ├── lib/                   # Utility functions
│   │   ├── auth.ts           # NextAuth configuration
│   │   ├── prisma.ts         # Prisma client
│   │   ├── types.ts          # TypeScript types
│   │   └── validation.ts     # Input validation
│   └── app/globals.css        # Global styles
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static assets
├── next.config.js             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
└── package.json               # Dependencies
```

## 🔐 Authentication

The application uses NextAuth.js with credentials provider. Users can sign up and sign in with email and password.

### Sign Up

1. Go to `/auth/signup`
2. Enter name, email, password, and select role
3. Account is created and user can sign in

### Sign In

1. Go to `/auth/signin`
2. Enter email and password
3. User is authenticated and redirected to dashboard

## 📊 Database Schema

The database includes tables for:

- **Users:** User accounts with roles (STUDENT, EMPLOYER, COUNSELOR)
- **Jobs:** Job postings
- **Job Applications:** User job applications
- **Education:** User education history
- **Experience:** User work experience
- **Resume:** User resumes
- **Mentorship Requests:** Mentorship connections
- **Messages:** User messages

See `prisma/schema.prisma` for full schema.

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Generate coverage report
npm run test -- --coverage
```

## 🔍 Linting and Formatting

```bash
# Run ESLint
npm run lint

# Format code with Prettier
npm run format
```

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import the repository
4. Add environment variables
5. Deploy

```bash
# Or use Vercel CLI
npm install -g vercel
vercel
```

### Environment Variables for Production

Set these in Vercel dashboard:

- `DATABASE_URL` - PostgreSQL connection string
- `DIRECT_URL` - Direct database URL for migrations
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your production URL
- `ANTHROPIC_API_KEY` - Your API key

## 📖 API Documentation

### Authentication Endpoints

- `POST /api/auth/signin` - Sign in user
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/signout` - Sign out user

### User Endpoints

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Job Endpoints

- `GET /api/jobs` - List jobs
- `POST /api/jobs` - Create job (employer only)
- `GET /api/jobs/:id` - Get job details
- `DELETE /api/jobs/:id` - Delete job (employer only)

### Application Endpoints

- `POST /api/applications` - Apply for job
- `GET /api/applications` - List user applications
- `GET /api/applications/:id` - Get application details

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## 📝 Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Format code with Prettier
- Write tests for new features
- Add comments for complex logic

## 🐛 Bug Reports

Found a bug? Please create an issue with:

- Description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👥 Team

- **Brima Abraham Fuller** - Lead Developer

## 🙏 Acknowledgments

- Built for the Liberian community
- Powered by Next.js, React, and Prisma
- AI coaching by Anthropic Claude

## 📞 Support

For support, email support@myway.com or open an issue on GitHub.

---

**Made with ❤️ for Liberia** 🇱🇷
