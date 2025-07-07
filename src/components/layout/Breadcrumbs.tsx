import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home, Sparkles } from 'lucide-react';
import { useCustomer } from '@/hooks/useCustomers';
import { useExtraction } from '@/hooks/useExtractions';
import { useDocument } from '@/hooks/useDocuments';

export function Breadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Extract IDs from path
  const customerId = pathSegments[1] ? parseInt(pathSegments[1]) : null;
  const extractionId = pathSegments[3] ? parseInt(pathSegments[3]) : null;
  const documentId = pathSegments[5] ? parseInt(pathSegments[5]) : null;
  
  // Fetch data for breadcrumb labels
  const { data: customer } = useCustomer(customerId || 0);
  const { data: extraction } = useExtraction(extractionId || 0);
  const { data: document } = useDocument(documentId || 0);

  const breadcrumbs = [];

  // Home
  breadcrumbs.push({
    label: 'Customers',
    href: '/',
    icon: Home,
  });

  // Customer
  if (customerId && customer) {
    breadcrumbs.push({
      label: customer.name,
      href: `/customers/${customerId}`,
    });
  }

  // Extractions
  if (customerId && pathSegments[2] === 'extractions') {
    breadcrumbs.push({
      label: 'Feature Extractions',
      href: `/customers/${customerId}/extractions`,
    });
  }

  // Specific Extraction
  if (extractionId && extraction) {
    breadcrumbs.push({
      label: `Extraction ${extractionId}`,
      href: `/customers/${customerId}/extractions/${extractionId}`,
    });
  }

  // Document
  if (documentId && document) {
    breadcrumbs.push({
      label: document.name,
      href: `/customers/${customerId}/extractions/${extractionId}/documents/${documentId}`,
    });
  }

  // Value Map
  if (pathSegments.includes('value-map')) {
    breadcrumbs.push({
      label: 'Value Map',
      href: `/customers/${customerId}/extractions/${extractionId}/value-map`,
    });
  }

  return (
    <nav className="flex items-center space-x-2 text-sm glass p-4 rounded-xl shadow-lg">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-3 text-muted-foreground/60" />}
          <Link
            to={breadcrumb.href}
            className="flex items-center space-x-2 hover:text-primary transition-all duration-200 px-3 py-2 rounded-lg hover:bg-primary/5 group font-medium"
          >
            {breadcrumb.icon && <breadcrumb.icon className="h-4 w-4 group-hover:text-accent transition-colors" />}
            <span className="group-hover:text-primary transition-colors">{breadcrumb.label}</span>
          </Link>
        </div>
      ))}
    </nav>
  );
}