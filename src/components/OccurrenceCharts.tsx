
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Area,
  AreaChart,
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

const monthlyData = [
  { name: "Jan", total: 140 },
  { name: "Fev", total: 180 },
  { name: "Mar", total: 220 },
  { name: "Abr", total: 300 },
  { name: "Mai", total: 270 },
  { name: "Jun", total: 250 },
  { name: "Jul", total: 310 },
  { name: "Ago", total: 290 },
  { name: "Set", total: 350 },
  { name: "Out", total: 320 },
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

const OccurrenceCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <Card className="col-span-1 md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Ocorrências por Dia</CardTitle>
            <CardDescription>Distribuição diária de ocorrências por prioridade</CardDescription>
          </div>
          <Select defaultValue="semanal">
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

      <Card>
        <CardHeader>
          <CardTitle>Tendência Mensal</CardTitle>
          <CardDescription>Total de ocorrências por mês</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={monthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#3B82F6"
                  fillOpacity={1}
                  fill="url(#colorTotal)"
                />
              </AreaChart>
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
