import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { ValueMap } from '@/types/database';

export function useValueMap(extractionId: number) {
  return useQuery({
    queryKey: ['value-maps', extractionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('value_maps')
        .select('*')
        .eq('extraction_id', extractionId)
        .single();

      if (error) throw error;
      return data as ValueMap;
    },
    enabled: !!extractionId,
  });
}

export function useValueMaps(customerId: number) {
  return useQuery({
    queryKey: ['value-maps', 'customer', customerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('value_maps')
        .select('*')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as ValueMap[];
    },
    enabled: !!customerId,
  });
}