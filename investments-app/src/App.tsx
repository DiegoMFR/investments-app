import { BrowserRouter, Routes, Route } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Login } from './pages/login';
import ProductOverview from './pages/product-overview';
import Detail from './pages/detail';
import { ProtectedRoute } from './components/auth/protected-route';


const queryClient = new QueryClient();

export default function App() {

  

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <ProductOverview />
            </ProtectedRoute>
          } />
          <Route path="/detail/:iban" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
