CREATE TABLE IF NOT EXISTS posts (
  id VARCHAR(64) PRIMARY KEY,
  title TEXT NOT NULL,
  slug VARCHAR(256) NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  body TEXT NOT NULL,
  cover_image_url TEXT,
  cover_image_alt TEXT,
  author VARCHAR(128) NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'draft',
  published_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  seo_title TEXT,
  seo_description TEXT
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(256) NOT NULL,
  email VARCHAR(256) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(256) NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
