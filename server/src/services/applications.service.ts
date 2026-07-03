import * as db from "../utils/db";
import * as applicationsQueries from "../queries/applications.queries";

export const getApplicationsByUser = async (userId: string, limit = 10, offset = 0) => {
  const result = await db.query(applicationsQueries.GET_APPLICATIONS_BY_USER, [userId, limit, offset]);
  return result.rows;
};

export const getApplicationsByJob = async (jobId: string, limit = 10, offset = 0) => {
  const result = await db.query(applicationsQueries.GET_APPLICATIONS_BY_JOB, [jobId, limit, offset]);
  return result.rows;
};

export const getApplicationById = async (applicationId: string) => {
  const result = await db.query(applicationsQueries.GET_APPLICATION_BY_ID, [applicationId]);
  if (result.rows.length === 0) {
    throw new Error("Application not found");
  }
  return result.rows[0];
};

export const createApplication = async (applicationData: {
  user_id: string;
  job_id: string;
  status?: string;
  match_score?: number;
}) => {
  const { user_id, job_id, status = "saved", match_score } = applicationData;

  const result = await db.query(applicationsQueries.CREATE_APPLICATION, [
    user_id,
    job_id,
    status,
    match_score || null,
  ]);

  return result.rows[0];
};

export const updateApplicationStatus = async (applicationId: string, status: string) => {
  const result = await db.query(applicationsQueries.UPDATE_APPLICATION_STATUS, [applicationId, status]);

  if (result.rows.length === 0) {
    throw new Error("Application not found");
  }

  return result.rows[0];
};

export const deleteApplication = async (applicationId: string) => {
  const result = await db.query(applicationsQueries.DELETE_APPLICATION, [applicationId]);

  if (result.rows.length === 0) {
    throw new Error("Application not found");
  }

  return result.rows[0];
};

export const getApplicationByUserAndJob = async (userId: string, jobId: string) => {
  const result = await db.query(applicationsQueries.GET_APPLICATION_BY_USER_AND_JOB, [userId, jobId]);
  return result.rows[0] || null;
};