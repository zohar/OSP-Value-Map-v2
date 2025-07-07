# Database Relationship Fix

## Problem
The error indicates that Supabase cannot find the foreign key relationship between `feature_extractions` and `documents` tables.

## Solutions (Try in Order)

### 1. Manual Join Query (Most Reliable)
If the current fix doesn't work, replace the queries with manual joins:

```typescript
// In useExtractions function
const { data, error } = await supabase
  .from('feature_extractions')
  .select(`
    extraction_id,
    customer_id,
    created_at,
    document_id,
    value_maps(*)
  `)
  .eq('customer_id', customerId)
  .order('created_at', { ascending: false });

if (error) throw error;

// Then fetch documents separately
const documentIds = [...new Set(data.map(item => item.document_id))];
const { data: documents, error: docError } = await supabase
  .from('documents')
  .select('*')
  .in('id', documentIds);

if (docError) throw docError;

// Merge the data manually
```

### 2. Database Schema Check
Verify your Supabase database has the proper foreign key constraint:

```sql
-- Check if foreign key exists
SELECT 
    tc.constraint_name, 
    tc.table_name, 
    kcu.column_name, 
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name 
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND tc.table_name='feature_extractions'
  AND kcu.column_name='document_id';
```

### 3. Create Missing Foreign Key (If Needed)
If the foreign key doesn't exist, create it:

```sql
ALTER TABLE feature_extractions 
ADD CONSTRAINT fk_feature_extractions_document_id 
FOREIGN KEY (document_id) REFERENCES documents(id);
```

### 4. Alternative Query Syntax
Try different Supabase relationship syntax:

```typescript
// Option A: Use explicit foreign key name
documents!fk_feature_extractions_document_id(*)

// Option B: Use table and column
documents!feature_extractions_document_id_documents_id_fkey(*)

// Option C: Simple column reference
documents(*)
```

The fix I applied should resolve the issue, but if it doesn't work, try the manual join approach in solution #1.