
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Crime type data
const crimeTypeData = [
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
        <CardTitle>Distribuição por tipo de crime</CardTitle>
        <CardDescription>Ocorrências por categorias</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[220px] pr-4">
          <div className="space-y-6">
            {crimeTypeData.map((crime) => (
              <div key={crime.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="font-medium">{crime.name}</div>
                  <div className="text-sm text-muted-foreground">{crime.count} ocorrências</div>
                </div>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={crime.percentage} 
                    max={100} 
                    className={cn("h-2", statusColors[crime.status as keyof typeof statusColors])} 
                  />
                  <span className="text-sm font-medium">{crime.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default GeographicDistribution;
