
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

// Interface for occurrence details
interface OccurrenceDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  occurrence: {
    id: string;
    description: string;
    status: string;
    count: number;
  } | null;
}

const statusStyle = {
  "Crítica": "bg-occurrence-critical text-white",
  "Alta": "bg-occurrence-high text-white",
  "Média": "bg-occurrence-medium text-white",
  "Baixa": "bg-occurrence-low text-white"
};

// Top 5 cities data - would ideally come from an API
const topCitiesData = [
  { city: "São Paulo", count: 87 },
  { city: "Campinas", count: 54 },
  { city: "Guarulhos", count: 43 },
  { city: "Osasco", count: 39 },
  { city: "Santo André", count: 31 },
];

// Growth data by year - would ideally come from an API
const growthData = [
  { year: 2020, count: 98 },
  { year: 2021, count: 127 },
  { year: 2022, count: 156 },
  { year: 2023, count: 189 },
  { year: 2024, count: 245 },
];

const OccurrenceDetails: React.FC<OccurrenceDetailsProps> = ({
  open,
  onOpenChange,
  occurrence
}) => {
  const { t } = useLanguage();
  
  if (!occurrence) return null;

  // Calculate growth percentage from 2023 to 2024
  const growthPercentage = () => {
    const data2023 = growthData.find(item => item.year === 2023)?.count || 0;
    const data2024 = growthData.find(item => item.year === 2024)?.count || 0;
    
    if (data2023 === 0) return 100; // If no data from 2023, assume 100% growth
    
    return Math.round(((data2024 - data2023) / data2023) * 100);
  };

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#a855f7"];

  // Custom tooltip to ensure visibility in dark mode
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-md shadow-md">
          <p className="font-medium text-gray-900 dark:text-gray-100">{`${t('year')}: ${label}`}</p>
          <p className="text-gray-700 dark:text-gray-300">{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <span className="text-primary">{occurrence.id}</span> - {occurrence.description}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground dark:text-gray-300">
            {t('completeDetails')}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground dark:text-gray-300">{t('totalRecorded')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{occurrence.count}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground dark:text-gray-300">{t('totalIn2024')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{growthData.find(item => item.year === 2024)?.count || 0}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground dark:text-gray-300">{t('growthBetweenYears')}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <p className="text-2xl font-bold">
                {growthPercentage()}%
              </p>
              <Badge className={`ml-2 ${growthPercentage() > 0 ? 'bg-occurrence-critical' : 'bg-green-600'}`}>
                {growthPercentage() > 0 ? '↑' : '↓'}
              </Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top 5 cities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('top5Cities')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('city')}</TableHead>
                    <TableHead className="text-right">{t('occurrences')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCitiesData.map((city, index) => (
                    <motion.tr
                      key={city.city}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <TableCell>{city.city}</TableCell>
                      <TableCell className="text-right font-medium">{city.count}</TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Growth chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('growthByYear')}</CardTitle>
            </CardHeader>
            <CardContent className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={growthData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" stroke="currentColor" />
                  <YAxis stroke="currentColor" />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" name={t('totalOccurrences')}>
                    {growthData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OccurrenceDetails;
