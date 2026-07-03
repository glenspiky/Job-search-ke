import * as jobQueries from "../queries/jobs.queries";
import * as db from "../utils/db";

export const getAllJobs = async () => {
  const jobs = await db.query(jobQueries.GET_ALL_JOBS);
  return jobs.rows;
};

export const getJobById = async (jobId: string) => {
  const result = await db.query(jobQueries.GET_JOB_BY_ID, [jobId]);
  if (result.rows.length === 0) {
    throw new Error("Job not found");
  }
  return result.rows[0];
};

export const createJob = async (jobData: {
  title: string;
  company_id: string;
  description: string;
  location?: string;
  salary_min?: number;
  salary_max?: number;
  remote?: boolean;
  application_url: string;
}) => {
  const {
    title,
    company_id,
    description,
    location,
    salary_min,
    salary_max,
    remote,
    application_url,
  } = jobData;

  const result = await db.query(jobQueries.INSERT_JOB, [
    title,
    company_id,
    description,
    location || null,
    salary_min || null,
    salary_max || null,
    remote || false,
    application_url,
  ]);

  return result.rows[0];
};

export const updateJob = async (
  jobId: string,
  jobData: {
    title?: string;
    description?: string;
    location?: string;
    salary_min?: number;
    salary_max?: number;
    remote?: boolean;
    application_url?: string;
  }
) => {
  const {
    title,
    description,
    location,
    salary_min,
    salary_max,
    remote,
    application_url,
  } = jobData;

  const result = await db.query(jobQueries.UPDATE_JOB, [
    jobId,
    title,
    description,
    location,
    salary_min,
    salary_max,
    remote,
    application_url,
  ]);

  if (result.rows.length === 0) {
    throw new Error("Job not found");
  }

  return result.rows[0];
};

export const deleteJob = async (jobId: string) => {
  const result = await db.query(jobQueries.DELETE_JOB, [jobId]);

  if (result.rows.length === 0) {
    throw new Error("Job not found");
  }

  return result.rows[0];
};

export const searchJobs = async (params: {
  title?: string;
  location?: string;
  remote?: boolean;
  limit?: number;
  offset?: number;
}) => {
  const { title, location, remote, limit = 10, offset = 0 } = params;

  const titlePattern = title ? `%${title}%` : null;
  const locationPattern = location ? `%${location}%` : null;

  const result = await db.query(jobQueries.SEARCH_JOBS, [
    titlePattern,
    locationPattern,
    remote,
    limit,
    offset,
  ]);

  return result.rows;
};
