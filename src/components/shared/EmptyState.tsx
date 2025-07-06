import { type ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: ReactNode;
}

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      {icon && (
        <div className="mb-6 text-muted-foreground/60 p-4 rounded-full bg-muted/30 hover:bg-muted/50 transition-all duration-300 hover:scale-105">
          {icon}
        </div>
      )}
      <h3 className="text-2xl font-bold mb-3 text-foreground">{title}</h3>
      <p className="text-muted-foreground mb-8 max-w-md text-lg leading-relaxed">{description}</p>
      {action && <div className="animate-slide-in-from-top">{action}</div>}
    </div>
  );
}