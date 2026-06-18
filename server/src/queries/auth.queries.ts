// checks if the email exists in the database
export const CHECK_USER_EXISTS = `
SELECT id FROM users WHERE email = $1;
`;

// insert a new user and return their id
export const CREATE_USER = `
INSERT INTO users (email,password_hash,first_name,last_name,phone)
VALUES ($1,$2,$3,$4,$5)
RETURNING id,email,first_name,last_name,created_at;
`;

// login a user
export const GET_USER_BY_EMAIL = `
  SELECT id, email, password_hash, first_name, last_name 
  FROM users 
  WHERE email = $1;
`;

// get user profile

export const GET_USER_BY_ID = `
SELECT id as "_id", email, first_name, last_name, phone, created_at
FROM users
WHERE id =$1;
`
