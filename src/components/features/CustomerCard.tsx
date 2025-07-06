import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, FileText, Zap, Globe } from 'lucide-react';
import type { CustomerWithCounts } from '@/types/database';
import { formatDistanceToNow } from 'date-fns';

interface CustomerCardProps {
  customer: CustomerWithCounts;
}

export function CustomerCard({ customer }: CustomerCardProps) {
  return (
    <Link to={`/customers/${customer.id}`}>
      <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-primary" />
              <span className="truncate group-hover:text-primary transition-colors duration-200">{customer.name}</span>
            </CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Created {formatDistanceToNow(new Date(customer.created_at), { addSuffix: true })}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            <div className="flex items-center space-x-1">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{customer.document_count}</span>
              <span className="text-xs text-muted-foreground">docs</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Zap className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{customer.extraction_count}</span>
              <span className="text-xs text-muted-foreground">extractions</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{customer.crawl_count}</span>
              <span className="text-xs text-muted-foreground">crawls</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {customer.document_count > 0 && (
              <Badge variant="secondary" className="text-xs">
                {customer.document_count} Documents
              </Badge>
            )}
            {customer.extraction_count > 0 && (
              <Badge variant="outline" className="text-xs">
                {customer.extraction_count} Extractions
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}