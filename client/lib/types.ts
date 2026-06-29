import { z } from "zod";

export type UserProfile = {
  _id?: string;
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

// export type UpdateUserProfile = Partial<
//   Omit<UserProfile, "_id" | "createdAt", "updatedAt">
// >;
//

export interface User {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

// zode schema
export const UserProfileSchema = z.object({
  _id: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  currentTitle: z.string().nullable().optional(),
  yearsExperience: z.number().nullable().optional(),
  city: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  portfolioUrl: z.string().url().optional().or(z.literal("")),
  expectedSalary: z.number().nullable().optional(),
  remoteOnly: z.boolean().nullable().optional(),
});

export type UserProfileData = z.infer<typeof UserProfileSchema>;
