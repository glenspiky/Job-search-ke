CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW (),
  updated_at TIMESTAMP DEFAULT NOW ()
);

CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
  user_id UUID UNIQUE NOT NULL,
  currrent_title VARCHAR(255),
  years_experience INTEGER,
  city VARCHAR(100),
  country VARCHAR(100),
  -- social media links
  linkedin_url TEXT,
  github_url TEXT,
  portifolio_url TEXT,
  expected_salary INTEGER,
  remote_only BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW (),
  updated_at TIMESTAMP DEFAULT NOW (),
  --foreign keys
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);
