import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { ValueMap } from '@/types/database';

export function useValueMap(extractionId: number) {
  return useQuery({
    queryKey: ['value-maps', extractionId],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('value_maps')
          .select('*')
          .eq('extraction_id', extractionId)
          .single();

        if (error) {
          console.warn('Supabase error in useValueMap:', error);
          // Return null for not found errors
          if (error.code === 'PGRST116' || error.message?.includes('No rows')) {
            return null;
          }
          throw error;
        }
        
        // Validate data structure
        if (!data || !data.extraction_id) {
          console.warn('Invalid value map data:', data);
          return null;
        }
        
        return data as ValueMap;
      } catch (error) {
        console.error('Error in useValueMap:', error);
        throw error;
      }
    },
    enabled: !!extractionId,
    retry: (failureCount, error: any) => {
      // Don't retry on not found errors
      if (error?.code === 'PGRST116' || error?.message?.includes('No rows')) {
        return false;
      }
      return failureCount < 2;
    },
  });
}

export function useValueMaps(customerId: number) {
  return useQuery({
    queryKey: ['value-maps', 'customer', customerId],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('value_maps')
          .select('*')
          .eq('customer_id', customerId)
          .order('created_at', { ascending: false });

        if (error) {
          console.warn('Supabase error in useValueMaps:', error);
          throw error;
        }
        
        // Handle empty data gracefully
        if (!data) {
          return [];
        }
        
        // Filter out invalid items
        const validMaps = data.filter(item => 
          item && item.extraction_id && item.customer_id
        );
        
        return validMaps as ValueMap[];
      } catch (error) {
        console.error('Error in useValueMaps:', error);
        throw error;
      }
    },
    enabled: !!customerId,
  });
}