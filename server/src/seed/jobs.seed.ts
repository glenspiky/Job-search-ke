import * as db from "../utils/db";
import { INSERT_JOB } from "../queries/jobs.queries";

const jobs = [
  {
    title: "Frontend Developer",
    company: "TechNova",
    location: "Nairobi, Kenya",
    employmentType: "Full-time",
    experienceLevel: "Junior",
    salaryMin: 80000,
    salaryMax: 120000,
    currency: "KES",
    remote: true,
    skills: ["React", "TypeScript", "Next.js"],
    description: "Build modern web applications.",
  },
  // More jobs...
];

async function seedJobs() {
  for (const job of jobs) {
    await db.query(INSERT_JOB, [
      job.title,
      job.company,
      job.location,
      job.employmentType,
      job.experienceLevel,
      job.salaryMin,
      job.salaryMax,
      job.currency,
      job.remote,
      job.skills,
      job.description,
    ]);
  }

  console.log(`${jobs.length} jobs inserted successfully.`);
}

seedJobs().catch(console.error);
