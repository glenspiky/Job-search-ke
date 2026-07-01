CREATE TYPE application_status AS ENUM (
  'saved',
  'applied',
  'reviewing',
  'interview',
  'rejected',
  'offer',
  'hired'
);

--  APPLICATIONS TABLE: Tracks a user applying to a job.
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
  user_id UUID NOT NULL,
  job_id UUID NOT NULL,
  status application_status DEFAULT 'saved',
  match_score NUMERIC(5, 2),
  applied_at TIMESTAMP DEFAULT NOW (),
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (job_id) REFERENCES jobs (id) ON DELETE CASCADE
);
