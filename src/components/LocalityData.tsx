
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, Activity, BarChart, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

// Sample data for cities
const citiesData = [
  { 
    name: "São Paulo", 
    region: "Sudeste", 
    population: "12.4 milhões", 
    hdi: 0.805, 
    occurrences2024: 48325 
  },
  { 
    name: "Rio de Janeiro", 
    region: "Sudeste", 
    population: "6.7 milhões", 
    hdi: 0.799, 
    occurrences2024: 42150 
  },
  { 
    name: "Salvador", 
    region: "Nordeste", 
    population: "2.9 milhões", 
    hdi: 0.759, 
    occurrences2024: 27980 
  },
  { 
    name: "Brasília", 
    region: "Centro-Oeste", 
    population: "3.1 milhões", 
    hdi: 0.824, 
    occurrences2024: 21540 
  },
  { 
    name: "Fortaleza", 
    region: "Nordeste", 
    population: "2.7 milhões", 
    hdi: 0.754, 
    occurrences2024: 25670 
  },
  { 
    name: "Belo Horizonte", 
    region: "Sudeste", 
    population: "2.5 milhões", 
    hdi: 0.810, 
    occurrences2024: 19850 
  },
  { 
    name: "Manaus", 
    region: "Norte", 
    population: "2.2 milhões", 
    hdi: 0.737, 
    occurrences2024: 18720 
  },
  { 
    name: "Curitiba", 
    region: "Sul", 
    population: "1.9 milhões", 
    hdi: 0.823, 
    occurrences2024: 15320 
  },
  { 
    name: "Recife", 
    region: "Nordeste", 
    population: "1.6 milhões", 
    hdi: 0.772, 
    occurrences2024: 17830 
  },
  { 
    name: "Porto Alegre", 
    region: "Sul", 
    population: "1.4 milhões", 
    hdi: 0.805, 
    occurrences2024: 14280 
  }
];

const getHDIColor = (hdi: number): string => {
  if (hdi >= 0.8) return "text-green-600";
  if (hdi >= 0.7) return "text-yellow-600";
  if (hdi >= 0.6) return "text-orange-600";
  return "text-red-600";
};

const formatNumber = (num: number): string => {
  return num.toLocaleString('pt-BR');
};

const LocalityData: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const filteredCities = citiesData.filter(city => 
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCityClick = (name: string) => {
    navigate(`/cidade/${encodeURIComponent(name)}`);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Dados da Localidade</CardTitle>
        <CardDescription>Informações sobre cidades, população, IDH e ocorrências</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar cidade ou região..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="cidades">
          <TabsList className="mb-4">
            <TabsTrigger value="cidades">Por Cidade</TabsTrigger>
            <TabsTrigger value="regiao">Por Região</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cidades">
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {filteredCities.length > 0 ? (
                  filteredCities.map((city, index) => (
                    <button
                      type="button"
                      key={index}
                      className="w-full text-left p-4 border rounded-lg bg-gradient-to-r from-white to-gray-50 hover:shadow-lg hover:bg-gray-50 transition-all duration-300 outline-none focus:ring-2 focus:ring-primary"
                      onClick={() => handleCityClick(city.name)}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-primary" />
                          <span className="font-semibold text-lg">{city.name}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Região: {city.region}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-blue-500" />
                          <div>
                            <div className="text-sm text-muted-foreground">População</div>
                            <div className="font-medium">{city.population}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-purple-500" />
                          <div>
                            <div className="text-sm text-muted-foreground">IDH</div>
                            <div className={`font-medium ${getHDIColor(city.hdi)}`}>{city.hdi}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <BarChart className="h-4 w-4 text-red-500" />
                          <div>
                            <div className="text-sm text-muted-foreground">Ocorrências em 2024</div>
                            <div className="font-medium">{formatNumber(city.occurrences2024)}</div>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <p className="text-muted-foreground">Nenhuma cidade encontrada</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="regiao">
            <div className="flex flex-col items-center justify-center space-y-4 h-[300px]">
              <BarChart className="h-12 w-12 text-muted-foreground opacity-50" />
              <div className="text-xl font-medium">Dados por região em desenvolvimento</div>
              <p className="text-muted-foreground text-center max-w-md">
                Os dados detalhados por região estarão disponíveis na próxima atualização do sistema.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LocalityData;
