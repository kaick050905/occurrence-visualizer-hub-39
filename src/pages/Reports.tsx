import React from "react";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const reportsData = [
  { 
    id: "REL-2025-001", 
    title: "Relatório de Ocorrências", 
    date: "03/03/2025", 
    type: "Anual (2022–2025)",
    status: "Disponível" 
  }
];

const Reports: React.FC = () => {
  const { t } = useLanguage();
  
  const handleDownloadReport = () => {
    const link = document.createElement('a');
    link.href = '/lovable-uploads/Dados.xlsx';
    link.download = 'Dados.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(t('downloadStarted'));
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
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>{t('availableReports')}</CardTitle>
                  <CardDescription>{t('accessSystemReports')}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t('reportID')}</TableHead>
                          <TableHead>{t('reportTitle')}</TableHead>
                          <TableHead className="hidden md:table-cell">{t('reportDate')}</TableHead>
                          <TableHead className="hidden md:table-cell">{t('reportType')}</TableHead>
                          <TableHead>{t('reportStatus')}</TableHead>
                          <TableHead>{t('reportAction')}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reportsData.map((report) => (
                          <TableRow key={report.id}>
                            <TableCell className="font-medium">{report.id}</TableCell>
                            <TableCell>{t('monthlyAnalysis')}</TableCell>
                            <TableCell className="hidden md:table-cell">{report.date}</TableCell>
                            <TableCell className="hidden md:table-cell">{t('monthly')}</TableCell>
                            <TableCell>
                              <Badge className="bg-green-500 text-white">
                                {t('available')}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="gap-1 text-white bg-green-500 hover:bg-green-600"
                                onClick={handleDownloadReport}
                              >
                                <Download className="h-3.5 w-3.5" />
                                <span className="hidden sm:inline">{t('download')}</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
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
