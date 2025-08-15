# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Technology Stack

This is a modern fullstack web application built with:

- **Framework**: Next.js 15 with App Router
- **CMS**: Payload CMS 3.x with SQLite database
- **Frontend**: React 19, TypeScript, TailwindCSS, shadcn/ui components
- **Styling**: TailwindCSS with CSS Variables for theming
- **Database**: SQLite (via @payloadcms/db-sqlite)
- **Rich Text**: Lexical editor with blocks support
- **Testing**: Vitest (integration tests), Playwright (e2e tests)
- **Package Manager**: pnpm

## Core Commands

### Development
- `pnpm dev` - Start development server on http://localhost:3000
- `pnpm build` - Build production bundle
- `pnpm start` - Start production server
- `pnpm dev:prod` - Clean build and start production mode locally

### Code Quality & Testing
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues automatically
- `pnpm test` - Run all tests (integration + e2e)
- `pnpm test:int` - Run integration tests only (Vitest)
- `pnpm test:e2e` - Run e2e tests only (Playwright)

### Payload CMS
- `pnpm payload` - Access Payload CLI
- `pnpm generate:types` - Generate TypeScript types from Payload config
- `pnpm generate:importmap` - Generate import map for admin panel

### Database Seeding
- Access `/next/seed` endpoint or use admin panel "seed database" button
- Seeds demo content and creates demo user: `demo-author@payloadcms.com` / `password`

## Architecture Overview

### Directory Structure
- `src/app/(frontend)/` - Next.js App Router pages for public website
- `src/app/(payload)/` - Payload admin panel routes
- `src/collections/` - Payload CMS collections (Pages, Posts, Media, Categories, Users)
- `src/blocks/` - Reusable content blocks for layout builder
- `src/components/` - React components including shadcn/ui
- `src/providers/` - React context providers (Theme, etc.)
- `src/utilities/` - Helper functions and utilities

### Key Collections
- **Pages**: Layout builder enabled with hero sections and blocks
- **Posts**: Blog posts with Lexical rich text editor and blocks
- **Media**: File uploads with size variants and focal points
- **Categories**: Nested taxonomy for organizing posts
- **Users**: Authentication-enabled collection

### Content Management
- Draft/publish workflow with live preview
- Scheduled publishing via jobs queue
- On-demand revalidation for published content
- SEO plugin integration for meta fields
- Form builder for contact forms

### Layout Builder System
Available blocks: Archive, Banner, CallToAction, Code, Content, Form, MediaBlock
Hero types: HighImpact, LowImpact, MediumImpact, PostHero

### Database & Deployment
- SQLite for local development (`consilienta.db`)
- Docker support via `docker-compose up`
- Vercel deployment ready with standalone output
- Payload Cloud compatible

## Development Notes

- Never start the dev server unless asked to, the user will handle this

### TypeScript Configuration
- Path aliases: `@/*` maps to `src/*`
- Payload config alias: `@payload-config`
- Strict mode enabled with comprehensive type checking

### Styling System
- CSS variables for theming (light/dark mode support)
- TailwindCSS with custom design tokens
- Geist Sans and Geist Mono fonts
- Typography plugin for rich content

### Access Control
- Basic role-based access: authenticated users can CRUD, everyone can read published
- Draft content only visible to authenticated users
- Admin bar for content editing when logged in

### Environment Requirements
- Node.js ^18.20.2 || >=20.9.0
- pnpm ^9 || ^10
- Set `DATABASE_URI` and `PAYLOAD_SECRET` environment variables

## Testing Strategy
- Integration tests in `tests/int/` using Vitest with jsdom
- E2E tests in `tests/e2e/` using Playwright
- Test environment configuration in `test.env`
