export const GET_APPLICATIONS_BY_USER = `
SELECT
  a.id,
  a.status,
  a.match_score,
  a.applied_at,
  j.id AS job_id,
  j.title AS job_title,
  j.description AS job_description,
  j.location AS job_location,
  j.salary_min AS job_salary_min,
  j.salary_max AS job_salary_max,
  j.remote AS job_remote,
  j.application_url AS job_application_url,
  c.name AS company_name,
  c.website AS company_website
FROM applications a
JOIN jobs j ON a.job_id = j.id
JOIN companies c ON j.company_id = c.id
WHERE a.user_id = $1
ORDER BY a.applied_at DESC
LIMIT $2 OFFSET $3;
`;

export const GET_APPLICATIONS_BY_JOB = `
SELECT
  a.id,
  a.status,
  a.match_score,
  a.applied_at,
  u.id AS user_id,
  u.email AS user_email,
  u.first_name AS user_first_name,
  u.last_name AS user_last_name,
  p.current_title AS user_current_title,
  p.years_experience AS user_years_experience
FROM applications a
JOIN users u ON a.user_id = u.id
LEFT JOIN profiles p ON u.id = p.user_id
WHERE a.job_id = $1
ORDER BY a.applied_at DESC
LIMIT $2 OFFSET $3;
`;

export const GET_APPLICATION_BY_ID = `
SELECT
  a.id,
  a.status,
  a.match_score,
  a.applied_at,
  a.user_id,
  a.job_id,
  j.title AS job_title,
  c.name AS company_name
FROM applications a
JOIN jobs j ON a.job_id = j.id
JOIN companies c ON j.company_id = c.id
WHERE a.id = $1;
`;

export const CREATE_APPLICATION = `
INSERT INTO applications (user_id, job_id, status, match_score)
VALUES ($1, $2, $3, $4)
RETURNING *;
`;

export const UPDATE_APPLICATION_STATUS = `
UPDATE applications
SET status = $2
WHERE id = $1
RETURNING *;
`;

export const DELETE_APPLICATION = `
DELETE FROM applications
WHERE id = $1
RETURNING *;
`;

export const GET_APPLICATION_BY_USER_AND_JOB = `
SELECT * FROM applications
WHERE user_id = $1 AND job_id = $2;
`;