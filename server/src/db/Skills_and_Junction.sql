CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
  name varchar(255) NOT NULL
);

CREATE TABLE user_skills (
  user_id UUID NOT NULL,
  skill_id UUID NOT NULL,
  PRIMARY KEY (user_id, skill_id),
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

--  JOB SKILLS TABLE: Connects Jobs to required Skills.--
CREATE TABLE job_skills (
  job_id UUID NOT NULL,
  skill_id UUID NOT NULL,
  PRIMARY KEY (job_id, skill_id),
  FOREIGN KEY (job_id) REFERENCES jobs (id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skills (id) ON DELETE CASCADE
);
