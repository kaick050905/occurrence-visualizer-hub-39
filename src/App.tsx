
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Reports from "./pages/Reports";
import RegionalData from "./pages/RegionalData";
import RegionDetails from "./pages/RegionDetails";
import NotFound from "./pages/NotFound";
import CityDetails from "./pages/CityDetails";
import About from "./pages/About";
import Footer from "./components/Footer";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Update document title
    document.title = "Info SP - Sistema de Visualização de Ocorrências";
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" attribute="class">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/relatorios" element={<Reports />} />
                  <Route path="/dados-por-regiao" element={<RegionalData />} />
                  <Route path="/cidade/:name" element={<CityDetails />} />
                  <Route path="/regiao/:name" element={<RegionDetails />} />
                  <Route path="/sobre" element={<About />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
