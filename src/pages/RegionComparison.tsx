import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardHeaderWithLang from "@/components/DashboardHeaderWithLang";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, MapPin, BarChart2, PieChart, TrendingUp, Radar } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar as RadarComponent
} from "recharts";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import { useGlobal, Language } from "@/contexts/GlobalContext";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Dados simulados para as regiões
const regionsData = [
  { 
    name: "Araçatuba", 
    population: "780 mil",
    hdi: 0.765,
    occurrences2024: 3820,
    occurrencesPerCapita: 0.0049,
    severity: "Baixa",
    crimeDistribution: {
      furto: 1540,
      roubo: 980,
      agressao: 85,
      homicidio: 32
    }
  },
  { 
    name: "Bauru", 
    population: "950 mil",
    hdi: 0.771,
    occurrences2024: 5240,
    occurrencesPerCapita: 0.0055,
    severity: "Baixa",
    crimeDistribution: {
      furto: 2350,
      roubo: 1310,
      agressao: 95,
      homicidio: 42
    }
  },
  { 
    name: "Campinas", 
    population: "3.2 milhões",
    hdi: 0.805,
    occurrences2024: 8760,
    occurrencesPerCapita: 0.0027,
    severity: "Média",
    crimeDistribution: {
      furto: 4120,
      roubo: 2540,
      agressao: 150,
      homicidio: 65
    }
  },
  { 
    name: "Capital", 
    population: "12.3 milhões",
    hdi: 0.805,
    occurrences2024: 21080,
    occurrencesPerCapita: 0.0017,
    severity: "Crítica",
    crimeDistribution: {
      furto: 10450,
      roubo: 7230,
      agressao: 320,
      homicidio: 180
    }
  },
  { 
    name: "Grande São Paulo", 
    population: "8.1 milhões",
    hdi: 0.783,
    occurrences2024: 13050,
    occurrencesPerCapita: 0.0016,
    severity: "Alta",
    crimeDistribution: {
      furto: 6320,
      roubo: 4150,
      agressao: 190,
      homicidio: 95
    }
  },
  { 
    name: "Piracicaba", 
    population: "1.1 milhões",
    hdi: 0.767,
    occurrences2024: 4230,
    occurrencesPerCapita: 0.0038,
    severity: "Média",
    crimeDistribution: {
      furto: 1950,
      roubo: 1210,
      agressao: 75,
      homicidio: 38
    }
  },
  { 
    name: "Presidente Prudente", 
    population: "620 mil",
    hdi: 0.751,
    occurrences2024: 2940,
    occurrencesPerCapita: 0.0047,
    severity: "Baixa",
    crimeDistribution: {
      furto: 1380,
      roubo: 820,
      agressao: 60,
      homicidio: 25
    }
  },
  { 
    name: "Ribeirão Preto", 
    population: "1.8 milhões",
    hdi: 0.797,
    occurrences2024: 6080,
    occurrencesPerCapita: 0.0034,
    severity: "Alta",
    crimeDistribution: {
      furto: 2840,
      roubo: 1750,
      agressao: 110,
      homicidio: 48
    }
  },
  { 
    name: "Santos", 
    population: "1.5 milhões",
    hdi: 0.821,
    occurrences2024: 5560,
    occurrencesPerCapita: 0.0037,
    severity: "Média",
    crimeDistribution: {
      furto: 2650,
      roubo: 1490,
      agressao: 85,
      homicidio: 40
    }
  },
  { 
    name: "São José do Rio Preto", 
    population: "850 mil",
    hdi: 0.773,
    occurrences2024: 3450,
    occurrencesPerCapita: 0.0041,
    severity: "Média",
    crimeDistribution: {
      furto: 1620,
      roubo: 920,
      agressao: 70,
      homicidio: 30
    }
  },
  { 
    name: "São José dos Campos", 
    population: "1.7 milhões",
    hdi: 0.801,
    occurrences2024: 6540,
    occurrencesPerCapita: 0.0038,
    severity: "Alta",
    crimeDistribution: {
      furto: 3050,
      roubo: 1980,
      agressao: 125,
      homicidio: 55
    }
  },
  { 
    name: "Sorocaba", 
    population: "1.4 milhões",
    hdi: 0.779,
    occurrences2024: 4150,
    occurrencesPerCapita: 0.0030,
    severity: "Baixa",
    crimeDistribution: {
      furto: 1950,
      roubo: 1210,
      agressao: 78,
      homicidio: 36
    }
  },
];

// Severidade cores
const severityColors = {
  "Crítica": "#7F1D1D",
  "Alta": "#EF4444",
  "Média": "#F59E0B",
  "Baixa": "#10B981"
};

// Cores para o gráfico
const chartColors = ["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6"];

// Função para encontrar região pelo nome
const getRegionByName = (name: string) => {
  return regionsData.find(region => region.name === name);
};

// Type for crime distribution data
type CrimeDistributionType = {
  furto: number;
  roubo: number;
  agressao: number;
  homicidio: number;
};

const RegionComparison: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("bar");
  const { currentLanguage, compareRegions, toggleRegionComparison, translations } = useGlobal();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Function to translate severity
  const translateSeverity = (severity: string): string => {
    const severityMap: Record<string, string> = {
      'Crítica': translations.critical[currentLanguage],
      'Alta': translations.high[currentLanguage],
      'Média': translations.medium[currentLanguage],
      'Baixa': translations.low[currentLanguage]
    };
    return severityMap[severity] || severity;
  };

  // Prepare crime distribution data for charts
  const prepareCrimeDistributionData = () => {
    const crimeTypes = ['furto', 'roubo', 'agressao', 'homicidio'];
    const crimeTypeLabels: Record<string, string> = {
      'furto': translations.theft[currentLanguage],
      'roubo': translations.robbery[currentLanguage],
      'agressao': translations.assault[currentLanguage],
      'homicidio': translations.homicide[currentLanguage]
    };
    
    return crimeTypes.map(type => {
      const dataPoint: Record<string, any> = { 
        name: crimeTypeLabels[type] 
      };
      
      compareRegions.forEach(regionName => {
        const region = getRegionByName(regionName);
        if (region) {
          dataPoint[regionName] = region.crimeDistribution[type as keyof CrimeDistributionType];
        }
      });
      
      return dataPoint;
    });
  };

  const crimeDistributionData = prepareCrimeDistributionData();

  // Format number for display based on language
  const formatNumber = (value: number): string => {
    return value.toLocaleString(currentLanguage);
  };

  // Custom tooltip formatter for charts
  const tooltipFormatter = (value: number | string): [string, string] => {
    if (typeof value === 'number') {
      return [formatNumber(value), ""];
    }
    return [String(value), ""];
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container py-4 px-4 md:px-6 lg:px-8 flex-grow">
        <DashboardHeaderWithLang />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
                <BarChart2 className="h-6 w-6 text-primary" />
                {translations.regionComparison[currentLanguage]}
              </CardTitle>
              <CardDescription>
                {translations.selectRegions[currentLanguage]}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex justify-end">
                <Button 
                  onClick={() => setDialogOpen(true)}
                  disabled={compareRegions.length === 0}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <BarChart2 className="h-4 w-4" />
                  {translations.compareNow[currentLanguage]}
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {regionsData.map(region => (
                  <Card key={region.name} className="overflow-hidden">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{region.name}</CardTitle>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleRegionComparison(region.name)}
                          disabled={compareRegions.length >= 3 && !compareRegions.includes(region.name)}
                          className={compareRegions.includes(region.name) ? "bg-primary text-primary-foreground" : ""}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          {translations.addToComparison[currentLanguage]}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">{translations.population[currentLanguage]}</p>
                          <p className="font-medium">{region.population}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">2024</p>
                          <p className="font-medium flex items-center justify-between">
                            {formatNumber(region.occurrences2024)}
                            <span 
                              className="text-xs px-2 py-0.5 rounded-full text-white ml-2"
                              style={{ backgroundColor: severityColors[region.severity as keyof typeof severityColors] }}
                            >
                              {translateSeverity(region.severity)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Dialog for comparison */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-primary" />
                {translations.regionComparison[currentLanguage]}
              </DialogTitle>
              <DialogDescription>
                {compareRegions.map((name, index) => (
                  <span key={name}>
                    {index > 0 && " • "}
                    {name}
                  </span>
                ))}
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="bar" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="bar" className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4" />
                  {translations.barChart[currentLanguage]}
                </TabsTrigger>
                <TabsTrigger value="radar" className="flex items-center gap-2">
                  <Radar className="h-4 w-4" />
                  {translations.radarChart[currentLanguage]}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="bar" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{translations.crimeDistribution[currentLanguage]}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div style={{ width: '100%', height: isMobile ? 300 : 400 }}>
                      <ResponsiveContainer>
                        <BarChart
                          data={crimeDistributionData}
                          layout={isMobile ? "vertical" : "horizontal"}
                          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          {isMobile ? (
                            <>
                              <XAxis type="number" />
                              <YAxis dataKey="name" type="category" width={100} />
                            </>
                          ) : (
                            <>
                              <XAxis dataKey="name" />
                              <YAxis />
                            </>
                          )}
                          <RechartsTooltip formatter={tooltipFormatter} />
                          <Legend />
                          {compareRegions.map((region, index) => (
                            <Bar 
                              key={region} 
                              dataKey={region} 
                              fill={chartColors[index % chartColors.length]}
                            />
                          ))}
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="radar" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{translations.crimeDistribution[currentLanguage]}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div style={{ width: '100%', height: isMobile ? 300 : 400 }}>
                      <ResponsiveContainer>
                        <RadarChart outerRadius={isMobile ? 100 : 150} data={crimeDistributionData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="name" />
                          <PolarRadiusAxis />
                          {compareRegions.map((region, index) => (
                            <RadarComponent
                              key={region}
                              name={region}
                              dataKey={region}
                              stroke={chartColors[index % chartColors.length]}
                              fill={chartColors[index % chartColors.length]}
                              fillOpacity={0.3}
                            />
                          ))}
                          <RechartsTooltip formatter={tooltipFormatter} />
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {compareRegions.map(regionName => {
                const region = getRegionByName(regionName);
                if (!region) return null;
                
                return (
                  <Card key={regionName}>
                    <CardHeader className="p-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        {regionName}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{translations.population[currentLanguage]}:</span>
                          <span>{region.population}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{translations.hdi[currentLanguage]}:</span>
                          <span>{region.hdi}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{translations.occurrences[currentLanguage]} (2024):</span>
                          <span>{formatNumber(region.occurrences2024)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{translations.perThousand[currentLanguage]}:</span>
                          <span>{(region.occurrencesPerCapita * 1000).toFixed(2)}</span>
                        </div>
                        <div className="mt-3">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => navigate(`/regiao/${regionName}`)}
                          >
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {translations.moreDetails[currentLanguage]}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default RegionComparison;
