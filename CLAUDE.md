# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start Next.js development server
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality
- `npm run seed` - Seed the landing page data using `scripts/seed-landing-page.ts`

Dont run dev or build yourself unless asked to by the user

## Project Architecture

This is a Next.js 15 application with Payload CMS integration for content management, built for pharmaceutical consulting company Consilienta.

### Core Structure

**Frontend Architecture:**
- Next.js 15 with App Router (`app/` directory)
- Frontend routes in `app/(frontend)/` with layout, pages, and API routes
- Payload CMS admin interface in `app/(payload)/`
- React 19 with TypeScript

**Content Management:**
- Payload CMS v3 with SQLite database adapter
- Collections defined in `collections/`: `Users`, `Media`, `Pages`, `LandingPage`
- Rich content editing with Lexical editor
- Media uploads and management

**Component Architecture:**
- Landing page components in `components/landing/` (modular sections)
- Reusable block components in `components/blocks/`
- UI components from shadcn/ui in `components/ui/`
- Theme provider for dark/light mode support

### Key Collections

**LandingPage Collection (`collections/LandingPage.ts`):**
- Comprehensive content structure for pharmaceutical consulting landing page
- Sections: hero, features, CTA, header, footer, interactive 3D helix
- Configurable content with sensible defaults for Consilienta branding

**Pages Collection (`collections/Pages.ts`):**
- Dynamic page management
- Supports block-based content architecture

### Technology Stack

- **Framework:** Next.js 15 with React 19
- **CMS:** Payload CMS v3 with SQLite
- **Styling:** Tailwind CSS v4 with shadcn/ui components
- **3D Graphics:** Three.js with React Three Fiber for interactive helix
- **Animations:** Framer Motion
- **Forms:** React Hook Form with Zod validation
- **Typography:** Geist font, custom Qurova and Rubik fonts

### Important Notes

- ESLint and TypeScript errors are ignored during builds (`ignoreDuringBuilds: true`)
- Images are unoptimized for deployment flexibility
- Uses SQLite database (not suitable for production at scale)
- Custom webpack configuration for file extensions
- Payload admin accessible at `/admin`

### Development Workflow

1. Run `npm run dev` to start development
2. Access frontend at `http://localhost:3000`
3. Access Payload admin at `http://localhost:3000/admin`
4. Use `npm run seed` to populate initial landing page content
5. Components follow kebab-case naming convention
6. Always run `npm run lint` before committing changes