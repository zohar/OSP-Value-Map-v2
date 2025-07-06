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
    <div className="space-y-8 animate-fade-in">
      {/* Customer Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">{customer.name}</h1>
          <p className="text-muted-foreground text-lg">
            Created {formatDistanceToNow(new Date(customer.created_at), { addSuffix: true })}
          </p>
          {customer.metadata?.description && (
            <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
              {customer.metadata.description}
            </p>
          )}
        </div>
        
        <div className="flex gap-3">
          <Button asChild className="bg-gradient-primary hover:shadow-lg transition-all duration-200 hover:scale-105">
            <Link to={`/customers/${customerId}/extractions`}>
              <Zap className="h-4 w-4 mr-2" />
              View Extractions
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="relative overflow-hidden border-0 shadow-lg hover-lift transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-blue-500/10 to-blue-600/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-foreground/90">Documents</CardTitle>
            <div className="p-2 rounded-full bg-background/80 backdrop-blur-sm text-blue-500">
              <FileText className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold text-foreground">{customer.document_count}</div>
            <p className="text-sm text-muted-foreground leading-relaxed">Total documents collected</p>
          </CardContent>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full transition-transform duration-1000 hover:translate-x-full opacity-30" />
        </Card>
        
        <Card className="relative overflow-hidden border-0 shadow-lg hover-lift transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-purple-500/10 to-purple-600/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-foreground/90">Website Crawls</CardTitle>
            <div className="p-2 rounded-full bg-background/80 backdrop-blur-sm text-purple-500">
              <Globe className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold text-foreground">{customer.crawl_count}</div>
            <p className="text-sm text-muted-foreground leading-relaxed">Crawling operations</p>
          </CardContent>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full transition-transform duration-1000 hover:translate-x-full opacity-30" />
        </Card>
        
        <Card className="relative overflow-hidden border-0 shadow-lg hover-lift transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-green-500/10 to-green-600/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-foreground/90">Feature Extractions</CardTitle>
            <div className="p-2 rounded-full bg-background/80 backdrop-blur-sm text-green-500">
              <Zap className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold text-foreground">{customer.extraction_count}</div>
            <p className="text-sm text-muted-foreground leading-relaxed">Completed extractions</p>
          </CardContent>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full transition-transform duration-1000 hover:translate-x-full opacity-30" />
        </Card>
      </div>

      {/* Tabs for different sections */}
      <Tabs defaultValue="documents" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1 rounded-lg shadow-sm">
          <TabsTrigger value="documents" className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200 hover:bg-background/50">
            <FileText className="h-4 w-4 mr-2" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="crawls" className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200 hover:bg-background/50">
            <Globe className="h-4 w-4 mr-2" />
            Website Crawls
          </TabsTrigger>
          <TabsTrigger value="extractions" className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200 hover:bg-background/50">
            <Zap className="h-4 w-4 mr-2" />
            Feature Extractions
          </TabsTrigger>
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
                <Card key={document.id} className="hover:shadow-md transition-all duration-200 hover-lift group border-l-4 border-l-blue-500/20 hover:border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{document.name}</h3>
                        <p className="text-sm text-muted-foreground mt-2 font-medium">
                          {document.content_type}
                        </p>
                        <div className="flex items-center gap-6 mt-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-blue-500" />
                            {formatDistanceToNow(new Date(document.created_at), { addSuffix: true })}
                          </div>
                          {document.source_url && (
                            <div className="flex items-center gap-2">
                              <ExternalLink className="h-4 w-4 text-purple-500" />
                              <a 
                                href={document.source_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-primary transition-colors font-medium"
                              >
                                View Source
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 ml-4">
                        {document.feature_extraction && (
                          <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200 hover:bg-green-200">
                            <Zap className="h-3 w-3 mr-1" />
                            Extracted
                          </Badge>
                        )}
                        {document.crawl_id && (
                          <Badge variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                            <Globe className="h-3 w-3 mr-1" />
                            Crawled
                          </Badge>
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
                <Card key={crawl.id} className="hover:shadow-md transition-all duration-200 hover-lift group border-l-4 border-l-purple-500/20 hover:border-l-purple-500">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{crawl.base_url}</h3>
                        <div className="flex items-center gap-6 mt-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-purple-500" />
                            {formatDistanceToNow(new Date(crawl.started_at), { addSuffix: true })}
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-blue-500" />
                            <span className="font-medium">{crawl.processed_pages} / {crawl.limit} pages</span>
                          </div>
                        </div>
                      </div>
                      <Badge 
                        variant={
                          crawl.status === 'completed' ? 'default' :
                          crawl.status === 'running' ? 'secondary' :
                          crawl.status === 'failed' ? 'destructive' : 'outline'
                        }
                        className={
                          crawl.status === 'completed' ? 'bg-green-100 text-green-700 border-green-200' :
                          crawl.status === 'running' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                          crawl.status === 'failed' ? 'bg-red-100 text-red-700 border-red-200' : ''
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
                <Card key={extraction.extraction_id} className="hover:shadow-md transition-all duration-200 hover-lift group border-l-4 border-l-green-500/20 hover:border-l-green-500">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">Extraction {extraction.extraction_id}</h3>
                        <p className="text-sm text-muted-foreground mt-2 font-medium">
                          {extraction.documents.length} documents processed
                        </p>
                        <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 text-green-500" />
                          {formatDistanceToNow(new Date(extraction.created_at), { addSuffix: true })}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 ml-4">
                        {extraction.value_map && (
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200">
                            <Zap className="h-3 w-3 mr-1" />
                            Value Map
                          </Badge>
                        )}
                        <Button size="sm" asChild className="hover:shadow-md transition-all duration-200 hover:scale-105">
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