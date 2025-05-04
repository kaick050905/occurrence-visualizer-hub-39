
import React from "react";
import DashboardHeaderWithLang from "@/components/DashboardHeaderWithLang";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useGlobal } from "@/contexts/GlobalContext";

// Dados simulados para os relatórios
const reportsDataByLanguage = {
  'pt-BR': [
    { 
      id: "REL-2024-001", 
      title: "Análise mensal de ocorrências", 
      date: "01/06/2024", 
      type: "Mensal",
      status: "Disponível" 
    }
  ],
  'en': [
    { 
      id: "REP-2024-001", 
      title: "Monthly occurrence analysis", 
      date: "06/01/2024", 
      type: "Monthly",
      status: "Available" 
    }
  ],
  'es': [
    { 
      id: "INF-2024-001", 
      title: "Análisis mensual de incidencias", 
      date: "01/06/2024", 
      type: "Mensual",
      status: "Disponible" 
    }
  ]
};

const Reports: React.FC = () => {
  const { currentLanguage, translations } = useGlobal();

  // Traduções específicas para esta página
  const pageTranslations = {
    reports: {
      'pt-BR': 'Relatórios',
      'en': 'Reports',
      'es': 'Informes'
    },
    dashboard: {
      'pt-BR': 'Dashboard',
      'en': 'Dashboard',
      'es': 'Panel de Control'
    },
    about: {
      'pt-BR': 'Sobre o projeto',
      'en': 'About the project',
      'es': 'Sobre el proyecto'
    },
    accessExport: {
      'pt-BR': 'Acesse e exporte relatórios de segurança e ocorrências.',
      'en': 'Access and export security and occurrence reports.',
      'es': 'Acceda y exporte informes de seguridad e incidencias.'
    },
    downloadSheet: {
      'pt-BR': 'Baixar Planilha',
      'en': 'Download Spreadsheet',
      'es': 'Descargar Hoja de Cálculo'
    },
    availableReports: {
      'pt-BR': 'Relatórios Disponíveis',
      'en': 'Available Reports',
      'es': 'Informes Disponibles'
    },
    accessSystemReports: {
      'pt-BR': 'Acesse os relatórios do sistema',
      'en': 'Access system reports',
      'es': 'Acceda a los informes del sistema'
    },
    id: {
      'pt-BR': 'ID',
      'en': 'ID',
      'es': 'ID'
    },
    title: {
      'pt-BR': 'Título',
      'en': 'Title',
      'es': 'Título'
    },
    date: {
      'pt-BR': 'Data',
      'en': 'Date',
      'es': 'Fecha'
    },
    type: {
      'pt-BR': 'Tipo',
      'en': 'Type',
      'es': 'Tipo'
    },
    status: {
      'pt-BR': 'Status',
      'en': 'Status',
      'es': 'Estado'
    },
    action: {
      'pt-BR': 'Ação',
      'en': 'Action',
      'es': 'Acción'
    },
    download: {
      'pt-BR': 'Baixar',
      'en': 'Download',
      'es': 'Descargar'
    },
    downloadStarted: {
      'pt-BR': 'Download da planilha iniciado',
      'en': 'Spreadsheet download started',
      'es': 'Descarga de la hoja de cálculo iniciada'
    }
  };
  
  // Obtém os dados de relatórios no idioma atual
  const reportsData = reportsDataByLanguage[currentLanguage];

  const handleDownloadReport = () => {
    toast.success(pageTranslations.downloadStarted[currentLanguage]);
  };

  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container py-4 px-4 md:px-6 lg:px-8">
        <DashboardHeaderWithLang />
        
        <Tabs defaultValue="relatorios" className="mb-6">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="dashboard" asChild>
              <Link to="/">{pageTranslations.dashboard[currentLanguage]}</Link>
            </TabsTrigger>
            <TabsTrigger value="relatorios">{pageTranslations.reports[currentLanguage]}</TabsTrigger>
            <TabsTrigger value="sobre" asChild>
              <Link to="/sobre">{pageTranslations.about[currentLanguage]}</Link>
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
                    <h1 className="text-3xl font-bold tracking-tight">{pageTranslations.reports[currentLanguage]}</h1>
                    <p className="text-muted-foreground mt-2">
                      {pageTranslations.accessExport[currentLanguage]}
                    </p>
                  </div>
                  <Button 
                    onClick={handleDownloadReport}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>{pageTranslations.downloadSheet[currentLanguage]}</span>
                  </Button>
                </div>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>{pageTranslations.availableReports[currentLanguage]}</CardTitle>
                  <CardDescription>{pageTranslations.accessSystemReports[currentLanguage]}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{pageTranslations.id[currentLanguage]}</TableHead>
                          <TableHead>{pageTranslations.title[currentLanguage]}</TableHead>
                          <TableHead className="hidden md:table-cell">{pageTranslations.date[currentLanguage]}</TableHead>
                          <TableHead className="hidden md:table-cell">{pageTranslations.type[currentLanguage]}</TableHead>
                          <TableHead>{pageTranslations.status[currentLanguage]}</TableHead>
                          <TableHead>{pageTranslations.action[currentLanguage]}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reportsData.map((report) => (
                          <TableRow key={report.id}>
                            <TableCell className="font-medium">{report.id}</TableCell>
                            <TableCell>{report.title}</TableCell>
                            <TableCell className="hidden md:table-cell">{report.date}</TableCell>
                            <TableCell className="hidden md:table-cell">{report.type}</TableCell>
                            <TableCell>
                              <Badge className="bg-green-500 text-white">
                                {report.status}
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
                                <span className="hidden sm:inline">{pageTranslations.download[currentLanguage]}</span>
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
