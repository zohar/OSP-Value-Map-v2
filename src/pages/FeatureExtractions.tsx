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
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Feature Extractions</h1>
          <p className="text-muted-foreground text-lg">
            Manage feature extractions for {customer.name}
          </p>
        </div>
        
        <Button className="bg-gradient-primary hover:shadow-lg transition-all duration-200 hover:scale-105">
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
            <Card key={extraction.extraction_id} className="hover:shadow-xl transition-all duration-300 hover-lift group border-l-4 border-l-primary/20 hover:border-l-primary bg-gradient-to-br from-card to-muted/20">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <span className="group-hover:text-primary transition-colors font-semibold">Extraction {extraction.extraction_id}</span>
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {extraction.value_map && (
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200 transition-colors">
                        <BarChart3 className="h-3 w-3 mr-1" />
                        Value Map Available
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground mt-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-green-500" />
                    {formatDistanceToNow(new Date(extraction.created_at), { addSuffix: true })}
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">{extraction.documents.length} documents</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {extraction.documents.slice(0, 6).map((document) => (
                    <div
                      key={document.id}
                      className="p-4 border rounded-lg bg-background/50 hover:bg-background/80 transition-all duration-200 hover:shadow-sm group"
                    >
                      <div className="flex items-start space-x-2">
                        <FileText className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">{document.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1 font-medium">
                            {document.content_type}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {extraction.documents.length > 6 && (
                    <div className="p-4 border rounded-lg bg-muted/50 flex items-center justify-center hover:bg-muted/70 transition-colors">
                      <span className="text-sm text-muted-foreground font-medium">
                        +{extraction.documents.length - 6} more
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-3 pt-2">
                  <Button size="sm" asChild className="hover:shadow-md transition-all duration-200 hover:scale-105">
                    <Link to={`/customers/${customerId}/extractions/${extraction.extraction_id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Link>
                  </Button>
                  
                  {extraction.value_map && (
                    <Button size="sm" variant="outline" asChild className="hover:shadow-md transition-all duration-200 hover:scale-105 border-purple-200 text-purple-700 hover:bg-purple-50">
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