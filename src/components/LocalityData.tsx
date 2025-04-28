
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
    region: "Capital", 
    population: "12.3 milhões", 
    hdi: 0.805, 
    occurrences2024: 48325 
  },
  { 
    name: "Guarulhos", 
    region: "Grande São Paulo", 
    population: "1.4 milhões", 
    hdi: 0.763, 
    occurrences2024: 15320 
  },
  { 
    name: "Campinas", 
    region: "Interior", 
    population: "1.2 milhões", 
    hdi: 0.805, 
    occurrences2024: 12450 
  },
  { 
    name: "São Bernardo do Campo", 
    region: "Grande São Paulo", 
    population: "844 mil", 
    hdi: 0.805, 
    occurrences2024: 9870 
  },
  { 
    name: "Santo André", 
    region: "Grande São Paulo", 
    population: "722 mil", 
    hdi: 0.815, 
    occurrences2024: 8540 
  },
  { 
    name: "São José dos Campos", 
    region: "Vale do Paraíba", 
    population: "729 mil", 
    hdi: 0.807, 
    occurrences2024: 7890 
  },
  { 
    name: "Osasco", 
    region: "Grande São Paulo", 
    population: "699 mil", 
    hdi: 0.776, 
    occurrences2024: 7650 
  },
  { 
    name: "Ribeirão Preto", 
    region: "Interior", 
    population: "711 mil", 
    hdi: 0.800, 
    occurrences2024: 7320 
  },
  { 
    name: "Sorocaba", 
    region: "Interior", 
    population: "687 mil", 
    hdi: 0.798, 
    occurrences2024: 6980 
  },
  { 
    name: "Santos", 
    region: "Litoral", 
    population: "433 mil", 
    hdi: 0.840, 
    occurrences2024: 6540 
  }
];

const getHDIColor = (hdi: number): string => {
  if (hdi >= 0.8) return "text-green-600 dark:text-green-400";
  if (hdi >= 0.7) return "text-yellow-600 dark:text-yellow-400";
  if (hdi >= 0.6) return "text-orange-600 dark:text-orange-400";
  return "text-red-600 dark:text-red-400";
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
                      className="w-full text-left p-4 border rounded-lg bg-gradient-to-r from-white to-gray-50 hover:shadow-lg hover:bg-gray-50 transition-all duration-300 outline-none focus:ring-2 focus:ring-primary dark:from-gray-800 dark:to-gray-900 dark:hover:bg-gray-800 dark:border-gray-700"
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
