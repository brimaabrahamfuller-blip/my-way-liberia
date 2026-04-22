export type UserRole = "STUDENT" | "EMPLOYER" | "COUNSELOR";

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: UserRole;
  isPremium: boolean;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  salary?: string | null;
  jobType: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobApplication {
  id: string;
  userId: string;
  jobId: string;
  status: string;
  coverLetter?: string | null;
  appliedAt: Date;
  job?: Job;
}

export interface MentorshipRequest {
  id: string;
  studentId: string;
  mentorId: string;
  status: string;
  message?: string | null;
  createdAt: Date;
  student?: User;
}
