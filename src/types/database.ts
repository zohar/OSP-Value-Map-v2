export interface Database {
  public: {
    Tables: {
      customers: {
        Row: Customer
        Insert: Omit<Customer, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Customer, 'id' | 'created_at'>>
      }
      documents: {
        Row: Document
        Insert: Omit<Document, 'id' | 'created_at'>
        Update: Partial<Omit<Document, 'id' | 'created_at'>>
      }
      crawls: {
        Row: Crawl
        Insert: Omit<Crawl, 'id' | 'created_at'>
        Update: Partial<Omit<Crawl, 'id' | 'created_at'>>
      }
      feature_extractions: {
        Row: FeatureExtraction
        Insert: Omit<FeatureExtraction, 'created_at'>
        Update: Partial<FeatureExtraction>
      }
      value_maps: {
        Row: ValueMap
        Insert: Omit<ValueMap, 'id' | 'created_at'>
        Update: Partial<Omit<ValueMap, 'id' | 'created_at'>>
      }
    }
  }
}

export interface Customer {
  id: number;
  name: string;
  created_at: string;
  updated_at: string | null;
  metadata: Record<string, any> | null;
}

export interface Document {
  id: number;
  customer_id: number;
  name: string;
  content_type: string;
  source_url: string | null;
  crawl_id: number | null;
  upload_id: number | null;
  created_at: string;
  metadata: Record<string, any> | null;
}

export interface Crawl {
  id: number;
  customer_id: number;
  url: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  limit: number;
  pages_crawled: number;
  created_at: string;
  completed_at: string | null;
  metadata: Record<string, any> | null;
}

export interface FeatureExtraction {
  extraction_id: number;
  document_id: number;
  customer_id: number;
  created_at: string;
  feature_map: FeatureMap | null;
}

export interface ValueMap {
  id: number;
  created_at: string;
  extraction_id: number;
  customer_id: number;
  value_map: FeatureMap | null;
}

export interface FeatureMap {
  featuresMap: Array<{
    category: string;
    areas: Array<{
      name: string;
      features: string[];
    }>;
  }>;
}

// Extended types with relationships
export interface CustomerWithCounts extends Customer {
  document_count: number;
  extraction_count: number;
  crawl_count: number;
}

export interface DocumentWithExtraction extends Document {
  feature_extraction?: FeatureExtraction;
  crawl?: Crawl;
}

export interface ExtractionWithDocuments {
  extraction_id: number;
  customer_id: number;
  created_at: string;
  documents: DocumentWithExtraction[];
  value_map?: ValueMap;
}