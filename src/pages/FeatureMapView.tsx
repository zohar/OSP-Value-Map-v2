import { useParams } from 'react-router-dom';
import { useDocument } from '@/hooks/useDocuments';
import { useFeatureExtraction } from '@/hooks/useExtractions';
import { LoadingState } from '@/components/shared/LoadingState';
import { ErrorState } from '@/components/shared/ErrorState';
import { FeatureTable } from '@/components/features/FeatureTable';
import { NavigationControls } from '@/components/features/NavigationControls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function FeatureMapView() {
  const { customerId, extractionId, documentId } = useParams<{
    customerId: string;
    extractionId: string;
    documentId: string;
  }>();

  const documentIdNum = parseInt(documentId || '0');
  const extractionIdNum = parseInt(extractionId || '0');

  const { data: document, isLoading: documentLoading, error: documentError } = useDocument(documentIdNum);
  const { data: featureExtraction, isLoading: extractionLoading, error: extractionError } = useFeatureExtraction(extractionIdNum, documentIdNum);

  if (documentLoading || extractionLoading) {
    return <LoadingState message="Loading feature map..." />;
  }

  if (documentError || extractionError) {
    return <ErrorState error={documentError || extractionError!} />;
  }

  if (!document || !featureExtraction) {
    return <ErrorState error={new Error('Document or feature extraction not found')} />;
  }

  return (
    <div className="space-y-6">
      {/* Document Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-primary" />
                <span>{document.name}</span>
              </CardTitle>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <Badge variant="outline">{document.content_type}</Badge>
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
                    View Source
                  </a>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Navigation Controls */}
      <NavigationControls />

      {/* Feature Map */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Map</CardTitle>
        </CardHeader>
        <CardContent>
          {featureExtraction.feature_map ? (
            <FeatureTable featureMap={featureExtraction.feature_map} />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Feature map is being processed...
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}