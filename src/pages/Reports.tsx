
import React from "react";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { motion } from "framer-motion";

const reportsData = [
  { 
    id: "REL-2024-001", 
    title: "Análise mensal de ocorrências", 
    date: "01/06/2024", 
    type: "Mensal",
    status: "Disponível" 
  }
];

const Reports: React.FC = () => {
  const handleDownloadReport = () => {
    toast.success("Download da planilha iniciado");
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
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="my-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
                <p className="text-muted-foreground mt-2">
                  Acesse e exporte relatórios de segurança e ocorrências.
                </p>
              </div>
              <Button 
                onClick={handleDownloadReport}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                <span>Baixar Planilha</span>
              </Button>
            </div>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Relatórios Disponíveis</CardTitle>
              <CardDescription>Acesse os relatórios do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Título</TableHead>
                      <TableHead className="hidden md:table-cell">Data</TableHead>
                      <TableHead className="hidden md:table-cell">Tipo</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Ação</TableHead>
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
                            <span className="hidden sm:inline">Baixar</span>
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
      </div>
    </motion.div>
  );
};

export default Reports;
