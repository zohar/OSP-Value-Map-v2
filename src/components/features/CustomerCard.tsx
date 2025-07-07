import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, FileText, Zap, Globe, ArrowRight } from 'lucide-react';
import type { CustomerWithCounts } from '@/types/database';
import { formatDistanceToNow } from 'date-fns';

interface CustomerCardProps {
  customer: CustomerWithCounts;
}

export function CustomerCard({ customer }: CustomerCardProps) {
  return (
    <Link to={`/customers/${customer.id}`} className="block group">
      <Card className="relative overflow-hidden hover-lift bg-gradient-surface border-border/50 hover:border-primary/30 hover:shadow-2xl transition-all duration-300">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-gradient-primary shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="truncate group-hover:text-primary transition-colors duration-300 font-bold text-xl">{customer.name}</span>
                <span className="text-sm text-muted-foreground font-medium">
                  Created {formatDistanceToNow(new Date(customer.created_at), { addSuffix: true })}
                </span>
              </div>
            </CardTitle>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-background/60 backdrop-blur-sm group-hover:bg-background/80 transition-all duration-300 border border-border/30">
              <div className="p-2 rounded-lg bg-info/10">
                <FileText className="h-5 w-5 text-info" />
              </div>
              <span className="text-2xl font-bold text-foreground">{customer.document_count}</span>
              <span className="text-xs text-muted-foreground text-center font-medium">Documents</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-background/60 backdrop-blur-sm group-hover:bg-background/80 transition-all duration-300 border border-border/30">
              <div className="p-2 rounded-lg bg-success/10">
                <Zap className="h-5 w-5 text-success" />
              </div>
              <span className="text-2xl font-bold text-foreground">{customer.extraction_count}</span>
              <span className="text-xs text-muted-foreground text-center font-medium">Extractions</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-background/60 backdrop-blur-sm group-hover:bg-background/80 transition-all duration-300 border border-border/30">
              <div className="p-2 rounded-lg bg-warning/10">
                <Globe className="h-5 w-5 text-warning" />
              </div>
              <span className="text-2xl font-bold text-foreground">{customer.crawl_count}</span>
              <span className="text-xs text-muted-foreground text-center font-medium">Crawls</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 pt-2">
            {customer.document_count > 0 && (
              <Badge variant="info" className="text-xs font-semibold">
                <FileText className="h-3 w-3 mr-1" />
                {customer.document_count} Documents
              </Badge>
            )}
            {customer.extraction_count > 0 && (
              <Badge variant="success" className="text-xs font-semibold">
                <Zap className="h-3 w-3 mr-1" />
                {customer.extraction_count} Extractions
              </Badge>
            )}
            {customer.crawl_count > 0 && (
              <Badge variant="warning" className="text-xs font-semibold">
                <Globe className="h-3 w-3 mr-1" />
                {customer.crawl_count} Crawls
              </Badge>
            )}
          </div>
        </CardContent>
        
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 opacity-30" />
      </Card>
    </Link>
  );
}