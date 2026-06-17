import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Create a reusable pool using your environment variables
export const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "job_platform",
  password: process.env.DB_PASSWORD || "password",
  port: parseInt(process.env.DB_PORT || "5432"),
});

// A helper function to log queries for debugging
export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};
