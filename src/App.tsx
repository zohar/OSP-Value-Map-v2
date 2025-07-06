import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AppLayout } from '@/components/layout/AppLayout';
import { CustomerDashboard } from '@/pages/CustomerDashboard';
import { CustomerDetail } from '@/pages/CustomerDetail';
import { FeatureExtractions } from '@/pages/FeatureExtractions';
import { ExtractionDetail } from '@/pages/ExtractionDetail';
import { FeatureMapView } from '@/pages/FeatureMapView';
import { ValueMapView } from '@/pages/ValueMapView';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<CustomerDashboard />} />
            <Route path="customers/:customerId" element={<CustomerDetail />} />
            <Route path="customers/:customerId/extractions" element={<FeatureExtractions />} />
            <Route path="customers/:customerId/extractions/:extractionId" element={<ExtractionDetail />} />
            <Route path="customers/:customerId/extractions/:extractionId/documents/:documentId" element={<FeatureMapView />} />
            <Route path="customers/:customerId/extractions/:extractionId/value-map" element={<ValueMapView />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;