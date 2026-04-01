-- ============================================
-- Seed Data for Portfolio System
-- ============================================

-- ============================================
-- Profile Seed Data
-- ============================================
INSERT INTO profile (
    full_name,
    title,
    bio,
    short_bio,
    email,
    phone,
    location,
    avatar_url,
    social_links,
    is_available_for_hire
) VALUES (
    'John Doe',
    'Full-Stack Developer & UI/UX Designer',
    'I am a passionate full-stack developer with over 5 years of experience building modern web applications. I specialize in React, Next.js, Node.js, and cloud technologies. I love creating beautiful, performant, and user-friendly applications that solve real-world problems.

My journey in software development started when I built my first website at age 15. Since then, I have worked with startups and enterprises, helping them build scalable solutions that drive business growth.

When I am not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through technical writing and mentoring.',
    'Full-stack developer passionate about building modern web applications with React, Next.js, and Node.js.',
    'john@example.com',
    '+1 (555) 123-4567',
    'San Francisco, CA',
    NULL,
    '{
        "github": "https://github.com/johndoe",
        "linkedin": "https://linkedin.com/in/johndoe",
        "twitter": "https://twitter.com/johndoe"
    }',
    true
);

-- ============================================
-- Projects Seed Data
-- ============================================
INSERT INTO projects (title, slug, short_description, description, technologies, live_url, github_url, is_featured, is_published, display_order) VALUES
(
    'E-Commerce Platform',
    'e-commerce-platform',
    'A full-featured e-commerce platform with real-time inventory management and payment processing.',
    'Built a comprehensive e-commerce solution featuring:

- Real-time inventory tracking
- Stripe payment integration
- Admin dashboard for order management
- Customer reviews and ratings
- Advanced search with filters
- Mobile-responsive design

The platform handles thousands of daily transactions and has helped increase client revenue by 40%.',
    ARRAY['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Tailwind CSS', 'Redis'],
    'https://example-ecommerce.com',
    'https://github.com/johndoe/ecommerce',
    true,
    true,
    1
),
(
    'Task Management App',
    'task-management-app',
    'A collaborative task management application with real-time updates and team features.',
    'Developed a modern task management application that helps teams stay organized and productive:

- Real-time collaboration using WebSockets
- Kanban board with drag-and-drop
- Project timelines and Gantt charts
- Team chat and notifications
- File attachments and comments
- Integration with Slack and GitHub',
    ARRAY['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express', 'Docker'],
    'https://example-tasks.com',
    'https://github.com/johndoe/taskapp',
    true,
    true,
    2
),
(
    'AI Content Generator',
    'ai-content-generator',
    'An AI-powered content generation tool for marketers and content creators.',
    'Created an innovative AI-powered platform that helps content creators generate high-quality content:

- GPT-4 integration for content generation
- Multiple content types (blog posts, social media, emails)
- Brand voice customization
- SEO optimization suggestions
- Content calendar and scheduling
- Analytics dashboard',
    ARRAY['Python', 'FastAPI', 'OpenAI', 'React', 'PostgreSQL', 'AWS'],
    'https://example-ai.com',
    NULL,
    true,
    true,
    3
),
(
    'Personal Finance Tracker',
    'finance-tracker',
    'A personal finance application with budgeting, expense tracking, and investment monitoring.',
    'Built a comprehensive personal finance application:

- Bank account integration via Plaid
- Automatic expense categorization
- Budget creation and tracking
- Investment portfolio monitoring
- Financial goal setting
- Detailed reports and insights',
    ARRAY['React Native', 'Node.js', 'PostgreSQL', 'Plaid API', 'Chart.js'],
    'https://example-finance.com',
    'https://github.com/johndoe/finance-app',
    false,
    true,
    4
);

-- ============================================
-- Skill sections + Skills Seed Data
-- ============================================
INSERT INTO skill_sections (slug, label, display_order, is_published) VALUES
    ('frontend', 'Frontend Development', 0, true),
    ('backend', 'Backend Development', 10, true),
    ('database', 'Databases', 20, true),
    ('devops', 'DevOps & Cloud', 30, true),
    ('tools', 'Tools & Workflow', 40, true),
    ('design', 'Design', 50, true),
    ('soft_skills', 'Soft Skills', 60, true),
    ('other', 'Other', 70, true);

INSERT INTO skills (name, section_id, proficiency, icon, is_published, display_order) VALUES
('React', (SELECT id FROM skill_sections WHERE slug = 'frontend' LIMIT 1), 95, 'react', true, 1),
('Next.js', (SELECT id FROM skill_sections WHERE slug = 'frontend' LIMIT 1), 90, 'nextjs', true, 2),
('TypeScript', (SELECT id FROM skill_sections WHERE slug = 'frontend' LIMIT 1), 90, 'typescript', true, 3),
('Tailwind CSS', (SELECT id FROM skill_sections WHERE slug = 'frontend' LIMIT 1), 95, 'tailwind', true, 4),
('Vue.js', (SELECT id FROM skill_sections WHERE slug = 'frontend' LIMIT 1), 75, 'vue', true, 5),
('HTML/CSS', (SELECT id FROM skill_sections WHERE slug = 'frontend' LIMIT 1), 95, 'html', true, 6),
('Node.js', (SELECT id FROM skill_sections WHERE slug = 'backend' LIMIT 1), 90, 'nodejs', true, 1),
('Python', (SELECT id FROM skill_sections WHERE slug = 'backend' LIMIT 1), 80, 'python', true, 2),
('Express.js', (SELECT id FROM skill_sections WHERE slug = 'backend' LIMIT 1), 88, 'express', true, 3),
('FastAPI', (SELECT id FROM skill_sections WHERE slug = 'backend' LIMIT 1), 75, 'fastapi', true, 4),
('GraphQL', (SELECT id FROM skill_sections WHERE slug = 'backend' LIMIT 1), 82, 'graphql', true, 5),
('PostgreSQL', (SELECT id FROM skill_sections WHERE slug = 'database' LIMIT 1), 88, 'postgresql', true, 1),
('MongoDB', (SELECT id FROM skill_sections WHERE slug = 'database' LIMIT 1), 85, 'mongodb', true, 2),
('Redis', (SELECT id FROM skill_sections WHERE slug = 'database' LIMIT 1), 78, 'redis', true, 3),
('Supabase', (SELECT id FROM skill_sections WHERE slug = 'database' LIMIT 1), 90, 'supabase', true, 4),
('Docker', (SELECT id FROM skill_sections WHERE slug = 'devops' LIMIT 1), 85, 'docker', true, 1),
('AWS', (SELECT id FROM skill_sections WHERE slug = 'devops' LIMIT 1), 80, 'aws', true, 2),
('Vercel', (SELECT id FROM skill_sections WHERE slug = 'devops' LIMIT 1), 90, 'vercel', true, 3),
('GitHub Actions', (SELECT id FROM skill_sections WHERE slug = 'devops' LIMIT 1), 85, 'github', true, 4),
('Git', (SELECT id FROM skill_sections WHERE slug = 'tools' LIMIT 1), 95, 'git', true, 1),
('VS Code', (SELECT id FROM skill_sections WHERE slug = 'tools' LIMIT 1), 95, 'vscode', true, 2),
('Figma', (SELECT id FROM skill_sections WHERE slug = 'tools' LIMIT 1), 80, 'figma', true, 3),
('Postman', (SELECT id FROM skill_sections WHERE slug = 'tools' LIMIT 1), 88, 'postman', true, 4),
('UI/UX Design', (SELECT id FROM skill_sections WHERE slug = 'design' LIMIT 1), 80, 'design', true, 1),
('Responsive Design', (SELECT id FROM skill_sections WHERE slug = 'design' LIMIT 1), 92, 'responsive', true, 2),
('Accessibility', (SELECT id FROM skill_sections WHERE slug = 'design' LIMIT 1), 85, 'accessibility', true, 3);

-- ============================================
-- Site pages (CMS) — default copy
-- ============================================
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
);

-- ============================================
-- Experience Seed Data
-- ============================================
INSERT INTO experience (company, position, description, location, company_url, start_date, end_date, is_current, is_published, display_order, technologies) VALUES
(
    'Tech Innovators Inc.',
    'Senior Full-Stack Developer',
    'Leading development of enterprise web applications and mentoring junior developers.

Key achievements:
- Architected and implemented a microservices-based platform serving 1M+ users
- Reduced page load times by 60% through performance optimization
- Established coding standards and best practices for the team
- Led migration from legacy system to modern React/Node.js stack',
    'San Francisco, CA',
    'https://techinnovators.com',
    '2022-01-01',
    NULL,
    true,
    true,
    1,
    ARRAY['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker']
),
(
    'StartupXYZ',
    'Full-Stack Developer',
    'Built and maintained multiple web applications from scratch.

Key achievements:
- Developed the core product from MVP to production-ready application
- Implemented CI/CD pipelines reducing deployment time by 80%
- Built real-time features using WebSockets
- Integrated multiple third-party APIs and payment systems',
    'Remote',
    'https://startupxyz.com',
    '2020-03-01',
    '2021-12-31',
    false,
    true,
    2,
    ARRAY['Vue.js', 'Python', 'FastAPI', 'MongoDB', 'Docker', 'GCP']
),
(
    'Digital Agency Co.',
    'Frontend Developer',
    'Created responsive and accessible web interfaces for various clients.

Key achievements:
- Delivered 15+ client projects on time and within budget
- Improved average site performance scores from 60 to 95
- Implemented design systems for consistent branding
- Mentored 2 junior developers',
    'New York, NY',
    'https://digitalagency.com',
    '2018-06-01',
    '2020-02-28',
    false,
    true,
    3,
    ARRAY['React', 'JavaScript', 'SCSS', 'WordPress', 'Figma']
);

-- ============================================
-- Contact Messages Seed Data (Optional - for testing)
-- ============================================
INSERT INTO contact_messages (name, email, subject, message, is_read) VALUES
(
    'Jane Smith',
    'jane@example.com',
    'Project Inquiry',
    'Hi John,

I came across your portfolio and I am impressed with your work. We are looking for a developer to help us build a new e-commerce platform.

Would you be available for a call next week to discuss the project?

Best regards,
Jane',
    false
),
(
    'Bob Johnson',
    'bob@techcompany.com',
    'Job Opportunity',
    'Hello John,

We have an exciting senior developer position at our company that I think would be perfect for you. The role involves leading a team of developers on cutting-edge projects.

Let me know if you would like to learn more.

Thanks,
Bob',
    true
);
