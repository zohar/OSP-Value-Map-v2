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
    },
    {
      title: 'Total Documents',
      value: totalDocuments,
      icon: FileText,
      description: 'Documents across all customers',
    },
    {
      title: 'Feature Extractions',
      value: totalExtractions,
      icon: Zap,
      description: 'Completed feature extractions',
    },
    {
      title: 'Website Crawls',
      value: totalCrawls,
      icon: Globe,
      description: 'Website crawling operations',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const gradientClasses = [
          'bg-gradient-to-br from-primary/10 to-primary/20',
          'bg-gradient-to-br from-blue-500/10 to-blue-600/20',
          'bg-gradient-to-br from-green-500/10 to-green-600/20',
          'bg-gradient-to-br from-purple-500/10 to-purple-600/20',
        ];
        
        const iconColors = [
          'text-primary',
          'text-blue-500',
          'text-green-500',
          'text-purple-500',
        ];
        
        return (
          <Card key={stat.title} className={`relative overflow-hidden border-0 shadow-lg hover-lift transition-all duration-300 hover:shadow-xl ${gradientClasses[index]}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-foreground/90">{stat.title}</CardTitle>
              <div className={`p-2 rounded-full bg-background/80 backdrop-blur-sm ${iconColors[index]}`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-3xl font-bold text-foreground">{stat.value.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{stat.description}</p>
            </CardContent>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full transition-transform duration-1000 hover:translate-x-full opacity-30" />
          </Card>
        );
      })}
    </div>
  );
}