
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, BarChart2, PieChart, LineChart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart as RLineChart, Line, PieChart as RCPieChart, Pie, Cell } from "recharts";
import { useTheme } from "next-themes";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

// Simular dados de crimes por região
const crimesDataByRegion: Record<string, { [crime: string]: number[] }> = {
  "Araçatuba": {
    Furto: [800, 900, 870, 880, 890, 910],
    Roubo: [500, 520, 540, 530, 520, 540],
    Estupro: [80, 75, 82, 79, 77, 80],
    Homicídio: [30, 28, 32, 29, 27, 28],
  },
  "Bauru": {
    Furto: [900, 950, 970, 960, 980, 990],
    Roubo: [600, 620, 640, 630, 620, 640],
    Estupro: [90, 85, 92, 89, 87, 90],
    Homicídio: [35, 33, 37, 34, 32, 34],
  },
  "Campinas": {
    Furto: [1500, 1600, 1650, 1630, 1680, 1700],
    Roubo: [900, 950, 980, 960, 970, 990],
    Estupro: [110, 105, 115, 112, 108, 114],
    Homicídio: [45, 42, 47, 44, 41, 43],
  },
  "Capital": {
    Furto: [4500, 4700, 4900, 4800, 5000, 5200],
    Roubo: [3500, 3700, 3900, 3800, 4000, 4200],
    Estupro: [450, 470, 490, 480, 500, 520],
    Homicídio: [220, 210, 230, 220, 215, 225],
  },
  "Grande São Paulo": {
    Furto: [3000, 3200, 3400, 3300, 3500, 3700],
    Roubo: [2500, 2700, 2900, 2800, 3000, 3200],
    Estupro: [350, 370, 390, 380, 400, 420],
    Homicídio: [180, 170, 190, 180, 175, 185],
  },
  "Piracicaba": {
    Furto: [700, 750, 780, 770, 790, 820],
    Roubo: [450, 480, 510, 500, 520, 540],
    Estupro: [70, 65, 75, 72, 68, 74],
    Homicídio: [25, 22, 27, 24, 21, 23],
  },
  "Presidente Prudente": {
    Furto: [500, 530, 560, 550, 570, 590],
    Roubo: [350, 380, 410, 400, 420, 440],
    Estupro: [50, 45, 55, 52, 48, 54],
    Homicídio: [20, 18, 22, 19, 17, 21],
  },
  "Ribeirão Preto": {
    Furto: [1000, 1050, 1100, 1080, 1120, 1150],
    Roubo: [750, 780, 810, 800, 830, 860],
    Estupro: [90, 85, 95, 92, 88, 94],
    Homicídio: [35, 32, 37, 34, 31, 36],
  },
  "Santos": {
    Furto: [950, 1000, 1050, 1030, 1070, 1100],
    Roubo: [700, 730, 760, 750, 780, 810],
    Estupro: [85, 80, 90, 87, 83, 89],
    Homicídio: [30, 27, 32, 29, 26, 31],
  },
  "São José do Rio Preto": {
    Furto: [650, 680, 710, 700, 730, 760],
    Roubo: [400, 430, 460, 450, 480, 510],
    Estupro: [60, 55, 65, 62, 58, 64],
    Homicídio: [22, 19, 24, 21, 18, 23],
  },
  "São José dos Campos": {
    Furto: [1100, 1150, 1200, 1180, 1220, 1250],
    Roubo: [800, 830, 860, 850, 880, 910],
    Estupro: [95, 90, 100, 97, 93, 99],
    Homicídio: [38, 35, 40, 37, 34, 39],
  },
  "Sorocaba": {
    Furto: [700, 730, 760, 750, 780, 810],
    Roubo: [450, 480, 510, 500, 530, 560],
    Estupro: [65, 60, 70, 67, 63, 69],
    Homicídio: [24, 21, 26, 23, 20, 25],
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

const years = ["2019", "2020", "2021", "2022", "2023", "2024"];
const pieColors = ["#3B82F6", "#EF4444", "#F59E0B", "#10B981"];

const getHDIColor = (hdi: number): string => {
  if (hdi >= 0.8) return "text-green-600 dark:text-green-400";
  if (hdi >= 0.7) return "text-yellow-600 dark:text-yellow-400";
  if (hdi >= 0.6) return "text-orange-600 dark:text-orange-400";
  return "text-red-600 dark:text-red-400";
};

// Custom chart tooltip for dark mode support
const CustomTooltip = ({ active, payload, label, theme }: any) => {
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

  const unescapedName = name ? decodeURIComponent(name) : undefined;
  const regionCrimes = unescapedName ? crimesDataByRegion[unescapedName] : undefined;
  const regionCities = unescapedName ? citiesByRegion[unescapedName] : [];

  if (!regionCrimes) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-background">
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle><BarChart2 className="inline mr-2" />Região não encontrada</CardTitle>
            <CardDescription>
              Não existem dados disponíveis para essa região.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate(-1)}><ArrowRight className="mr-2 rotate-180" /> Voltar</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Prepare data for charts
  const barData = years.map((year, i) => ({
    year,
    "Furto": regionCrimes.Furto[i],
    "Roubo": regionCrimes.Roubo[i],
    "Estupro": regionCrimes.Estupro[i],
    "Homicídio": regionCrimes["Homicídio"][i],
  }));

  const lastYearIndex = regionCrimes.Furto.length - 1;
  const pieData = [
    { name: "Furto", value: regionCrimes.Furto[lastYearIndex] },
    { name: "Roubo", value: regionCrimes.Roubo[lastYearIndex] },
    { name: "Estupro", value: regionCrimes.Estupro[lastYearIndex] },
    { name: "Homicídio", value: regionCrimes["Homicídio"][lastYearIndex] },
  ];

  return (
    <div className="min-h-screen bg-background px-2 py-8">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
          <ArrowRight className="rotate-180 mr-2" /> Voltar
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="text-primary" /> Detalhes da Região: <span>{regionHumanNames[unescapedName || ""]}</span>
            </CardTitle>
            <CardDescription>
              Números de crimes registrados, gráficos detalhados e cidades da região
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="bar">
              <TabsList className="mb-4">
                <TabsTrigger value="bar"><BarChart2 className="mr-1" size={16} />Barras</TabsTrigger>
                <TabsTrigger value="line"><LineChart className="mr-1" size={16} />Linhas</TabsTrigger>
                <TabsTrigger value="pie"><PieChart className="mr-1" size={16} />Pizza</TabsTrigger>
                <TabsTrigger value="cities"><MapPin className="mr-1" size={16} />Cidades</TabsTrigger>
              </TabsList>

              <TabsContent value="bar">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <XAxis dataKey="year" stroke={theme === 'dark' ? '#aaa' : '#333'} />
                      <YAxis stroke={theme === 'dark' ? '#aaa' : '#333'} />
                      <Tooltip content={<CustomTooltip theme={theme} />} />
                      <Legend />
                      <Bar dataKey="Furto" fill="#3B82F6" />
                      <Bar dataKey="Roubo" fill="#EF4444" />
                      <Bar dataKey="Estupro" fill="#F59E0B" />
                      <Bar dataKey="Homicídio" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="line">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RLineChart data={barData}>
                      <XAxis dataKey="year" stroke={theme === 'dark' ? '#aaa' : '#333'} />
                      <YAxis stroke={theme === 'dark' ? '#aaa' : '#333'} />
                      <Tooltip content={<CustomTooltip theme={theme} />} />
                      <Legend />
                      <Line type="monotone" dataKey="Furto" stroke="#3B82F6" strokeWidth={2} />
                      <Line type="monotone" dataKey="Roubo" stroke="#EF4444" strokeWidth={2} />
                      <Line type="monotone" dataKey="Estupro" stroke="#F59E0B" strokeWidth={2} />
                      <Line type="monotone" dataKey="Homicídio" stroke="#10B981" strokeWidth={2} />
                    </RLineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="pie">
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
                      <Tooltip content={<CustomTooltip theme={theme} />} />
                    </RCPieChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="cities">
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-4">
                    {regionCities.map((city, index) => (
                      <button
                        type="button"
                        key={index}
                        className="w-full text-left p-4 border rounded-lg bg-gradient-to-r from-white to-gray-50 hover:shadow-lg hover:bg-gray-50 transition-all duration-300 outline-none focus:ring-2 focus:ring-primary dark:from-gray-800 dark:to-gray-900 dark:hover:bg-gray-800 dark:border-gray-700"
                        onClick={() => navigate(`/cidade/${encodeURIComponent(city.name)}`)}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-primary" />
                          <span className="font-semibold text-lg">{city.name}</span>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                          <div className="flex items-center gap-2">
                            <div>
                              <div className="text-sm text-muted-foreground">População</div>
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
                              <div className="text-sm text-muted-foreground">Ocorrências em 2024</div>
                              <div className="font-medium">{city.occurrences2024}</div>
                            </div>
                          </div>
                        </div>
                      </button>
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
                  <span className="text-sm text-muted-foreground">em 2024</span>
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
