import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Maiores cidades do estado de São Paulo, dados populacionais de 2020
const regionsData = [
  { name: "São Paulo", count: 12325232, percentage: 28, status: "Crítica" },
  { name: "Guarulhos", count: 1404694, percentage: 17, status: "Alta" },
  { name: "Campinas", count: 1213792, percentage: 12, status: "Alta" },
  { name: "São Bernardo do Campo", count: 844483, percentage: 10, status: "Média" },
  { name: "Santo André", count: 721368, percentage: 9, status: "Média" },
  { name: "São José dos Campos", count: 729737, percentage: 8, status: "Média" },
  { name: "Osasco", count: 699944, percentage: 7, status: "Média" },
  { name: "Ribeirão Preto", count: 711825, percentage: 7, status: "Média" },
  { name: "Sorocaba", count: 687357, percentage: 6, status: "Baixa" },
  { name: "Santos", count: 433991, percentage: 5, status: "Baixa" },
  { name: "Mogi das Cruzes", count: 450785, percentage: 5, status: "Baixa" },
  { name: "Diadema", count: 426757, percentage: 4, status: "Baixa" }
];

// Tipos de ocorrência (mantidos como estavam)
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
          <TabsList className="mb-4 w-full flex">
            <TabsTrigger value="regiao" className="flex-1">Por Região</TabsTrigger>
            <TabsTrigger value="tipo" className="flex-1">Por Tipo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="regiao">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {regionsData.map((region) => (
                <div key={region.name} className="border p-3 rounded-lg hover:bg-gray-50 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                    <div className="font-medium">{region.name}</div>
                    <div className="text-sm text-muted-foreground">{region.count} ocorrências</div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Progress 
                      value={region.percentage} 
                      max={100} 
                      className={cn("h-2 flex-grow", statusColors[region.status as keyof typeof statusColors])} 
                    />
                    <span className="text-sm font-medium min-w-[40px] text-right">{region.percentage}%</span>
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
