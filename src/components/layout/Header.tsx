import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">OSP Features Map</span>
          </Link>
          
          <nav className="ml-auto flex items-center space-x-4">
            <Link 
              to="/" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Customers
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}