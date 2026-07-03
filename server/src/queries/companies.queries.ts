export const GET_ALL_COMPANIES = `
SELECT
  id,
  name,
  website,
  logo_url,
  created_at
FROM companies
ORDER BY created_at DESC
LIMIT $1 OFFSET $2;
`;

export const GET_COMPANY_BY_ID = `
SELECT
  id,
  name,
  website,
  logo_url,
  created_at
FROM companies
WHERE id = $1;
`;

export const GET_COMPANY_BY_NAME = `
SELECT
  id,
  name,
  website,
  logo_url,
  created_at
FROM companies
WHERE name ILIKE $1;
`;

export const CREATE_COMPANY = `
INSERT INTO companies (name, website, logo_url)
VALUES ($1, $2, $3)
RETURNING *;
`;

export const UPDATE_COMPANY = `
UPDATE companies
SET
  name = COALESCE($2, name),
  website = COALESCE($3, website),
  logo_url = COALESCE($4, logo_url)
WHERE id = $1
RETURNING *;
`;

export const DELETE_COMPANY = `
DELETE FROM companies
WHERE id = $1
RETURNING *;
`;