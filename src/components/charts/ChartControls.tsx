
import React from "react";
import { Button } from "@/components/ui/button";
import { PieChart as PieChartIcon, TrendingUp, BarChart3 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ChartControlsProps {
  chartType: "pie" | "line" | "bar";
  onChartTypeChange: (type: "pie" | "line" | "bar") => void;
}

const ChartControls: React.FC<ChartControlsProps> = ({ chartType, onChartTypeChange }) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        variant={chartType === "pie" ? "default" : "outline"}
        onClick={() => onChartTypeChange("pie")}
        className="flex items-center gap-2 shadow-md text-xs md:text-sm"
      >
        <PieChartIcon className="h-4 w-4" />
        <span className="hidden sm:inline">{t('distributionChart')}</span>
        <span className="sm:hidden">Pizza</span>
      </Button>
      <Button 
        variant={chartType === "line" ? "default" : "outline"}
        onClick={() => onChartTypeChange("line")}
        className="flex items-center gap-2 shadow-md text-xs md:text-sm"
      >
        <TrendingUp className="h-4 w-4" />
        <span className="hidden sm:inline">{t('evolutionChart')}</span>
        <span className="sm:hidden">Linha</span>
      </Button>
      <Button 
        variant={chartType === "bar" ? "default" : "outline"}
        onClick={() => onChartTypeChange("bar")}
        className="flex items-center gap-2 shadow-md text-xs md:text-sm"
      >
        <BarChart3 className="h-4 w-4" />
        <span className="hidden sm:inline">Gráfico de Barras</span>
        <span className="sm:hidden">Barras</span>
      </Button>
    </div>
  );
};

export default ChartControls;
