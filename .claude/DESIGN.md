# OSP Value Map - Technical Design Document

## System Architecture

### Frontend Architecture
The application follows a component-based architecture with clear separation between presentation and business logic.

#### Key Architectural Decisions
1. **Supabase Client**: Single instance managed through React Context
2. **Data Fetching**: Custom hooks using Supabase realtime subscriptions
3. **State Management**: React Query for server state, Context for UI state
4. **Routing**: Nested routes matching the navigation hierarchy
5. **Error Handling**: Error boundaries at route level

### Component Hierarchy
```
App
├── CustomerDashboard (/)
│   ├── CustomerList
│   ├── CustomerCard
│   └── NewCustomerModal
├── CustomerDetail (/customers/:id)
│   ├── WebsiteSection
│   ├── DocumentSection
│   └── FeatureExtractionList
├── FeatureExtractions (/customers/:id/extractions)
│   ├── ExtractionList
│   └── ValueMapStatus
├── ExtractionDetail (/customers/:id/extractions/:extractionId)
│   ├── DocumentList
│   └── ValueMapControls
├── FeatureMapView (/customers/:id/extractions/:extractionId/documents/:docId)
│   ├── FeatureTable
│   └── NavigationControls
└── ValueMapView (/customers/:id/extractions/:extractionId/value-map)
    └── FeatureTable
```

### Data Flow
1. Supabase queries fetch data based on route parameters
2. Custom hooks manage loading states and error handling
3. Components receive data through props or context
4. Webhooks trigger data mutations, followed by cache invalidation

### Navigation Patterns
- Breadcrumb navigation shows full hierarchy
- Advanced navigation modes for browsing documents
- URL state management for filters and sorting

### Performance Optimizations
1. Virtual scrolling for large lists
2. Lazy loading of chart components
3. Memoization of expensive computations
4. Debounced search inputs
5. Optimistic UI updates for webhooks
