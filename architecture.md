# Architecture Documentation

This document describes the architecture, design decisions, and data flow of the Portfolio System.

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Internet                                 │
└─────────────────────────────────────────────────────────────────┘
                    │                       │
                    ▼                       ▼
         ┌─────────────────┐     ┌─────────────────┐
         │  Public Users   │     │  Admin Users    │
         └────────┬────────┘     └────────┬────────┘
                  │                       │
                  ▼                       ▼
         ┌─────────────────┐     ┌─────────────────┐
         │    Portfolio    │     │    Dashboard    │
         │   (Next.js)     │     │   (Next.js)     │
         └────────┬────────┘     └────────┬────────┘
                  │                       │
                  └───────────┬───────────┘
                              │
                              ▼
                   ┌─────────────────────┐
                   │  Shared Packages    │
                   │  (types, lib, ui)   │
                   └──────────┬──────────┘
                              │
                              ▼
                   ┌─────────────────────┐
                   │      Supabase       │
                   │  ┌───────────────┐  │
                   │  │ PostgreSQL DB │  │
                   │  │ Auth Service  │  │
                   │  │ Storage (S3)  │  │
                   │  └───────────────┘  │
                   └─────────────────────┘
```

## Monorepo Structure

### Why Turborepo?

- **Efficient builds**: Only rebuilds what changed
- **Parallel execution**: Runs tasks across packages simultaneously
- **Shared dependencies**: Reduces duplication and ensures consistency
- **Cache optimization**: Skips unchanged builds

### Package Organization

```
/
├── apps/                    # Applications
│   ├── portfolio/           # Public-facing website
│   └── dashboard/           # Admin CMS
├── packages/                # Shared libraries
│   ├── types/               # TypeScript type definitions
│   ├── lib/                 # Shared utilities (future use)
│   └── ui/                  # Component library
└── supabase/                # Database configuration
```

## Application Architecture

### Portfolio App (`apps/portfolio`)

```
src/
├── app/                     # Next.js App Router
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Home page
│   ├── about/               # About page
│   ├── projects/            # Projects list & detail
│   │   ├── page.tsx         # Projects listing
│   │   └── [slug]/          # Dynamic project detail
│   ├── skills/              # Skills page
│   ├── experience/          # Experience timeline
│   └── contact/             # Contact form
├── components/              # React components
│   ├── layout/              # Header, Footer, Navigation
│   ├── ui/                  # UI elements (Hero, Cards, etc.)
│   └── providers.tsx        # TanStack Query provider
└── lib/
    ├── supabase/            # Supabase client configuration
    │   ├── client.ts        # Browser client
    │   └── server.ts        # Server client
    └── data.ts              # Data fetching functions
```

#### Data Fetching Strategy

- **Server Components**: Use server-side Supabase client for initial data
- **Client Components**: Use TanStack Query for interactive data
- **Static Generation**: Pages are statically generated where possible
- **Revalidation**: Data revalidates on demand

### Dashboard App (`apps/dashboard`)

```
src/
├── app/
│   ├── (auth)/              # Auth routes (unprotected)
│   │   └── login/           # Login page
│   ├── (dashboard)/         # Dashboard routes (protected)
│   │   ├── layout.tsx       # Dashboard layout with sidebar
│   │   ├── page.tsx         # Overview/stats page
│   │   ├── projects/        # CRUD for projects
│   │   ├── skills/          # CRUD for skills
│   │   ├── experience/      # CRUD for experience
│   │   ├── profile/         # Profile settings
│   │   ├── messages/        # Contact messages inbox
│   │   └── media/           # File manager
│   └── layout.tsx           # Root layout
├── components/
│   ├── forms/               # Form components (project, skill, etc.)
│   ├── sidebar.tsx          # Navigation sidebar
│   ├── delete-button.tsx    # Reusable delete dialog
│   └── message-actions.tsx  # Message action buttons
├── lib/
│   └── supabase/            # Supabase client configuration
└── middleware.ts            # Auth protection middleware
```

## Authentication Flow

### Login Process

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   User      │     │  Dashboard  │     │  Supabase   │
│             │     │    App      │     │    Auth     │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       │  Enter email/pass │                   │
       │──────────────────>│                   │
       │                   │                   │
       │                   │  signInWithPassword
       │                   │──────────────────>│
       │                   │                   │
       │                   │    Session Token  │
       │                   │<──────────────────│
       │                   │                   │
       │                   │  Set cookies      │
       │                   │  (httpOnly)       │
       │                   │                   │
       │   Redirect to     │                   │
       │   Dashboard       │                   │
       │<──────────────────│                   │
```

### Middleware Protection

The middleware (`apps/dashboard/src/middleware.ts`) runs on every request:

1. Creates a Supabase client with cookie handling
2. Retrieves the current session
3. Checks the route:
   - **Auth routes** (`/login`): Redirect to `/` if already logged in
   - **Dashboard routes**: Redirect to `/login` if not authenticated
   - **Public routes**: Allow access

### Session Management

- Sessions are stored in HTTP-only cookies
- Supabase SSR handles token refresh automatically
- Cookies are updated on every request if needed
- Sessions expire based on Supabase project settings

## Database Design

### Entity Relationship Diagram

```
┌─────────────────┐
│     profile     │
├─────────────────┤
│ id (UUID)       │
│ name            │
│ title           │
│ bio             │
│ email           │
│ location        │
│ avatar_url      │
│ resume_url      │
│ social_links    │
│ created_at      │
│ updated_at      │
└─────────────────┘

┌─────────────────┐     ┌─────────────────┐
│    projects     │     │     skills      │
├─────────────────┤     ├─────────────────┤
│ id (UUID)       │     │ id (UUID)       │
│ title           │     │ name            │
│ slug (UNIQUE)   │     │ category        │
│ description     │     │ proficiency     │
│ content         │     │ icon            │
│ image_url       │     │ order           │
│ technologies[]  │     │ created_at      │
│ demo_url        │     │ updated_at      │
│ github_url      │     └─────────────────┘
│ featured        │
│ published       │
│ order           │
│ created_at      │
│ updated_at      │
└─────────────────┘

┌─────────────────┐     ┌─────────────────┐
│   experience    │     │contact_messages │
├─────────────────┤     ├─────────────────┤
│ id (UUID)       │     │ id (UUID)       │
│ company         │     │ name            │
│ position        │     │ email           │
│ location        │     │ subject         │
│ description     │     │ message         │
│ start_date      │     │ read            │
│ end_date        │     │ archived        │
│ current         │     │ created_at      │
│ technologies[]  │     └─────────────────┘
│ order           │
│ created_at      │
│ updated_at      │
└─────────────────┘
```

### Design Decisions

1. **UUIDs for IDs**: Globally unique, no sequential guessing
2. **Timestamps**: `created_at` and `updated_at` on all tables
3. **Soft features**: `published` and `featured` flags for content control
4. **Order field**: Allows custom sorting without changing primary keys
5. **Array columns**: `technologies` stored as text arrays for flexibility
6. **JSONB for social links**: Flexible structure for various social platforms

## Security Architecture

### Row Level Security (RLS)

RLS policies are defined in `supabase/rls.sql`:

#### Public Access (Unauthenticated)

| Table | SELECT | INSERT | UPDATE | DELETE |
|-------|--------|--------|--------|--------|
| profile | ✅ | ❌ | ❌ | ❌ |
| projects | ✅ (published only) | ❌ | ❌ | ❌ |
| skills | ✅ | ❌ | ❌ | ❌ |
| experience | ✅ | ❌ | ❌ | ❌ |
| contact_messages | ❌ | ✅ | ❌ | ❌ |

#### Authenticated Access (Admin)

| Table | SELECT | INSERT | UPDATE | DELETE |
|-------|--------|--------|--------|--------|
| profile | ✅ | ✅ | ✅ | ✅ |
| projects | ✅ | ✅ | ✅ | ✅ |
| skills | ✅ | ✅ | ✅ | ✅ |
| experience | ✅ | ✅ | ✅ | ✅ |
| contact_messages | ✅ | ✅ | ✅ | ✅ |

### Policy Examples

```sql
-- Only published projects visible to public
CREATE POLICY "Published projects are viewable by everyone"
ON projects FOR SELECT
USING (published = true);

-- Only authenticated users can modify
CREATE POLICY "Authenticated users can update projects"
ON projects FOR UPDATE
USING (auth.role() = 'authenticated');
```

### Storage Security

```sql
-- Public can read from media bucket
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');

-- Only authenticated users can upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (auth.role() = 'authenticated');
```

## Data Flow

### Public Portfolio Data Flow

```
1. User requests page
        │
        ▼
2. Next.js Server Component
        │
        ▼
3. Server-side Supabase client
        │
        ▼
4. PostgreSQL query (RLS applied)
        │
        ▼
5. Data returned to component
        │
        ▼
6. HTML rendered and sent to client
```

### Dashboard CRUD Flow

```
1. Admin fills form
        │
        ▼
2. Form submission handler
        │
        ▼
3. TanStack Query mutation
        │
        ▼
4. Supabase client request
        │
        ▼
5. RLS check (must be authenticated)
        │
        ▼
6. Database operation
        │
        ▼
7. Response returned
        │
        ▼
8. Query cache invalidated
        │
        ▼
9. UI updated automatically
```

## Component Architecture

### Shared UI Components (`packages/ui`)

Built with:
- **Radix UI**: Accessible primitives
- **class-variance-authority**: Variant styling
- **tailwind-merge**: Class merging

Component categories:
- **Button**: Primary action component
- **Card**: Content container
- **Badge**: Status indicators
- **Input/Textarea/Select**: Form elements
- **Label**: Form labels
- **Switch**: Toggle switches

### Design Tokens

Consistent styling through Tailwind CSS variables:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --secondary: 210 40% 96.1%;
  --muted: 210 40% 96.1%;
  --accent: 210 40% 96.1%;
  --destructive: 0 84.2% 60.2%;
  --border: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode values */
}
```

## Performance Considerations

### Static Generation
- Pages without user-specific content are statically generated
- Dynamic routes use `generateStaticParams` for pre-rendering

### Image Optimization
- Next.js Image component for automatic optimization
- Images stored in Supabase Storage with CDN delivery

### Caching Strategy
- TanStack Query caches data client-side
- Stale-while-revalidate pattern for fresh data
- Cache invalidation on mutations

### Bundle Size
- Shared packages reduce duplication
- Tree-shaking removes unused code
- Dynamic imports for large components

## Future Enhancements

Potential improvements:
1. **Blog system**: Add markdown-based blog posts
2. **Analytics**: Track portfolio views and project clicks
3. **Multi-language**: i18n support for content
4. **Themes**: Multiple portfolio themes
5. **API routes**: REST API for external integrations
6. **Comments**: Enable comments on projects
7. **Newsletter**: Email subscription integration

## Troubleshooting

### Common Issues

1. **Auth not working**
   - Check Supabase URL and anon key
   - Verify site URL in Supabase settings
   - Check cookie configuration

2. **RLS blocking requests**
   - Verify user is authenticated
   - Check policy conditions
   - Use Supabase logs to debug

3. **Storage upload failing**
   - Check storage bucket exists
   - Verify storage policies
   - Check file size limits

4. **Build errors**
   - Run `pnpm install` in root
   - Check TypeScript errors
   - Verify all env variables set
