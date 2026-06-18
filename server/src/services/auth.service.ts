import bcrypt from "bcrypt";
import * as db from "../utils/db";
import * as authQueries from "../queries/auth.queries";
import { generateToken } from "../utils/jwt";

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

  //save to postgres
  const result = await db.query(authQueries.CREATE_USER, [
    email,
    paswordHash,
    first_name,
    last_name,
    phone || null,
  ]);

  const newUser = result.rows[0];

  // generate token
  const token = generateToken(newUser.id);

  return {
    user: newUser,
    token,
  };
};

// login a user
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

  // check the password
  const isPasswordValid = bcrypt.compare(password_plain, user.password_hash);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }
  // generate new token
  const token = generateToken(user.id);

  // Strip away the password hash before sending the user details back to the controller
  const { pasword_hash, ...cleanUser } = user;

  return {
    user: cleanUser,
    token,
  };
};

export const getCurrentUser = async (userId: string) => {
  const result = await db.query(authQueries.GET_USER_BY_ID, [userId]);

  if (result.rows.length === 0) {
    throw new Error("User session invalid or user no longer exists");
  }
  return result.rows[0];
};
