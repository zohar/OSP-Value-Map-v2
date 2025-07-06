import { useParams, Link } from 'react-router-dom';
import { useCustomer } from '@/hooks/useCustomers';
import { useExtractions } from '@/hooks/useExtractions';
import { LoadingState } from '@/components/shared/LoadingState';
import { ErrorState } from '@/components/shared/ErrorState';
import { EmptyState } from '@/components/shared/EmptyState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Calendar, FileText, Eye, BarChart3 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function FeatureExtractions() {
  const { customerId } = useParams<{ customerId: string }>();
  const customerIdNum = parseInt(customerId || '0');

  const { data: customer, isLoading: customerLoading } = useCustomer(customerIdNum);
  const { data: extractions, isLoading: extractionsLoading, error } = useExtractions(customerIdNum);

  if (customerLoading || extractionsLoading) {
    return <LoadingState message="Loading feature extractions..." />;
  }

  if (error) return <ErrorState error={error} />;
  if (!customer) return <ErrorState error={new Error('Customer not found')} />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Feature Extractions</h1>
          <p className="text-muted-foreground mt-1">
            Manage feature extractions for {customer.name}
          </p>
        </div>
        
        <Button>
          <Zap className="h-4 w-4 mr-2" />
          New Extraction
        </Button>
      </div>

      {extractions?.length === 0 ? (
        <EmptyState
          title="No feature extractions yet"
          description="Create your first feature extraction to analyze documents and generate insights"
          icon={<Zap className="h-12 w-12" />}
          action={
            <Button>
              <Zap className="h-4 w-4 mr-2" />
              Create First Extraction
            </Button>
          }
        />
      ) : (
        <div className="grid gap-6">
          {extractions?.map((extraction) => (
            <Card key={extraction.extraction_id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-primary" />
                    <span>Extraction {extraction.extraction_id}</span>
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {extraction.value_map && (
                      <Badge variant="secondary">
                        <BarChart3 className="h-3 w-3 mr-1" />
                        Value Map Available
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDistanceToNow(new Date(extraction.created_at), { addSuffix: true })}
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    {extraction.documents.length} documents
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {extraction.documents.slice(0, 6).map((document) => (
                    <div
                      key={document.id}
                      className="p-3 border rounded-lg bg-muted/30"
                    >
                      <h4 className="font-medium text-sm truncate">{document.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {document.content_type}
                      </p>
                    </div>
                  ))}
                  {extraction.documents.length > 6 && (
                    <div className="p-3 border rounded-lg bg-muted/30 flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">
                        +{extraction.documents.length - 6} more
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" asChild>
                    <Link to={`/customers/${customerId}/extractions/${extraction.extraction_id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Link>
                  </Button>
                  
                  {extraction.value_map && (
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/customers/${customerId}/extractions/${extraction.extraction_id}/value-map`}>
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Value Map
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}