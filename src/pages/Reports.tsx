
import React, { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BarChart3, PieChart } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { 
  PieChart as RechartsPieChart, 
  Cell, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";

// Dados completos de todas as ocorrências (OCO-01 ao OCO-23)
const allOccurrencesData = [
  { id: "OCO-01", description: "vehicleTheft", level: "Crítica", 2022: 45, 2023: 67, 2024: 89, 2025: 44 },
  { id: "OCO-02", description: "streetLightingIssue", level: "Alta", 2022: 32, 2023: 48, 2024: 65, 2025: 65 },
  { id: "OCO-03", description: "trafficAccident", level: "Média", 2022: 28, 2023: 42, 2024: 58, 2025: 52 },
  { id: "OCO-04", description: "propertyInvasion", level: "Alta", 2022: 22, 2023: 38, 2024: 54, 2025: 51 },
  { id: "OCO-05", description: "publicPropertyVandalism", level: "Alta", 2022: 25, 2023: 35, 2024: 48, 2025: 47 },
  { id: "OCO-06", description: "domesticViolence", level: "Crítica", 2022: 18, 2023: 29, 2024: 41, 2025: 38 },
  { id: "OCO-07", description: "drugTrafficking", level: "Crítica", 2022: 15, 2023: 24, 2024: 36, 2025: 33 },
  { id: "OCO-08", description: "armedRobbery", level: "Crítica", 2022: 12, 2023: 21, 2024: 32, 2025: 28 },
  { id: "OCO-09", description: "noisePollution", level: "Baixa", 2022: 20, 2023: 18, 2024: 25, 2025: 22 },
  { id: "OCO-10", description: "waterIssues", level: "Média", 2022: 8, 2023: 15, 2024: 22, 2025: 19 },
  { id: "OCO-11", description: "illegalConstruction", level: "Média", 2022: 10, 2023: 12, 2024: 18, 2025: 16 },
  { id: "OCO-12", description: "animalAbuse", level: "Alta", 2022: 5, 2023: 8, 2024: 14, 2025: 12 },
  { id: "OCO-13", description: "environmentalCrime", level: "Alta", 2022: 6, 2023: 9, 2024: 13, 2025: 11 },
  { id: "OCO-14", description: "publicTransportIssue", level: "Baixa", 2022: 12, 2023: 10, 2024: 11, 2025: 9 },
  { id: "OCO-15", description: "cybercrime", level: "Alta", 2022: 3, 2023: 6, 2024: 10, 2025: 8 },
  { id: "OCO-16", description: "fraudAndScam", level: "Média", 2022: 4, 2023: 5, 2024: 8, 2025: 7 },
  { id: "OCO-17", description: "publicHealthViolation", level: "Média", 2022: 2, 2023: 4, 2024: 7, 2025: 6 },
  { id: "OCO-18", description: "childAbuse", level: "Crítica", 2022: 1, 2023: 3, 2024: 6, 2025: 5 },
  { id: "OCO-19", description: "elderlyAbuse", level: "Crítica", 2022: 2, 2023: 2, 2024: 4, 2025: 3 },
  { id: "OCO-20", description: "corruptionCase", level: "Alta", 2022: 1, 2023: 1, 2024: 3, 2025: 2 },
  { id: "OCO-21", description: "hateCrime", level: "Crítica", 2022: 0, 2023: 1, 2024: 2, 2025: 1 },
  { id: "OCO-22", description: "terrorism", level: "Crítica", 2022: 0, 2023: 0, 2024: 1, 2025: 0 },
  { id: "OCO-23", description: "humanTrafficking", level: "Crítica", 2022: 0, 2023: 0, 2024: 1, 2025: 0 }
];

const statusStyle = {
  Crítica: "bg-occurrence-critical text-white",
  Alta: "bg-occurrence-high text-white",
  Média: "bg-occurrence-medium text-white",
  Baixa: "bg-occurrence-low text-white"
};

const colors = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#a855f7", 
  "#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4",
  "#8b5cf6", "#ec4899", "#f43f5e", "#84cc16", "#10b981",
  "#3b82f6", "#6366f1", "#8b5cf6", "#d946ef", "#f59e0b",
  "#059669", "#0891b2", "#7c3aed"
];

const Reports: React.FC = () => {
  const { t } = useLanguage();
  const [chartType, setChartType] = useState<'pie' | 'line'>('pie');
  
  const handleDownloadReport = () => {
    const link = document.createElement('a');
    link.href = '/lovable-uploads/Dados.xlsx';
    link.download = 'Dados.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(t('downloadStarted'));
  };

  const getStatus = (status: string) => {
    if (status === "Crítica") return t('critical');
    if (status === "Alta") return t('high');
    if (status === "Média") return t('medium');
    if (status === "Baixa") return t('low');
    return status;
  };

  // Preparar dados para gráfico de pizza
  const pieChartData = allOccurrencesData.map((item, index) => ({
    name: t(item.description),
    value: item[2022] + item[2023] + item[2024] + item[2025],
    color: colors[index % colors.length]
  }));

  // Preparar dados para gráfico de linhas
  const lineChartData = [
    {
      year: 2022,
      ...allOccurrencesData.reduce((acc, item) => {
        acc[item.id] = item[2022];
        return acc;
      }, {} as Record<string, number>)
    },
    {
      year: 2023,
      ...allOccurrencesData.reduce((acc, item) => {
        acc[item.id] = item[2023];
        return acc;
      }, {} as Record<string, number>)
    },
    {
      year: 2024,
      ...allOccurrencesData.reduce((acc, item) => {
        acc[item.id] = item[2024];
        return acc;
      }, {} as Record<string, number>)
    },
    {
      year: 2025,
      ...allOccurrencesData.reduce((acc, item) => {
        acc[item.id] = item[2025];
        return acc;
      }, {} as Record<string, number>)
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-md shadow-md">
          <p className="font-medium text-gray-900 dark:text-gray-100">{`${t('year')}: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-gray-700 dark:text-gray-300">
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
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
        
        <Tabs defaultValue="relatorios" className="mb-6">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="dashboard" asChild>
              <Link to="/">{t('dashboard')}</Link>
            </TabsTrigger>
            <TabsTrigger value="relatorios">{t('reports')}</TabsTrigger>
            <TabsTrigger value="sobre" asChild>
              <Link to="/sobre">{t('about')}</Link>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="relatorios" className="mt-4 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="my-6">
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">{t('reports')}</h1>
                    <p className="text-muted-foreground mt-2">
                      {t('accessAndExport')}
                    </p>
                  </div>
                  <Button 
                    onClick={handleDownloadReport}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>{t('downloadSpreadsheet')}</span>
                  </Button>
                </div>
              </div>

              {/* Gráficos de Visualização */}
              <Card className="mb-6">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>{t('dataVisualization')}</CardTitle>
                      <CardDescription>{t('interactiveCharts')}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={chartType === 'pie' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setChartType('pie')}
                        className="gap-1"
                      >
                        <PieChart className="h-4 w-4" />
                        {t('pieChart')}
                      </Button>
                      <Button
                        variant={chartType === 'line' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setChartType('line')}
                        className="gap-1"
                      >
                        <BarChart3 className="h-4 w-4" />
                        {t('lineChart')}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      {chartType === 'pie' ? (
                        <RechartsPieChart>
                          <RechartsPieChart
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {pieChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </RechartsPieChart>
                          <Tooltip />
                          <Legend />
                        </RechartsPieChart>
                      ) : (
                        <LineChart data={lineChartData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" stroke="currentColor" />
                          <YAxis stroke="currentColor" />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          {allOccurrencesData.slice(0, 5).map((item, index) => (
                            <Line
                              key={item.id}
                              type="monotone"
                              dataKey={item.id}
                              stroke={colors[index]}
                              strokeWidth={2}
                              name={t(item.description)}
                            />
                          ))}
                        </LineChart>
                      )}
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Tabela Completa de Ocorrências */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>{t('completeOccurrenceReport')}</CardTitle>
                  <CardDescription>{t('allOccurrenceTypes')} (OCO-01 {t('to')} OCO-23)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t('typeId')}</TableHead>
                          <TableHead>{t('description')}</TableHead>
                          <TableHead>{t('level')}</TableHead>
                          <TableHead className="text-center">2022</TableHead>
                          <TableHead className="text-center">2023</TableHead>
                          <TableHead className="text-center">2024</TableHead>
                          <TableHead className="text-center">2025</TableHead>
                          <TableHead className="text-center">{t('total')}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allOccurrencesData.map((occurrence, index) => {
                          const total = occurrence[2022] + occurrence[2023] + occurrence[2024] + occurrence[2025];
                          return (
                            <motion.tr
                              key={occurrence.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.02 }}
                              className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                            >
                              <TableCell className="font-medium">{occurrence.id}</TableCell>
                              <TableCell>{t(occurrence.description)}</TableCell>
                              <TableCell>
                                <Badge className={cn(statusStyle[occurrence.level as keyof typeof statusStyle])}>
                                  {getStatus(occurrence.level)}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-center">{occurrence[2022]}</TableCell>
                              <TableCell className="text-center">{occurrence[2023]}</TableCell>
                              <TableCell className="text-center">{occurrence[2024]}</TableCell>
                              <TableCell className="text-center">{occurrence[2025]}</TableCell>
                              <TableCell className="text-center font-bold">{total}</TableCell>
                            </motion.tr>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Reports;
