CREATE sessions (id UUID PRIMARY KEY,
user_id UUID REFERENCES users(id),refresh_token
