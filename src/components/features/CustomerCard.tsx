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
      <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group hover:border-primary/30 hover-lift bg-gradient-to-br from-card to-muted/30">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <span className="truncate group-hover:text-primary transition-colors duration-200 font-semibold">{customer.name}</span>
            </CardTitle>
          </div>
          <p className="text-sm text-muted-foreground ml-11">
            Created {formatDistanceToNow(new Date(customer.created_at), { addSuffix: true })}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center space-y-1 p-3 rounded-lg bg-background/50 group-hover:bg-background/70 transition-colors duration-200">
              <FileText className="h-5 w-5 text-blue-500" />
              <span className="text-lg font-bold text-foreground">{customer.document_count}</span>
              <span className="text-xs text-muted-foreground text-center">Documents</span>
            </div>
            
            <div className="flex flex-col items-center space-y-1 p-3 rounded-lg bg-background/50 group-hover:bg-background/70 transition-colors duration-200">
              <Zap className="h-5 w-5 text-green-500" />
              <span className="text-lg font-bold text-foreground">{customer.extraction_count}</span>
              <span className="text-xs text-muted-foreground text-center">Extractions</span>
            </div>
            
            <div className="flex flex-col items-center space-y-1 p-3 rounded-lg bg-background/50 group-hover:bg-background/70 transition-colors duration-200">
              <Globe className="h-5 w-5 text-purple-500" />
              <span className="text-lg font-bold text-foreground">{customer.crawl_count}</span>
              <span className="text-xs text-muted-foreground text-center">Crawls</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 pt-2">
            {customer.document_count > 0 && (
              <Badge variant="secondary" className="text-xs font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
                {customer.document_count} Documents
              </Badge>
            )}
            {customer.extraction_count > 0 && (
              <Badge variant="outline" className="text-xs font-medium border-green-200 text-green-700 hover:bg-green-50 transition-colors">
                {customer.extraction_count} Extractions
              </Badge>
            )}
          </div>
        </CardContent>
        
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 opacity-30" />
      </Card>
    </Link>
  );
}