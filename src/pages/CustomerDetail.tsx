import { useParams, Link } from 'react-router-dom';
import { useCustomer } from '@/hooks/useCustomers';
import { useDocuments } from '@/hooks/useDocuments';
import { useCrawls } from '@/hooks/useCrawls';
import { useExtractions } from '@/hooks/useExtractions';
import { LoadingState } from '@/components/shared/LoadingState';
import { ErrorState } from '@/components/shared/ErrorState';
import { EmptyState } from '@/components/shared/EmptyState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Globe, 
  Zap, 
  Plus, 
  ExternalLink,
  Calendar,
  Clock
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function CustomerDetail() {
  const { customerId } = useParams<{ customerId: string }>();
  const customerIdNum = parseInt(customerId || '0');

  const { data: customer, isLoading: customerLoading, error: customerError } = useCustomer(customerIdNum);
  const { data: documents, isLoading: documentsLoading } = useDocuments(customerIdNum);
  const { data: crawls, isLoading: crawlsLoading } = useCrawls(customerIdNum);
  const { data: extractions, isLoading: extractionsLoading } = useExtractions(customerIdNum);

  if (customerLoading) return <LoadingState message="Loading customer details..." />;
  if (customerError) return <ErrorState error={customerError} />;
  if (!customer) return <ErrorState error={new Error('Customer not found')} />;

  return (
    <div className="space-y-6">
      {/* Customer Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{customer.name}</h1>
          <p className="text-muted-foreground mt-1">
            Created {formatDistanceToNow(new Date(customer.created_at), { addSuffix: true })}
          </p>
          {customer.metadata?.description && (
            <p className="text-sm text-muted-foreground mt-2">
              {customer.metadata.description}
            </p>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button asChild>
            <Link to={`/customers/${customerId}/extractions`}>
              <Zap className="h-4 w-4 mr-2" />
              View Extractions
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customer.document_count}</div>
            <p className="text-xs text-muted-foreground">Total documents collected</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Website Crawls</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customer.crawl_count}</div>
            <p className="text-xs text-muted-foreground">Crawling operations</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Feature Extractions</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customer.extraction_count}</div>
            <p className="text-xs text-muted-foreground">Completed extractions</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="documents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="crawls">Website Crawls</TabsTrigger>
          <TabsTrigger value="extractions">Feature Extractions</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          {documentsLoading ? (
            <LoadingState message="Loading documents..." />
          ) : documents?.length === 0 ? (
            <EmptyState
              title="No documents yet"
              description="Start by crawling a website or uploading documents"
              icon={<FileText className="h-12 w-12" />}
              action={
                <div className="flex gap-2">
                  <Button>
                    <Globe className="h-4 w-4 mr-2" />
                    Crawl Website
                  </Button>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Documents
                  </Button>
                </div>
              }
            />
          ) : (
            <div className="grid gap-4">
              {documents?.map((document) => (
                <Card key={document.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium">{document.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {document.content_type}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDistanceToNow(new Date(document.created_at), { addSuffix: true })}
                          </div>
                          {document.source_url && (
                            <div className="flex items-center gap-1">
                              <ExternalLink className="h-3 w-3" />
                              <a 
                                href={document.source_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-foreground"
                              >
                                View Source
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {document.feature_extraction && (
                          <Badge variant="secondary">Extracted</Badge>
                        )}
                        {document.crawl_id && (
                          <Badge variant="outline">Crawled</Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="crawls" className="space-y-4">
          {crawlsLoading ? (
            <LoadingState message="Loading crawls..." />
          ) : crawls?.length === 0 ? (
            <EmptyState
              title="No website crawls yet"
              description="Start crawling websites to collect documents automatically"
              icon={<Globe className="h-12 w-12" />}
              action={
                <Button>
                  <Globe className="h-4 w-4 mr-2" />
                  Start Website Crawl
                </Button>
              }
            />
          ) : (
            <div className="grid gap-4">
              {crawls?.map((crawl) => (
                <Card key={crawl.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium">{crawl.base_url}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDistanceToNow(new Date(crawl.started_at), { addSuffix: true })}
                          </div>
                          <span>{crawl.processed_pages} / {crawl.limit} pages</span>
                        </div>
                      </div>
                      <Badge 
                        variant={
                          crawl.status === 'completed' ? 'default' :
                          crawl.status === 'running' ? 'secondary' :
                          crawl.status === 'failed' ? 'destructive' : 'outline'
                        }
                      >
                        {crawl.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="extractions" className="space-y-4">
          {extractionsLoading ? (
            <LoadingState message="Loading extractions..." />
          ) : extractions?.length === 0 ? (
            <EmptyState
              title="No feature extractions yet"
              description="Create feature extractions to analyze your documents"
              icon={<Zap className="h-12 w-12" />}
              action={
                <Button asChild>
                  <Link to={`/customers/${customerId}/extractions`}>
                    <Zap className="h-4 w-4 mr-2" />
                    View Extractions
                  </Link>
                </Button>
              }
            />
          ) : (
            <div className="grid gap-4">
              {extractions?.map((extraction) => (
                <Card key={extraction.extraction_id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium">Extraction {extraction.extraction_id}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {extraction.documents.length} documents processed
                        </p>
                        <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {formatDistanceToNow(new Date(extraction.created_at), { addSuffix: true })}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {extraction.value_map && (
                          <Badge variant="secondary">Value Map</Badge>
                        )}
                        <Button size="sm" asChild>
                          <Link to={`/customers/${customerId}/extractions/${extraction.extraction_id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}