-- DROP TABLE IF EXISTS profiles CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;
--
-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(50),
  is_verified BOOLEAN DEFAULT false, -- Useful for email confirmation
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL,
  
  -- Professional Info
  current_title VARCHAR(255), -- Fixed the typo!
  bio TEXT, -- Crucial for developer profiles
  years_experience INTEGER DEFAULT 0,
  skills TEXT[], -- PostgreSQL array to easily store arrays like ['React', 'TypeScript', 'Node.js']
  
  -- Location
  city VARCHAR(100),
  country VARCHAR(100),
  
  -- Developer Specific Socials
  linkedin_url TEXT,
  github_url TEXT,
  portfolio_url TEXT, -- Fixed typo from 'portifolio_url'
  twitter_url TEXT,
  leetcode_url TEXT, -- Great addition for technical profiles
  
  -- Job Preferences
  expected_salary INTEGER,
  currency VARCHAR(10) DEFAULT 'USD', -- Allows international hiring flexibility
  remote_only BOOLEAN DEFAULT false,
  job_search_status VARCHAR(50) DEFAULT 'OPEN_TO_WORK', -- e.g., 'OPEN_TO_WORK', 'HIRED', 'CASUALLY_LOOKING'
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Foreign Keys
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);
