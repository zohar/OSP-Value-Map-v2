import { AlertTriangle, RefreshCw, Database, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  error: Error;
  onRetry?: () => void;
  title?: string;
  description?: string;
}

export function ErrorState({ error, onRetry, title, description }: ErrorStateProps) {
  // Determine error type and customize message
  const isRelationshipError = error.message?.includes('relationship') || error.message?.includes('PGRST200');
  const isNetworkError = error.message?.includes('fetch') || error.message?.includes('network');
  const isNotFoundError = error.message?.includes('not found') || error.message?.includes('PGRST116');
  
  const defaultTitle = isRelationshipError 
    ? "Data Connection Issue"
    : isNetworkError
    ? "Connection Problem" 
    : isNotFoundError
    ? "Data Not Found"
    : "Something went wrong";
    
  const defaultDescription = isRelationshipError
    ? "There's an issue with the database relationships. The data might still be processing."
    : isNetworkError
    ? "Unable to connect to the server. Please check your internet connection."
    : isNotFoundError
    ? "The requested data could not be found. It may have been deleted or doesn't exist yet."
    : "An unexpected error occurred. Please try again.";
    
  const icon = isRelationshipError
    ? <Database className="h-12 w-12 text-warning mb-4" />
    : isNetworkError
    ? <Wifi className="h-12 w-12 text-destructive mb-4" />
    : <AlertTriangle className="h-12 w-12 text-destructive mb-4" />;

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      {icon}
      <h3 className="text-xl font-semibold mb-3">{title || defaultTitle}</h3>
      <p className="text-muted-foreground mb-4 max-w-md leading-relaxed">
        {description || defaultDescription}
      </p>
      {error.message && (
        <details className="mb-6 max-w-md">
          <summary className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
            Show technical details
          </summary>
          <p className="text-xs text-muted-foreground mt-2 font-mono bg-muted p-3 rounded border break-words text-left">
            {error.message}
          </p>
        </details>
      )}
      {onRetry && !isNotFoundError && (
        <Button onClick={onRetry} variant="outline" className="hover:shadow-md transition-all duration-200">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
}