-- ============================================
-- Combined Portfolio System Setup
-- Run this entire file in Supabase SQL Editor
-- ============================================

-- ============================================
-- STEP 1: Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profile Table
CREATE TABLE IF NOT EXISTS profile (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    short_bio VARCHAR(500) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    location VARCHAR(255),
    avatar_url TEXT,
    resume_url TEXT,
    social_links JSONB DEFAULT '{}',
    is_available_for_hire BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    short_description VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    featured_image TEXT,
    images TEXT[] DEFAULT '{}',
    technologies TEXT[] DEFAULT '{}',
    live_url TEXT,
    github_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(is_published);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured);

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN (
        'frontend', 'backend', 'database', 'devops', 
        'tools', 'design', 'soft_skills', 'other'
    )),
    proficiency INTEGER NOT NULL CHECK (proficiency >= 1 AND proficiency <= 100),
    icon TEXT,
    is_published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_published ON skills(is_published);

-- Experience Table
CREATE TABLE IF NOT EXISTS experience (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255),
    company_logo TEXT,
    company_url TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    technologies TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_experience_published ON experience(is_published);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    is_archived BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_read ON contact_messages(is_read);
CREATE INDEX IF NOT EXISTS idx_contact_messages_archived ON contact_messages(is_archived);

-- Updated At Trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_profile_updated_at ON profile;
CREATE TRIGGER update_profile_updated_at
    BEFORE UPDATE ON profile
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_skills_updated_at ON skills;
CREATE TRIGGER update_skills_updated_at
    BEFORE UPDATE ON skills
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_experience_updated_at ON experience;
CREATE TRIGGER update_experience_updated_at
    BEFORE UPDATE ON experience
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_contact_messages_updated_at ON contact_messages;
CREATE TRIGGER update_contact_messages_updated_at
    BEFORE UPDATE ON contact_messages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- STEP 2: Row Level Security
-- ============================================

ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Profile Policies
CREATE POLICY "Profile is publicly readable" ON profile FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated users can update profile" ON profile FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can insert profile" ON profile FOR INSERT TO authenticated WITH CHECK (true);

-- Projects Policies
CREATE POLICY "Published projects are publicly readable" ON projects FOR SELECT TO anon USING (is_published = true);
CREATE POLICY "Authenticated users can read all projects" ON projects FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert projects" ON projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update projects" ON projects FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete projects" ON projects FOR DELETE TO authenticated USING (true);

-- Skills Policies
CREATE POLICY "Published skills are publicly readable" ON skills FOR SELECT TO anon USING (is_published = true);
CREATE POLICY "Authenticated users can read all skills" ON skills FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert skills" ON skills FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update skills" ON skills FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete skills" ON skills FOR DELETE TO authenticated USING (true);

-- Experience Policies
CREATE POLICY "Published experience is publicly readable" ON experience FOR SELECT TO anon USING (is_published = true);
CREATE POLICY "Authenticated users can read all experience" ON experience FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert experience" ON experience FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update experience" ON experience FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete experience" ON experience FOR DELETE TO authenticated USING (true);

-- Contact Messages Policies
CREATE POLICY "Anyone can submit contact messages" ON contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can read contact messages" ON contact_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can update contact messages" ON contact_messages FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete contact messages" ON contact_messages FOR DELETE TO authenticated USING (true);

-- ============================================
-- STEP 3: Seed Data
-- ============================================

INSERT INTO profile (full_name, title, bio, short_bio, email, phone, location, avatar_url, social_links, is_available_for_hire) VALUES (
    'John Doe',
    'Full-Stack Developer & UI/UX Designer',
    'I am a passionate full-stack developer with over 5 years of experience building modern web applications. I specialize in React, Next.js, Node.js, and cloud technologies.',
    'Full-stack developer passionate about building modern web applications with React, Next.js, and Node.js.',
    'john@example.com',
    '+1 (555) 123-4567',
    'San Francisco, CA',
    NULL,
    '{"github": "https://github.com/johndoe", "linkedin": "https://linkedin.com/in/johndoe", "twitter": "https://twitter.com/johndoe"}',
    true
);

INSERT INTO projects (title, slug, short_description, description, technologies, live_url, github_url, is_featured, is_published, display_order) VALUES
('E-Commerce Platform', 'e-commerce-platform', 'A full-featured e-commerce platform with real-time inventory management.', 'Built a comprehensive e-commerce solution with Stripe payment integration and admin dashboard.', ARRAY['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Tailwind CSS'], 'https://example-ecommerce.com', 'https://github.com/johndoe/ecommerce', true, true, 1),
('Task Management App', 'task-management-app', 'A collaborative task management application with real-time updates.', 'Developed a modern task management app with Kanban board and team collaboration features.', ARRAY['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express'], 'https://example-tasks.com', 'https://github.com/johndoe/taskapp', true, true, 2),
('AI Content Generator', 'ai-content-generator', 'An AI-powered content generation tool for marketers.', 'Created an AI-powered platform using GPT-4 for content generation.', ARRAY['Python', 'FastAPI', 'OpenAI', 'React', 'PostgreSQL'], 'https://example-ai.com', NULL, true, true, 3);

INSERT INTO skills (name, category, proficiency, icon, is_published, display_order) VALUES
('React', 'frontend', 95, 'react', true, 1),
('Next.js', 'frontend', 90, 'nextjs', true, 2),
('TypeScript', 'frontend', 90, 'typescript', true, 3),
('Tailwind CSS', 'frontend', 95, 'tailwind', true, 4),
('Node.js', 'backend', 90, 'nodejs', true, 1),
('Python', 'backend', 80, 'python', true, 2),
('PostgreSQL', 'database', 88, 'postgresql', true, 1),
('MongoDB', 'database', 85, 'mongodb', true, 2),
('Docker', 'devops', 85, 'docker', true, 1),
('AWS', 'devops', 80, 'aws', true, 2),
('Git', 'tools', 95, 'git', true, 1),
('Figma', 'tools', 80, 'figma', true, 2);

INSERT INTO experience (company, position, description, location, company_url, start_date, end_date, is_current, is_published, display_order, technologies) VALUES
('Tech Innovators Inc.', 'Senior Full-Stack Developer', 'Leading development of enterprise web applications and mentoring junior developers.', 'San Francisco, CA', 'https://techinnovators.com', '2022-01-01', NULL, true, true, 1, ARRAY['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS']),
('StartupXYZ', 'Full-Stack Developer', 'Built and maintained multiple web applications from scratch.', 'Remote', 'https://startupxyz.com', '2020-03-01', '2021-12-31', false, true, 2, ARRAY['Vue.js', 'Python', 'FastAPI', 'MongoDB']),
('Digital Agency Co.', 'Frontend Developer', 'Created responsive and accessible web interfaces for various clients.', 'New York, NY', 'https://digitalagency.com', '2018-06-01', '2020-02-28', false, true, 3, ARRAY['React', 'JavaScript', 'SCSS']);

-- Done! Your database is ready.
