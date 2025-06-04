import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import DashboardHeader from "@/components/DashboardHeader";
import OccurrenceDetails from "@/components/OccurrenceDetails";
import { Link } from "react-router-dom";
import { ArrowLeft, Eye, PieChart as PieChartIcon, TrendingUp, BarChart3 } from "lucide-react";

// Dados completos de ocorrências OCO-01 a OCO-23
const allOccurrencesData = [
  { id: "OCO-01", description: "vehicleTheft", status: "Crítica", 2022: 58, 2023: 62, 2024: 68, 2025: 57, total: 245 },
  { id: "OCO-02", description: "streetLightingIssue", status: "Alta", 2022: 45, 2023: 55, 2024: 60, 2025: 50, total: 210 },
  { id: "OCO-03", description: "trafficAccident", status: "Média", 2022: 40, 2023: 48, 2024: 52, 2025: 40, total: 180 },
  { id: "OCO-04", description: "propertyInvasion", status: "Alta", 2022: 35, 2023: 42, 2024: 48, 2025: 40, total: 165 },
  { id: "OCO-05", description: "publicPropertyVandalism", status: "Alta", 2022: 30, 2023: 38, 2024: 45, 2025: 42, total: 155 },
  { id: "OCO-06", description: "domesticViolence", status: "Crítica", 2022: 32, 2023: 35, 2024: 38, 2025: 40, total: 145 },
  { id: "OCO-07", description: "drugTrafficking", status: "Crítica", 2022: 28, 2023: 32, 2024: 35, 2025: 38, total: 133 },
  { id: "OCO-08", description: "noisePollution", status: "Média", 2022: 25, 2023: 30, 2024: 32, 2025: 35, total: 122 },
  { id: "OCO-09", description: "publicPropertyDamage", status: "Alta", 2022: 22, 2023: 28, 2024: 30, 2025: 32, total: 112 },
  { id: "OCO-10", description: "fraudAndScam", status: "Alta", 2022: 20, 2023: 25, 2024: 28, 2025: 30, total: 103 },
  { id: "OCO-11", description: "illegalConstruction", status: "Média", 2022: 18, 2023: 22, 2024: 25, 2025: 28, total: 93 },
  { id: "OCO-12", description: "waterLeakage", status: "Média", 2022: 15, 2023: 20, 2024: 22, 2025: 25, total: 82 },
  { id: "OCO-13", description: "animalAbuse", status: "Alta", 2022: 12, 2023: 18, 2024: 20, 2025: 22, total: 72 },
  { id: "OCO-14", description: "environmentalViolation", status: "Média", 2022: 10, 2023: 15, 2024: 18, 2025: 20, total: 63 },
  { id: "OCO-15", description: "publicTransportIssue", status: "Baixa", 2022: 8, 2023: 12, 2024: 15, 2025: 18, total: 53 },
  { id: "OCO-16", description: "roadDamage", status: "Baixa", 2022: 6, 2023: 10, 2024: 12, 2025: 15, total: 43 },
  { id: "OCO-17", description: "garbageIssue", status: "Baixa", 2022: 5, 2023: 8, 2024: 10, 2025: 12, total: 35 },
  { id: "OCO-18", description: "sewerIssue", status: "Média", 2022: 4, 2023: 6, 2024: 8, 2025: 10, total: 28 },
  { id: "OCO-19", description: "publicSpaceOccupation", status: "Baixa", 2022: 3, 2023: 5, 2024: 6, 2025: 8, total: 22 },
  { id: "OCO-20", description: "powerOutage", status: "Baixa", 2022: 2, 2023: 4, 2024: 5, 2025: 6, total: 17 },
  { id: "OCO-21", description: "internetOutage", status: "Baixa", 2022: 2, 2023: 3, 2024: 4, 2025: 5, total: 14 },
  { id: "OCO-22", description: "publicHealthIssue", status: "Média", 2022: 1, 2023: 2, 2024: 3, 2025: 4, total: 10 },
  { id: "OCO-23", description: "educationIssue", status: "Baixa", 2022: 1, 2023: 1, 2024: 2, 2025: 3, total: 7 }
];

const statusStyle = {
  Crítica: "bg-occurrence-critical text-white",
  Alta: "bg-occurrence-high text-white",
  Média: "bg-occurrence-medium text-white",
  Baixa: "bg-occurrence-low text-white"
};

const statusColors = {
  Crítica: "#dc2626",
  Alta: "#ea580c",
  Média: "#d97706",
  Baixa: "#16a34a"
};

const chartConfig = {
  total: { label: "Total de Ocorrências", color: "hsl(var(--chart-1))" },
  2022: { label: "2022", color: "#8b5cf6" },
  2023: { label: "2023", color: "#06b6d4" },
  2024: { label: "2024", color: "#10b981" },
  2025: { label: "2025", color: "#f59e0b" }
};

const vibrantColors = [
  "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444",
  "#ec4899", "#84cc16", "#f97316", "#6366f1", "#14b8a6",
  "#f43f5e", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b",
  "#ef4444", "#ec4899", "#84cc16", "#f97316", "#6366f1",
  "#14b8a6", "#f43f5e", "#8b5cf6"
];

const Occurrences: React.FC = () => {
  const [chartType, setChartType] = useState<"pie" | "line" | "bar">("pie");
  const [selectedOccurrence, setSelectedOccurrence] = useState<{ id: string; description: string; status: string; count: number } | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { t } = useLanguage();

  const handleViewDetails = (occurrence: typeof allOccurrencesData[0]) => {
    // Convert the occurrence data to match OccurrenceDetails expected format
    const formattedOccurrence = {
      id: occurrence.id,
      description: t(occurrence.description),
      status: occurrence.status,
      count: occurrence.total
    };
    setSelectedOccurrence(formattedOccurrence);
    setIsDetailsOpen(true);
  };

  const getStatus = (status: string) => {
    if (status === "Crítica") return t('critical');
    if (status === "Alta") return t('high');
    if (status === "Média") return t('medium');
    if (status === "Baixa") return t('low');
    return status;
  };

  // Dados para gráfico de pizza - top 10 ocorrências
  const pieData = allOccurrencesData
    .slice(0, 10)
    .map((item, index) => ({
      name: t(item.description),
      value: item.total,
      status: item.status,
      color: vibrantColors[index]
    }));

  // Dados para gráfico de linhas - top 8 ocorrências
  const lineData = [
    { year: "2022", ...Object.fromEntries(allOccurrencesData.slice(0, 8).map(item => [t(item.description), item[2022]])) },
    { year: "2023", ...Object.fromEntries(allOccurrencesData.slice(0, 8).map(item => [t(item.description), item[2023]])) },
    { year: "2024", ...Object.fromEntries(allOccurrencesData.slice(0, 8).map(item => [t(item.description), item[2024]])) },
    { year: "2025", ...Object.fromEntries(allOccurrencesData.slice(0, 8).map(item => [t(item.description), item[2025]])) }
  ];

  // Dados para gráfico de barras - top 15 ocorrências
  const barData = allOccurrencesData
    .slice(0, 15)
    .map((item, index) => ({
      name: t(item.description).substring(0, 20) + (t(item.description).length > 20 ? '...' : ''),
      fullName: t(item.description),
      total: item.total,
      status: item.status,
      color: vibrantColors[index]
    }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-4 shadow-xl backdrop-blur-sm">
          <p className="font-semibold text-foreground">{payload[0].payload?.fullName || label}</p>
          <p className="text-primary font-medium">{`${t('total')}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-4 shadow-xl backdrop-blur-sm">
          <p className="font-semibold text-foreground">{payload[0].name}</p>
          <p className="text-primary font-medium">{`${t('total')}: ${payload[0].value}`}</p>
          <p className="text-sm text-muted-foreground">{`${((payload[0].value / pieData.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container py-4 px-4 md:px-6 lg:px-8">
        <DashboardHeader />
        
        <div className="mb-6">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            {t('backToDashboard')}
          </Link>
          
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {t('allOccurrences')}
              </h1>
              <p className="text-muted-foreground mt-2">
                {t('completeOccurrencesList')}
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="table" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:w-auto">
            <TabsTrigger value="table" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              {t('dataTable')}
            </TabsTrigger>
            <TabsTrigger value="charts" className="flex items-center gap-2">
              <PieChartIcon className="h-4 w-4" />
              {t('charts')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="table">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-card via-card to-muted/20">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-t-lg">
                <CardTitle className="text-xl">{t('allOccurrenceTypes')}</CardTitle>
                <CardDescription>{t('detailedOccurrenceData')}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-auto max-h-[600px]">
                  <Table>
                    <TableHeader className="sticky top-0 bg-muted/50 backdrop-blur-sm">
                      <TableRow>
                        <TableHead className="font-semibold">{t('typeId')}</TableHead>
                        <TableHead className="font-semibold">{t('description')}</TableHead>
                        <TableHead className="font-semibold">{t('level')}</TableHead>
                        <TableHead className="font-semibold">2022</TableHead>
                        <TableHead className="font-semibold">2023</TableHead>
                        <TableHead className="font-semibold">2024</TableHead>
                        <TableHead className="font-semibold">2025</TableHead>
                        <TableHead className="font-semibold">{t('total')}</TableHead>
                        <TableHead className="font-semibold">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allOccurrencesData.map((occurrence, index) => (
                        <motion.tr
                          key={occurrence.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.02 }}
                          className="hover:bg-muted/50 transition-all duration-200 border-b border-border/50"
                        >
                          <TableCell className="font-medium text-primary">{occurrence.id}</TableCell>
                          <TableCell className="max-w-xs truncate">{t(occurrence.description)}</TableCell>
                          <TableCell>
                            <Badge className={`${statusStyle[occurrence.status as keyof typeof statusStyle]} shadow-sm`}>
                              {getStatus(occurrence.status)}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono">{occurrence[2022]}</TableCell>
                          <TableCell className="font-mono">{occurrence[2023]}</TableCell>
                          <TableCell className="font-mono">{occurrence[2024]}</TableCell>
                          <TableCell className="font-mono">{occurrence[2025]}</TableCell>
                          <TableCell className="font-bold text-lg">{occurrence.total}</TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewDetails(occurrence)}
                              className="gap-1 hover:shadow-md transition-all duration-200"
                            >
                              <Eye className="h-3 w-3" />
                              {t('completeDetails')}
                            </Button>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="charts">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={chartType === "pie" ? "default" : "outline"}
                  onClick={() => setChartType("pie")}
                  className="flex items-center gap-2 shadow-md"
                >
                  <PieChartIcon className="h-4 w-4" />
                  {t('distributionChart')}
                </Button>
                <Button 
                  variant={chartType === "line" ? "default" : "outline"}
                  onClick={() => setChartType("line")}
                  className="flex items-center gap-2 shadow-md"
                >
                  <TrendingUp className="h-4 w-4" />
                  {t('evolutionChart')}
                </Button>
                <Button 
                  variant={chartType === "bar" ? "default" : "outline"}
                  onClick={() => setChartType("bar")}
                  className="flex items-center gap-2 shadow-md"
                >
                  <BarChart3 className="h-4 w-4" />
                  Gráfico de Barras
                </Button>
              </div>

              {chartType === "pie" && (
                <Card className="shadow-xl border-0 bg-gradient-to-br from-card via-card to-primary/5">
                  <CardHeader className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-t-lg">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <PieChartIcon className="h-5 w-5 text-primary" />
                      {t('occurrenceDistribution')} - Top 10
                    </CardTitle>
                    <CardDescription>{t('distributionByType')}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ChartContainer config={chartConfig} className="h-[500px]">
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            innerRadius={60}
                            paddingAngle={2}
                            dataKey="value"
                            stroke="#fff"
                            strokeWidth={2}
                          >
                            {pieData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={entry.color}
                                className="hover:opacity-80 transition-opacity duration-200"
                              />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomPieTooltip />} />
                          <Legend 
                            verticalAlign="bottom" 
                            height={100}
                            wrapperStyle={{ paddingTop: "20px" }}
                            iconType="circle"
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              )}

              {chartType === "line" && (
                <Card className="shadow-xl border-0 bg-gradient-to-br from-card via-card to-blue-500/5">
                  <CardHeader className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-t-lg">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      {t('yearlyEvolution')} - Top 8
                    </CardTitle>
                    <CardDescription>{t('evolutionOverYears')}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ChartContainer config={chartConfig} className="h-[500px]">
                      <ResponsiveContainer>
                        <LineChart data={lineData} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                          <XAxis 
                            dataKey="year" 
                            stroke="hsl(var(--foreground))"
                            fontSize={12}
                            fontWeight={500}
                          />
                          <YAxis 
                            stroke="hsl(var(--foreground))"
                            fontSize={12}
                            fontWeight={500}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend 
                            verticalAlign="bottom" 
                            height={80}
                            wrapperStyle={{ paddingTop: "20px" }}
                          />
                          {allOccurrencesData.slice(0, 8).map((occurrence, index) => (
                            <Line
                              key={occurrence.id}
                              type="monotone"
                              dataKey={t(occurrence.description)}
                              stroke={vibrantColors[index]}
                              strokeWidth={3}
                              dot={{ fill: vibrantColors[index], strokeWidth: 2, r: 4 }}
                              activeDot={{ r: 6, stroke: vibrantColors[index], strokeWidth: 2 }}
                              name={t(occurrence.description)}
                            />
                          ))}
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              )}

              {chartType === "bar" && (
                <Card className="shadow-xl border-0 bg-gradient-to-br from-card via-card to-green-500/5">
                  <CardHeader className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-t-lg">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-green-600" />
                      Ranking de Ocorrências - Top 15
                    </CardTitle>
                    <CardDescription>Visualização em barras das principais ocorrências</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ChartContainer config={chartConfig} className="h-[600px]">
                      <ResponsiveContainer>
                        <BarChart 
                          data={barData} 
                          margin={{ top: 20, right: 30, left: 20, bottom: 120 }}
                          layout="horizontal"
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                          <XAxis 
                            type="number"
                            stroke="hsl(var(--foreground))"
                            fontSize={12}
                            fontWeight={500}
                          />
                          <YAxis 
                            type="category"
                            dataKey="name"
                            stroke="hsl(var(--foreground))"
                            fontSize={10}
                            fontWeight={500}
                            width={150}
                          />
                          <Tooltip content={<CustomTooltip />} />
                          <Bar 
                            dataKey="total" 
                            radius={[0, 4, 4, 0]}
                            stroke="#fff"
                            strokeWidth={1}
                          >
                            {barData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={entry.color}
                                className="hover:opacity-80 transition-opacity duration-200"
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Occurrence Details Dialog */}
        <OccurrenceDetails 
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
          occurrence={selectedOccurrence}
        />
      </div>
    </motion.div>
  );
};

export default Occurrences;
