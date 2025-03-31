
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, Activity, BarChart, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { fetchLocations } from "@/services/supabaseService";
import { useQuery } from "@tanstack/react-query";

const getHDIColor = (hdi: number | string): string => {
  if (!hdi) return "text-gray-600";
  
  const hdiNum = typeof hdi === 'string' ? parseFloat(hdi) : hdi;
  
  if (isNaN(hdiNum)) return "text-gray-600";
  
  if (hdiNum >= 0.8) return "text-green-600";
  if (hdiNum >= 0.7) return "text-yellow-600";
  if (hdiNum >= 0.6) return "text-orange-600";
  return "text-red-600";
};

const formatNumber = (num: number): string => {
  return num.toLocaleString('pt-BR');
};

const LocalityData: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: locations = [], isLoading } = useQuery({
    queryKey: ['locations'],
    queryFn: fetchLocations,
  });
  
  const filteredLocations = locations.filter(location => 
    location.NOME?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.region?.REGIAO?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <p>Carregando dados...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredLocations.length > 0 ? (
                    filteredLocations.map((location, index) => (
                      <div 
                        key={location.ID_LOCALIDADE || index} 
                        className="p-4 border rounded-lg bg-gradient-to-r from-white to-gray-50 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-primary" />
                            <span className="font-semibold text-lg">{location.NOME || "Localidade sem nome"}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Região: {location.region?.REGIAO || "Não especificada"}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-blue-500" />
                            <div>
                              <div className="text-sm text-muted-foreground">População</div>
                              <div className="font-medium">{location['População'] || "N/A"}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-purple-500" />
                            <div>
                              <div className="text-sm text-muted-foreground">IDH</div>
                              <div className={`font-medium ${getHDIColor(location.IDH || 0)}`}>{location.IDH || "N/A"}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <BarChart className="h-4 w-4 text-red-500" />
                            <div>
                              <div className="text-sm text-muted-foreground">Ocorrências</div>
                              <div className="font-medium">Consultar</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8">
                      <p className="text-muted-foreground">Nenhuma localidade encontrada</p>
                    </div>
                  )}
                </div>
              )}
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
