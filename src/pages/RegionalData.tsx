
import React, { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { MapPin, Search, Map } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Region data with status
const regionsData = [
  { name: "Zona Norte", count: 132, percentage: 28, status: "Crítica" },
  { name: "Zona Sul", count: 97, percentage: 21, status: "Alta" },
  { name: "Zona Leste", count: 86, percentage: 18, status: "Média" },
  { name: "Zona Oeste", count: 110, percentage: 23, status: "Alta" },
  { name: "Centro", count: 45, percentage: 10, status: "Baixa" },
];

// Districts data
const districtsData = [
  { name: "Santana", region: "Zona Norte", count: 48, percentage: 36, status: "Crítica" },
  { name: "Tucuruvi", region: "Zona Norte", count: 35, percentage: 27, status: "Alta" },
  { name: "Vila Maria", region: "Zona Norte", count: 28, percentage: 21, status: "Média" },
  { name: "Jaçanã", region: "Zona Norte", count: 21, percentage: 16, status: "Média" },
  
  { name: "Moema", region: "Zona Sul", count: 32, percentage: 33, status: "Alta" },
  { name: "Itaim Bibi", region: "Zona Sul", count: 28, percentage: 29, status: "Alta" },
  { name: "Campo Belo", region: "Zona Sul", count: 22, percentage: 23, status: "Média" },
  { name: "Jabaquara", region: "Zona Sul", count: 15, percentage: 15, status: "Baixa" },
  
  { name: "Tatuapé", region: "Zona Leste", count: 30, percentage: 35, status: "Alta" },
  { name: "Penha", region: "Zona Leste", count: 25, percentage: 29, status: "Alta" },
  { name: "Itaquera", region: "Zona Leste", count: 18, percentage: 21, status: "Média" },
  { name: "São Miguel", region: "Zona Leste", count: 13, percentage: 15, status: "Baixa" },
  
  { name: "Pinheiros", region: "Zona Oeste", count: 42, percentage: 38, status: "Crítica" },
  { name: "Butantã", region: "Zona Oeste", count: 34, percentage: 31, status: "Alta" },
  { name: "Lapa", region: "Zona Oeste", count: 25, percentage: 23, status: "Média" },
  { name: "Rio Pequeno", region: "Zona Oeste", count: 9, percentage: 8, status: "Baixa" },
  
  { name: "Sé", region: "Centro", count: 19, percentage: 42, status: "Alta" },
  { name: "República", region: "Centro", count: 15, percentage: 33, status: "Média" },
  { name: "Bela Vista", region: "Centro", count: 11, percentage: 25, status: "Baixa" }
];

const statusColors = {
  Crítica: "bg-occurrence-critical",
  Alta: "bg-occurrence-high",
  Média: "bg-occurrence-medium",
  Baixa: "bg-occurrence-low"
};

const RegionalData: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  
  const filteredDistricts = districtsData.filter(district => {
    const matchesSearch = district.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion ? district.region === selectedRegion : true;
    return matchesSearch && matchesRegion;
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
              <div className="space-y-6">
                {regionsData.map((region) => (
                  <div 
                    key={region.name}
                    className={cn(
                      "p-3 rounded-lg cursor-pointer transition-all",
                      selectedRegion === region.name ? "bg-gray-100" : "hover:bg-gray-50"
                    )}
                    onClick={() => setSelectedRegion(selectedRegion === region.name ? null : region.name)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium">{region.name}</div>
                      <div className="text-sm text-muted-foreground">{region.count} ocorrências</div>
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
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2 h-[400px]">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Bairros</CardTitle>
                <CardDescription>
                  {selectedRegion 
                    ? `Ocorrências em bairros da ${selectedRegion}` 
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
                {filteredDistricts.length > 0 ? (
                  filteredDistricts.map((district) => (
                    <div 
                      key={district.name} 
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
