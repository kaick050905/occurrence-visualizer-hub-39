
import React from "react";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container py-4 px-4 md:px-6 lg:px-8">
        <DashboardHeader />
        
        <Tabs defaultValue="sobre" className="mb-6">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="dashboard" asChild>
              <Link to="/">{t('dashboard')}</Link>
            </TabsTrigger>
            <TabsTrigger value="relatorios" asChild>
              <Link to="/relatorios">{t('reports')}</Link>
            </TabsTrigger>
            <TabsTrigger value="sobre">{t('about')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sobre" className="mt-4 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6"
            >
              <Card className="p-6 border-t-4 border-t-primary shadow-lg">
                <CardContent className="pt-4 space-y-8">
                  <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4 text-primary">{t('projectInfoSP')}</h1>
                    <div className="h-1 w-24 bg-primary mx-auto mb-6 rounded-full"></div>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                      {t('mappingAndAnalysis')}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-secondary/20 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                      <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                        <span className="mr-2 text-3xl">🎯</span> {t('generalObjective')}
                      </h2>
                      <p className="text-muted-foreground">
                        {t('generalObjectiveDesc')}
                      </p>
                    </div>

                    <div className="bg-secondary/20 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                      <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                        <span className="mr-2 text-3xl">🧠</span> {t('technologiesAndFeatures')}
                      </h2>
                      <ul className="list-none space-y-2 text-muted-foreground">
                        <li className="flex items-center"><span className="mr-2 font-bold">🗺️</span> {t('geolocation')}</li>
                        <li className="flex items-center"><span className="mr-2 font-bold">📊</span> {t('interactiveDashboards')}</li>
                        <li className="flex items-center"><span className="mr-2 font-bold">⏱️</span> {t('temporalAnalysis')}</li>
                        <li className="flex items-center"><span className="mr-2 font-bold">🧮</span> {t('predictiveAlgorithms')}</li>
                        <li className="flex items-center"><span className="mr-2 font-bold">📱</span> {t('responsiveDesign')}</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-primary/5 p-6 rounded-lg shadow-sm">
                    <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                      <span className="mr-2 text-3xl">📌</span> {t('specificObjectives')}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-primary">
                        <p className="text-muted-foreground">{t('collectData')}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-primary">
                        <p className="text-muted-foreground">{t('buildInterface')}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-primary">
                        <p className="text-muted-foreground">{t('implementFilters')}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-primary">
                        <p className="text-muted-foreground">{t('applyVisualization')}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-primary">
                        <p className="text-muted-foreground">{t('usePredictive')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                      <span className="mr-2 text-3xl">👥</span> {t('projectTeam')}
                    </h2>
                    <div className="mb-4">
                      <p className="text-muted-foreground">
                        {t('teamDescription')}
                      </p>
                    </div>
                    
                    <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                      <p className="font-medium mb-1">{t('advisor')}:</p>
                      <p className="text-muted-foreground mb-4">Prof. Evandro Klengenfuss Veronez</p>
                      
                      <p className="font-medium mb-1">{t('developmentTeam')}:</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        <div className="bg-secondary/20 p-2 rounded text-center text-muted-foreground">André Vitor</div>
                        <div className="bg-secondary/20 p-2 rounded text-center text-muted-foreground">João Iauch</div>
                        <div className="bg-secondary/20 p-2 rounded text-center text-muted-foreground">João Honorato</div>
                        <div className="bg-secondary/20 p-2 rounded text-center text-muted-foreground">Kaick Gomes</div>
                        <div className="bg-secondary/20 p-2 rounded text-center text-muted-foreground">Murilo Pires</div>
                        <div className="bg-secondary/20 p-2 rounded text-center text-muted-foreground">Philippe Georges</div>
                      </div>
                      
                      <p className="text-muted-foreground mt-4">{t('semester')}: {t('semesterValue')}</p>
                    </div>
                  </div>

                  <div className="bg-primary/5 p-6 rounded-lg shadow-sm border border-primary/20">
                    <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                      <span className="mr-2 text-3xl">📢</span> {t('conclusion')}
                    </h2>
                    <p className="text-muted-foreground">
                      {t('conclusionText')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default About;
