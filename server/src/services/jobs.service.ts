import * as jobQueries from "../queries/jobs.queries";
import * as db from "../utils/db";

export const getAllJobs = async () => {
  console.log("getAllJobs called");

  const jobs = await db.query(jobQueries.GET_ALL_JOBS);

  console.log(jobs.rows);

  return jobs.rows;
};

getAllJobs();
