export const GET_ALL_SKILLS = `
SELECT id, name
FROM skills
ORDER BY name ASC
LIMIT $1 OFFSET $2;
`;

export const GET_SKILL_BY_ID = `
SELECT id, name
FROM skills
WHERE id = $1;
`;

export const GET_SKILLS_BY_USER = `
SELECT s.id, s.name
FROM skills s
JOIN user_skills us ON s.id = us.skill_id
WHERE us.user_id = $1
ORDER BY s.name ASC;
`;

export const GET_SKILLS_BY_JOB = `
SELECT s.id, s.name
FROM skills s
JOIN job_skills js ON s.id = js.skill_id
WHERE js.job_id = $1
ORDER BY s.name ASC;
`;

export const CREATE_SKILL = `
INSERT INTO skills (name)
VALUES ($1)
RETURNING *;
`;

export const UPDATE_SKILL = `
UPDATE skills
SET name = $2
WHERE id = $1
RETURNING *;
`;

export const DELETE_SKILL = `
DELETE FROM skills
WHERE id = $1
RETURNING *;
`;

export const ADD_SKILL_TO_USER = `
INSERT INTO user_skills (user_id, skill_id)
VALUES ($1, $2)
ON CONFLICT (user_id, skill_id) DO NOTHING
RETURNING *;
`;

export const REMOVE_SKILL_FROM_USER = `
DELETE FROM user_skills
WHERE user_id = $1 AND skill_id = $2
RETURNING *;
`;

export const ADD_SKILL_TO_JOB = `
INSERT INTO job_skills (job_id, skill_id)
VALUES ($1, $2)
ON CONFLICT (job_id, skill_id) DO NOTHING
RETURNING *;
`;

export const REMOVE_SKILL_FROM_JOB = `
DELETE FROM job_skills
WHERE job_id = $1 AND skill_id = $2
RETURNING *;
`;
