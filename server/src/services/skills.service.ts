import * as db from "../utils/db";
import * as skillsQueries from "../queries/skills.queries";

export const getAllSkills = async (limit = 50, offset = 0) => {
  const result = await db.query(skillsQueries.GET_ALL_SKILLS, [limit, offset]);
  return result.rows;
};

export const getSkillById = async (skillId: string) => {
  const result = await db.query(skillsQueries.GET_SKILL_BY_ID, [skillId]);
  if (result.rows.length === 0) {
    throw new Error("Skill not found");
  }
  return result.rows[0];
};

export const getSkillsByUser = async (userId: string) => {
  const result = await db.query(skillsQueries.GET_SKILLS_BY_USER, [userId]);
  return result.rows;
};

export const getSkillsByJob = async (jobId: string) => {
  const result = await db.query(skillsQueries.GET_SKILLS_BY_JOB, [jobId]);
  return result.rows;
};

export const createSkill = async (name: string) => {
  const result = await db.query(skillsQueries.CREATE_SKILL, [name]);
  return result.rows[0];
};

export const updateSkill = async (skillId: string, name: string) => {
  const result = await db.query(skillsQueries.UPDATE_SKILL, [skillId, name]);

  if (result.rows.length === 0) {
    throw new Error("Skill not found");
  }

  return result.rows[0];
};

export const deleteSkill = async (skillId: string) => {
  const result = await db.query(skillsQueries.DELETE_SKILL, [skillId]);

  if (result.rows.length === 0) {
    throw new Error("Skill not found");
  }

  return result.rows[0];
};

export const addSkillToUser = async (userId: string, skillId: string) => {
  const result = await db.query(skillsQueries.ADD_SKILL_TO_USER, [userId, skillId]);
  return result.rows[0];
};

export const removeSkillFromUser = async (userId: string, skillId: string) => {
  const result = await db.query(skillsQueries.REMOVE_SKILL_FROM_USER, [userId, skillId]);
  return result.rows[0];
};

export const addSkillToJob = async (jobId: string, skillId: string) => {
  const result = await db.query(skillsQueries.ADD_SKILL_TO_JOB, [jobId, skillId]);
  return result.rows[0];
};

export const removeSkillFromJob = async (jobId: string, skillId: string) => {
  const result = await db.query(skillsQueries.REMOVE_SKILL_FROM_JOB, [jobId, skillId]);
  return result.rows[0];
};