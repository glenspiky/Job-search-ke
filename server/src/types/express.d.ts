import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

// user profile
export type UserProfile = {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
  currentTitle?: string | null;
  yearsExperience?: number | null;
  city?: string | null;
  country?: string | null;
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  portfolioUrl?: string | null;
  expectedSalary?: number | null;
  remoteOnly?: boolean | null;
};

export type UpdateUserProfile = Partial<
  Omit<UserProfile, "id" | "createdAt", "updatedAt">
>;
