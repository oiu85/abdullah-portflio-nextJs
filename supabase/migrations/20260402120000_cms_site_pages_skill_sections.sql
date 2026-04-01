-- CMS: site_pages + skill_sections; skills.section_id replaces category enum.
-- Safe to re-run on partially applied databases where possible.

-- ---------------------------------------------------------------------------
-- site_pages
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_pages (
    slug TEXT PRIMARY KEY,
    content JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS update_site_pages_updated_at ON site_pages;
CREATE TRIGGER update_site_pages_updated_at
    BEFORE UPDATE ON site_pages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE site_pages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Site pages are publicly readable" ON site_pages;
DROP POLICY IF EXISTS "Authenticated users can insert site pages" ON site_pages;
DROP POLICY IF EXISTS "Authenticated users can update site pages" ON site_pages;
DROP POLICY IF EXISTS "Authenticated users can delete site pages" ON site_pages;

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

-- ---------------------------------------------------------------------------
-- skill_sections
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS skill_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    label TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_skill_sections_order ON skill_sections(display_order);

DROP TRIGGER IF EXISTS update_skill_sections_updated_at ON skill_sections;
CREATE TRIGGER update_skill_sections_updated_at
    BEFORE UPDATE ON skill_sections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE skill_sections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Published skill sections are publicly readable" ON skill_sections;
DROP POLICY IF EXISTS "Authenticated users can read all skill sections" ON skill_sections;
DROP POLICY IF EXISTS "Authenticated users can insert skill sections" ON skill_sections;
DROP POLICY IF EXISTS "Authenticated users can update skill sections" ON skill_sections;
DROP POLICY IF EXISTS "Authenticated users can delete skill sections" ON skill_sections;

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

INSERT INTO skill_sections (slug, label, display_order, is_published)
VALUES
    ('frontend', 'Frontend Development', 0, true),
    ('backend', 'Backend Development', 10, true),
    ('database', 'Databases', 20, true),
    ('devops', 'DevOps & Cloud', 30, true),
    ('tools', 'Tools & Workflow', 40, true),
    ('design', 'Design', 50, true),
    ('soft_skills', 'Soft Skills', 60, true),
    ('other', 'Other', 70, true)
ON CONFLICT (slug) DO NOTHING;

-- ---------------------------------------------------------------------------
-- skills: section_id + drop legacy category
-- ---------------------------------------------------------------------------
ALTER TABLE skills ADD COLUMN IF NOT EXISTS section_id UUID REFERENCES skill_sections(id);

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'skills' AND column_name = 'category'
  ) THEN
    UPDATE skills s
    SET section_id = ss.id
    FROM skill_sections ss
    WHERE s.section_id IS NULL
      AND s.category = ss.slug;

    ALTER TABLE skills DROP CONSTRAINT IF EXISTS skills_category_check;
    ALTER TABLE skills DROP COLUMN category;
  END IF;
END $$;

UPDATE skills s
SET section_id = ss.id
FROM skill_sections ss
WHERE s.section_id IS NULL
  AND ss.slug = 'other';

ALTER TABLE skills ALTER COLUMN section_id SET NOT NULL;

CREATE INDEX IF NOT EXISTS idx_skills_section_id ON skills(section_id);

-- ---------------------------------------------------------------------------
-- Seed site_pages
-- ---------------------------------------------------------------------------
INSERT INTO site_pages (slug, content) VALUES
(
    'home',
    '{"featured_section":{"title":"Featured Projects","subtitle":"Here are some of my recent projects that showcase my skills and experience."},"skills_preview":{"title":"Skills & Technologies","subtitle":"Technologies and tools I work with to bring ideas to life."}}'::jsonb
),
(
    'footer',
    '{"brand_mark":"AA","tagline":"Senior Mobile Developer specialized in building high-performance Flutter applications.","quick_links_heading":"Quick Links","connect_heading":"Connect","footer_nav":[{"href":"/about","label":"About"},{"href":"/projects","label":"Projects"},{"href":"/contact","label":"Contact"}],"copyright_holder":"Abdullah Alatrash"}'::jsonb
),
(
    'projects',
    '{"page_header":{"eyebrow":"Work","title":"Projects","description":"A collection of Flutter and mobile development projects I''ve worked on, from personal experiments to production applications."}}'::jsonb
),
(
    'experience',
    '{"page_header":{"eyebrow":"Journey","title":"Experience","description":"My professional journey as a Senior Mobile Developer specializing in Flutter and clean architecture."}}'::jsonb
),
(
    'skills',
    '{"page_header":{"eyebrow":"Expertise","title":"Skills & Technologies","description":"Technologies and tools I use to build high-performance Flutter applications."}}'::jsonb
),
(
    'contact_cta',
    '{"eyebrow":"Next step","title":"Let''s Work Together","body":"I''m always open to new Flutter development opportunities and interesting mobile projects. Whether you have a question or just want to say hi, feel free to reach out!","primary_label":"Get in Touch","secondary_label":"View All Projects"}'::jsonb
)
ON CONFLICT (slug) DO NOTHING;
