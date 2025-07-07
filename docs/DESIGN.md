# OSP Features Map - Technical Design Document

## System Architecture

### Overall System Flow
1. **Content Collection**: Website crawling and document uploads populate the documents table
2. **Feature Extraction**: n8n workflows process documents and generate feature maps
3. **Data Storage**: Feature extraction results are stored with n8n execution IDs for grouping
4. **Frontend Display**: React application presents the hierarchical feature data

### Frontend Architecture
The application follows a component-based architecture with clear separation between presentation and business logic.

#### Key Architectural Decisions
1. **Supabase Client**: Single instance managed through React Context
2. **Data Fetching**: Custom hooks using Supabase realtime subscriptions
3. **State Management**: React Query for server state, Context for UI state
4. **Routing**: Nested routes matching the navigation hierarchy
5. **Error Handling**: Error boundaries at route level
6. **n8n Integration**: Feature extractions are processed by n8n workflows

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
│   ├── DocumentList (shows all documents processed in this n8n execution)
│   └── ValueMapControls
├── FeatureMapView (/customers/:id/extractions/:extractionId/documents/:docId)
│   ├── FeatureTable
│   └── NavigationControls
└── ValueMapView (/customers/:id/extractions/:extractionId/value-map)
    └── FeatureTable
```

### Data Model & Relationships

#### Core Tables
1. **`customers`**: Customer information and metadata
2. **`documents`**: All crawled pages and uploaded documents
3. **`crawls`**: Website crawling operations and status
4. **`feature_extractions`**: Feature map results from n8n processing
5. **`value_maps`**: Aggregated feature maps for entire extractions

#### Key Relationships
- **`documents`** → **`customers`**: Each document belongs to a customer
- **`feature_extractions`** → **`documents`**: Each extraction result links to a specific document
- **`feature_extractions`** → **`customers`**: Each extraction belongs to a customer
- **`value_maps`** → **`feature_extractions`**: Aggregated view of extraction results

#### Critical Data Concepts
- **`extraction_id`**: n8n execution ID that groups multiple document extractions
- **Multiple documents per extraction**: A single n8n execution processes multiple documents
- **Individual feature maps**: Each document gets its own featureMap JSON in `feature_extractions.results`
- **Aggregated value maps**: Combined analysis across all documents in an extraction

### Data Flow
1. **Content Ingestion**: Documents are crawled or uploaded into the `documents` table
2. **n8n Processing**: Workflow executes feature extraction on multiple documents
3. **Results Storage**: Each document's featureMap is saved with the same `extraction_id`
4. **Frontend Queries**: React hooks fetch extractions grouped by `extraction_id`
5. **UI Rendering**: Components display hierarchical feature data
6. **Real-time Updates**: Webhooks trigger cache invalidation for live updates

### Navigation Patterns
- Breadcrumb navigation shows full hierarchy
- Advanced navigation modes for browsing documents
- URL state management for filters and sorting

### n8n Workflow Integration

#### Feature Extraction Process
1. **Trigger**: Documents are crawled or uploaded to the system
2. **n8n Execution**: Workflow processes multiple documents in batch
3. **Processing**: Each document is analyzed to generate a featureMap JSON
4. **Storage**: Results stored in `feature_extractions` with shared `extraction_id`
5. **Aggregation**: Value maps combine results across all documents in execution

#### Data Grouping Logic
- **`extraction_id`**: n8n execution ID acts as grouping identifier
- **Batch Processing**: Single n8n execution handles multiple documents
- **Individual Results**: Each document gets separate row in `feature_extractions`
- **Shared Execution**: All documents in batch share same `extraction_id`

### Query Patterns

#### Extraction Queries
```sql
-- Fetch all extractions for a customer (grouped by extraction_id)
SELECT extraction_id, customer_id, created_at, 
       array_agg(documents.*) as documents
FROM feature_extractions 
JOIN documents ON feature_extractions.document_id = documents.id
WHERE customer_id = ? 
GROUP BY extraction_id, customer_id, created_at
```

#### Document-Extraction Relationship
- **One-to-Many**: One n8n execution → Multiple documents
- **Many-to-One**: Multiple feature_extractions → One extraction_id
- **Foreign Keys**: feature_extractions.document_id → documents.id

### Performance Optimizations
1. Virtual scrolling for large lists
2. Lazy loading of chart components
3. Memoization of expensive computations
4. Debounced search inputs
5. Optimistic UI updates for webhooks
6. Grouped queries by extraction_id to reduce database calls