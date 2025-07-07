interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
      <div className="relative mb-8">
        {/* Outer ring */}
        <div className="w-20 h-20 border-4 border-muted/30 border-t-primary rounded-full animate-spin"></div>
        {/* Inner ring */}
        <div className="absolute inset-2 w-16 h-16 border-4 border-transparent border-t-accent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        {/* Center dot */}
        <div className="absolute inset-1/2 w-2 h-2 bg-gradient-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-2">{message}</h3>
      <p className="text-muted-foreground text-center max-w-md">
        Please wait while we process your request
      </p>
      
      <div className="flex space-x-2 mt-6">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
}