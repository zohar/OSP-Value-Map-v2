import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { CustomerWithCounts } from '@/types/database';

export function useCustomers() {
  return useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customers')
        .select(`
          *,
          documents!inner(count),
          feature_extractions!inner(count),
          crawls!inner(count)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to include counts
      const customersWithCounts: CustomerWithCounts[] = data.map((customer: any) => ({
        ...customer,
        document_count: customer.documents?.[0]?.count || 0,
        extraction_count: customer.feature_extractions?.[0]?.count || 0,
        crawl_count: customer.crawls?.[0]?.count || 0,
      }));

      return customersWithCounts;
    },
  });
}

export function useCustomer(customerId: number) {
  return useQuery({
    queryKey: ['customers', customerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customers')
        .select(`
          *,
          documents!inner(count),
          feature_extractions!inner(count),
          crawls!inner(count)
        `)
        .eq('id', customerId)
        .single();

      if (error) throw error;
      
      const customerWithCounts: CustomerWithCounts = {
        ...data,
        document_count: data.documents?.[0]?.count || 0,
        extraction_count: data.feature_extractions?.[0]?.count || 0,
        crawl_count: data.crawls?.[0]?.count || 0,
      };

      return customerWithCounts;
    },
    enabled: !!customerId,
  });
}