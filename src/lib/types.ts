import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

export type UserRole = "STUDENT" | "EMPLOYER" | "COUNSELOR";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      isPremium: boolean;
      email: string;
      name: string | null;
      image: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: UserRole;
    isPremium: boolean;
    email: string;
    name: string | null;
    image: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    isPremium: boolean;
  }
}

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  isPremium: boolean;
  image: string | null;
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salary?: string;
  jobType: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP";
  createdAt: Date;
  updatedAt: Date;
}

export interface JobApplication {
  id: string;
  userId: string;
  jobId: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  appliedAt: Date;
}

export interface Education {
  id: string;
  userId: string;
  school: string;
  degree: string;
  field: string;
  startYear: number;
  endYear?: number;
  createdAt: Date;
}

export interface Experience {
  id: string;
  userId: string;
  company: string;
  title: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  createdAt: Date;
}

export interface Resume {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MentorshipRequest {
  id: string;
  studentId: string;
  mentorId: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  message?: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
}
