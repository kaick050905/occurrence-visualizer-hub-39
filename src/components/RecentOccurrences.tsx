
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Sample data for most recurring occurrences
const recurringOccurrencesData = [
  {
    id: "OC-1234",
    description: "Furto de Veículo",
    status: "Crítica",
    count: 245,
  },
  {
    id: "OC-1233",
    description: "Falta de iluminação pública",
    status: "Alta",
    count: 210,
  },
  {
    id: "OC-1232",
    description: "Acidente de Trânsito",
    status: "Média",
    count: 180,
  },
  {
    id: "OC-1231",
    description: "Invasão de Propriedade",
    status: "Alta",
    count: 165,
  },
  {
    id: "OC-1230",
    description: "Vandalismo em Prédio Público",
    status: "Alta",
    count: 155,
  }
];

const statusStyle = {
  Crítica: "bg-occurrence-critical text-white",
  Alta: "bg-occurrence-high text-white",
  Média: "bg-occurrence-medium text-white",
  Baixa: "bg-occurrence-low text-white",
  "Em Progresso": "bg-blue-500 text-white",
  Resolvida: "bg-green-600 text-white",
  Cancelada: "bg-gray-500 text-white"
};

const RecentOccurrences: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

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

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Ocorrências Mais Recorrentes</CardTitle>
          <CardDescription>Tipos de ocorrências mais frequentes no sistema</CardDescription>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Ocorrências</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOccurrences.map((occurrence) => (
                <TableRow key={occurrence.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <TableCell className="font-medium">{occurrence.id}</TableCell>
                  <TableCell>{occurrence.description}</TableCell>
                  <TableCell>
                    <Badge className={cn(statusStyle[occurrence.status as keyof typeof statusStyle])}>
                      {occurrence.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{occurrence.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
