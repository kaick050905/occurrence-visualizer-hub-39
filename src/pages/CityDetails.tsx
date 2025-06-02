import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, BarChart2, PieChart, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart as RLineChart, Line, PieChart as RCPieChart, Pie, Cell } from "recharts";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/LanguageContext";

// Dados de crimes por cidade - expandindo para incluir todas as cidades principais de SP
const crimesDataByCity: Record<string, { [crime: string]: number[] }> = {
  "São Paulo": {
    Furto: [1200, 1400, 1330, 1210, 1250, 1280],
    Roubo: [950, 1040, 1090, 990, 1000, 970],
    Estupro: [130, 150, 122, 143, 135, 139],
    Homicídio: [75, 61, 80, 69, 63, 65],
  },
  "Guarulhos": {
    Furto: [620, 700, 755, 690, 720, 710],
    Roubo: [510, 550, 534, 522, 571, 560],
    Estupro: [72, 65, 79, 74, 70, 68],
    Homicídio: [32, 40, 38, 36, 35, 33],
  },
  "Campinas": {
    Furto: [440, 480, 470, 455, 465, 462],
    Roubo: [410, 413, 430, 427, 429, 420],
    Estupro: [43, 46, 41, 44, 40, 42],
    Homicídio: [12, 15, 13, 12, 11, 13],
  },
  "São Bernardo do Campo": {
    Furto: [380, 395, 410, 400, 405, 408],
    Roubo: [310, 325, 330, 320, 318, 322],
    Estupro: [38, 42, 40, 39, 41, 40],
    Homicídio: [18, 20, 17, 19, 18, 16],
  },
  "Santo André": {
    Furto: [320, 335, 350, 345, 340, 342],
    Roubo: [270, 285, 290, 280, 282, 285],
    Estupro: [35, 32, 36, 34, 33, 35],
    Homicídio: [15, 16, 14, 15, 13, 14],
  },
  "São José dos Campos": {
    Furto: [310, 311, 330, 345, 335, 329],
    Roubo: [289, 290, 295, 300, 288, 294],
    Estupro: [33, 35, 36, 38, 31, 30],
    Homicídio: [19, 18, 17, 19, 22, 18],
  },
  "Osasco": {
    Furto: [290, 305, 315, 310, 312, 308],
    Roubo: [245, 260, 265, 255, 258, 256],
    Estupro: [27, 30, 28, 29, 27, 28],
    Homicídio: [14, 16, 15, 13, 14, 15],
  },
  "Ribeirão Preto": {
    Furto: [275, 290, 300, 295, 293, 297],
    Roubo: [230, 245, 250, 240, 242, 244],
    Estupro: [25, 28, 26, 27, 25, 26],
    Homicídio: [12, 14, 13, 11, 12, 13],
  },
  "Sorocaba": {
    Furto: [260, 275, 285, 280, 278, 282],
    Roubo: [215, 230, 235, 225, 227, 229],
    Estupro: [23, 26, 24, 25, 23, 24],
    Homicídio: [10, 12, 11, 9, 10, 11],
  },
  "Santos": {
    Furto: [245, 260, 270, 265, 263, 267],
    Roubo: [200, 215, 220, 210, 212, 214],
    Estupro: [21, 24, 22, 23, 21, 22],
    Homicídio: [9, 11, 10, 8, 9, 10],
  },
  "Mauá": {
    Furto: [180, 195, 205, 200, 198, 202],
    Roubo: [150, 165, 170, 160, 162, 164],
    Estupro: [18, 21, 19, 20, 18, 19],
    Homicídio: [7, 9, 8, 6, 7, 8],
  },
  "São Caetano do Sul": {
    Furto: [95, 105, 110, 108, 106, 109],
    Roubo: [75, 85, 88, 82, 84, 86],
    Estupro: [8, 10, 9, 9, 8, 9],
    Homicídio: [3, 4, 3, 2, 3, 3],
  },
  "Mogi das Cruzes": {
    Furto: [175, 190, 200, 195, 193, 197],
    Roubo: [140, 155, 160, 150, 152, 154],
    Estupro: [16, 19, 17, 18, 16, 17],
    Homicídio: [6, 8, 7, 5, 6, 7],
  },
  "Diadema": {
    Furto: [220, 235, 245, 240, 238, 242],
    Roubo: [185, 200, 205, 195, 197, 199],
    Estupro: [22, 25, 23, 24, 22, 23],
    Homicídio: [11, 13, 12, 10, 11, 12],
  },
  "Piracicaba": {
    Furto: [165, 180, 190, 185, 183, 187],
    Roubo: [130, 145, 150, 140, 142, 144],
    Estupro: [15, 18, 16, 17, 15, 16],
    Homicídio: [5, 7, 6, 4, 5, 6],
  },
  "Caraguatatuba": {
    Furto: [85, 95, 100, 98, 96, 99],
    Roubo: [65, 75, 78, 72, 74, 76],
    Estupro: [7, 9, 8, 8, 7, 8],
    Homicídio: [2, 3, 2, 1, 2, 2],
  },
  "Jundiaí": {
    Furto: [155, 170, 180, 175, 173, 177],
    Roubo: [120, 135, 140, 130, 132, 134],
    Estupro: [14, 17, 15, 16, 14, 15],
    Homicídio: [4, 6, 5, 3, 4, 5],
  },
  "Bauru": {
    Furto: [145, 160, 170, 165, 163, 167],
    Roubo: [110, 125, 130, 120, 122, 124],
    Estupro: [13, 16, 14, 15, 13, 14],
    Homicídio: [4, 5, 4, 3, 4, 4],
  },
  "São Vicente": {
    Furto: [125, 140, 150, 145, 143, 147],
    Roubo: [95, 110, 115, 105, 107, 109],
    Estupro: [11, 14, 12, 13, 11, 12],
    Homicídio: [3, 4, 3, 2, 3, 3],
  },
  "Franca": {
    Furto: [115, 130, 140, 135, 133, 137],
    Roubo: [85, 100, 105, 95, 97, 99],
    Estupro: [10, 13, 11, 12, 10, 11],
    Homicídio: [3, 4, 3, 2, 3, 3],
  },
  "Guarujá": {
    Furto: [135, 150, 160, 155, 153, 157],
    Roubo: [105, 120, 125, 115, 117, 119],
    Estupro: [12, 15, 13, 14, 12, 13],
    Homicídio: [4, 5, 4, 3, 4, 4],
  },
  "Taubaté": {
    Furto: [125, 140, 150, 145, 143, 147],
    Roubo: [95, 110, 115, 105, 107, 109],
    Estupro: [11, 14, 12, 13, 11, 12],
    Homicídio: [3, 4, 3, 2, 3, 3],
  },
  "Praia Grande": {
    Furto: [145, 160, 170, 165, 163, 167],
    Roubo: [115, 130, 135, 125, 127, 129],
    Estupro: [13, 16, 14, 15, 13, 14],
    Homicídio: [4, 5, 4, 3, 4, 4],
  },
  "Limeira": {
    Furto: [105, 120, 130, 125, 123, 127],
    Roubo: [75, 90, 95, 85, 87, 89],
    Estupro: [9, 12, 10, 11, 9, 10],
    Homicídio: [2, 3, 2, 1, 2, 2],
  },
  "Suzano": {
    Furto: [115, 130, 140, 135, 133, 137],
    Roubo: [85, 100, 105, 95, 97, 99],
    Estupro: [10, 13, 11, 12, 10, 11],
    Homicídio: [3, 4, 3, 2, 3, 3],
  },
  "Taboão da Serra": {
    Furto: [95, 110, 120, 115, 113, 117],
    Roubo: [65, 80, 85, 75, 77, 79],
    Estupro: [8, 11, 9, 10, 8, 9],
    Homicídio: [2, 3, 2, 1, 2, 2],
  },
  "Sumaré": {
    Furto: [105, 120, 130, 125, 123, 127],
    Roubo: [75, 90, 95, 85, 87, 89],
    Estupro: [9, 12, 10, 11, 9, 10],
    Homicídio: [2, 3, 2, 1, 2, 2],
  },
  "Americana": {
    Furto: [115, 130, 140, 135, 133, 137],
    Roubo: [85, 100, 105, 95, 97, 99],
    Estupro: [10, 13, 11, 12, 10, 11],
    Homicídio: [3, 4, 3, 2, 3, 3],
  },
  "São Carlos": {
    Furto: [125, 140, 150, 145, 143, 147],
    Roubo: [95, 110, 115, 105, 107, 109],
    Estupro: [11, 14, 12, 13, 11, 12],
    Homicídio: [3, 4, 3, 2, 3, 3],
  },
  "Araraquara": {
    Furto: [105, 120, 130, 125, 123, 127],
    Roubo: [75, 90, 95, 85, 87, 89],
    Estupro: [9, 12, 10, 11, 9, 10],
    Homicídio: [2, 3, 2, 1, 2, 2],
  },
  "Indaiatuba": {
    Furto: [95, 110, 120, 115, 113, 117],
    Roubo: [65, 80, 85, 75, 77, 79],
    Estupro: [8, 11, 9, 10, 8, 9],
    Homicídio: [2, 3, 2, 1, 2, 2],
  },
  "Cotia": {
    Furto: [85, 100, 110, 105, 103, 107],
    Roubo: [55, 70, 75, 65, 67, 69],
    Estupro: [7, 10, 8, 9, 7, 8],
    Homicídio: [1, 2, 1, 0, 1, 1],
  },
  "Marília": {
    Furto: [95, 110, 120, 115, 113, 117],
    Roubo: [65, 80, 85, 75, 77, 79],
    Estupro: [8, 11, 9, 10, 8, 9],
    Homicídio: [2, 3, 2, 1, 2, 2],
  },
  "Presidente Prudente": {
    Furto: [75, 90, 100, 95, 93, 97],
    Roubo: [45, 60, 65, 55, 57, 59],
    Estupro: [6, 9, 7, 8, 6, 7],
    Homicídio: [1, 2, 1, 0, 1, 1],
  },
  "Hortolândia": {
    Furto: [85, 100, 110, 105, 103, 107],
    Roubo: [55, 70, 75, 65, 67, 69],
    Estupro: [7, 10, 8, 9, 7, 8],
    Homicídio: [1, 2, 1, 0, 1, 1],
  },
  "Itu": {
    Furto: [65, 80, 90, 85, 83, 87],
    Roubo: [35, 50, 55, 45, 47, 49],
    Estupro: [5, 8, 6, 7, 5, 6],
    Homicídio: [1, 1, 1, 0, 1, 1],
  },
  "Jacareí": {
    Furto: [75, 90, 100, 95, 93, 97],
    Roubo: [45, 60, 65, 55, 57, 59],
    Estupro: [6, 9, 7, 8, 6, 7],
    Homicídio: [1, 2, 1, 0, 1, 1],
  },
  "Paulínia": {
    Furto: [55, 70, 80, 75, 73, 77],
    Roubo: [25, 40, 45, 35, 37, 39],
    Estupro: [4, 7, 5, 6, 4, 5],
    Homicídio: [0, 1, 0, 0, 0, 0],
  },
  "Jandira": {
    Furto: [45, 60, 70, 65, 63, 67],
    Roubo: [25, 40, 45, 35, 37, 39],
    Estupro: [3, 6, 4, 5, 3, 4],
    Homicídio: [0, 1, 0, 0, 0, 0],
  },
  "Botucatu": {
    Furto: [65, 80, 90, 85, 83, 87],
    Roubo: [35, 50, 55, 45, 47, 49],
    Estupro: [5, 8, 6, 7, 5, 6],
    Homicídio: [1, 1, 1, 0, 1, 1],
  },
  "Araçatuba": {
    Furto: [55, 70, 80, 75, 73, 77],
    Roubo: [25, 40, 45, 35, 37, 39],
    Estupro: [4, 7, 5, 6, 4, 5],
    Homicídio: [0, 1, 0, 0, 0, 0],
  },
  "Carapicuíba": {
    Furto: [145, 160, 170, 165, 163, 167],
    Roubo: [115, 130, 135, 125, 127, 129],
    Estupro: [13, 16, 14, 15, 13, 14],
    Homicídio: [4, 5, 4, 3, 4, 4],
  },
  "Itaquaquecetuba": {
    Furto: [125, 140, 150, 145, 143, 147],
    Roubo: [95, 110, 115, 105, 107, 109],
    Estupro: [11, 14, 12, 13, 11, 12],
    Homicídio: [3, 4, 3, 2, 3, 3],
  },
  "Francisco Morato": {
    Furto: [75, 90, 100, 95, 93, 97],
    Roubo: [45, 60, 65, 55, 57, 59],
    Estupro: [6, 9, 7, 8, 6, 7],
    Homicídio: [1, 2, 1, 0, 1, 1],
  },
  "Guaratinguetá": {
    Furto: [55, 70, 80, 75, 73, 77],
    Roubo: [25, 40, 45, 35, 37, 39],
    Estupro: [4, 7, 5, 6, 4, 5],
    Homicídio: [0, 1, 0, 0, 0, 0],
  },
  "Itapevi": {
    Furto: [85, 100, 110, 105, 103, 107],
    Roubo: [55, 70, 75, 65, 67, 69],
    Estupro: [7, 10, 8, 9, 7, 8],
    Homicídio: [1, 2, 1, 0, 1, 1],
  }
};

const cityHumanNames: Record<string, string> = {
  "São Paulo": "São Paulo",
  "Guarulhos": "Guarulhos",
  "Campinas": "Campinas",
  "São Bernardo do Campo": "São Bernardo do Campo",
  "Santo André": "Santo André",
  "São José dos Campos": "São José dos Campos",
  "Osasco": "Osasco",
  "Ribeirão Preto": "Ribeirão Preto",
  "Sorocaba": "Sorocaba",
  "Santos": "Santos",
  "Mauá": "Mauá",
  "São Caetano do Sul": "São Caetano do Sul",
  "Mogi das Cruzes": "Mogi das Cruzes",
  "Diadema": "Diadema",
  "Piracicaba": "Piracicaba",
  "Caraguatatuba": "Caraguatatuba",
  "Jundiaí": "Jundiaí",
  "Bauru": "Bauru",
  "São Vicente": "São Vicente",
  "Franca": "Franca",
  "Guarujá": "Guarujá",
  "Taubaté": "Taubaté",
  "Praia Grande": "Praia Grande",
  "Limeira": "Limeira",
  "Suzano": "Suzano",
  "Taboão da Serra": "Taboão da Serra",
  "Sumaré": "Sumaré",
  "Americana": "Americana",
  "São Carlos": "São Carlos",
  "Araraquara": "Araraquara",
  "Indaiatuba": "Indaiatuba",
  "Cotia": "Cotia",
  "Marília": "Marília",
  "Presidente Prudente": "Presidente Prudente",
  "Hortolândia": "Hortolândia",
  "Itu": "Itu",
  "Jacareí": "Jacareí",
  "Paulínia": "Paulínia",
  "Jandira": "Jandira",
  "Botucatu": "Botucatu",
  "Araçatuba": "Araçatuba",
  "Carapicuíba": "Carapicuíba",
  "Itaquaquecetuba": "Itaquaquecetuba",
  "Francisco Morato": "Francisco Morato",
  "Guaratinguetá": "Guaratinguetá",
  "Itapevi": "Itapevi"
};

const years = ["2019", "2020", "2021", "2022", "2023", "2024"];

const pieColors = ["#3B82F6", "#EF4444", "#F59E0B", "#10B981"];

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

const CityDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { t, language } = useLanguage();

  const unescapedName = name ? decodeURIComponent(name) : undefined;
  const cityCrimes = unescapedName ? crimesDataByCity[unescapedName] : undefined;

  if (!cityCrimes) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-background">
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle><BarChart2 className="inline mr-2" />{t('cityNotFound')}</CardTitle>
            <CardDescription>
              {t('noDataAvailableCity')}
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
    [t('theft')]: cityCrimes.Furto[i],
    [t('robbery')]: cityCrimes.Roubo[i],
    [t('rape')]: cityCrimes.Estupro[i],
    [t('homicide')]: cityCrimes["Homicídio"][i],
  }));

  const lastYearIndex = cityCrimes.Furto.length - 1;
  const pieData = [
    { name: t('theft'), value: cityCrimes.Furto[lastYearIndex] },
    { name: t('robbery'), value: cityCrimes.Roubo[lastYearIndex] },
    { name: t('rape'), value: cityCrimes.Estupro[lastYearIndex] },
    { name: t('homicide'), value: cityCrimes["Homicídio"][lastYearIndex] },
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
              <BarChart2 className="text-primary" /> {t('cityDetails')}: <span>{cityHumanNames[unescapedName || ""]}</span>
            </CardTitle>
            <CardDescription>
              {t('recordedCrimes')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="bar">
              <TabsList className="mb-4">
                <TabsTrigger value="bar"><BarChart2 className="mr-1" size={16} />{t('bars')}</TabsTrigger>
                <TabsTrigger value="line"><LineChart className="mr-1" size={16} />{t('lines')}</TabsTrigger>
                <TabsTrigger value="pie"><PieChart className="mr-1" size={16} />{t('pie')}</TabsTrigger>
              </TabsList>

              <TabsContent value="bar">
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

export default CityDetails;
