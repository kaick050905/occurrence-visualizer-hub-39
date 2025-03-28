
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Region data with city, region name, population, HDI, and occurrences in 2024
const regionsData = [
  { name: "Zona Norte", count: 132, percentage: 28, status: "Crítica" },
  { name: "Zona Sul", count: 97, percentage: 21, status: "Alta" },
  { name: "Zona Leste", count: 86, percentage: 18, status: "Média" },
  { name: "Zona Oeste", count: 110, percentage: 23, status: "Alta" },
  { name: "Centro", count: 45, percentage: 10, status: "Baixa" },
];

// 23 types of occurrences data
const occurrenceTypesData = [
  { name: "Furto", count: 245, percentage: 15, status: "Crítica" },
  { name: "Roubo", count: 210, percentage: 13, status: "Crítica" },
  { name: "Acidente de Trânsito", count: 180, percentage: 11, status: "Alta" },
  { name: "Invasão", count: 165, percentage: 10, status: "Alta" },
  { name: "Vandalismo", count: 155, percentage: 9, status: "Alta" },
  { name: "Incêndio", count: 90, percentage: 5, status: "Média" },
  { name: "Alagamento", count: 85, percentage: 5, status: "Média" },
  { name: "Queda de Energia", count: 80, percentage: 5, status: "Média" },
  { name: "Perturbação do Sossego", count: 75, percentage: 4, status: "Média" },
  { name: "Desabamento", count: 70, percentage: 4, status: "Média" },
  { name: "Poluição", count: 65, percentage: 4, status: "Baixa" },
  { name: "Deslizamento", count: 60, percentage: 3, status: "Baixa" },
  { name: "Poda Irregular", count: 50, percentage: 3, status: "Baixa" },
  { name: "Descarte Irregular", count: 45, percentage: 2, status: "Baixa" },
  { name: "Obstrução de Via", count: 40, percentage: 2, status: "Baixa" },
  { name: "Construção Irregular", count: 35, percentage: 2, status: "Baixa" },
  { name: "Abandono de Veículo", count: 30, percentage: 1, status: "Baixa" },
  { name: "Pichação", count: 25, percentage: 1, status: "Baixa" },
  { name: "Maus-tratos a Animais", count: 20, percentage: 1, status: "Baixa" },
  { name: "Ambulantes Irregulares", count: 15, percentage: 1, status: "Baixa" },
  { name: "Vazamento de Gás", count: 10, percentage: 0.5, status: "Baixa" },
  { name: "Esgoto a Céu Aberto", count: 8, percentage: 0.5, status: "Baixa" },
  { name: "Cabeamento Rompido", count: 5, percentage: 0.3, status: "Baixa" },
];

const statusColors = {
  Crítica: "bg-occurrence-critical",
  Alta: "bg-occurrence-high",
  Média: "bg-occurrence-medium",
  Baixa: "bg-occurrence-low"
};

const GeographicDistribution: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição</CardTitle>
        <CardDescription>Por região e tipo de ocorrência</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="regiao">
          <TabsList className="mb-4">
            <TabsTrigger value="regiao">Por Região</TabsTrigger>
            <TabsTrigger value="tipo">Por Tipo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="regiao">
            <div className="space-y-4">
              {regionsData.map((region) => (
                <div key={region.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium">{region.name}</div>
                    <div className="text-sm text-muted-foreground">{region.count} ocorrências</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={region.percentage} 
                      max={100} 
                      className={cn("h-2", statusColors[region.status as keyof typeof statusColors])} 
                    />
                    <span className="text-sm font-medium">{region.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="tipo">
            <div className="space-y-4">
              {occurrenceTypesData.slice(0, 10).map((type) => (
                <div key={type.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium">{type.name}</div>
                    <div className="text-sm text-muted-foreground">{type.count} ocorrências</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={type.percentage} 
                      max={100} 
                      className={cn("h-2", statusColors[type.status as keyof typeof statusColors])} 
                    />
                    <span className="text-sm font-medium">{type.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default GeographicDistribution;
