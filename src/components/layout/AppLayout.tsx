import { Outlet } from 'react-router-dom';
import { Breadcrumbs } from './Breadcrumbs';
import { Header } from './Header';

export function AppLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <Breadcrumbs />
        <main className="mt-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}