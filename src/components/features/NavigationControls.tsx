import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useExtraction } from '@/hooks/useExtractions';

export function NavigationControls() {
  const { customerId, extractionId, documentId } = useParams<{
    customerId: string;
    extractionId: string;
    documentId: string;
  }>();
  
  const navigate = useNavigate();
  const extractionIdNum = parseInt(extractionId || '0');
  const documentIdNum = parseInt(documentId || '0');
  
  const { data: extraction } = useExtraction(extractionIdNum);
  
  if (!extraction || !documentId) return null;
  
  const currentIndex = extraction.documents.findIndex(doc => doc.id === documentIdNum);
  const canNavigateLeft = currentIndex > 0;
  const canNavigateRight = currentIndex < extraction.documents.length - 1;
  
  const navigateLeft = () => {
    if (canNavigateLeft) {
      const prevDocument = extraction.documents[currentIndex - 1];
      navigate(`/customers/${customerId}/extractions/${extractionId}/documents/${prevDocument.id}`);
    }
  };
  
  const navigateRight = () => {
    if (canNavigateRight) {
      const nextDocument = extraction.documents[currentIndex + 1];
      navigate(`/customers/${customerId}/extractions/${extractionId}/documents/${nextDocument.id}`);
    }
  };
  
  const position = `${currentIndex + 1} of ${extraction.documents.length}`;

  return (
    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
      <Button
        onClick={navigateLeft}
        disabled={!canNavigateLeft}
        variant="outline"
        size="lg"
        className="flex items-center gap-2"
      >
        <ChevronLeft className="h-5 w-5" />
        Previous Document
      </Button>
      
      <span className="text-sm text-muted-foreground font-medium">
        Document {position}
      </span>
      
      <Button
        onClick={navigateRight}
        disabled={!canNavigateRight}
        variant="outline"
        size="lg"
        className="flex items-center gap-2"
      >
        Next Document
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
}