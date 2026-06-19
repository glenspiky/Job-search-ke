import * as db from "../utils/db";
import * as usersQueries from "../queries/users.queries";

export const getUserProfileById = async (userId: string) => {
  const result = await db.query(usersQueries.GET_USER_PROFILE_BY_ID, [userId]);

  if (!result.rows.length) {
    throw new Error("User not found");
  }
  return result.rows[0];
};
