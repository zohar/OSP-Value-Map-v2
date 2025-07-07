import { AlertTriangle, RefreshCw, Database, Wifi, FileX } from 'lucide-react';
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
    
  const IconComponent = isRelationshipError
    ? Database
    : isNetworkError
    ? Wifi
    : isNotFoundError
    ? FileX
    : AlertTriangle;
    
  const iconColor = isRelationshipError
    ? "text-warning"
    : isNetworkError
    ? "text-destructive"
    : isNotFoundError
    ? "text-info"
    : "text-destructive";

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
      <div className="mb-8 p-6 rounded-2xl bg-gradient-surface shadow-lg border border-border/50">
        <IconComponent className={`h-16 w-16 ${iconColor}`} />
      </div>
      
      <h3 className="text-3xl font-bold mb-4 text-foreground">{title || defaultTitle}</h3>
      <p className="text-muted-foreground mb-8 max-w-lg text-lg leading-relaxed">
        {description || defaultDescription}
      </p>
      
      {error.message && (
        <details className="mb-8 max-w-2xl group">
          <summary className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors font-medium px-4 py-2 rounded-lg hover:bg-muted/30">
            Show technical details
          </summary>
          <div className="mt-4 text-xs text-muted-foreground font-mono bg-muted/50 p-4 rounded-lg border border-border/30 text-left break-words">
            {error.message}
          </div>
        </details>
      )}
      
      {onRetry && !isNotFoundError && (
        <Button onClick={onRetry} variant="outline" size="lg" className="hover:shadow-lg transition-all duration-200">
          <RefreshCw className="h-5 w-5 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
}