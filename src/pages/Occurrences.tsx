
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import DashboardHeader from "@/components/DashboardHeader";
import OccurrenceDetails from "@/components/OccurrenceDetails";
import OccurrenceTable from "@/components/OccurrenceTable";
import ChartControls from "@/components/charts/ChartControls";
import PieChartComponent from "@/components/charts/PieChartComponent";
import LineChartComponent from "@/components/charts/LineChartComponent";
import BarChartComponent from "@/components/charts/BarChartComponent";
import { Link } from "react-router-dom";
import { ArrowLeft, PieChart as PieChartIcon, BarChart3 } from "lucide-react";
import { allOccurrencesData } from "@/data/occurrenceData";
import { processDataForCharts } from "@/utils/occurrenceDataProcessor";

const Occurrences: React.FC = () => {
  const [chartType, setChartType] = useState<"pie" | "line" | "bar">("pie");
  const [selectedOccurrence, setSelectedOccurrence] = useState<{ id: string; description: string; status: string; count: number } | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { t } = useLanguage();

  const handleViewDetails = (occurrence: typeof allOccurrencesData[0]) => {
    const formattedOccurrence = {
      id: occurrence.id,
      description: t(occurrence.description),
      status: occurrence.status,
      count: occurrence.total
    };
    setSelectedOccurrence(formattedOccurrence);
    setIsDetailsOpen(true);
  };

  const { pieData, lineData, barData } = processDataForCharts(t);

  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container py-4 px-4 md:px-6 lg:px-8">
        <DashboardHeader />
        
        <div className="mb-6">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            {t('backToDashboard')}
          </Link>
          
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {t('allOccurrences')}
              </h1>
              <p className="text-muted-foreground mt-2 text-sm md:text-base">
                {t('completeOccurrencesList')}
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="table" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:w-auto">
            <TabsTrigger value="table" className="flex items-center gap-2 text-xs md:text-sm">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">{t('dataTable')}</span>
              <span className="sm:hidden">Tabela</span>
            </TabsTrigger>
            <TabsTrigger value="charts" className="flex items-center gap-2 text-xs md:text-sm">
              <PieChartIcon className="h-4 w-4" />
              <span className="hidden sm:inline">{t('charts')}</span>
              <span className="sm:hidden">Gráficos</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="table">
            <OccurrenceTable onViewDetails={handleViewDetails} />
          </TabsContent>

          <TabsContent value="charts">
            <div className="space-y-6">
              <ChartControls 
                chartType={chartType} 
                onChartTypeChange={setChartType} 
              />

              {chartType === "pie" && <PieChartComponent data={pieData} />}
              {chartType === "line" && <LineChartComponent data={lineData} />}
              {chartType === "bar" && <BarChartComponent data={barData} />}
            </div>
          </TabsContent>
        </Tabs>

        <OccurrenceDetails 
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
          occurrence={selectedOccurrence}
        />
      </div>
    </motion.div>
  );
};

export default Occurrences;
