import { type ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: ReactNode;
}

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
      {icon && (
        <div className="mb-8 text-muted-foreground/60 p-6 rounded-2xl bg-gradient-surface shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-border/50">
          {icon}
        </div>
      )}
      <h3 className="text-3xl font-bold mb-4 text-foreground">{title}</h3>
      <p className="text-muted-foreground mb-10 max-w-lg text-lg leading-relaxed">{description}</p>
      {action && (
        <div className="animate-slide-in-from-bottom">
          {action}
        </div>
      )}
    </div>
  );
}