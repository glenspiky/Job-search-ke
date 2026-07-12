export const GET_ALL_JOBS = `
SELECT
  jobs.id,
  jobs.title,
  companies.name AS company_name,
  jobs.location,
  jobs.employment_type,
  jobs.experience_level,
  jobs.salary_min,
  jobs.salary_max,
  jobs.currency,
  jobs.remote,
  jobs.posted_at
FROM jobs
JOIN companies
  ON jobs.company_id = companies.id
ORDER BY jobs.posted_at DESC;`;

export const INSERT_JOB = `
INSERT INTO jobs(
  title,
  company_id,
  description,
  location,
  employment_type,
  experience_level,
  salary_min,
  salary_max,
  currency,
  remote,
  skills,
  application_url,
  posted_at
)
VALUES(
  $1,
  $2,
  $3,
  $4,
  $5,
  $6,
  $7,
  $8,
  $9,
  $10,
  $11,
  $12,
  NOW()
)
RETURNING *;
`;

export const GET_JOB_BY_ID = `
SELECT
  jobs.id,
  jobs.title,
  jobs.description,
  jobs.location,
  jobs.employment_type,
  jobs.experience_level,
  jobs.salary_min,
  jobs.salary_max,
  jobs.currency,
  jobs.remote,
  jobs.skills,
  jobs.application_url,
  jobs.posted_at,
  jobs.created_at,
  companies.id AS company_id,
  companies.name AS company_name,
  companies.website AS company_website,
  companies.logo_url AS company_logo_url
FROM jobs
JOIN companies
  ON jobs.company_id = companies.id
WHERE jobs.id = $1;
`;

export const UPDATE_JOB = `
UPDATE jobs
SET
  title = COALESCE($2, title),
  description = COALESCE($3, description),
  location = COALESCE($4, location),
  employment_type = COALESCE($5, employment_type),
  experience_level = COALESCE($6, experience_level),
  salary_min = COALESCE($7, salary_min),
  salary_max = COALESCE($8, salary_max),
  currency = COALESCE($9, currency),
  remote = COALESCE($10, remote),
  skills = COALESCE($11, skills),
  application_url = COALESCE($12, application_url),
  updated_at = NOW()
WHERE id = $1
RETURNING *;`;

export const DELETE_JOB = `
DELETE FROM jobs
WHERE id = $1
RETURNING *;
`;

export const SEARCH_JOBS = `
SELECT
jobs.id,
  jobs.title,
  jobs.description,
  jobs.location,
  jobs.salary_min,
  jobs.salary_max,
  jobs.remote,
  jobs.application_url,
  jobs.posted_at,
  jobs.created_at,
  companies.name AS company_name
FROM jobs
JOIN companies
  ON jobs.company_id = companies.id
WHERE
  ($1::text IS NULL OR jobs.title ILIKE $1)
  AND ($2::text IS NULL OR jobs.location ILIKE $2)
  AND ($3::boolean IS NULL OR jobs.remote = $3)
  AND ($4::text IS NULL OR jobs.employment_type = $4)
  AND ($5::text IS NULL OR jobs.experience_level = $5)
ORDER BY jobs.posted_at DESC
LIMIT $6 OFFSET $7;`;
