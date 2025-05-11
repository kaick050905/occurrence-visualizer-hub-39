import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, BarChart2, PieChart, LineChart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart as RLineChart, Line, PieChart as RCPieChart, Pie, Cell } from "recharts";
import { useTheme } from "next-themes";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Tooltip as UITooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Simular dados de crimes por região
const crimesDataByRegion: Record<string, { [crime: string]: number[] }> = {
  "Araçatuba": {
    Furto: [7912, 7517, 6947, 688],
    Roubo: [508, 366, 315, 23],
    Estupro: [30, 28, 32, 29],
    Homicídio: [73, 71, 80, 5],
  },
  "Santos": {
    Furto: [36420, 38486, 36881, 1196],
    Roubo: [12318, 14027, 10565, 866],
    Estupro: [740, 801, 833, 58],
    Homicídio: [173, 140, 130, 11],
  },
  "Campinas": {
    Furto: [45427, 46130, 44259, 3321],
    Roubo: [9587, 8731, 6885, 665],
    Estupro: [1057, 1233, 1159, 111],
    Homicídio: [252, 205, 178, 20],
  },
  "São José dos Campos": {
    Furto: [25763, 25572, 23617, 2170],
    Roubo: [4601, 4406, 3630, 294],
    Estupro: [724, 793, 810, 80],
    Homicídio: [351, 308, 283, 17],
  },
  "Grande São Paulo": {
    Furto: [108516, 109832, 108455, 9029],
    Roubo: [55441, 51669, 44155, 3910],
    Estupro: [2816, 2884, 2965, 268],
    Homicídio: [607, 497, 464, 51],
  },
  "Capital": {
    Furto: [277061, 291344, 283753, 23464],
    Roubo: [142921, 133324, 115172, 9180],
    Estupro: [2662, 3041, 3012, 270],
    Homicídio: [560, 481, 481, 46],
  },
  "Piracicaba": {
    Furto: [33157, 33278, 32241, 2696],
    Roubo: [5489, 4960, 4031, 322],
    Estupro: [790, 828, 830, 47],
    Homicídio: [217, 223, 228, 13],
  },
  "Presidente Prudente": {
    Furto: [8665, 8549, 8146, 754],
    Roubo: [380, 279, 246, 23],
    Estupro: [367, 389, 385, 45],
    Homicídio: [67, 70, 70, 5],
  },
  "Sorocaba": {
    Furto: [30197, 30615, 29709, 2641],
    Roubo: [3497, 3305, 2859, 205],
    Estupro: [1308, 1502, 1530, 156],
    Homicídio: [169, 169, 182, 14],
  },
  "Bauru": {
    Furto: [21798, 19707, 18542, 1832],
    Roubo: [1278, 1031, 880, 75],
    Estupro: [657, 753, 785, 73],
    Homicídio: [99, 98, 110, 10],
  },
  "Ribeirão Preto": {
    Furto: [19546, 18345, 17.032, 2.598],
    Roubo: [3170, 2693, 2095, 345],
    Estupro: [1108, 1222, 1189, 97],
    Homicídio: [234, 226, 208, 12],
  },
  "São José do Rio Preto": {
    Furto: [8723, 8601, 9036, 1415],
    Roubo: [1193, 1035, 904, 64],
    Estupro: [696, 762, 731, 51],
    Homicídio: [104, 114, 95, 11],
  },
};

// Dados de cidades por região
const citiesByRegion: Record<string, Array<{name: string, population: string, hdi: number, occurrences2024: number}>> = {
  "Araçatuba": [
    { name: "Araçatuba", population: "200 mil", hdi: 0.788, occurrences2024: 1558 },
    { name: "Birigui", population: "120 mil", hdi: 0.780, occurrences2024: 950 },
    { name: "Andradina", population: "56 mil", hdi: 0.760, occurrences2024: 645 },
    { name: "Penápolis", population: "63 mil", hdi: 0.759, occurrences2024: 667 }
  ],
  "Bauru": [
    { name: "Bauru", population: "380 mil", hdi: 0.801, occurrences2024: 2304 },
    { name: "Marília", population: "240 mil", hdi: 0.798, occurrences2024: 1675 },
    { name: "Jaú", population: "150 mil", hdi: 0.778, occurrences2024: 1261 }
  ],
  "Campinas": [
    { name: "Campinas", population: "1.2 milhões", hdi: 0.805, occurrences2024: 3914 },
    { name: "Americana", population: "240 mil", hdi: 0.811, occurrences2024: 1750 },
    { name: "Limeira", population: "308 mil", hdi: 0.775, occurrences2024: 1903 },
    { name: "Piracicaba", population: "407 mil", hdi: 0.785, occurrences2024: 1193 }
  ],
  "Capital": [
    { name: "São Paulo", population: "12.3 milhões", hdi: 0.805, occurrences2024: 10235 },
    { name: "Pinheiros", population: "65 mil", hdi: 0.840, occurrences2024: 2650 },
    { name: "Santana", population: "118 mil", hdi: 0.811, occurrences2024: 2567 },
    { name: "Vila Mariana", population: "130 mil", hdi: 0.850, occurrences2024: 2378 },
    { name: "Mooca", population: "75 mil", hdi: 0.825, occurrences2024: 3250 }
  ],
  "Grande São Paulo": [
    { name: "Guarulhos", population: "1.4 milhões", hdi: 0.763, occurrences2024: 4250 },
    { name: "São Bernardo do Campo", population: "844 mil", hdi: 0.805, occurrences2024: 3175 },
    { name: "Santo André", population: "722 mil", hdi: 0.815, occurrences2024: 2905 },
    { name: "Osasco", population: "699 mil", hdi: 0.776, occurrences2024: 2720 }
  ],
  "Piracicaba": [
    { name: "Piracicaba", population: "407 mil", hdi: 0.785, occurrences2024: 1958 },
    { name: "Rio Claro", population: "208 mil", hdi: 0.803, occurrences2024: 965 },
    { name: "Limeira", population: "308 mil", hdi: 0.775, occurrences2024: 1307 }
  ],
  "Presidente Prudente": [
    { name: "Presidente Prudente", population: "230 mil", hdi: 0.806, occurrences2024: 1320 },
    { name: "Adamantina", population: "35 mil", hdi: 0.790, occurrences2024: 542 },
    { name: "Dracena", population: "46 mil", hdi: 0.776, occurrences2024: 578 },
    { name: "Osvaldo Cruz", population: "32 mil", hdi: 0.762, occurrences2024: 500 }
  ],
  "Ribeirão Preto": [
    { name: "Ribeirão Preto", population: "711 mil", hdi: 0.800, occurrences2024: 2670 },
    { name: "Franca", population: "355 mil", hdi: 0.780, occurrences2024: 1410 },
    { name: "Sertãozinho", population: "126 mil", hdi: 0.761, occurrences2024: 1050 },
    { name: "Jaboticabal", population: "76 mil", hdi: 0.778, occurrences2024: 950 }
  ],
  "Santos": [
    { name: "Santos", population: "433 mil", hdi: 0.840, occurrences2024: 2104 },
    { name: "São Vicente", population: "365 mil", hdi: 0.768, occurrences2024: 1458 },
    { name: "Guarujá", population: "322 mil", hdi: 0.751, occurrences2024: 1298 },
    { name: "Praia Grande", population: "330 mil", hdi: 0.754, occurrences2024: 700 }
  ],
  "São José do Rio Preto": [
    { name: "São José do Rio Preto", population: "460 mil", hdi: 0.797, occurrences2024: 1605 },
    { name: "Catanduva", population: "122 mil", hdi: 0.785, occurrences2024: 845 },
    { name: "Votuporanga", population: "94 mil", hdi: 0.790, occurrences2024: 1000 }
  ],
  "São José dos Campos": [
    { name: "São José dos Campos", population: "729 mil", hdi: 0.807, occurrences2024: 2490 },
    { name: "Taubaté", population: "317 mil", hdi: 0.800, occurrences2024: 1750 },
    { name: "Jacareí", population: "235 mil", hdi: 0.777, occurrences2024: 1300 },
    { name: "Pindamonhangaba", population: "173 mil", hdi: 0.773, occurrences2024: 1000 }
  ],
  "Sorocaba": [
    { name: "Sorocaba", population: "687 mil", hdi: 0.798, occurrences2024: 1910 },
    { name: "Itu", population: "175 mil", hdi: 0.773, occurrences2024: 920 },
    { name: "Votorantim", population: "123 mil", hdi: 0.767, occurrences2024: 745 },
    { name: "Tatuí", population: "122 mil", hdi: 0.752, occurrences2024: 575 }
  ]
};

const regionHumanNames: Record<string, string> = {
  "Araçatuba": "Araçatuba",
  "Bauru": "Bauru",
  "Campinas": "Campinas",
  "Capital": "Capital",
  "Grande São Paulo": "Grande São Paulo",
  "Piracicaba": "Piracicaba",
  "Presidente Prudente": "Presidente Prudente",
  "Ribeirão Preto": "Ribeirão Preto",
  "Santos": "Santos",
  "São José do Rio Preto": "São José do Rio Preto",
  "São José dos Campos": "São José dos Campos",
  "Sorocaba": "Sorocaba"
};

const years = ["2022", "2023", "2024", "2025"];
const pieColors = ["#3B82F6", "#EF4444", "#F59E0B", "#10B981"];

// Função para obter cor do IDH
const getHDIColor = (hdi: number): string => {
  if (hdi >= 0.8) return "text-green-600 dark:text-green-400";
  if (hdi >= 0.7) return "text-yellow-600 dark:text-yellow-400";
  if (hdi >= 0.6) return "text-orange-600 dark:text-orange-400";
  return "text-red-600 dark:text-red-400";
};

// Custom chart tooltip for dark mode support
const CustomTooltip = ({ active, payload, label, theme, language, t }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={`p-2 border rounded shadow-sm ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-800'}`}>
        <p className="font-medium">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const RegionDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { t, language } = useLanguage();

  const unescapedName = name ? decodeURIComponent(name) : undefined;
  const regionCrimes = unescapedName ? crimesDataByRegion[unescapedName] : undefined;
  const regionCities = unescapedName ? citiesByRegion[unescapedName] : [];

  if (!regionCrimes) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-background">
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle><BarChart2 className="inline mr-2" />{t('regionNotFound')}</CardTitle>
            <CardDescription>
              {t('noDataAvailable')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate(-1)}><ArrowRight className="mr-2 rotate-180" /> {t('back')}</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Prepare data for charts
  const barData = years.map((year, i) => ({
    year,
    [t('theft')]: regionCrimes.Furto[i],
    [t('robbery')]: regionCrimes.Roubo[i],
    [t('rape')]: regionCrimes.Estupro[i],
    [t('homicide')]: regionCrimes["Homicídio"][i],
  }));

  const lastYearIndex = regionCrimes.Furto.length - 1;
  const pieData = [
    { name: t('theft'), value: regionCrimes.Furto[lastYearIndex] },
    { name: t('robbery'), value: regionCrimes.Roubo[lastYearIndex] },
    { name: t('rape'), value: regionCrimes.Estupro[lastYearIndex] },
    { name: t('homicide'), value: regionCrimes["Homicídio"][lastYearIndex] },
  ];

  return (
    <div className="min-h-screen bg-background px-2 py-8">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
          <ArrowRight className="rotate-180 mr-2" /> {t('back')}
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="text-primary" /> {t('regionDetails')}: <span>{regionHumanNames[unescapedName || ""]}</span>
            </CardTitle>
            <CardDescription>
              {t('recordedCrimes')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="bar">
              <TabsList className="mb-4">
                <TabsTrigger value="bar">
                  <div className="flex items-center gap-1">
                    <BarChart2 size={16} />
                    <span className="hidden sm:inline">{t('bars')}</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="line">
                  <div className="flex items-center gap-1">
                    <LineChart size={16} />
                    <span className="hidden sm:inline">{t('lines')}</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="pie">
                  <div className="flex items-center gap-1">
                    <PieChart size={16} />
                    <span className="hidden sm:inline">{t('pie')}</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="cities">
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span className="hidden sm:inline">{t('cities')}</span>
                  </div>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="bar">
                <div className="flex items-center mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">{t('crimesByYear')}</h3>
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground ml-2" />
                      </TooltipTrigger>
                      <TooltipContent className="p-3 max-w-xs">
                        <p>{t('crimesByYearTooltip')}</p>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <XAxis dataKey="year" stroke={theme === 'dark' ? '#aaa' : '#333'} />
                      <YAxis stroke={theme === 'dark' ? '#aaa' : '#333'} />
                      <Tooltip content={<CustomTooltip theme={theme} language={language} t={t} />} />
                      <Legend />
                      <Bar dataKey={t('theft')} fill="#3B82F6" />
                      <Bar dataKey={t('robbery')} fill="#EF4444" />
                      <Bar dataKey={t('rape')} fill="#F59E0B" />
                      <Bar dataKey={t('homicide')} fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="line">
                <div className="flex items-center mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">{t('temporalEvolution')}</h3>
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground ml-2" />
                      </TooltipTrigger>
                      <TooltipContent className="p-3 max-w-xs">
                        <p>{t('temporalEvolutionTooltip')}</p>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RLineChart data={barData}>
                      <XAxis dataKey="year" stroke={theme === 'dark' ? '#aaa' : '#333'} />
                      <YAxis stroke={theme === 'dark' ? '#aaa' : '#333'} />
                      <Tooltip content={<CustomTooltip theme={theme} language={language} t={t} />} />
                      <Legend />
                      <Line type="monotone" dataKey={t('theft')} stroke="#3B82F6" strokeWidth={2} />
                      <Line type="monotone" dataKey={t('robbery')} stroke="#EF4444" strokeWidth={2} />
                      <Line type="monotone" dataKey={t('rape')} stroke="#F59E0B" strokeWidth={2} />
                      <Line type="monotone" dataKey={t('homicide')} stroke="#10B981" strokeWidth={2} />
                    </RLineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="pie">
                <div className="flex items-center mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">{t('distributionByType')}</h3>
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground ml-2" />
                      </TooltipTrigger>
                      <TooltipContent className="p-3 max-w-xs">
                        <p>{t('distributionByTypeTooltip')}</p>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                </div>
                <div className="h-[300px] flex justify-center items-center">
                  <ResponsiveContainer width="60%" height="100%">
                    <RCPieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        innerRadius={65}
                        outerRadius={95}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, i) => (
                          <Cell key={`cell-${entry.name}`} fill={pieColors[i % pieColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip theme={theme} language={language} t={t} />} />
                    </RCPieChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="cities">
                <div className="flex items-center mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">{t('citiesOfRegion')}</h3>
                  <TooltipProvider>
                    <UITooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground ml-2" />
                      </TooltipTrigger>
                      <TooltipContent className="p-3 max-w-xs">
                        <p>{t('citiesOfRegionTooltip')}</p>
                      </TooltipContent>
                    </UITooltip>
                  </TooltipProvider>
                </div>
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-4">
                    {regionCities.map((city, index) => (
                      <div
                        key={index}
                        className="w-full text-left p-4 border rounded-lg bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-primary" />
                          <span className="font-semibold text-lg">{city.name}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                          <div className="flex items-center gap-2">
                            <div>
                              <div className="text-sm text-muted-foreground">{t('population')}</div>
                              <div className="font-medium">{city.population}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div>
                              <div className="text-sm text-muted-foreground">IDH</div>
                              <div className={`font-medium ${getHDIColor(city.hdi)}`}>{city.hdi}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <div>
                              <div className="text-sm text-muted-foreground">{t('occurrencesIn2024')}</div>
                              <div className="font-medium">{city.occurrences2024}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4">
              {pieData.map((crime) => (
                <div key={crime.name} className="bg-muted border rounded-lg p-4 flex flex-col items-center">
                  <span className="text-lg font-medium">{crime.name}</span>
                  <span className="text-2xl font-bold">{crime.value}</span>
                  <span className="text-sm text-muted-foreground">{t('in2024')}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegionDetails;
