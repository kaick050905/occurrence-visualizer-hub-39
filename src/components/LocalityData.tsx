import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, Activity, BarChart, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Updated region data model with more details
const regionsData = [
  { 
    name: "Araçatuba", 
    count: 38, 
    percentage: 6, 
    status: "Baixa",
    population: "780 mil",
    hdi: 0.765,
    occurrences2024: 3820
  },
  { 
    name: "Bauru", 
    count: 52, 
    percentage: 8, 
    status: "Baixa",
    population: "950 mil",
    hdi: 0.771,
    occurrences2024: 5240
  },
  { 
    name: "Campinas", 
    count: 87, 
    percentage: 12, 
    status: "Média",
    population: "3.2 milhões",
    hdi: 0.805,
    occurrences2024: 8760
  },
  { 
    name: "Capital", 
    count: 210, 
    percentage: 28, 
    status: "Crítica",
    population: "12.3 milhões",
    hdi: 0.805,
    occurrences2024: 21080
  },
  { 
    name: "Grande São Paulo", 
    count: 130, 
    percentage: 17, 
    status: "Alta",
    population: "8.1 milhões",
    hdi: 0.783,
    occurrences2024: 13050
  },
  { 
    name: "Piracicaba", 
    count: 42, 
    percentage: 5, 
    status: "Baixa",
    population: "1.1 milhões",
    hdi: 0.767,
    occurrences2024: 4230
  },
  { 
    name: "Presidente Prudente", 
    count: 29, 
    percentage: 4, 
    status: "Baixa",
    population: "620 mil",
    hdi: 0.751,
    occurrences2024: 2940
  },
  { 
    name: "Ribeirão Preto", 
    count: 60, 
    percentage: 7, 
    status: "Média",
    population: "1.8 milhões",
    hdi: 0.797,
    occurrences2024: 6080
  },
  { 
    name: "Santos", 
    count: 55, 
    percentage: 7, 
    status: "Média",
    population: "1.5 milhões",
    hdi: 0.821,
    occurrences2024: 5560
  },
  { 
    name: "São José do Rio Preto", 
    count: 34, 
    percentage: 5, 
    status: "Baixa",
    population: "850 mil",
    hdi: 0.773,
    occurrences2024: 3450
  },
  { 
    name: "São José dos Campos", 
    count: 65, 
    percentage: 8, 
    status: "Alta",
    population: "1.7 milhões",
    hdi: 0.801,
    occurrences2024: 6540
  },
  { 
    name: "Sorocaba", 
    count: 41, 
    percentage: 6, 
    status: "Baixa",
    population: "1.4 milhões",
    hdi: 0.779,
    occurrences2024: 4150
  },
];

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
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("cidades");
  const navigate = useNavigate();
  
  const filteredCities = citiesData.filter(city => 
    (city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.region.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedRegion ? city.region === selectedRegion : true)
  );

  const filteredRegions = regionsData.filter(region =>
    region.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCityClick = (name: string) => {
    navigate(`/cidade/${encodeURIComponent(name)}`);
  };

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(selectedRegion === region ? null : region);
    // When selecting a region, switch to cities tab
    if (selectedRegion !== region) {
      setActiveTab("cidades");
    }
  };
  
  const handleRegionClick = (name: string) => {
    setExpandedRegion(expandedRegion === name ? null : name);
  };

  const handleViewRegionDetails = (regionName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/regiao/${encodeURIComponent(regionName)}`);
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
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="cidades" className="flex-1">Por Cidade</TabsTrigger>
            <TabsTrigger value="regiao" className="flex-1">Por Região</TabsTrigger>
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
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {filteredRegions.length > 0 ? (
                  filteredRegions.map((region, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <button
                        type="button"
                        className="w-full text-left p-4 bg-gradient-to-r from-white to-gray-50 hover:shadow-md hover:bg-gray-50 transition-all duration-300 outline-none focus:ring-2 focus:ring-primary dark:from-gray-800 dark:to-gray-900 dark:hover:bg-gray-800 dark:border-gray-700"
                        onClick={() => handleRegionClick(region.name)}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-primary" />
                            <span className="font-semibold text-lg">{region.name}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-blue-500" />
                            <div>
                              <div className="text-sm text-muted-foreground">População</div>
                              <div className="font-medium">{region.population}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-purple-500" />
                            <div>
                              <div className="text-sm text-muted-foreground">IDH</div>
                              <div className={`font-medium ${getHDIColor(region.hdi)}`}>{region.hdi}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <BarChart className="h-4 w-4 text-red-500" />
                            <div>
                              <div className="text-sm text-muted-foreground">Ocorrências em 2024</div>
                              <div className="font-medium">{formatNumber(region.occurrences2024)}</div>
                            </div>
                          </div>
                        </div>
                      </button>
                      
                      {expandedRegion === region.name && (
                        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">Detalhes da Região</h4>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              region.status === "Crítica" ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" :
                              region.status === "Alta" ? "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" :
                              region.status === "Média" ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" :
                              "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            }`}>
                              {region.status}
                            </span>
                          </div>
                          
                          <div className="mt-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-muted-foreground">Distribuição de ocorrências</span>
                              <span className="text-sm font-medium">{region.percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div 
                                className={`h-2.5 rounded-full ${
                                  region.status === "Crítica" ? "bg-occurrence-critical" :
                                  region.status === "Alta" ? "bg-occurrence-high" :
                                  region.status === "Média" ? "bg-occurrence-medium" :
                                  "bg-occurrence-low"
                                }`}
                                style={{ width: `${region.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="mt-4 text-sm text-muted-foreground">
                            <p>
                              A região de {region.name} representa {region.percentage}% das ocorrências totais no estado,
                              com um total de {formatNumber(region.occurrences2024)} registros em 2024.
                            </p>
                            <div className="mt-4 flex justify-center gap-3">
                              <Button 
                                className="w-full sm:w-auto"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRegionSelect(region.name);
                                }}
                              >
                                Filtrar cidades desta região
                              </Button>
                              <Button 
                                className="w-full sm:w-auto"
                                variant="outline"
                                onClick={(e) => handleViewRegionDetails(region.name, e)}
                              >
                                Ver detalhes da região
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <p className="text-muted-foreground">Nenhuma região encontrada</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LocalityData;
