
import React from "react";
import DashboardHeader from "@/components/DashboardHeader";
import StatusCards from "@/components/StatusCards";
import OccurrenceCharts from "@/components/OccurrenceCharts";
import RecentOccurrences from "@/components/RecentOccurrences";
import GeographicDistribution from "@/components/GeographicDistribution";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-4 px-4 md:px-6 lg:px-8">
        <DashboardHeader />
        
        <Tabs defaultValue="dashboard" className="mb-6">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
            <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-4">
            <StatusCards />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <GeographicDistribution />
              <div className="col-span-1 md:col-span-2">
                <OccurrenceCharts />
              </div>
            </div>
            
            <RecentOccurrences />
          </TabsContent>
          
          <TabsContent value="relatorios" className="mt-4">
            <Card className="p-6 flex items-center justify-center min-h-[300px]">
              <p className="text-muted-foreground text-center">
                Página de relatórios em desenvolvimento.<br />
                Esta seção irá conter relatórios detalhados e exportáveis.
              </p>
            </Card>
          </TabsContent>
          
          <TabsContent value="configuracoes" className="mt-4">
            <Card className="p-6 flex items-center justify-center min-h-[300px]">
              <p className="text-muted-foreground text-center">
                Página de configurações em desenvolvimento.<br />
                Esta seção permitirá personalizar o dashboard e configurar alertas.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
