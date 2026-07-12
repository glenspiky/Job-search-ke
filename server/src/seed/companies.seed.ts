import * as db from "../utils/db";

const GET_COMPANY_ID = `
SELECT id
FROM companies
WHERE name = $1;
`;

async function seedJobs() {
  for (const job of jobs) {
    const result = await db.query(GET_COMPANY_ID, [job.company]);

    if (result.rows.length === 0) {
      throw new Error(`Company "${job.company}" not found`);
    }

    const companyId = result.rows[0].id;

    await db.query(INSERT_JOB, [
      job.title,
      companyId,
      job.description,
      job.location,
      job.employmentType,
      job.experienceLevel,
      job.salaryMin,
      job.salaryMax,
      job.currency,
      job.remote,
      job.skills,
      `https://careers.example.com/${job.title
        .toLowerCase()
        .replace(/\s+/g, "-")}`,
    ]);
  }

  console.log(`${jobs.length} jobs inserted successfully.`);
}

seedJobs().catch(console.error);
