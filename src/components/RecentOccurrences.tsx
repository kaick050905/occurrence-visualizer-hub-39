
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Filter, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { fetchMostCommonOccurrenceTypes } from "@/services/supabaseService";
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const statusStyle = {
  Crítica: "bg-occurrence-critical text-white",
  Alta: "bg-occurrence-high text-white",
  Média: "bg-occurrence-medium text-white",
  Baixa: "bg-occurrence-low text-white",
  "Em Progresso": "bg-blue-500 text-white",
  Resolvida: "bg-green-600 text-white",
  Cancelada: "bg-gray-500 text-white"
};

// Sample data for development when the database is empty
const sampleOccurrenceData = [
  { id: "RB01", description: "Roubo", status: "Alta", count: 134 },
  { id: "FT03", description: "Furto", status: "Média", count: 89 },
  { id: "HM01", description: "Homicídio", status: "Crítica", count: 45 },
  { id: "DG02", description: "Dano ao patrimônio", status: "Baixa", count: 67 },
  { id: "VI02", description: "Violência doméstica", status: "Alta", count: 103 }
];

const RecentOccurrences: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  const { data: occurencesData = [], isLoading, error } = useQuery({
    queryKey: ['mostCommonOccurrenceTypes'],
    queryFn: () => fetchMostCommonOccurrenceTypes(5),
  });
  
  // If no data from API, use sample data for development
  const recurringOccurrencesData = occurencesData.length > 0 ? occurencesData : sampleOccurrenceData;

  const toggleStatusFilter = (status: string) => {
    setStatusFilter(prevFilters => 
      prevFilters.includes(status)
        ? prevFilters.filter(s => s !== status)
        : [...prevFilters, status]
    );
  };

  const filteredOccurrences = statusFilter.length > 0
    ? recurringOccurrencesData.filter(item => statusFilter.includes(item.status))
    : recurringOccurrencesData;

  if (error) {
    console.error("Error fetching occurrence data:", error);
  }

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Ocorrências Mais Recorrentes</CardTitle>
          <CardDescription>Tipos de ocorrências mais frequentes no sistema</CardDescription>
          
          {error && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>
                Não foi possível carregar os dados de ocorrências. Tente novamente mais tarde.
              </AlertDescription>
            </Alert>
          )}
          
          {occurencesData.length === 0 && !isLoading && !error && (
            <Alert className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Informação</AlertTitle>
              <AlertDescription>
                Não há dados de ocorrências disponíveis no banco de dados. Exibindo dados de exemplo.
              </AlertDescription>
            </Alert>
          )}
        </div>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span>Filtrar</span>
                {statusFilter.length > 0 && (
                  <Badge variant="secondary" className="ml-1 rounded-full px-1">
                    {statusFilter.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-3">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Filtrar por status</h4>
                <div className="space-y-2">
                  {["Crítica", "Alta", "Média", "Baixa"].map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`status-${status}`} 
                        checked={statusFilter.includes(status)}
                        onCheckedChange={() => toggleStatusFilter(status)}
                      />
                      <Label htmlFor={`status-${status}`} className="flex items-center space-x-1 text-sm">
                        <span>{status}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          {isLoading ? (
            <div className="text-center py-8">Carregando dados...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Tipo</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total Ocorrências</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOccurrences.length > 0 ? (
                  filteredOccurrences.map((occurrence) => (
                    <TableRow key={occurrence.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <TableCell className="font-medium">{occurrence.id}</TableCell>
                      <TableCell>{occurrence.description}</TableCell>
                      <TableCell>
                        <Badge className={cn(statusStyle[occurrence.status as keyof typeof statusStyle] || "bg-gray-500 text-white")}>
                          {occurrence.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{occurrence.count}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      Nenhum dado encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <div className="text-xs text-muted-foreground">
          Mostrando {filteredOccurrences.length} de {recurringOccurrencesData.length} ocorrências
        </div>
        <Button variant="outline" size="sm" className="gap-1">
          <span>Ver Todas</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentOccurrences;
