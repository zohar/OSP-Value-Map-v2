import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { ExtractionWithDocuments, FeatureExtraction } from '@/types/database';

export function useExtractions(customerId: number) {
  return useQuery({
    queryKey: ['extractions', customerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('feature_extractions')
        .select(`
          extraction_id,
          customer_id,
          created_at,
          documents!inner(*),
          value_maps(*)
        `)
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Group by extraction_id
      const extractionsMap = new Map<number, ExtractionWithDocuments>();
      
      data.forEach((item: any) => {
        if (!extractionsMap.has(item.extraction_id)) {
          extractionsMap.set(item.extraction_id, {
            extraction_id: item.extraction_id,
            customer_id: item.customer_id,
            created_at: item.created_at,
            documents: [],
            value_map: item.value_maps?.[0] || undefined,
          });
        }
        
        const extraction = extractionsMap.get(item.extraction_id)!;
        if (item.documents) {
          extraction.documents.push(item.documents);
        }
      });

      return Array.from(extractionsMap.values());
    },
    enabled: !!customerId,
  });
}

export function useExtraction(extractionId: number) {
  return useQuery({
    queryKey: ['extractions', extractionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('feature_extractions')
        .select(`
          extraction_id,
          customer_id,
          created_at,
          documents!inner(*),
          value_maps(*)
        `)
        .eq('extraction_id', extractionId);

      if (error) throw error;
      
      if (data.length === 0) return null;
      
      const extraction: ExtractionWithDocuments = {
        extraction_id: data[0].extraction_id,
        customer_id: data[0].customer_id,
        created_at: data[0].created_at,
        documents: data.map((item: any) => item.documents).filter(Boolean),
        value_map: data[0].value_maps?.[0] || undefined,
      };

      return extraction;
    },
    enabled: !!extractionId,
  });
}

export function useFeatureExtraction(extractionId: number, documentId: number) {
  return useQuery({
    queryKey: ['feature-extractions', extractionId, documentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('feature_extractions')
        .select('*')
        .eq('extraction_id', extractionId)
        .eq('document_id', documentId)
        .single();

      if (error) throw error;
      return data as FeatureExtraction;
    },
    enabled: !!(extractionId && documentId),
  });
}