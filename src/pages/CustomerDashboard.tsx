import { useState } from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import { useCustomers } from '@/hooks/useCustomers';
import { CustomerCard } from '@/components/features/CustomerCard';
import { NewCustomerDialog } from '@/components/features/NewCustomerDialog';
import { AnalyticsCards } from '@/components/features/AnalyticsCards';
import { Button } from '@/components/ui/button';
import { LoadingState } from '@/components/shared/LoadingState';
import { EmptyState } from '@/components/shared/EmptyState';
import { ErrorState } from '@/components/shared/ErrorState';
import { Building2 } from 'lucide-react';

export function CustomerDashboard() {
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const { data: customers, isLoading, error, refetch } = useCustomers();

  if (isLoading) return <LoadingState message="Loading customers..." />;
  if (error) return <ErrorState error={error} onRetry={refetch} />;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Customers</h1>
          <p className="text-muted-foreground text-lg">Manage your customer feature mappings and analysis</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => refetch()} variant="outline" size="icon" className="hover:shadow-md transition-all duration-200 hover:scale-105">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button onClick={() => setShowNewCustomer(true)} className="bg-gradient-primary hover:shadow-lg transition-all duration-200 hover:scale-105">
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      <AnalyticsCards customers={customers} />

      {customers?.length === 0 ? (
        <EmptyState 
          title="No customers yet"
          description="Add your first customer to get started with feature mapping and analysis"
          icon={<Building2 className="h-12 w-12" />}
          action={
            <Button onClick={() => setShowNewCustomer(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customers?.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))}
        </div>
      )}

      <NewCustomerDialog 
        open={showNewCustomer} 
        onOpenChange={setShowNewCustomer}
      />
    </div>
  );
}