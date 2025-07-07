import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, FileText, Zap, Globe } from 'lucide-react';
import type { CustomerWithCounts } from '@/types/database';

interface AnalyticsCardsProps {
  customers?: CustomerWithCounts[];
}

export function AnalyticsCards({ customers = [] }: AnalyticsCardsProps) {
  const totalCustomers = customers.length;
  const totalDocuments = customers.reduce((sum, customer) => sum + customer.document_count, 0);
  const totalExtractions = customers.reduce((sum, customer) => sum + customer.extraction_count, 0);
  const totalCrawls = customers.reduce((sum, customer) => sum + customer.crawl_count, 0);

  const stats = [
    {
      title: 'Total Customers',
      value: totalCustomers,
      icon: Building2,
      description: 'Active customers in the system',
      gradient: 'from-primary/20 to-primary/10',
      iconColor: 'text-primary',
    },
    {
      title: 'Total Documents',
      value: totalDocuments,
      icon: FileText,
      description: 'Documents across all customers',
      gradient: 'from-info/20 to-info/10',
      iconColor: 'text-info',
    },
    {
      title: 'Feature Extractions',
      value: totalExtractions,
      icon: Zap,
      description: 'Completed feature extractions',
      gradient: 'from-success/20 to-success/10',
      iconColor: 'text-success',
    },
    {
      title: 'Website Crawls',
      value: totalCrawls,
      icon: Globe,
      description: 'Website crawling operations',
      gradient: 'from-warning/20 to-warning/10',
      iconColor: 'text-warning',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <Card key={stat.title} className={`relative overflow-hidden hover-lift bg-gradient-to-br ${stat.gradient} border-0 shadow-xl`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-bold text-foreground/90 tracking-wide">{stat.title}</CardTitle>
            <div className={`p-3 rounded-xl bg-background/80 backdrop-blur-sm shadow-lg ${stat.iconColor} hover:scale-110 transition-transform duration-200`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-4xl font-bold text-foreground tracking-tight">{stat.value.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">{stat.description}</p>
          </CardContent>
          
          {/* Animated background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full transition-transform duration-1000 hover:translate-x-full opacity-30" />
          
          {/* Subtle border glow */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </Card>
      ))}
    </div>
  );
}