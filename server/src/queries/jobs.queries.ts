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
