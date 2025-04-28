
import React from "react";
import DashboardHeader from "@/components/DashboardHeader";
import OccurrenceCharts from "@/components/OccurrenceCharts";
import RecentOccurrences from "@/components/RecentOccurrences";
import GeographicDistribution from "@/components/GeographicDistribution";
import LocalityData from "@/components/LocalityData";
import SafetyCardsCarousel from "@/components/SafetyCards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Link } from "react-router-dom";

const Index = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-4 px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-4">
          <DashboardHeader />
          <Button
            variant="outline"
            size="icon"
            className="ml-2 z-10"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "dark" ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>
        </div>
        
        <Tabs defaultValue="dashboard" className="mb-6">
          <TabsList className="grid w-full grid-cols-2 md:w-auto">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="relatorios" asChild>
              <Link to="/relatorios">Relatórios</Link>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-4 space-y-4">
            <SafetyCardsCarousel />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GeographicDistribution />
              <div className="col-span-1 md:col-span-2">
                <OccurrenceCharts />
              </div>
            </div>
            
            <LocalityData />
            <RecentOccurrences />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
