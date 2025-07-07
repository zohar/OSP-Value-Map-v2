import { useParams, Link } from 'react-router-dom';
import { useExtraction } from '@/hooks/useExtractions';
import { LoadingState } from '@/components/shared/LoadingState';
import { ErrorState } from '@/components/shared/ErrorState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Calendar, 
  ExternalLink, 
  Eye, 
  BarChart3,
  ArrowRight
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function ExtractionDetail() {
  const { customerId, extractionId } = useParams<{ 
    customerId: string; 
    extractionId: string; 
  }>();
  
  const extractionIdNum = parseInt(extractionId || '0');
  const { data: extraction, isLoading, error } = useExtraction(extractionIdNum);

  if (isLoading) return <LoadingState message="Loading extraction details..." />;
  if (error) return <ErrorState error={error} />;
  if (!extraction) return <ErrorState error={new Error('Extraction not found')} />;

  // Handle case where documents array might be null/undefined
  const safeDocuments = extraction.documents || [];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Extraction {extraction.extraction_id}</h1>
          <p className="text-muted-foreground text-lg">
            Created {formatDistanceToNow(new Date(extraction.created_at), { addSuffix: true })}
          </p>
        </div>
        
        <div className="flex gap-3">
          {extraction.value_map && (
            <Button asChild className="bg-gradient-primary hover:shadow-lg transition-all duration-200 hover:scale-105">
              <Link to={`/customers/${customerId}/extractions/${extractionId}/value-map`}>
                <BarChart3 className="h-4 w-4 mr-2" />
                View Value Map
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Extraction Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Extraction Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">{safeDocuments.length}</div>
              <div className="text-sm text-muted-foreground">Documents Processed</div>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">
                {safeDocuments.filter(doc => doc?.feature_extraction).length}
              </div>
              <div className="text-sm text-muted-foreground">Feature Maps Generated</div>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">
                {extraction.value_map ? '1' : '0'}
              </div>
              <div className="text-sm text-muted-foreground">Value Maps Available</div>
            </div>
          </div>
          
          {extraction.value_map && (
            <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div>
                <h3 className="font-medium">Value Map Ready</h3>
                <p className="text-sm text-muted-foreground">
                  Aggregated analysis combining all feature maps
                </p>
              </div>
              <Button asChild>
                <Link to={`/customers/${customerId}/extractions/${extractionId}/value-map`}>
                  View Value Map
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>Processed Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {extraction.documents.map((document) => (
              <div
                key={document.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-medium">{document.name}</h3>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span>{document.content_type}</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDistanceToNow(new Date(document.created_at), { addSuffix: true })}
                    </div>
                    {document.source_url && (
                      <a
                        href={document.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-foreground"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Source
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {document.feature_extraction ? (
                    <>
                      <Badge variant="secondary">Feature Map Available</Badge>
                      <Button size="sm" asChild>
                        <Link to={`/customers/${customerId}/extractions/${extractionId}/documents/${document.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Map
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <Badge variant="outline">Processing...</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}