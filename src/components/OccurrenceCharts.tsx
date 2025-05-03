import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { 
  Tooltip as UITooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample data for the top 10 cities with most occurrences by year
const topCitiesByYear = {
  "2020": [
    { city: "São Paulo", count: 1850, severity: "Crítica" },
    { city: "Guarulhos", count: 1580, severity: "Alta" },
    { city: "Campinas", count: 1230, severity: "Média" },
    { city: "São Bernardo do Campo", count: 1010, severity: "Alta" },
    { city: "Santo André", count: 880, severity: "Média" },
    { city: "Osasco", count: 770, severity: "Baixa" },
    { city: "São José dos Campos", count: 660, severity: "Baixa" },
    { city: "Ribeirão Preto", count: 580, severity: "Média" },
    { city: "Sorocaba", count: 490, severity: "Baixa" },
    { city: "Santos", count: 440, severity: "Baixa" }
  ],
  "2021": [
    { city: "São Paulo", count: 1950, severity: "Crítica" },
    { city: "Guarulhos", count: 1680, severity: "Alta" },
    { city: "Campinas", count: 1330, severity: "Média" },
    { city: "São Bernardo do Campo", count: 1110, severity: "Alta" },
    { city: "Santo André", count: 920, severity: "Média" },
    { city: "Osasco", count: 820, severity: "Baixa" },
    { city: "São José dos Campos", count: 710, severity: "Baixa" },
    { city: "Ribeirão Preto", count: 630, severity: "Média" },
    { city: "Sorocaba", count: 540, severity: "Baixa" },
    { city: "Santos", count: 490, severity: "Baixa" }
  ],
  "2022": [
    { city: "São Paulo", count: 2050, severity: "Crítica" },
    { city: "Guarulhos", count: 1730, severity: "Alta" },
    { city: "Campinas", count: 1380, severity: "Média" },
    { city: "São Bernardo do Campo", count: 1160, severity: "Alta" },
    { city: "Santo André", count: 950, severity: "Média" },
    { city: "Osasco", count: 840, severity: "Baixa" },
    { city: "São José dos Campos", count: 730, severity: "Baixa" },
    { city: "Ribeirão Preto", count: 650, severity: "Média" },
    { city: "Sorocaba", count: 560, severity: "Baixa" },
    { city: "Santos", count: 510, severity: "Baixa" }
  ],
  "2023": [
    { city: "São Paulo", count: 2100, severity: "Crítica" },
    { city: "Guarulhos", count: 1750, severity: "Alta" },
    { city: "Campinas", count: 1400, severity: "Média" },
    { city: "São Bernardo do Campo", count: 1180, severity: "Alta" },
    { city: "Santo André", count: 970, severity: "Média" },
    { city: "Osasco", count: 860, severity: "Baixa" },
    { city: "São José dos Campos", count: 750, severity: "Baixa" },
    { city: "Ribeirão Preto", count: 670, severity: "Média" },
    { city: "Sorocaba", count: 580, severity: "Baixa" },
    { city: "Santos", count: 530, severity: "Baixa" }
  ],
  "2024": [
    { city: "São Paulo", count: 2150, severity: "Crítica" },
    { city: "Guarulhos", count: 1780, severity: "Alta" },
    { city: "Campinas", count: 1430, severity: "Média" },
    { city: "São Bernardo do Campo", count: 1210, severity: "Alta" },
    { city: "Santo André", count: 980, severity: "Média" },
    { city: "Osasco", count: 870, severity: "Baixa" },
    { city: "São José dos Campos", count: 760, severity: "Baixa" },
    { city: "Ribeirão Preto", count: 680, severity: "Média" },
    { city: "Sorocaba", count: 590, severity: "Baixa" },
    { city: "Santos", count: 540, severity: "Baixa" }
  ],
  "2025": [
    { city: "São Paulo", count: 750, severity: "Crítica" },
    { city: "Guarulhos", count: 580, severity: "Alta" },
    { city: "Campinas", count: 430, severity: "Média" },
    { city: "São Bernardo do Campo", count: 310, severity: "Alta" },
    { city: "Santo André", count: 280, severity: "Média" },
    { city: "Osasco", count: 170, severity: "Baixa" },
    { city: "São José dos Campos", count: 160, severity: "Baixa" },
    { city: "Ribeirão Preto", count: 180, severity: "Média" },
    { city: "Sorocaba", count: 190, severity: "Baixa" },
    { city: "Santos", count: 140, severity: "Baixa" }
  ]
};

// Severity colors
const severityColors = {
  "Crítica": "#7F1D1D",
  "Alta": "#EF4444",
  "Média": "#F59E0B",
  "Baixa": "#10B981"
};

// Sample data
const weeklyData = [
  { name: "Seg", críticas: 4, altas: 8, médias: 15, baixas: 10 },
  { name: "Ter", críticas: 3, altas: 10, médias: 12, baixas: 8 },
  { name: "Qua", críticas: 6, altas: 12, médias: 8, baixas: 15 },
  { name: "Qui", críticas: 8, altas: 6, médias: 10, baixas: 13 },
  { name: "Sex", críticas: 5, altas: 8, médias: 14, baixas: 16 },
  { name: "Sáb", críticas: 2, altas: 5, médias: 6, baixas: 7 },
  { name: "Dom", críticas: 1, altas: 3, médias: 5, baixas: 4 },
];

// Yearly data for crime types by year
const crimeYearlyDataByYear = {
  2020: {
    furto: [
      { year: "Jan", count: 850 },
      { year: "Fev", count: 820 },
      { year: "Mar", count: 790 },
      { year: "Abr", count: 845 },
      { year: "Mai", count: 910 },
      { year: "Jun", count: 930 },
      { year: "Jul", count: 950 },
      { year: "Ago", count: 970 },
      { year: "Set", count: 930 },
      { year: "Out", count: 890 },
      { year: "Nov", count: 910 },
      { year: "Dez", count: 950 },
    ],
    roubo: [
      { year: "Jan", count: 720 },
      { year: "Fev", count: 690 },
      { year: "Mar", count: 650 },
      { year: "Abr", count: 685 },
      { year: "Mai", count: 710 },
      { year: "Jun", count: 730 },
      { year: "Jul", count: 745 },
      { year: "Ago", count: 760 },
      { year: "Set", count: 725 },
      { year: "Out", count: 690 },
      { year: "Nov", count: 705 },
      { year: "Dez", count: 735 },
    ],
    estupro: [
      { year: "Jan", count: 175 },
      { year: "Fev", count: 165 },
      { year: "Mar", count: 160 },
      { year: "Abr", count: 170 },
      { year: "Mai", count: 180 },
      { year: "Jun", count: 185 },
      { year: "Jul", count: 190 },
      { year: "Ago", count: 195 },
      { year: "Set", count: 185 },
      { year: "Out", count: 175 },
      { year: "Nov", count: 180 },
      { year: "Dez", count: 190 },
    ],
    homicidio: [
      { year: "Jan", count: 115 },
      { year: "Fev", count: 105 },
      { year: "Mar", count: 100 },
      { year: "Abr", count: 110 },
      { year: "Mai", count: 120 },
      { year: "Jun", count: 130 },
      { year: "Jul", count: 120 },
      { year: "Ago", count: 115 },
      { year: "Set", count: 110 },
      { year: "Out", count: 100 },
      { year: "Nov", count: 105 },
      { year: "Dez", count: 115 },
    ],
  },
  2021: {
    furto: [
      { year: "Jan", count: 920 },
      { year: "Fev", count: 890 },
      { year: "Mar", count: 860 },
      { year: "Abr", count: 915 },
      { year: "Mai", count: 980 },
      { year: "Jun", count: 1000 },
      { year: "Jul", count: 1020 },
      { year: "Ago", count: 1040 },
      { year: "Set", count: 1000 },
      { year: "Out", count: 960 },
      { year: "Nov", count: 980 },
      { year: "Dez", count: 1020 },
    ],
    roubo: [
      { year: "Jan", count: 780 },
      { year: "Fev", count: 750 },
      { year: "Mar", count: 710 },
      { year: "Abr", count: 745 },
      { year: "Mai", count: 770 },
      { year: "Jun", count: 790 },
      { year: "Jul", count: 805 },
      { year: "Ago", count: 820 },
      { year: "Set", count: 785 },
      { year: "Out", count: 750 },
      { year: "Nov", count: 765 },
      { year: "Dez", count: 795 },
    ],
    estupro: [
      { year: "Jan", count: 190 },
      { year: "Fev", count: 180 },
      { year: "Mar", count: 175 },
      { year: "Abr", count: 185 },
      { year: "Mai", count: 195 },
      { year: "Jun", count: 200 },
      { year: "Jul", count: 205 },
      { year: "Ago", count: 210 },
      { year: "Set", count: 200 },
      { year: "Out", count: 190 },
      { year: "Nov", count: 195 },
      { year: "Dez", count: 205 },
    ],
    homicidio: [
      { year: "Jan", count: 105 },
      { year: "Fev", count: 95 },
      { year: "Mar", count: 90 },
      { year: "Abr", count: 100 },
      { year: "Mai", count: 110 },
      { year: "Jun", count: 120 },
      { year: "Jul", count: 110 },
      { year: "Ago", count: 105 },
      { year: "Set", count: 100 },
      { year: "Out", count: 90 },
      { year: "Nov", count: 95 },
      { year: "Dez", count: 105 },
    ],
  },
  2022: {
    furto: [
      { year: "Jan", count: 1020 },
      { year: "Fev", count: 990 },
      { year: "Mar", count: 960 },
      { year: "Abr", count: 1015 },
      { year: "Mai", count: 1080 },
      { year: "Jun", count: 1100 },
      { year: "Jul", count: 1120 },
      { year: "Ago", count: 1140 },
      { year: "Set", count: 1100 },
      { year: "Out", count: 1060 },
      { year: "Nov", count: 1080 },
      { year: "Dez", count: 1120 },
    ],
    roubo: [
      { year: "Jan", count: 850 },
      { year: "Fev", count: 820 },
      { year: "Mar", count: 780 },
      { year: "Abr", count: 815 },
      { year: "Mai", count: 840 },
      { year: "Jun", count: 860 },
      { year: "Jul", count: 875 },
      { year: "Ago", count: 890 },
      { year: "Set", count: 855 },
      { year: "Out", count: 820 },
      { year: "Nov", count: 835 },
      { year: "Dez", count: 865 },
    ],
    estupro: [
      { year: "Jan", count: 210 },
      { year: "Fev", count: 200 },
      { year: "Mar", count: 195 },
      { year: "Abr", count: 205 },
      { year: "Mai", count: 215 },
      { year: "Jun", count: 220 },
      { year: "Jul", count: 225 },
      { year: "Ago", count: 230 },
      { year: "Set", count: 220 },
      { year: "Out", count: 210 },
      { year: "Nov", count: 215 },
      { year: "Dez", count: 225 },
    ],
    homicidio: [
      { year: "Jan", count: 95 },
      { year: "Fev", count: 85 },
      { year: "Mar", count: 80 },
      { year: "Abr", count: 90 },
      { year: "Mai", count: 100 },
      { year: "Jun", count: 110 },
      { year: "Jul", count: 100 },
      { year: "Ago", count: 95 },
      { year: "Set", count: 90 },
      { year: "Out", count: 80 },
      { year: "Nov", count: 85 },
      { year: "Dez", count: 95 },
    ],
  },
  2023: {
    furto: [
      { year: "Jan", count: 1120 },
      { year: "Fev", count: 1090 },
      { year: "Mar", count: 1060 },
      { year: "Abr", count: 1115 },
      { year: "Mai", count: 1180 },
      { year: "Jun", count: 1200 },
      { year: "Jul", count: 1220 },
      { year: "Ago", count: 1240 },
      { year: "Set", count: 1200 },
      { year: "Out", count: 1160 },
      { year: "Nov", count: 1180 },
      { year: "Dez", count: 1220 },
    ],
    roubo: [
      { year: "Jan", count: 920 },
      { year: "Fev", count: 890 },
      { year: "Mar", count: 850 },
      { year: "Abr", count: 885 },
      { year: "Mai", count: 910 },
      { year: "Jun", count: 930 },
      { year: "Jul", count: 945 },
      { year: "Ago", count: 960 },
      { year: "Set", count: 925 },
      { year: "Out", count: 890 },
      { year: "Nov", count: 905 },
      { year: "Dez", count: 935 },
    ],
    estupro: [
      { year: "Jan", count: 230 },
      { year: "Fev", count: 220 },
      { year: "Mar", count: 215 },
      { year: "Abr", count: 225 },
      { year: "Mai", count: 235 },
      { year: "Jun", count: 240 },
      { year: "Jul", count: 245 },
      { year: "Ago", count: 250 },
      { year: "Set", count: 240 },
      { year: "Out", count: 230 },
      { year: "Nov", count: 235 },
      { year: "Dez", count: 245 },
    ],
    homicidio: [
      { year: "Jan", count: 85 },
      { year: "Fev", count: 75 },
      { year: "Mar", count: 70 },
      { year: "Abr", count: 80 },
      { year: "Mai", count: 90 },
      { year: "Jun", count: 100 },
      { year: "Jul", count: 90 },
      { year: "Ago", count: 85 },
      { year: "Set", count: 80 },
      { year: "Out", count: 70 },
      { year: "Nov", count: 75 },
      { year: "Dez", count: 85 },
    ],
  },
  2024: {
    furto: [
      { year: "Jan", count: 1220 },
      { year: "Fev", count: 1190 },
      { year: "Mar", count: 1160 },
      { year: "Abr", count: 1215 },
      { year: "Mai", count: 1280 },
      { year: "Jun", count: 1300 },
      { year: "Jul", count: 1320 },
      { year: "Ago", count: 1260 },
      { year: "Set", count: 1200 },
      { year: "Out", count: 1160 },
      { year: "Nov", count: 0 },
      { year: "Dez", count: 0 },
    ],
    roubo: [
      { year: "Jan", count: 990 },
      { year: "Fev", count: 960 },
      { year: "Mar", count: 920 },
      { year: "Abr", count: 955 },
      { year: "Mai", count: 980 },
      { year: "Jun", count: 1000 },
      { year: "Jul", count: 975 },
      { year: "Ago", count: 940 },
      { year: "Set", count: 900 },
      { year: "Out", count: 860 },
      { year: "Nov", count: 0 },
      { year: "Dez", count: 0 },
    ],
    estupro: [
      { year: "Jan", count: 250 },
      { year: "Fev", count: 240 },
      { year: "Mar", count: 235 },
      { year: "Abr", count: 245 },
      { year: "Mai", count: 255 },
      { year: "Jun", count: 260 },
      { year: "Jul", count: 250 },
      { year: "Ago", count: 240 },
      { year: "Set", count: 230 },
      { year: "Out", count: 225 },
      { year: "Nov", count: 0 },
      { year: "Dez", count: 0 },
    ],
    homicidio: [
      { year: "Jan", count: 75 },
      { year: "Fev", count: 65 },
      { year: "Mar", count: 60 },
      { year: "Abr", count: 70 },
      { year: "Mai", count: 80 },
      { year: "Jun", count: 90 },
      { year: "Jul", count: 80 },
      { year: "Ago", count: 70 },
      { year: "Set", count: 65 },
      { year: "Out", count: 60 },
      { year: "Nov", count: 0 },
      { year: "Dez", count: 0 },
    ],
  },
  2025: {
    furto: [
      { year: "Jan", count: 320 },
      { year: "Fev", count: 290 },
      { year: "Mar", count: 260 },
      { year: "Abr", count: 0 },
      { year: "Mai", count: 0 },
      { year: "Jun", count: 0 },
      { year: "Jul", count: 0 },
      { year: "Ago", count: 0 },
      { year: "Set", count: 0 },
      { year: "Out", count: 0 },
      { year: "Nov", count: 0 },
      { year: "Dez", count: 0 },
    ],
    roubo: [
      { year: "Jan", count: 210 },
      { year: "Fev", count: 180 },
      { year: "Mar", count: 160 },
      { year: "Abr", count: 0 },
      { year: "Mai", count: 0 },
      { year: "Jun", count: 0 },
      { year: "Jul", count: 0 },
      { year: "Ago", count: 0 },
      { year: "Set", count: 0 },
      { year: "Out", count: 0 },
      { year: "Nov", count: 0 },
      { year: "Dez", count: 0 },
    ],
    estupro: [
      { year: "Jan", count: 70 },
      { year: "Fev", count: 60 },
      { year: "Mar", count: 55 },
      { year: "Abr", count: 0 },
      { year: "Mai", count: 0 },
      { year: "Jun", count: 0 },
      { year: "Jul", count: 0 },
      { year: "Ago", count: 0 },
      { year: "Set", count: 0 },
      { year: "Out", count: 0 },
      { year: "Nov", count: 0 },
      { year: "Dez", count: 0 },
    ],
    homicidio: [
      { year: "Jan", count: 35 },
      { year: "Fev", count: 30 },
      { year: "Mar", count: 25 },
      { year: "Abr", count: 0 },
      { year: "Mai", count: 0 },
      { year: "Jun", count: 0 },
      { year: "Jul", count: 0 },
      { year: "Ago", count: 0 },
      { year: "Set", count: 0 },
      { year: "Out", count: 0 },
      { year: "Nov", count: 0 },
      { year: "Dez", count: 0 },
    ],
  }
};

// Yearly total data
const yearlyData = [
  { name: "2022", total: 1540 },
  { name: "2023", total: 1780 },
  { name: "2024", total: 1650 },
  { name: "2025", total: 420, emProgresso: true },
];

const priorityData = [
  { name: "Críticas", value: 75, color: "#7F1D1D" },
  { name: "Altas", value: 120, color: "#EF4444" },
  { name: "Médias", value: 230, color: "#F59E0B" },
  { name: "Baixas", value: 310, color: "#10B981" },
];

const categoryData = [
  { name: "Infraestrutura", value: 240 },
  { name: "Segurança", value: 180 },
  { name: "Ambiental", value: 120 },
  { name: "Transporte", value: 95 },
  { name: "Sanitária", value: 75 },
  { name: "Outros", value: 25 },
];

// Updated color scheme with better dark mode visibility
const crimeTypeColors = {
  furto: "#3B82F6",
  roubo: "#EF4444",
  estupro: "#7C3AED",
  homicidio: "#EC4899" // Changed to a brighter pink color for better dark mode visibility
};

const OccurrenceCharts: React.FC = () => {
  const [crimeType, setCrimeType] = useState<string>("furto");
  const [timePeriod, setTimePeriod] = useState<string>("semanal");
  const [topCitiesYear, setTopCitiesYear] = useState<string>("2024");
  const isMobile = useIsMobile();
  
  // Prepare data for crime evolution over years (2020-2025)
  const crimeEvolutionData = Object.keys(crimeYearlyDataByYear).map(year => {
    const numYear = Number(year) as keyof typeof crimeYearlyDataByYear;
    const yearData = crimeYearlyDataByYear[numYear];
    const crimeData = yearData[crimeType as keyof typeof yearData];
    
    // Calculate total for the year (sum of all months with data)
    const totalForYear = crimeData.reduce((sum, item) => sum + (item.count || 0), 0);
    
    return {
      year: year,
      count: totalForYear
    };
  });
  
  // Get the correct top cities data based on the selected year
  const topCitiesData = topCitiesByYear[topCitiesYear as keyof typeof topCitiesByYear] || topCitiesByYear["2024"];

  // Custom tooltip for the horizontal bar chart
  const CustomBarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-md shadow-md">
          <p className="font-medium text-gray-900 dark:text-gray-100">{data.city}</p>
          <p className="text-gray-700 dark:text-gray-300">Total: {data.count}</p>
          <p className="text-gray-700 dark:text-gray-300">Severidade: {data.severity}</p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for other charts
  const CustomChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-md shadow-md">
          <p className="font-medium text-gray-900 dark:text-gray-100">{`${label || ''}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} className="text-gray-700 dark:text-gray-300" style={{ color: entry.color }}>
              {`${entry.name || ''}: ${entry.value || 0}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6">
      <motion.div 
        className="col-span-1 md:col-span-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base sm:text-lg md:text-xl">Top 10 Cidades com Mais Ocorrências</CardTitle>
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="p-3 max-w-xs">
                    <p>As 10 cidades com maior número de ocorrências, coloridas por nível de severidade predominante. Barras mais longas indicam mais ocorrências.</p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </div>
            <Select 
              value={topCitiesYear} 
              onValueChange={(value) => setTopCitiesYear(value)}
            >
              <SelectTrigger className="w-[80px] sm:w-[100px]">
                <SelectValue placeholder="Ano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2020">2020</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={isMobile ? 550 : 400}>
                <BarChart 
                  data={topCitiesData} 
                  layout="vertical" 
                  margin={isMobile ? 
                    { top: 20, right: 30, left: 75, bottom: 5 } : 
                    { top: 20, right: 30, left: 120, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis 
                    type="category" 
                    dataKey="city" 
                    tick={{ fill: 'currentColor', fontSize: isMobile ? 10 : 12 }}
                    width={isMobile ? 70 : 110}
                    tickMargin={isMobile ? 5 : 0}
                  />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="count" 
                    name="Total de Ocorrências" 
                    radius={[0, 4, 4, 0]}
                  >
                    {topCitiesData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={severityColors[entry.severity as keyof typeof severityColors]} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div 
        className="col-span-1 md:col-span-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base sm:text-lg md:text-xl">Evolução de Crimes por Ano</CardTitle>
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="p-3 max-w-xs">
                    <p>Evolução anual das ocorrências por tipo de crime. Selecione o tipo de crime para visualizar a tendência ao longo dos anos.</p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-2">
              <Select 
                value={crimeType} 
                onValueChange={(value) => setCrimeType(value)}
              >
                <SelectTrigger className="w-[120px] sm:w-[180px]">
                  <SelectValue placeholder="Tipo de Crime" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="furto">Furto</SelectItem>
                  <SelectItem value="roubo">Roubo</SelectItem>
                  <SelectItem value="estupro">Estupro</SelectItem>
                  <SelectItem value="homicidio">Homicídio</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
                <LineChart
                  data={crimeEvolutionData}
                  margin={isMobile ? 
                    { top: 20, right: 20, left: 20, bottom: 20 } : 
                    { top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="year"
                    padding={{ left: 20, right: 20 }}
                    height={60}
                    tick={{ 
                      textAnchor: 'middle',
                      fill: 'currentColor',
                      dy: 8,
                      fontSize: isMobile ? 11 : 12
                    }}
                    tickSize={8}
                  />
                  <YAxis />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    name={`Total de ${crimeType}`}
                    stroke={crimeTypeColors[crimeType as keyof typeof crimeTypeColors]}
                    strokeWidth={3}
                    dot={{ r: 6, strokeWidth: 2 }}
                    activeDot={{ r: 8, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="col-span-1"
      >
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle className="text-base sm:text-lg">Total de Ocorrências dos Últimos Anos</CardTitle>
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="p-3 max-w-xs">
                    <p>Comparativo anual do total de ocorrências registradas. Barras em tons mais claros representam anos em andamento com dados parciais.</p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </div>
            <CardDescription>Registros anuais de 2022 a 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={isMobile ? 220 : 250}>
                <BarChart data={yearlyData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: isMobile ? 11 : 12 }} />
                  <YAxis tick={{ fontSize: isMobile ? 11 : 12 }} />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Bar 
                    dataKey="total" 
                    fill="#3B82F6"
                    radius={[4, 4, 0, 0]}
                    name="Total de Ocorrências"
                    className="transition-all duration-300"
                  >
                    {yearlyData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.emProgresso ? "#94A3B8" : "#3B82F6"} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="col-span-1"
      >
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle className="text-base sm:text-lg">Distribuição</CardTitle>
                <TooltipProvider>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="p-3 max-w-xs">
                      <p>Distribuição percentual das ocorrências por nível de prioridade. Cada segmento representa uma proporção das ocorrências totais conforme sua classificação de gravidade.</p>
                    </TooltipContent>
                  </UITooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={isMobile ? 220 : 250}>
                <PieChart>
                  <Pie
                    data={priorityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={isMobile ? 50 : 60}
                    outerRadius={isMobile ? 70 : 80}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                    label={({name, percent}) => `${name || ''} ${(percent * 100).toFixed(0)}%`}
                    className="transition-transform duration-300 hover:scale-105"
                  >
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} name={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OccurrenceCharts;
