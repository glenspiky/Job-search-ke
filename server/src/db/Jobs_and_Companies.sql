CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
  name VARCHAR(255) NOT NULL,
  website TEXT,
  logo_url TEXT,
  created_at TIMESTAMP DEFAULT NOW ()
);

CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid (), -- Double check the 'm' in random here!
  company_id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(255),
  salary_min INTEGER,
  salary_max INTEGER,
  remote BOOLEAN DEFAULT FALSE,
  application_url TEXT NOT NULL,
  posted_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW (),
  FOREIGN KEY (company_id) REFERENCES companies (id)
);
