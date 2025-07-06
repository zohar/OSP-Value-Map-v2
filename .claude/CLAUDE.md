# OSP Value Map - Claude Code Guidelines

## Project Overview
This is a React 18 + TypeScript + Vite application that visualizes marketing analysis data from Supabase. The application is READ-ONLY and performs no database modifications except through webhook integrations.

## Core Technologies
- Frontend: React 18 + TypeScript + Vite
- UI Components: Radix UI primitives with Tailwind CSS
- Database: Supabase (PostgreSQL) - READ ONLY access
- Charts: Recharts
- Icons: Lucide React (EXCLUSIVE - no other icon libraries)
- Routing: React Router DOM

## Architecture Principles
1. Component-based architecture with clear separation of concerns
2. Custom hooks for data fetching and state management
3. Type-safe development with TypeScript
4. Mobile-first responsive design
5. Accessibility-first approach using Radix UI

## Database Schema
- customers: Top-level entity containing customer information
- documents: All customer documents (webpages from crawls, uploaded PDFs, etc.)
- crawls: Website crawl information linked to customers
- feature_extractions: Individual document feature maps
- value_maps: Aggregated Value Maps combining multiple feature maps

## Terminology
- Feature Maps: Individual per-document extraction results
- Value Maps: Aggregated maps combining all feature maps from an extraction
- Documents: Both crawled webpages and uploaded files (PDFs, etc.)
- Feature Extraction: Process of analyzing documents (formerly "execution")

## Color System
Primary palette based on warm amber tones:
- Primary: hsl(38 92% 50%) - Amber for main actions
- Secondary: hsl(210 40% 96%) - Light gray for subtle elements
- Background: hsl(0 0% 100%) - White
- Foreground: hsl(0 0% 15%) - Dark gray text
- Muted: hsl(210 40% 98%) - Very light gray

Feature Map hierarchy colors:
- Category: hsl(38 92% 40%) - Medium amber
- Area: hsl(48 100% 60%) - Light amber/yellow  
- Feature: Muted gray background

## Webhook Integrations
All webhooks include customer_id where relevant:
- Customer creation
- Website crawling
- Document upload
- Feature extraction
- Value Map generation

## File Structure
```
src/
├── components/
│   ├── ui/           # Radix UI primitive components
│   ├── features/     # Feature-specific components
│   ├── layout/       # Layout components
│   └── shared/       # Shared components
├── hooks/            # Custom React hooks
├── lib/              # Utilities and helpers
├── pages/            # Page components
├── services/         # API and Supabase services
└── types/            # TypeScript type definitions
```

## Development Guidelines
1. Always use Lucide React for icons
2. Implement loading states with Loader2 or RefreshCw icons
3. Use Tailwind CSS classes exclusively for styling
4. Ensure WCAG compliance (4.5:1 contrast ratio minimum)
5. Implement proper error boundaries and error handling
6. Use React Suspense for code splitting where appropriate
7. Implement virtual scrolling for large datasets (100+ items)

## Component Patterns
- Use controlled components for forms
- Implement proper loading, error, and empty states
- Use React.memo for expensive list items
- Implement proper keyboard navigation
- Use semantic HTML elements

## Performance Requirements
- Page loads under 2 seconds
- Support 1000+ documents per customer
- Implement pagination for >50 items
- Use React Query or similar for caching

## Security Considerations
- Never perform database writes directly
- Validate all webhook payloads
- Sanitize user inputs
- Use environment variables for sensitive data
- Implement proper CORS handling

