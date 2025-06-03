
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface OccurrenceData {
  id: string;
  description: string;
  status: string;
  2022: number;
  2023: number;
  2024: number;
  2025: number;
  total: number;
}

interface CompleteDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  occurrence: OccurrenceData | null;
}

const statusStyle = {
  Crítica: "bg-occurrence-critical text-white",
  Alta: "bg-occurrence-high text-white",
  Média: "bg-occurrence-medium text-white",
  Baixa: "bg-occurrence-low text-white"
};

const CompleteDetails: React.FC<CompleteDetailsProps> = ({ open, onOpenChange, occurrence }) => {
  const { t } = useLanguage();

  if (!occurrence) return null;

  const getStatus = (status: string) => {
    if (status === "Crítica") return t('critical');
    if (status === "Alta") return t('high');
    if (status === "Média") return t('medium');
    if (status === "Baixa") return t('low');
    return status;
  };

  const yearlyData = [
    { year: "2022", count: occurrence[2022] },
    { year: "2023", count: occurrence[2023] },
    { year: "2024", count: occurrence[2024] },
    { year: "2025", count: occurrence[2025] }
  ];

  const averagePerYear = Math.round(occurrence.total / 4);
  const percentageOfTotal = Math.round((occurrence.total / 2400) * 100); // Assuming 2400 is approximate total

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span>{t('completeDetails')} - {occurrence.id}</span>
            <Badge className={cn(statusStyle[occurrence.status as keyof typeof statusStyle])}>
              {getStatus(occurrence.status)}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            {t(occurrence.description)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Resumo Geral */}
          <Card>
            <CardHeader>
              <CardTitle>Resumo Geral</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{occurrence.total}</div>
                  <div className="text-sm text-muted-foreground">{t('total')}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{averagePerYear}</div>
                  <div className="text-sm text-muted-foreground">Média/Ano</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{percentageOfTotal}%</div>
                  <div className="text-sm text-muted-foreground">Do Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{getStatus(occurrence.status)}</div>
                  <div className="text-sm text-muted-foreground">{t('level')}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dados Anuais */}
          <Card>
            <CardHeader>
              <CardTitle>Evolução Anual</CardTitle>
              <CardDescription>Distribuição de ocorrências por ano</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ano</TableHead>
                    <TableHead>{t('totalOccurrences')}</TableHead>
                    <TableHead>Percentual do Total</TableHead>
                    <TableHead>Variação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {yearlyData.map((data, index) => {
                    const percentage = Math.round((data.count / occurrence.total) * 100);
                    const previousYear = index > 0 ? yearlyData[index - 1].count : data.count;
                    const variation = index > 0 ? data.count - previousYear : 0;
                    const variationPercent = index > 0 ? Math.round(((data.count - previousYear) / previousYear) * 100) : 0;

                    return (
                      <motion.tr
                        key={data.year}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <TableCell className="font-medium">{data.year}</TableCell>
                        <TableCell>{data.count}</TableCell>
                        <TableCell>{percentage}%</TableCell>
                        <TableCell className={cn(
                          "font-medium",
                          variation > 0 ? "text-red-600" : variation < 0 ? "text-green-600" : "text-gray-500"
                        )}>
                          {index > 0 ? (
                            <>
                              {variation > 0 ? "+" : ""}{variation} ({variationPercent > 0 ? "+" : ""}{variationPercent}%)
                            </>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                      </motion.tr>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Análise de Tendência */}
          <Card>
            <CardHeader>
              <CardTitle>Análise de Tendência</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span>Ano com maior incidência:</span>
                  <span className="font-bold">
                    {yearlyData.reduce((max, current) => current.count > max.count ? current : max).year}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span>Ano com menor incidência:</span>
                  <span className="font-bold">
                    {yearlyData.reduce((min, current) => current.count < min.count ? current : min).year}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span>Tendência geral:</span>
                  <span className={cn(
                    "font-bold",
                    occurrence[2025] > occurrence[2022] ? "text-red-600" : 
                    occurrence[2025] < occurrence[2022] ? "text-green-600" : "text-gray-500"
                  )}>
                    {occurrence[2025] > occurrence[2022] ? "Crescente" : 
                     occurrence[2025] < occurrence[2022] ? "Decrescente" : "Estável"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompleteDetails;
