import { Outlet } from 'react-router-dom';
import { Breadcrumbs } from './Breadcrumbs';
import { Header } from './Header';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-secondary/30">
      <Header />
      <div className="container mx-auto px-6 py-8">
        <Breadcrumbs />
        <main className="mt-8 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}