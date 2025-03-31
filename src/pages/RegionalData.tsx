
import React, { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { MapPin, Search, Map } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { fetchRegions, fetchLocationsByRegion } from "@/services/supabaseService";
import { useQuery } from "@tanstack/react-query";

const statusColors = {
  Crítica: "bg-occurrence-critical",
  Alta: "bg-occurrence-high",
  Média: "bg-occurrence-medium",
  Baixa: "bg-occurrence-low"
};

// Helper function to determine status based on occurrence count
const getStatusFromCount = (count: number): string => {
  if (count > 100) return "Crítica";
  if (count > 50) return "Alta";
  if (count > 20) return "Média";
  return "Baixa";
};

const RegionalData: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  
  // Fetch all regions
  const { data: regionsData = [], isLoading: isRegionsLoading } = useQuery({
    queryKey: ['regions'],
    queryFn: fetchRegions,
  });

  // Fetch districts (locations) by region
  const { data: districtsData = [], isLoading: isDistrictsLoading } = useQuery({
    queryKey: ['locationsByRegion', selectedRegion],
    queryFn: () => selectedRegion ? fetchLocationsByRegion(selectedRegion) : fetchLocationsByRegion(0),
    enabled: true, // Always enabled to fetch all locations if no region is selected
  });
  
  // Process regions data to add calculated fields
  const processedRegions = regionsData.map((region) => {
    const regionLocations = districtsData.filter(loc => loc.ID_REGIAO === region.ID_REGIAO);
    const count = regionLocations.length;
    const totalCount = districtsData.length || 1; // Avoid division by zero
    const percentage = Math.round((count / totalCount) * 100);
    const status = getStatusFromCount(count);
    
    return {
      ...region,
      name: region.REGIAO || `Região ${region.ID_REGIAO}`,
      count: count,
      percentage: percentage,
      status: status
    };
  });
  
  // Filter districts based on search and selected region
  const filteredDistricts = districtsData.filter(district => {
    const matchesSearch = district.NOME?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const matchesRegion = selectedRegion ? district.ID_REGIAO === selectedRegion : true;
    return matchesSearch && matchesRegion;
  }).map(district => {
    // Calculate percentage and status for each district
    const regionLocations = districtsData.filter(loc => loc.ID_REGIAO === district.ID_REGIAO);
    const regionTotal = regionLocations.length || 1;
    const percentage = Math.round((1 / regionTotal) * 100);
    
    return {
      ...district,
      name: district.NOME || `Localidade ${district.ID_LOCALIDADE}`,
      region: regionsData.find(r => r.ID_REGIAO === district.ID_REGIAO)?.REGIAO || "Região Desconhecida",
      count: Math.floor(Math.random() * 50) + 5, // Random count for demonstration
      percentage: percentage,
      status: getStatusFromCount(Math.floor(Math.random() * 100) + 1) // Random status for demonstration
    };
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-4 px-4 md:px-6 lg:px-8">
        <DashboardHeader />
        
        <div className="my-6">
          <h1 className="text-3xl font-bold tracking-tight">Dados por Região</h1>
          <p className="text-muted-foreground mt-2">
            Análise detalhada de ocorrências por região e bairro
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="md:col-span-1 h-[400px]">
            <CardHeader>
              <CardTitle>Regiões</CardTitle>
              <CardDescription>Distribuição de ocorrências por região</CardDescription>
            </CardHeader>
            <CardContent>
              {isRegionsLoading ? (
                <div className="flex items-center justify-center h-[300px]">
                  <p>Carregando regiões...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {processedRegions.map((region) => (
                    <div 
                      key={region.ID_REGIAO}
                      className={cn(
                        "p-3 rounded-lg cursor-pointer transition-all",
                        selectedRegion === region.ID_REGIAO ? "bg-gray-100" : "hover:bg-gray-50"
                      )}
                      onClick={() => setSelectedRegion(selectedRegion === region.ID_REGIAO ? null : region.ID_REGIAO)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium">{region.name}</div>
                        <div className="text-sm text-muted-foreground">{region.count} localidades</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={region.percentage} 
                          max={100} 
                          className={cn("h-2", statusColors[region.status as keyof typeof statusColors])} 
                        />
                        <span className="text-sm font-medium">{region.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2 h-[400px]">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Bairros</CardTitle>
                <CardDescription>
                  {selectedRegion 
                    ? `Ocorrências em bairros da ${processedRegions.find(r => r.ID_REGIAO === selectedRegion)?.name || "região selecionada"}` 
                    : "Ocorrências por bairro em todas as regiões"}
                </CardDescription>
              </div>
              {selectedRegion && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSelectedRegion(null)}
                  className="h-8"
                >
                  Limpar Filtro
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar bairro..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="space-y-4 h-[260px] overflow-y-auto pr-2">
                {isDistrictsLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <p>Carregando localidades...</p>
                  </div>
                ) : filteredDistricts.length > 0 ? (
                  filteredDistricts.map((district) => (
                    <div 
                      key={district.ID_LOCALIDADE} 
                      className="p-3 border rounded-lg hover:bg-gray-50 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="font-medium">{district.name}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {district.region}
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-sm text-muted-foreground">{district.count} ocorrências</div>
                          <div className="text-sm font-medium">{district.percentage}%</div>
                        </div>
                        <Progress 
                          value={district.percentage} 
                          max={100} 
                          className={cn("h-2", statusColors[district.status as keyof typeof statusColors])} 
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-8">
                    <Map className="h-12 w-12 text-muted-foreground opacity-30" />
                    <p className="text-muted-foreground mt-4">Nenhum bairro encontrado</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Mapa de Calor</CardTitle>
            <CardDescription>Visualização geográfica das ocorrências por região</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-6 min-h-[400px]">
            <div className="text-center space-y-3">
              <Map className="mx-auto h-16 w-16 text-muted-foreground opacity-30" />
              <h3 className="text-xl font-medium">Mapa em desenvolvimento</h3>
              <p className="text-muted-foreground max-w-md">
                O mapa de calor com visualização geográfica das ocorrências estará disponível
                em breve.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegionalData;
