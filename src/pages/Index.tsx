
import React from "react";
import DashboardHeader from "@/components/DashboardHeader";
import OccurrenceCharts from "@/components/OccurrenceCharts";
import RecentOccurrences from "@/components/RecentOccurrences";
import GeographicDistribution from "@/components/GeographicDistribution";
import LocalityData from "@/components/LocalityData";
import SafetyCardsCarousel from "@/components/SafetyCards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart2 } from "lucide-react";

const Index = () => {
  return (
    <motion.div 
      className="min-h-screen bg-background flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container py-4 px-4 md:px-6 lg:px-8 flex-grow">
        <DashboardHeader />
        
        <Tabs defaultValue="dashboard" className="mb-6">
          <TabsList className="grid w-full grid-cols-4 md:w-auto">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="relatorios" asChild>
              <Link to="/relatorios">Relatórios</Link>
            </TabsTrigger>
            <TabsTrigger value="comparacao" asChild>
              <Link to="/comparar-regioes">Comparar Regiões</Link>
            </TabsTrigger>
            <TabsTrigger value="sobre" asChild>
              <Link to="/sobre">Sobre o projeto</Link>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-4 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Visão Geral</h2>
                <Button variant="outline" asChild>
                  <Link to="/comparar-regioes" className="flex items-center gap-2">
                    <BarChart2 className="h-4 w-4" />
                    Comparar Regiões
                  </Link>
                </Button>
              </div>
              
              <SafetyCardsCarousel />
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="col-span-1 md:col-span-1"
              >
                <GeographicDistribution />
              </motion.div>
              <motion.div 
                className="col-span-1 md:col-span-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <OccurrenceCharts />
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <LocalityData />
            </motion.div>
            <RecentOccurrences />
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Index;
