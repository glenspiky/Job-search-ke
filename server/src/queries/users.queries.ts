export const GET_USER_PROFILE_BY_ID = `
  SELECT
    u.id,
    u.email,
    u.first_name AS "firstName",
    u.last_name AS "lastName",
    u.phone,
    u.created_at AS "createdAt",  
    u.updated_at AS "updatedAt",
    p.current_title AS "currentTitle",
    p.years_experience AS "yearsExperience",
    p.city,
    p.country,
    p.linkedin_url AS "linkedinUrl",
    p.github_url AS "githubUrl",
    p.portfolio_url AS "portfolioUrl", -- Fixed the typo here!
    p.expected_salary AS "expectedSalary",
    p.remote_only AS "remoteOnly"
  FROM users u
  LEFT JOIN profiles p ON u.id = p.user_id
  WHERE u.id = $1;
`;

export const buildUpdateProfileQuery = (fields: string[], index: number) => {
  return `
    UPDATE profiles
    SET ${fields.join(", ")}
    WHERE user_id = $${index}
    RETURNING *
  `;
};
