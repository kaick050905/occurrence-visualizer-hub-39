
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const regionsData = [
  { name: "Zona Norte", count: 132, percentage: 28, status: "Crítica" },
  { name: "Zona Sul", count: 97, percentage: 21, status: "Alta" },
  { name: "Zona Leste", count: 86, percentage: 18, status: "Média" },
  { name: "Zona Oeste", count: 110, percentage: 23, status: "Alta" },
  { name: "Centro", count: 45, percentage: 10, status: "Baixa" },
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
        <CardTitle>Distribuição Geográfica</CardTitle>
        <CardDescription>Ocorrências por região</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[220px] pr-4">
          <div className="space-y-6">
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
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default GeographicDistribution;
