import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/70 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-200 group-hover:scale-105">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary via-primary/90 to-primary/80 bg-clip-text text-transparent hover:from-primary/90 hover:to-primary transition-all duration-200">
              OSP Features Map
            </span>
          </Link>
          
          <nav className="ml-auto flex items-center space-x-6">
            <Link 
              to="/" 
              className="relative px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-200 rounded-md hover:bg-primary/5 group"
            >
              Customers
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}