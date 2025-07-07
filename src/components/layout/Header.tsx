import { Link } from 'react-router-dom';
import { Building2, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 glass shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-center">
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="relative p-3 rounded-xl bg-gradient-primary shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <Building2 className="h-7 w-7 text-primary-foreground" />
              <div className="absolute inset-0 rounded-xl bg-gradient-accent opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-2xl bg-gradient-primary bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                OSP Features Map
              </span>
              <span className="text-xs text-muted-foreground font-medium tracking-wide">
                Marketing Analysis Platform
              </span>
            </div>
          </Link>
          
          <nav className="ml-auto flex items-center space-x-8">
            <Link 
              to="/" 
              className="relative px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-all duration-200 rounded-lg hover:bg-primary/5 group"
            >
              <span className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4" />
                <span>Customers</span>
              </span>
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}