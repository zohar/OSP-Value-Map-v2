import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { ExtractionWithDocuments, FeatureExtraction } from '@/types/database';

export function useExtractions(customerId: number) {
  return useQuery({
    queryKey: ['extractions', customerId],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('feature_extractions')
          .select(`
            extraction_id,
            customer_id,
            created_at,
            documents!document_id(*),
            value_maps(*)
          `)
          .eq('customer_id', customerId)
          .order('created_at', { ascending: false });

        if (error) {
          console.warn('Supabase error in useExtractions:', error);
          // Return empty array instead of throwing for relationship errors
          if (error.code === 'PGRST200' || error.message?.includes('relationship')) {
            return [];
          }
          throw error;
        }
        
        // Handle empty data gracefully
        if (!data || data.length === 0) {
          return [];
        }
        
        // Group by extraction_id
        const extractionsMap = new Map<number, ExtractionWithDocuments>();
        
        data.forEach((item: any) => {
          // Skip items with invalid data
          if (!item?.extraction_id || !item?.customer_id || !item?.created_at) {
            console.warn('Skipping invalid extraction item:', item);
            return;
          }
          
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
          if (item.documents && typeof item.documents === 'object') {
            extraction.documents.push(item.documents);
          }
        });

        return Array.from(extractionsMap.values());
      } catch (error) {
        console.error('Error in useExtractions:', error);
        throw error;
      }
    },
    enabled: !!customerId,
    retry: (failureCount, error: any) => {
      // Don't retry on relationship errors
      if (error?.code === 'PGRST200' || error?.message?.includes('relationship')) {
        return false;
      }
      return failureCount < 2;
    },
  });
}

export function useExtraction(extractionId: number) {
  return useQuery({
    queryKey: ['extractions', extractionId],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('feature_extractions')
          .select(`
            extraction_id,
            customer_id,
            created_at,
            documents!document_id(*),
            value_maps(*)
          `)
          .eq('extraction_id', extractionId);

        if (error) {
          console.warn('Supabase error in useExtraction:', error);
          // Return null instead of throwing for relationship errors
          if (error.code === 'PGRST200' || error.message?.includes('relationship')) {
            return null;
          }
          throw error;
        }
        
        // Handle empty data gracefully
        if (!data || data.length === 0) {
          return null;
        }
        
        // Validate first item has required fields
        const firstItem = data[0];
        if (!firstItem?.extraction_id || !firstItem?.customer_id || !firstItem?.created_at) {
          console.warn('Invalid extraction data:', firstItem);
          return null;
        }
        
        const extraction: ExtractionWithDocuments = {
          extraction_id: firstItem.extraction_id,
          customer_id: firstItem.customer_id,
          created_at: firstItem.created_at,
          documents: data
            .map((item: any) => item.documents)
            .filter(doc => doc && typeof doc === 'object'),
          value_map: firstItem.value_maps?.[0] || undefined,
        };

        return extraction;
      } catch (error) {
        console.error('Error in useExtraction:', error);
        throw error;
      }
    },
    enabled: !!extractionId,
    retry: (failureCount, error: any) => {
      // Don't retry on relationship errors
      if (error?.code === 'PGRST200' || error?.message?.includes('relationship')) {
        return false;
      }
      return failureCount < 2;
    },
  });
}

export function useFeatureExtraction(extractionId: number, documentId: number) {
  return useQuery({
    queryKey: ['feature-extractions', extractionId, documentId],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('feature_extractions')
          .select('*')
          .eq('extraction_id', extractionId)
          .eq('document_id', documentId)
          .single();

        if (error) {
          console.warn('Supabase error in useFeatureExtraction:', error);
          // Return null for not found errors
          if (error.code === 'PGRST116' || error.message?.includes('No rows')) {
            return null;
          }
          throw error;
        }
        
        // Validate data structure
        if (!data || !data.extraction_id || !data.document_id) {
          console.warn('Invalid feature extraction data:', data);
          return null;
        }
        
        return data as FeatureExtraction;
      } catch (error) {
        console.error('Error in useFeatureExtraction:', error);
        throw error;
      }
    },
    enabled: !!(extractionId && documentId),
    retry: (failureCount, error: any) => {
      // Don't retry on not found errors
      if (error?.code === 'PGRST116' || error?.message?.includes('No rows')) {
        return false;
      }
      return failureCount < 2;
    },
  });
}