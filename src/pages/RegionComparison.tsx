
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardHeader from "@/components/DashboardHeader";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, BarChart2, PieChart, TrendingUp, MapPin } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";

// Dados simulados para as regiões
const regionsData = [
  { 
    name: "Araçatuba", 
    population: "780 mil",
    hdi: 0.765,
    occurrences2024: 3820,
    occurrencesPerCapita: 0.0049,
    crimeDistribution: {
      furto: 1540,
      roubo: 980,
      estupro: 85,
      homicidio: 32
    }
  },
  { 
    name: "Bauru", 
    population: "950 mil",
    hdi: 0.771,
    occurrences2024: 5240,
    occurrencesPerCapita: 0.0055,
    crimeDistribution: {
      furto: 2350,
      roubo: 1310,
      estupro: 95,
      homicidio: 42
    }
  },
  { 
    name: "Campinas", 
    population: "3.2 milhões",
    hdi: 0.805,
    occurrences2024: 8760,
    occurrencesPerCapita: 0.0027,
    crimeDistribution: {
      furto: 4120,
      roubo: 2540,
      estupro: 150,
      homicidio: 65
    }
  },
  { 
    name: "Capital", 
    population: "12.3 milhões",
    hdi: 0.805,
    occurrences2024: 21080,
    occurrencesPerCapita: 0.0017,
    crimeDistribution: {
      furto: 10450,
      roubo: 7230,
      estupro: 320,
      homicidio: 180
    }
  },
  { 
    name: "Grande São Paulo", 
    population: "8.1 milhões",
    hdi: 0.783,
    occurrences2024: 13050,
    occurrencesPerCapita: 0.0016,
    crimeDistribution: {
      furto: 6320,
      roubo: 4150,
      estupro: 190,
      homicidio: 95
    }
  },
  { 
    name: "Piracicaba", 
    population: "1.1 milhões",
    hdi: 0.767,
    occurrences2024: 4230,
    occurrencesPerCapita: 0.0038,
    crimeDistribution: {
      furto: 1950,
      roubo: 1210,
      estupro: 75,
      homicidio: 38
    }
  },
  { 
    name: "Presidente Prudente", 
    population: "620 mil",
    hdi: 0.751,
    occurrences2024: 2940,
    occurrencesPerCapita: 0.0047,
    crimeDistribution: {
      furto: 1380,
      roubo: 820,
      estupro: 60,
      homicidio: 25
    }
  },
  { 
    name: "Ribeirão Preto", 
    population: "1.8 milhões",
    hdi: 0.797,
    occurrences2024: 6080,
    occurrencesPerCapita: 0.0034,
    crimeDistribution: {
      furto: 2840,
      roubo: 1750,
      estupro: 110,
      homicidio: 48
    }
  },
  { 
    name: "Santos", 
    population: "1.5 milhões",
    hdi: 0.821,
    occurrences2024: 5560,
    occurrencesPerCapita: 0.0037,
    crimeDistribution: {
      furto: 2650,
      roubo: 1490,
      estupro: 85,
      homicidio: 40
    }
  },
  { 
    name: "São José do Rio Preto", 
    population: "850 mil",
    hdi: 0.773,
    occurrences2024: 3450,
    occurrencesPerCapita: 0.0041,
    crimeDistribution: {
      furto: 1620,
      roubo: 920,
      estupro: 70,
      homicidio: 30
    }
  },
  { 
    name: "São José dos Campos", 
    population: "1.7 milhões",
    hdi: 0.801,
    occurrences2024: 6540,
    occurrencesPerCapita: 0.0038,
    crimeDistribution: {
      furto: 3050,
      roubo: 1980,
      estupro: 125,
      homicidio: 55
    }
  },
  { 
    name: "Sorocaba", 
    population: "1.4 milhões",
    hdi: 0.779,
    occurrences2024: 4150,
    occurrencesPerCapita: 0.0030,
    crimeDistribution: {
      furto: 1950,
      roubo: 1210,
      estupro: 78,
      homicidio: 36
    }
  },
];

// Função para encontrar região pelo nome
const getRegionByName = (name: string) => {
  return regionsData.find(region => region.name === name);
};

const RegionComparison = () => {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [compareMode, setCompareMode] = useState<"total" | "perCapita">("total");
  const [activeMetric, setActiveMetric] = useState<"occurrences" | "crimeDistribution">("occurrences");
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Adicionar região à comparação
  const addRegion = (regionName: string) => {
    if (regionName && !selectedRegions.includes(regionName) && selectedRegions.length < 4) {
      setSelectedRegions([...selectedRegions, regionName]);
    }
  };

  // Remover região da comparação
  const removeRegion = (regionName: string) => {
    setSelectedRegions(selectedRegions.filter(name => name !== regionName));
  };

  // Preparar dados para gráficos
  const prepareComparisonData = () => {
    if (activeMetric === "occurrences") {
      return selectedRegions.map(regionName => {
        const region = getRegionByName(regionName);
        if (region) {
          return {
            name: regionName,
            value: compareMode === "total" ? region.occurrences2024 : region.occurrencesPerCapita * 1000 // por 1000 habitantes
          };
        }
        return { name: regionName, value: 0 };
      });
    } else {
      // Crime distribution data
      const crimeTypes = ["furto", "roubo", "estupro", "homicidio"];
      return crimeTypes.map(type => {
        const dataPoint: any = { name: type };
        selectedRegions.forEach(regionName => {
          const region = getRegionByName(regionName);
          if (region) {
            const value = region.crimeDistribution[type as keyof typeof region.crimeDistribution];
            dataPoint[regionName] = compareMode === "total" 
              ? value 
              : (value / parseInt(region.population.replace(/[^\d]/g, "")) * 1000000); // por milhão
          }
        });
        return dataPoint;
      });
    }
  };

  const comparisonData = prepareComparisonData();
  
  // Cores para o gráfico
  const chartColors = ["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6"];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container py-4 px-4 md:px-6 lg:px-8 flex-grow">
        <DashboardHeader />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mt-6">
            <CardHeader>
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
                    <BarChart2 className="h-6 w-6 text-primary" />
                    Comparativo Entre Regiões
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Compare estatísticas de ocorrências entre diferentes regiões do estado
                  </CardDescription>
                </div>
                <div className="flex gap-2 items-center">
                  <Button 
                    variant="outline" 
                    onClick={() => setCompareMode("total")}
                    className={compareMode === "total" ? "bg-primary text-primary-foreground" : ""}
                  >
                    Total
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setCompareMode("perCapita")}
                    className={compareMode === "perCapita" ? "bg-primary text-primary-foreground" : ""}
                  >
                    Per Capita
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6">
                {/* Seletor de regiões */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Selecione as Regiões para Comparar</CardTitle>
                    <CardDescription>Escolha até 4 regiões para comparação</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 items-center">
                      <Select onValueChange={addRegion}>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Escolher região" />
                        </SelectTrigger>
                        <SelectContent>
                          {regionsData
                            .filter(region => !selectedRegions.includes(region.name))
                            .map(region => (
                              <SelectItem key={region.name} value={region.name}>
                                {region.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      
                      <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                        {selectedRegions.map(region => (
                          <div 
                            key={region} 
                            className="flex items-center gap-2 bg-secondary/20 px-3 py-1 rounded-full"
                          >
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>{region}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-5 w-5 rounded-full"
                              onClick={() => removeRegion(region)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Gráficos de comparação */}
                {selectedRegions.length > 0 && (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveMetric("occurrences")}
                        className={`flex-1 ${activeMetric === "occurrences" ? "bg-primary text-primary-foreground" : ""}`}
                      >
                        <BarChart2 className="mr-2 h-4 w-4" />
                        Total de Ocorrências
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveMetric("crimeDistribution")}
                        className={`flex-1 ${activeMetric === "crimeDistribution" ? "bg-primary text-primary-foreground" : ""}`}
                      >
                        <PieChart className="mr-2 h-4 w-4" />
                        Distribuição por Tipo de Crime
                      </Button>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          {activeMetric === "occurrences" ? "Comparativo de Ocorrências" : "Distribuição por Tipo de Crime"}
                        </CardTitle>
                        <CardDescription>
                          {compareMode === "total" 
                            ? "Valores absolutos" 
                            : activeMetric === "occurrences" 
                              ? "Ocorrências por 1000 habitantes" 
                              : "Ocorrências por milhão de habitantes"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="w-full" style={{ height: isMobile ? "300px" : "400px" }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={comparisonData}
                              margin={{
                                top: 20,
                                right: 30,
                                left: activeMetric === "occurrences" ? 20 : 40,
                                bottom: 50,
                              }}
                              layout={activeMetric === "occurrences" ? "vertical" : "horizontal"}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              {activeMetric === "occurrences" ? (
                                <>
                                  <XAxis type="number" />
                                  <YAxis 
                                    dataKey="name" 
                                    type="category" 
                                    width={120} 
                                    tick={{ fontSize: 12 }} 
                                  />
                                  <Tooltip 
                                    formatter={(value) => [
                                      compareMode === "total" 
                                        ? value.toLocaleString('pt-BR') 
                                        : value.toFixed(2),
                                      "Ocorrências"
                                    ]}
                                  />
                                  <Bar
                                    dataKey="value"
                                    name={compareMode === "total" ? "Total de Ocorrências" : "Ocorrências por 1000 habitantes"}
                                    fill="#3B82F6"
                                    radius={[0, 4, 4, 0]}
                                  />
                                </>
                              ) : (
                                <>
                                  <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 12 }}
                                    tickFormatter={(value) => {
                                      const labels = {
                                        furto: "Furto",
                                        roubo: "Roubo",
                                        estupro: "Estupro",
                                        homicidio: "Homicídio"
                                      };
                                      return labels[value as keyof typeof labels] || value;
                                    }}
                                  />
                                  <YAxis />
                                  <Tooltip />
                                  <Legend />
                                  {selectedRegions.map((region, index) => (
                                    <Bar
                                      key={region}
                                      dataKey={region}
                                      name={region}
                                      fill={chartColors[index % chartColors.length]}
                                      radius={[4, 4, 0, 0]}
                                    />
                                  ))}
                                </>
                              )}
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Tabela de comparação */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Dados Detalhados</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="border-b">
                                <th className="py-2 px-3 text-left">Região</th>
                                <th className="py-2 px-3 text-left">População</th>
                                <th className="py-2 px-3 text-left">IDH</th>
                                <th className="py-2 px-3 text-left">Ocorrências (2024)</th>
                                <th className="py-2 px-3 text-left">Per 1000 hab.</th>
                                <th className="py-2 px-3 text-left">Mais detalhes</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedRegions.map(regionName => {
                                const region = getRegionByName(regionName);
                                if (!region) return null;
                                
                                return (
                                  <tr key={regionName} className="border-b hover:bg-muted/50">
                                    <td className="py-2 px-3">{regionName}</td>
                                    <td className="py-2 px-3">{region.population}</td>
                                    <td className="py-2 px-3">{region.hdi}</td>
                                    <td className="py-2 px-3">{region.occurrences2024.toLocaleString('pt-BR')}</td>
                                    <td className="py-2 px-3">{(region.occurrencesPerCapita * 1000).toFixed(2)}</td>
                                    <td className="py-2 px-3">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => navigate(`/regiao/${regionName}`)}
                                      >
                                        <TrendingUp className="mr-1 h-3 w-3" />
                                        Ver
                                      </Button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                
                {selectedRegions.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-10 border border-dashed rounded-lg bg-muted/20">
                    <BarChart className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Nenhuma região selecionada</h3>
                    <p className="text-muted-foreground text-center max-w-md mb-6">
                      Escolha pelo menos uma região para visualizar os dados comparativos de ocorrências.
                    </p>
                    <Select onValueChange={addRegion}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Escolher região" />
                      </SelectTrigger>
                      <SelectContent>
                        {regionsData.map(region => (
                          <SelectItem key={region.name} value={region.name}>
                            {region.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default RegionComparison;
