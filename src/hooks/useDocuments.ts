import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { DocumentWithExtraction } from '@/types/database';

export function useDocuments(customerId: number) {
  return useQuery({
    queryKey: ['documents', customerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('documents')
        .select(`
          *,
          feature_extractions(*),
          crawls(*)
        `)
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as DocumentWithExtraction[];
    },
    enabled: !!customerId,
  });
}

export function useDocument(documentId: number) {
  return useQuery({
    queryKey: ['documents', documentId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('documents')
        .select(`
          *,
          feature_extractions(*),
          crawls(*)
        `)
        .eq('id', documentId)
        .single();

      if (error) throw error;
      return data as DocumentWithExtraction;
    },
    enabled: !!documentId,
  });
}