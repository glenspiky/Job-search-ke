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

// export type UpdateUserProfile = Partial<
//   Omit<UserProfile, "id" | "createdAt", "updatedAt">
// >;
//

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}
