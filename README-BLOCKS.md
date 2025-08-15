# Flexible Block-Based Page System

This project now uses a flexible, block-based system that allows content editors to create any type of page using configurable blocks through Payload CMS.

## How It Works

### 1. **Pages Collection**
- **Location**: `collections/Pages.ts`
- **Purpose**: Defines the structure for any page type
- **Key Feature**: Uses Payload's `blocks` field type for maximum flexibility

### 2. **Block System**
Each page is composed of blocks that can be:
- Reordered
- Configured independently
- Reused across different pages
- Added/removed as needed

### 3. **Available Block Types**

#### Hero Block
- **Variants**: High Impact, Medium Impact, Low Impact, Post Hero
- **Features**: Badge, headline, description, buttons, background options
- **Background Types**: None, Image, Video, 3D Model (Helix)

#### Features Block
- **Layouts**: Grid 2x3, Grid 3x2, List, Carousel
- **Features**: Icon selection, custom icons, titles, descriptions, links
- **Icons**: Built-in (Users, Target, Lightbulb, Globe, Zap, Award) or custom

#### CTA Block
- **Variants**: Standard, Split, Full Width
- **Features**: Title, description, multiple buttons, background options
- **Button Actions**: Link, Modal, Scroll

#### Content Block
- **Widths**: Full, Container, Narrow
- **Features**: Rich text content, background options
- **Background Types**: None, Solid color, Image

#### Media Block
- **Alignment**: Left, Center, Right, Full Width
- **Sizes**: Small, Medium, Large
- **Features**: Caption, automatic media type detection

#### Form Block
- **Field Types**: Text, Email, Textarea, Select, Checkbox, Number
- **Features**: Dynamic field generation, validation, custom options

## Usage

### For Content Editors

1. **Create a New Page**
   - Go to Payload Admin → Pages
   - Click "Create New"
   - Fill in title and slug
   - Add blocks using the "Add Block" button

2. **Configure Blocks**
   - Each block has its own configuration options
   - Use the sidebar to adjust settings
   - Preview changes in real-time

3. **Reorder Blocks**
   - Drag and drop blocks to reorder
   - Copy blocks between pages
   - Delete blocks as needed

### For Developers

1. **Add New Block Types**
   - Create new block component in `components/blocks/`
   - Add to `BlockRenderer.tsx`
   - Update `Pages.ts` collection with new block fields

2. **Customize Existing Blocks**
   - Modify block components directly
   - Add new variants or options
   - Extend functionality as needed

3. **Create New Pages**
   - Use the `usePage` hook to fetch page data
   - Render with `BlockRenderer` component
   - Access page metadata and layout

## Example: Creating a Landing Page

```typescript
// Fetch page data
const { data: page } = usePage('landing-page')

// Render with blocks
<BlockRenderer blocks={page.layout} />
```

## Example: Creating a Blog Post

```typescript
// Same system, different content
const { data: post } = usePage('blog-post-slug')

// Render with blocks
<BlockRenderer blocks={post.layout} />
```

## Benefits

1. **Flexibility**: Create any page type without code changes
2. **Reusability**: Blocks can be used across multiple pages
3. **Maintainability**: Centralized block logic
4. **Scalability**: Easy to add new block types
5. **Content Editor Friendly**: Visual block configuration
6. **Performance**: Optimized rendering with proper TypeScript types

## File Structure

```
components/
├── blocks/
│   ├── BlockRenderer.tsx      # Main block orchestrator
│   ├── HeroBlock.tsx          # Hero section block
│   ├── FeaturesBlock.tsx      # Features grid block
│   ├── CTABlock.tsx           # Call-to-action block
│   ├── ContentBlock.tsx       # Rich text content block
│   ├── MediaBlock.tsx         # Media display block
│   └── FormBlock.tsx          # Dynamic form block
├── landing/                    # Legacy components (can be removed)
└── ui/                        # Reusable UI components

collections/
└── Pages.ts                   # Page collection definition

hooks/
├── usePage.ts                 # Hook to fetch page data
└── useLandingPage.ts          # Legacy hook (can be removed)

app/
├── (frontend)/
│   ├── page.tsx               # Home page using blocks
│   └── [slug]/
│       └── page.tsx           # Dynamic page renderer
```

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Seed Sample Data**
   ```bash
   npm run seed
   ```

4. **Access Payload Admin**
   - Go to `/admin`
   - Create your first page with blocks

## Adding New Block Types

1. **Create Block Component**
   ```typescript
   // components/blocks/NewBlock.tsx
   export function NewBlock({ data }: NewBlockProps) {
     // Your block implementation
   }
   ```

2. **Add to BlockRenderer**
   ```typescript
   case 'new-block':
     return <NewBlock key={index} data={blockData} />
   ```

3. **Update Pages Collection**
   ```typescript
   {
     slug: 'new-block',
     fields: [
       // Your block fields
     ],
   }
   ```

## Migration from Static Components

The old static components in `components/landing/` can be gradually replaced:

1. **Create equivalent blocks** for each component
2. **Migrate existing pages** to use the block system
3. **Remove old components** once migration is complete

This approach ensures a smooth transition while maintaining all existing functionality.
