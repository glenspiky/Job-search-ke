import bcrypt from "bcrypt";
import * as db from "../utils/db";
import * as authQueries from "../queries/auth.queries";
import { generateToken } from "../utils/jwt";

// Register a new user and auto-provision their profile
export const register = async (userData: {
  email: string;
  password_plain: string;
  first_name: string;
  last_name: string;
  phone?: string;
}) => {
  const { email, password_plain, first_name, last_name, phone } = userData;

  // check if user exists
  const exstingUser = await db.query(authQueries.CHECK_USER_EXISTS, [email]);
  if (exstingUser.rows.length > 0) {
    throw new Error("User already exists");
  }

  // hash password
  const saltRounds = 10;
  const paswordHash = await bcrypt.hash(password_plain, saltRounds);

  // save to postgres users table
  const result = await db.query(authQueries.CREATE_USER, [
    email,
    paswordHash,
    first_name,
    last_name,
    phone || null,
  ]);

  const newUser = result.rows[0];

  // AUTOMATICALLY PROVISION BLANK PROFILE RECORD HERE
  await db.query(
    `INSERT INTO profiles (user_id, years_experience, remote_only) 
     VALUES ($1, 0, false)`,
    [newUser.id],
  );

  // generate token
  const token = generateToken(newUser.id);

  return {
    user: newUser,
    token,
  };
};

// Login an existing user
export const login = async (credentials: {
  email: string;
  password_plain: string;
}) => {
  const { email, password_plain } = credentials;

  // fetch the user
  const result = await db.query(authQueries.GET_USER_BY_EMAIL, [email]);
  if (result.rows.length === 0) {
    throw new Error("Invalid email or password");
  }
  const user = result.rows[0];

  const isPasswordValid = await bcrypt.compare(
    password_plain,
    user.password_hash,
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // generate new token
  const token = generateToken(user.id);

  const { password_hash, ...cleanUser } = user;

  return {
    user: cleanUser,
    token,
  };
};

// Get profile details of the logged in user via token middleware context
export const getCurrentUser = async (userId: string) => {
  const result = await db.query(authQueries.GET_USER_BY_ID, [userId]);

  if (result.rows.length === 0) {
    throw new Error("User session invalid or user no longer exists");
  }
  return result.rows[0];
};
