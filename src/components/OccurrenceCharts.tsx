
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

// Sample data for the top 10 cities with most occurrences
const topCitiesData = [
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
];

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

// Yearly data for crime types
const crimeYearlyData = {
  furto: [
    { year: "2018", count: 10250 },
    { year: "2019", count: 11320 },
    { year: "2020", count: 9845 },
    { year: "2021", count: 10580 },
    { year: "2022", count: 12450 },
    { year: "2023", count: 13650 },
    { year: "2024", count: 12567 },
  ],
  roubo: [
    { year: "2018", count: 8650 },
    { year: "2019", count: 9120 },
    { year: "2020", count: 7845 },
    { year: "2021", count: 8280 },
    { year: "2022", count: 9150 },
    { year: "2023", count: 9650 },
    { year: "2024", count: 8932 },
  ],
  estupro: [
    { year: "2018", count: 2150 },
    { year: "2019", count: 2320 },
    { year: "2020", count: 2045 },
    { year: "2021", count: 2180 },
    { year: "2022", count: 2350 },
    { year: "2023", count: 2450 },
    { year: "2024", count: 2267 },
  ],
  homicidio: [
    { year: "2018", count: 1450 },
    { year: "2019", count: 1380 },
    { year: "2020", count: 1245 },
    { year: "2021", count: 1180 },
    { year: "2022", count: 1050 },
    { year: "2023", count: 950 },
    { year: "2024", count: 876 },
  ],
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
  
  const currentCrimeData = crimeYearlyData[crimeType as keyof typeof crimeYearlyData];
  const colorForCrime = crimeTypeColors[crimeType as keyof typeof crimeTypeColors];

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <motion.div 
        className="col-span-1 md:col-span-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>Top 10 Cidades com Mais Ocorrências</CardTitle>
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>As 10 cidades com maior número de ocorrências, coloridas por nível de severidade predominante</p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart 
                  data={topCitiesData} 
                  layout="vertical" 
                  margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis 
                    type="category" 
                    dataKey="city" 
                    tick={{ fill: 'currentColor' }}
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
              <CardTitle>Evolução de Crimes por Ano</CardTitle>
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Tendência anual do número de ocorrências por tipo de crime</p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </div>
            <Select 
              value={crimeType} 
              onValueChange={(value) => setCrimeType(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo de Crime" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="furto">Furto</SelectItem>
                <SelectItem value="roubo">Roubo</SelectItem>
                <SelectItem value="estupro">Estupro</SelectItem>
                <SelectItem value="homicidio">Homicídio</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={currentCrimeData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="year" 
                    padding={{ left: 20, right: 20 }}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} ocorrências`, `Total de ${crimeType}`]}
                    labelFormatter={(label) => `Ano: ${label}`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    name={`Total de ${crimeType}`}
                    stroke={colorForCrime}
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
      >
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Total de Ocorrências dos Últimos Anos</CardTitle>
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Comparativo anual do total de ocorrências registradas</p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </div>
            <CardDescription>Registros anuais de 2022 a 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={yearlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
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
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CardTitle>Distribuição</CardTitle>
                <TooltipProvider>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Distribuição percentual das ocorrências por nível de prioridade</p>
                    </TooltipContent>
                  </UITooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={priorityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    className="transition-transform duration-300 hover:scale-105"
                  >
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
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
