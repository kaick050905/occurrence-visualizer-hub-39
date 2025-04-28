
import React from "react";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, Download, Filter, Calendar, Moon, Sun } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { toast } from "sonner";

const reportsData = [
  { 
    id: "REL-2024-001", 
    title: "Análise mensal de ocorrências", 
    date: "01/06/2024", 
    type: "Mensal",
    status: "Disponível" 
  },
  { 
    id: "REL-2024-002", 
    title: "Relatório de ocorrências por região", 
    date: "15/05/2024", 
    type: "Regional",
    status: "Disponível" 
  },
  { 
    id: "REL-2024-003", 
    title: "Análise de tendências criminais", 
    date: "01/05/2024", 
    type: "Trimestral",
    status: "Disponível" 
  },
  { 
    id: "REL-2024-004", 
    title: "Relatório de efetividade das ações", 
    date: "15/04/2024", 
    type: "Especial",
    status: "Disponível" 
  },
  { 
    id: "REL-2024-005", 
    title: "Previsão de ocorrências para próximo trimestre", 
    date: "10/07/2024", 
    type: "Previsão",
    status: "Agendado" 
  }
];

const statusStyle = {
  "Disponível": "bg-green-500 hover:bg-green-600",
  "Agendado": "bg-blue-500 hover:bg-blue-600",
  "Em Processamento": "bg-yellow-500 hover:bg-yellow-600",
  "Expirado": "bg-gray-500 hover:bg-gray-600"
};

const Reports: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleDownloadReport = () => {
    toast.success("Download da planilha iniciado");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-4 px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-4">
          <DashboardHeader />
          <Button
            variant="outline"
            size="icon"
            className="ml-2 z-10"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "dark" ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>
        </div>
        
        <div className="my-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
              <p className="text-muted-foreground mt-2">
                Acesse, exporte e gerencie relatórios de segurança e ocorrências.
              </p>
            </div>
            <Button 
              onClick={handleDownloadReport}
              className="gap-2 flex items-center"
              size="default"
            >
              <Download className="h-4 w-4" />
              <span>Baixar Planilha</span>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="disponiveis" className="mb-6">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="disponiveis">Disponíveis</TabsTrigger>
            <TabsTrigger value="agendados">Agendados</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
          </TabsList>
          
          <TabsContent value="disponiveis" className="mt-4 space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Relatórios Disponíveis</CardTitle>
                  <CardDescription>Acesse os relatórios mais recentes do sistema</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <Filter className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Filtrar</span>
                  </Button>
                  <Button size="sm" className="h-8 gap-1">
                    <FileText className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Novo Relatório</span>
                  </Button>
                </div>
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
                        <TableRow key={report.id} className="hover:bg-gray-50 transition-colors duration-200">
                          <TableCell className="font-medium">{report.id}</TableCell>
                          <TableCell>{report.title}</TableCell>
                          <TableCell className="hidden md:table-cell">{report.date}</TableCell>
                          <TableCell className="hidden md:table-cell">{report.type}</TableCell>
                          <TableCell>
                            <Badge className={cn(
                              "text-white",
                              report.status === "Disponível" ? "bg-green-500" : 
                              report.status === "Agendado" ? "bg-blue-500" : 
                              "bg-gray-500"
                            )}>
                              {report.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className={cn(
                                "gap-1 text-white",
                                report.status === "Disponível" ? statusStyle["Disponível"] : 
                                report.status === "Agendado" ? statusStyle["Agendado"] : 
                                "bg-gray-500 hover:bg-gray-600"
                              )}
                              disabled={report.status !== "Disponível"}
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
          </TabsContent>
          
          <TabsContent value="agendados" className="mt-4">
            <Card className="p-6 flex items-center justify-center min-h-[300px]">
              <div className="text-center space-y-3">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-medium">Relatórios Agendados</h3>
                <p className="text-muted-foreground max-w-md">
                  Aqui você poderá visualizar relatórios programados para geração automática.
                  Esta funcionalidade estará disponível em breve.
                </p>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="historico" className="mt-4">
            <Card className="p-6 flex items-center justify-center min-h-[300px]">
              <div className="text-center space-y-3">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-medium">Histórico de Relatórios</h3>
                <p className="text-muted-foreground max-w-md">
                  Visualize o histórico completo de relatórios gerados nos últimos 12 meses.
                  Esta funcionalidade estará disponível em breve.
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;
