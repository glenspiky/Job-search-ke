CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  website TEXT,
  logo_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  company_id UUID NOT NULL,

  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(255),

  employment_type VARCHAR(50) NOT NULL,
  experience_level VARCHAR(50) NOT NULL,

  salary_min INTEGER,
  salary_max INTEGER,
  currency VARCHAR(10) DEFAULT 'KES',

  remote BOOLEAN DEFAULT FALSE,

  skills TEXT[],

  application_url TEXT NOT NULL,

  posted_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),

  FOREIGN KEY (company_id) REFERENCES companies(id)
);
