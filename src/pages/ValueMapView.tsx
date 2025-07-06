import { useParams, Link } from 'react-router-dom';
import { useValueMap } from '@/hooks/useValueMaps';
import { useExtraction } from '@/hooks/useExtractions';
import { LoadingState } from '@/components/shared/LoadingState';
import { ErrorState } from '@/components/shared/ErrorState';
import { FeatureTable } from '@/components/features/FeatureTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Calendar, FileText, ArrowLeft } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function ValueMapView() {
  const { customerId, extractionId } = useParams<{
    customerId: string;
    extractionId: string;
  }>();

  const extractionIdNum = parseInt(extractionId || '0');

  const { data: valueMap, isLoading: valueMapLoading, error: valueMapError } = useValueMap(extractionIdNum);
  const { data: extraction, isLoading: extractionLoading } = useExtraction(extractionIdNum);

  if (valueMapLoading || extractionLoading) {
    return <LoadingState message="Loading value map..." />;
  }

  if (valueMapError) {
    return <ErrorState error={valueMapError} />;
  }

  if (!valueMap || !extraction) {
    return <ErrorState error={new Error('Value map or extraction not found')} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center space-x-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            <span>Value Map</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Aggregated analysis from Extraction {extractionId}
          </p>
        </div>
        
        <Button variant="outline" asChild>
          <Link to={`/customers/${customerId}/extractions/${extractionId}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Extraction
          </Link>
        </Button>
      </div>

      {/* Value Map Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Value Map Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">{extraction.documents.length}</div>
              <div className="text-sm text-muted-foreground">Source Documents</div>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">
                {valueMap.value_map?.featuresMap?.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">Feature Categories</div>
            </div>
            
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold">
                {valueMap.value_map?.featuresMap?.reduce(
                  (total, category) => total + category.areas.reduce(
                    (areaTotal, area) => areaTotal + area.features.length, 0
                  ), 0
                ) || 0}
              </div>
              <div className="text-sm text-muted-foreground">Total Features</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Generated {formatDistanceToNow(new Date(valueMap.created_at), { addSuffix: true })}
            </div>
            <Badge variant="secondary">
              <FileText className="h-3 w-3 mr-1" />
              Aggregated from {extraction.documents.length} documents
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Value Map Table */}
      <Card>
        <CardHeader>
          <CardTitle>Aggregated Feature Map</CardTitle>
        </CardHeader>
        <CardContent>
          {valueMap.value_map ? (
            <FeatureTable featureMap={valueMap.value_map} />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Value map data is not available
            </div>
          )}
        </CardContent>
      </Card>

      {/* Source Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Source Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {extraction.documents.map((document) => (
              <div
                key={document.id}
                className="p-3 border rounded-lg bg-muted/30"
              >
                <h4 className="font-medium text-sm truncate">{document.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {document.content_type}
                </p>
                <div className="mt-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link to={`/customers/${customerId}/extractions/${extractionId}/documents/${document.id}`}>
                      View Feature Map
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}