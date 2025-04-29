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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <Card className="col-span-1 md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Ocorrências por Dia</CardTitle>
            <CardDescription>Distribuição diária de ocorrências por prioridade</CardDescription>
          </div>
          <Select 
            defaultValue="semanal" 
            value={timePeriod}
            onValueChange={(value) => setTimePeriod(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semanal">Últimos 7 dias</SelectItem>
              <SelectItem value="quinzenal">Últimos 15 dias</SelectItem>
              <SelectItem value="mensal">Últimos 30 dias</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="críticas" name="Críticas" stackId="a" fill="#7F1D1D" />
                <Bar dataKey="altas" name="Altas" stackId="a" fill="#EF4444" />
                <Bar dataKey="médias" name="Médias" stackId="a" fill="#F59E0B" />
                <Bar dataKey="baixas" name="Baixas" stackId="a" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Evolução de Crimes por Ano</CardTitle>
            <CardDescription>Crescimento anual por tipo de crime</CardDescription>
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

      <Card>
        <CardHeader>
          <CardTitle>Total de Ocorrências dos Últimos Anos</CardTitle>
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

      <Card>
        <CardHeader>
          <Tabs defaultValue="priority">
            <div className="flex items-center justify-between">
              <CardTitle>Distribuição</CardTitle>
              <TabsList>
                <TabsTrigger value="priority">Prioridade</TabsTrigger>
                <TabsTrigger value="category">Categoria</TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="priority">
            <TabsContent value="priority" className="mt-0">
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
                    >
                      {priorityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="category" className="mt-0">
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={[
                            "#3B82F6",
                            "#2563EB",
                            "#1D4ED8",
                            "#1E40AF",
                            "#1E3A8A",
                            "#172554",
                          ][index % 6]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default OccurrenceCharts;
