import * as db from "../utils/db";
import * as usersQueries from "../queries/users.queries";
import { UpdateUserProfile } from "../types/express";

export const getUserProfileById = async (userId: string) => {
  const result = await db.query(usersQueries.GET_USER_PROFILE_BY_ID, [userId]);

  if (!result.rows.length) {
    throw new Error("User not found");
  }
  return result.rows[0];
};

export const updateUserProfile = async (
  userId: string,
  data: UpdateUserProfile,
) => {
  // 1. Ensure the profile row exists before updating
  const isExisting = await db.query(
    "SELECT 1 FROM profiles WHERE user_id = $1",
    [userId],
  );
  if (isExisting.rows.length === 0) {
    throw new Error("User Profile not found");
  }

  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  // 2. Map incoming camelCase properties to database snake_case columns
  const columnMap: Record<string, string> = {
    currentTitle: "current_title",
    bio: "bio",
    yearsExperience: "years_experience",
    skills: "skills",
    city: "city",
    country: "country",
    linkedinUrl: "linkedin_url",
    githubUrl: "github_url",
    portfolioUrl: "portfolio_url",
    twitterUrl: "twitter_url",
    leetcodeUrl: "leetcode_url",
    expectedSalary: "expected_salary",
    remoteOnly: "remote_only",
    jobSearchStatus: "job_search_status",
  };

  // Loop over payload entries
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && key !== "updatedAt" && key !== "updated_at") {
      const dbColumn = columnMap[key] || key;
      fields.push(`${dbColumn} = $${index}`);
      values.push(value);
      index++;
    }
  }

  if (fields.length === 0) {
    throw new Error("No fields provided to update");
  }

  // Safely appends the manual DB timestamp adjustment
  fields.push(`updated_at = now()`);

  // where user
  values.push(userId);

  const queryText = usersQueries.buildUpdateProfileQuery(fields, index);

  const result = await db.query(queryText, values);
  return result.rows[0];
};
