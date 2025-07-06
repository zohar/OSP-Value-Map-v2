import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Crawl } from '@/types/database';

export function useCrawls(customerId: number) {
  return useQuery({
    queryKey: ['crawls', customerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('crawls')
        .select('*')
        .eq('customer_id', customerId)
        .order('started_at', { ascending: false });

      if (error) throw error;
      return data as Crawl[];
    },
    enabled: !!customerId,
  });
}

export function useCrawl(crawlId: number) {
  return useQuery({
    queryKey: ['crawls', crawlId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('crawls')
        .select('*')
        .eq('id', crawlId)
        .single();

      if (error) throw error;
      return data as Crawl;
    },
    enabled: !!crawlId,
  });
}