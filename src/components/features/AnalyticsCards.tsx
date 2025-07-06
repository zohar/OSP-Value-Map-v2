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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}