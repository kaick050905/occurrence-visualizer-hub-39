
import React from "react";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const About: React.FC = () => {
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
              <Link to="/">Dashboard</Link>
            </TabsTrigger>
            <TabsTrigger value="relatorios" asChild>
              <Link to="/relatorios">Relatórios</Link>
            </TabsTrigger>
            <TabsTrigger value="sobre">Sobre o projeto</TabsTrigger>
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
                    <h1 className="text-4xl font-bold mb-4 text-primary">🔍 Projeto INFOSP</h1>
                    <div className="h-1 w-24 bg-primary mx-auto mb-6 rounded-full"></div>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                      Mapeamento e Análise Preditiva de Ocorrências Criminais no Estado de São Paulo
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-secondary/20 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                      <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                        <span className="mr-2 text-3xl">🎯</span> Objetivo Geral
                      </h2>
                      <p className="text-muted-foreground">
                        Desenvolver uma plataforma interativa que reúna, organize e exiba dados públicos sobre ocorrências criminais 
                        no Estado de São Paulo. A plataforma utiliza recursos visuais, como mapas, gráficos e dashboards, além de 
                        ferramentas de análise preditiva que ajudam a identificar padrões e tendências criminais.
                      </p>
                    </div>

                    <div className="bg-secondary/20 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                      <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                        <span className="mr-2 text-3xl">🧠</span> Tecnologias e Funcionalidades
                      </h2>
                      <ul className="list-none space-y-2 text-muted-foreground">
                        <li className="flex items-center"><span className="mr-2 font-bold">🗺️</span> Geolocalização e mapas de calor com base em ocorrências registradas</li>
                        <li className="flex items-center"><span className="mr-2 font-bold">📊</span> Dashboards interativos com gráficos atualizados</li>
                        <li className="flex items-center"><span className="mr-2 font-bold">⏱️</span> Análise temporal para identificação de sazonalidades</li>
                        <li className="flex items-center"><span className="mr-2 font-bold">🧮</span> Algoritmos preditivos para análise de risco</li>
                        <li className="flex items-center"><span className="mr-2 font-bold">📱</span> Design responsivo em qualquer dispositivo</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-primary/5 p-6 rounded-lg shadow-sm">
                    <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                      <span className="mr-2 text-3xl">📌</span> Objetivos Específicos
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-primary">
                        <p className="text-muted-foreground">Coletar e organizar dados públicos de segurança, com base em fontes como o dados.gov.br</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-primary">
                        <p className="text-muted-foreground">Construir uma interface gráfica responsiva e intuitiva, acessível em diversos dispositivos</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-primary">
                        <p className="text-muted-foreground">Implementar filtros por tipo de ocorrência, período, localização e outros critérios relevantes</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-primary">
                        <p className="text-muted-foreground">Aplicar ferramentas de visualização de dados como dashboards, gráficos dinâmicos e mapas interativos</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-primary">
                        <p className="text-muted-foreground">Utilizar técnicas de análise preditiva para antecipar possíveis focos de criminalidade</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                      <span className="mr-2 text-3xl">👥</span> Equipe do Projeto
                    </h2>
                    <div className="mb-4">
                      <p className="text-muted-foreground">
                        Este projeto é uma iniciativa dos alunos do curso de Análise e Desenvolvimento 
                        de Sistemas do Centro Universitário FACENS, desenvolvido como parte da disciplina 
                        UPX2 - Usina de Projetos Experimentais II.
                      </p>
                    </div>
                    
                    <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                      <p className="font-medium mb-1">Orientador:</p>
                      <p className="text-muted-foreground mb-4">Prof. Evandro Klengenfuss Veronez</p>
                      
                      <p className="font-medium mb-1">Equipe de Desenvolvimento:</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        <div className="bg-secondary/20 p-2 rounded text-center text-muted-foreground">André Vitor</div>
                        <div className="bg-secondary/20 p-2 rounded text-center text-muted-foreground">João Iauch</div>
                        <div className="bg-secondary/20 p-2 rounded text-center text-muted-foreground">João Honorato</div>
                        <div className="bg-secondary/20 p-2 rounded text-center text-muted-foreground">Kaick Gomes</div>
                        <div className="bg-secondary/20 p-2 rounded text-center text-muted-foreground">Murilo Pires</div>
                        <div className="bg-secondary/20 p-2 rounded text-center text-muted-foreground">Philippe Georges</div>
                      </div>
                      
                      <p className="text-muted-foreground mt-4">Semestre: 2º Semestre – 2025</p>
                    </div>
                  </div>

                  <div className="bg-primary/5 p-6 rounded-lg shadow-sm border border-primary/20">
                    <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                      <span className="mr-2 text-3xl">📢</span> Conclusão
                    </h2>
                    <p className="text-muted-foreground">
                      O INFOSP reforça o papel da tecnologia como aliada na busca por uma sociedade mais segura. 
                      Ao oferecer uma ferramenta de análise de dados aberta e acessível, o projeto contribui com a 
                      construção de políticas públicas mais eficientes, baseadas em evidências concretas e na participação ativa da população.
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
