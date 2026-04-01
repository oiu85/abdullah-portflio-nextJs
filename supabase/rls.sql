-- ============================================
-- Row Level Security Policies
-- ============================================

-- Enable RLS on all tables
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_pages ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Profile Policies
-- ============================================

-- Public: Anyone can read profile
CREATE POLICY "Profile is publicly readable"
ON profile FOR SELECT
TO anon, authenticated
USING (true);

-- Admin: Authenticated users can update profile
CREATE POLICY "Authenticated users can update profile"
ON profile FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Admin: Authenticated users can insert profile (for initial setup)
CREATE POLICY "Authenticated users can insert profile"
ON profile FOR INSERT
TO authenticated
WITH CHECK (true);

-- ============================================
-- Projects Policies
-- ============================================

-- Public: Anyone can read PUBLISHED projects
CREATE POLICY "Published projects are publicly readable"
ON projects FOR SELECT
TO anon
USING (is_published = true);

-- Admin: Authenticated users can read ALL projects (including drafts)
CREATE POLICY "Authenticated users can read all projects"
ON projects FOR SELECT
TO authenticated
USING (true);

-- Admin: Authenticated users can insert projects
CREATE POLICY "Authenticated users can insert projects"
ON projects FOR INSERT
TO authenticated
WITH CHECK (true);

-- Admin: Authenticated users can update projects
CREATE POLICY "Authenticated users can update projects"
ON projects FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Admin: Authenticated users can delete projects
CREATE POLICY "Authenticated users can delete projects"
ON projects FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- Site pages Policies
-- ============================================

CREATE POLICY "Site pages are publicly readable"
ON site_pages FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Authenticated users can insert site pages"
ON site_pages FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update site pages"
ON site_pages FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete site pages"
ON site_pages FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- Skill sections Policies
-- ============================================

CREATE POLICY "Published skill sections are publicly readable"
ON skill_sections FOR SELECT
TO anon
USING (is_published = true);

CREATE POLICY "Authenticated users can read all skill sections"
ON skill_sections FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can insert skill sections"
ON skill_sections FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update skill sections"
ON skill_sections FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete skill sections"
ON skill_sections FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- Skills Policies
-- ============================================

-- Public: Anyone can read PUBLISHED skills
CREATE POLICY "Published skills are publicly readable"
ON skills FOR SELECT
TO anon
USING (is_published = true);

-- Admin: Authenticated users can read ALL skills
CREATE POLICY "Authenticated users can read all skills"
ON skills FOR SELECT
TO authenticated
USING (true);

-- Admin: Authenticated users can insert skills
CREATE POLICY "Authenticated users can insert skills"
ON skills FOR INSERT
TO authenticated
WITH CHECK (true);

-- Admin: Authenticated users can update skills
CREATE POLICY "Authenticated users can update skills"
ON skills FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Admin: Authenticated users can delete skills
CREATE POLICY "Authenticated users can delete skills"
ON skills FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- Experience Policies
-- ============================================

-- Public: Anyone can read PUBLISHED experience
CREATE POLICY "Published experience is publicly readable"
ON experience FOR SELECT
TO anon
USING (is_published = true);

-- Admin: Authenticated users can read ALL experience
CREATE POLICY "Authenticated users can read all experience"
ON experience FOR SELECT
TO authenticated
USING (true);

-- Admin: Authenticated users can insert experience
CREATE POLICY "Authenticated users can insert experience"
ON experience FOR INSERT
TO authenticated
WITH CHECK (true);

-- Admin: Authenticated users can update experience
CREATE POLICY "Authenticated users can update experience"
ON experience FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Admin: Authenticated users can delete experience
CREATE POLICY "Authenticated users can delete experience"
ON experience FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- Contact Messages Policies
-- ============================================

-- Public: Anyone can INSERT contact messages (submit contact form)
CREATE POLICY "Anyone can submit contact messages"
ON contact_messages FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Admin: Only authenticated users can read messages
CREATE POLICY "Authenticated users can read contact messages"
ON contact_messages FOR SELECT
TO authenticated
USING (true);

-- Admin: Only authenticated users can update messages (mark as read/archive)
CREATE POLICY "Authenticated users can update contact messages"
ON contact_messages FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Admin: Only authenticated users can delete messages
CREATE POLICY "Authenticated users can delete contact messages"
ON contact_messages FOR DELETE
TO authenticated
USING (true);

-- ============================================
-- Storage Policies (Apply via Supabase Dashboard)
-- ============================================
/*
For "avatars" bucket (public read):
- SELECT: Allow all (no policy needed for public bucket)
- INSERT/UPDATE/DELETE: Authenticated users only

For "projects" bucket (public read):
- SELECT: Allow all (no policy needed for public bucket)
- INSERT/UPDATE/DELETE: Authenticated users only

For "documents" bucket (private):
- SELECT/INSERT/UPDATE/DELETE: Authenticated users only
*/
