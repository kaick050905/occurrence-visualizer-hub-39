
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

// Regiões listadas pelo usuário, valores fictícios para demonstração
const regionsData = [
  { name: "Araçatuba", count: 38, percentage: 6, status: "Crítica" },
  { name: "Bauru", count: 52, percentage: 8, status: "Baixa" },
  { name: "Campinas", count: 87, percentage: 12, status: "Média" },
  { name: "Capital", count: 210, percentage: 28, status: "Crítica" },
  { name: "Grande São Paulo", count: 130, percentage: 17, status: "Alta" },
  { name: "Piracicaba", count: 42, percentage: 5, status: "Baixa" },
  { name: "Presidente Prudente", count: 29, percentage: 4, status: "Baixa" },
  { name: "Ribeirão Preto", count: 60, percentage: 7, status: "Média" },
  { name: "Santos", count: 55, percentage: 7, status: "Média" },
  { name: "São José do Rio Preto", count: 34, percentage: 5, status: "Baixa" },
  { name: "São José dos Campos", count: 65, percentage: 8, status: "Alta" },
  { name: "Sorocaba", count: 41, percentage: 6, status: "Baixa" },
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
  const { t } = useLanguage();
  
  const getStatus = (status: string) => {
    if (status === "Crítica") return t('critical');
    if (status === "Alta") return t('high');
    if (status === "Média") return t('medium');
    if (status === "Baixa") return t('low');
    return status;
  };
  
  // Função para traduzir nome de ocorrências
  const translateOccurrenceName = (name: string) => {
    switch(name) {
      case "Furto": return t('theft');
      case "Roubo": return t('robbery');
      case "Acidente de Trânsito": return t('trafficAccident');
      case "Invasão": return t('propertyInvasion');
      case "Vandalismo": return t('publicPropertyVandalism');
      default: return name;
    }
  };
  
  // Tradução dos dados para exibição conforme o idioma
  const translatedRegionsData = regionsData.map(region => ({
    ...region,
    statusTrans: getStatus(region.status)
  }));
  
  const translatedOccurrencesData = occurrenceTypesData.map(type => ({
    ...type,
    nameTrans: translateOccurrenceName(type.name),
    statusTrans: getStatus(type.status)
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('distribution')}</CardTitle>
        <CardDescription>{t('byRegion')} {t('byType').toLowerCase()}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="regiao">
          <TabsList className="mb-4 w-full flex">
            <TabsTrigger value="regiao" className="flex-1">{t('byRegion')}</TabsTrigger>
            <TabsTrigger value="tipo" className="flex-1">{t('byType')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="regiao">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {translatedRegionsData.map((region) => (
                <div key={region.name} className="border p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                    <div className="font-medium">{region.name}</div>
                    <div className="text-sm text-muted-foreground">{region.count} {t('occurrences')}</div>
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
              {translatedOccurrencesData.slice(0, 10).map((type) => (
                <div key={type.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium">{type.nameTrans}</div>
                    <div className="text-sm text-muted-foreground">{type.count} {t('occurrences')}</div>
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
