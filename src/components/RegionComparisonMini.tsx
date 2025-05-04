
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MapPin, BarChart2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import { useGlobal } from "@/contexts/GlobalContext";

// Dados simplificados para a versão em miniatura
const regionsMiniData = [
  { 
    name: "Capital", 
    furto: 10450,
    roubo: 7230,
    agressao: 320,
    homicidio: 180
  },
  { 
    name: "Grande São Paulo", 
    furto: 6320,
    roubo: 4150,
    agressao: 190,
    homicidio: 95
  },
  { 
    name: "Campinas", 
    furto: 4120,
    roubo: 2540, 
    agressao: 150,
    homicidio: 65
  }
];

// Cores para o gráfico
const chartColors = ["#3B82F6", "#EF4444", "#10B981", "#F59E0B"];

const RegionComparisonMini: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { currentLanguage, translations } = useGlobal();

  // Preparar dados para o gráfico
  const prepareCrimeData = () => {
    const crimeTypes = ['furto', 'roubo', 'agressao', 'homicidio'];
    const crimeTypeLabels: Record<string, string> = {
      'furto': translations.theft[currentLanguage],
      'roubo': translations.robbery[currentLanguage],
      'agressao': translations.assault[currentLanguage],
      'homicidio': translations.homicide[currentLanguage]
    };
    
    return crimeTypes.map(type => {
      const dataPoint: Record<string, any> = { 
        name: crimeTypeLabels[type] 
      };
      
      regionsMiniData.forEach(region => {
        dataPoint[region.name] = region[type as keyof typeof region];
      });
      
      return dataPoint;
    });
  };

  const crimeData = prepareCrimeData();

  // Formatar números 
  const formatNumber = (value: number): string => {
    return value.toLocaleString(currentLanguage);
  };

  // Tooltip personalizado
  const tooltipFormatter = (value: number | string): [string, string] => {
    if (typeof value === 'number') {
      return [formatNumber(value), ""];
    }
    return [String(value), ""];
  };
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-primary" />
          {translations.regionComparison[currentLanguage]}
        </CardTitle>
        <CardDescription>
          {translations.selectRegions[currentLanguage]}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={crimeData}
              layout={isMobile ? "vertical" : "horizontal"}
              margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              {isMobile ? (
                <>
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                </>
              ) : (
                <>
                  <XAxis dataKey="name" />
                  <YAxis />
                </>
              )}
              <RechartsTooltip formatter={tooltipFormatter} />
              <Legend />
              {regionsMiniData.map((region, index) => (
                <Bar 
                  key={region.name} 
                  dataKey={region.name} 
                  fill={chartColors[index % chartColors.length]} 
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-end mt-4">
          <Button 
            onClick={() => navigate("/comparar-regioes")} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <MapPin className="h-4 w-4" />
            {translations.moreDetails[currentLanguage]}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionComparisonMini;
