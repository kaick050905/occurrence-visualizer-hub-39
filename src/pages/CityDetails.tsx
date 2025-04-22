
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, BarChart2, PieChart, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart as RLineChart, Line, PieChart as RCPieChart, Pie, Cell } from "recharts";

// Simular dados de crimes por cidade
const crimesDataByCity: Record<string, { [crime: string]: number[] }> = {
  "São Paulo": {
    Furto: [1200, 1400, 1330, 1210, 1250, 1280],
    Roubo: [950, 1040, 1090, 990, 1000, 970],
    Estupro: [130, 150, 122, 143, 135, 139],
    Homicídio: [75, 61, 80, 69, 63, 65],
  },
  "Rio de Janeiro": {
    Furto: [900, 950, 980, 1200, 1170, 1130],
    Roubo: [820, 860, 810, 814, 850, 879],
    Estupro: [115, 110, 120, 112, 118, 125],
    Homicídio: [54, 61, 49, 62, 55, 53],
  },
  "Salvador": {
    Furto: [620, 700, 755, 690, 720, 710],
    Roubo: [510, 550, 534, 522, 571, 560],
    Estupro: [72, 65, 79, 74, 70, 68],
    Homicídio: [32, 40, 38, 36, 35, 33],
  },
  "Brasília": {
    Furto: [830, 880, 910, 965, 950, 940],
    Roubo: [390, 420, 410, 415, 430, 425],
    Estupro: [58, 65, 63, 69, 61, 68],
    Homicídio: [26, 29, 25, 27, 29, 28],
  },
  "Fortaleza": {
    Furto: [530, 540, 555, 590, 610, 613],
    Roubo: [452, 460, 455, 461, 470, 468],
    Estupro: [63, 66, 69, 72, 71, 68],
    Homicídio: [19, 22, 21, 23, 20, 21],
  },
  "Belo Horizonte": {
    Furto: [760, 812, 804, 830, 850, 840],
    Roubo: [621, 674, 663, 650, 672, 665],
    Estupro: [88, 93, 85, 90, 91, 90],
    Homicídio: [30, 31, 33, 29, 27, 28],
  },
  "Manaus": {
    Furto: [310, 311, 330, 345, 335, 329],
    Roubo: [289, 290, 295, 300, 288, 294],
    Estupro: [33, 35, 36, 38, 31, 30],
    Homicídio: [19, 18, 17, 19, 22, 18],
  },
  "Curitiba": {
    Furto: [440, 480, 470, 455, 465, 462],
    Roubo: [410, 413, 430, 427, 429, 420],
    Estupro: [43, 46, 41, 44, 40, 42],
    Homicídio: [12, 15, 13, 12, 11, 13],
  },
  "Recife": {
    Furto: [520, 561, 549, 555, 562, 558],
    Roubo: [460, 489, 490, 495, 498, 492],
    Estupro: [54, 50, 53, 51, 56, 55],
    Homicídio: [21, 24, 22, 23, 20, 22],
  },
  "Porto Alegre": {
    Furto: [413, 429, 430, 444, 452, 460],
    Roubo: [372, 395, 398, 392, 380, 385],
    Estupro: [41, 42, 40, 45, 44, 43],
    Homicídio: [16, 17, 15, 19, 20, 18],
  },
};

const cityHumanNames: Record<string, string> = {
  "São Paulo": "São Paulo",
  "Rio de Janeiro": "Rio de Janeiro",
  "Salvador": "Salvador",
  "Brasília": "Brasília",
  "Fortaleza": "Fortaleza",
  "Belo Horizonte": "Belo Horizonte",
  "Manaus": "Manaus",
  "Curitiba": "Curitiba",
  "Recife": "Recife",
  "Porto Alegre": "Porto Alegre",
};

const years = ["2019", "2020", "2021", "2022", "2023", "2024"];

const pieColors = ["#3B82F6", "#EF4444", "#F59E0B", "#10B981"];

const CityDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();

  const unescapedName = name ? decodeURIComponent(name) : undefined;
  const cityCrimes = unescapedName ? crimesDataByCity[unescapedName] : undefined;

  if (!cityCrimes) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-background">
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle><BarChart2 className="inline mr-2" />Cidade não encontrada</CardTitle>
            <CardDescription>
              Não existem dados disponíveis para essa cidade.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate(-1)}><ArrowRight className="mr-2" /> Voltar</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Prepare data for charts
  const barData = years.map((year, i) => ({
    year,
    "Furto": cityCrimes.Furto[i],
    "Roubo": cityCrimes.Roubo[i],
    "Estupro": cityCrimes.Estupro[i],
    "Homicídio": cityCrimes["Homicídio"][i],
  }));

  const lastYearIndex = cityCrimes.Furto.length - 1;
  const pieData = [
    { name: "Furto", value: cityCrimes.Furto[lastYearIndex] },
    { name: "Roubo", value: cityCrimes.Roubo[lastYearIndex] },
    { name: "Estupro", value: cityCrimes.Estupro[lastYearIndex] },
    { name: "Homicídio", value: cityCrimes["Homicídio"][lastYearIndex] },
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
              <BarChart2 className="text-primary" /> Detalhes da Cidade: <span>{cityHumanNames[unescapedName || ""]}</span>
            </CardTitle>
            <CardDescription>
              Números de crimes registrados e gráficos detalhados dos últimos anos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="bar">
              <TabsList className="mb-4">
                <TabsTrigger value="bar"><BarChart2 className="mr-1" size={16} />Barras</TabsTrigger>
                <TabsTrigger value="line"><LineChart className="mr-1" size={16} />Linhas</TabsTrigger>
                <TabsTrigger value="pie"><PieChart className="mr-1" size={16} />Pizza</TabsTrigger>
              </TabsList>

              <TabsContent value="bar">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
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
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
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
                      <Tooltip />
                    </RCPieChart>
                  </ResponsiveContainer>
                </div>
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

export default CityDetails;
