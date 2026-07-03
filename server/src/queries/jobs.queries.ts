export const GET_ALL_JOBS = `
SELECT
jobs.id,
  jobs.title,
  jobs.location,
  companies.name AS company_name
FROM jobs
JOIN companies
    ON jobs.company_id = companies.id;
`;
// src/queries/jobs.queries.ts

export const INSERT_JOB = `
INSERT INTO jobs (
  title,
  company_id,
  description,
  location,
  salary_min,
  salary_max,
  remote,
  application_url,
  posted_at
)
VALUES (
  $1,
  $2,
  $3,
  $4,
  $5,
  $6,
  $7,
  $8,
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
  jobs.salary_min,
  jobs.salary_max,
  jobs.remote,
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
  salary_min = COALESCE($5, salary_min),
  salary_max = COALESCE($6, salary_max),
  remote = COALESCE($7, remote),
  application_url = COALESCE($8, application_url),
  updated_at = NOW()
WHERE id = $1
RETURNING *;
`;

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
ORDER BY jobs.posted_at DESC
LIMIT $4 OFFSET $5;
`;
