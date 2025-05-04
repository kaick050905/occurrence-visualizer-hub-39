
import React from "react";
import DashboardHeaderWithLang from "@/components/DashboardHeaderWithLang";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { useGlobal } from "@/contexts/GlobalContext";

const About: React.FC = () => {
  const { currentLanguage } = useGlobal();

  // Traduções específicas para esta página
  const pageTranslations = {
    dashboard: {
      'pt-BR': 'Dashboard',
      'en': 'Dashboard',
      'es': 'Panel de Control'
    },
    reports: {
      'pt-BR': 'Relatórios',
      'en': 'Reports',
      'es': 'Informes'
    },
    about: {
      'pt-BR': 'Sobre o projeto',
      'en': 'About the project',
      'es': 'Sobre el proyecto'
    },
    projectName: {
      'pt-BR': '🔍 Projeto INFOSP',
      'en': '🔍 INFOSP Project',
      'es': '🔍 Proyecto INFOSP'
    },
    subtitle: {
      'pt-BR': 'Mapeamento e Análise Preditiva de Ocorrências Criminais no Estado de São Paulo',
      'en': 'Mapping and Predictive Analysis of Criminal Occurrences in the State of São Paulo',
      'es': 'Mapeo y Análisis Predictivo de Incidencias Criminales en el Estado de São Paulo'
    },
    generalObjective: {
      'pt-BR': 'Objetivo Geral',
      'en': 'General Objective',
      'es': 'Objetivo General'
    },
    objectiveDescription: {
      'pt-BR': 'Desenvolver uma plataforma interativa que reúna, organize e exiba dados públicos sobre ocorrências criminais no Estado de São Paulo. A plataforma utiliza recursos visuais, como mapas, gráficos e dashboards, além de ferramentas de análise preditiva que ajudam a identificar padrões e tendências criminais.',
      'en': 'Develop an interactive platform that gathers, organizes, and displays public data on criminal occurrences in the State of São Paulo. The platform uses visual resources such as maps, charts, and dashboards, as well as predictive analysis tools that help identify criminal patterns and trends.',
      'es': 'Desarrollar una plataforma interactiva que reúna, organice y muestre datos públicos sobre incidencias criminales en el Estado de São Paulo. La plataforma utiliza recursos visuales como mapas, gráficos y paneles, además de herramientas de análisis predictivo que ayudan a identificar patrones y tendencias criminales.'
    },
    technologiesFeatures: {
      'pt-BR': 'Tecnologias e Funcionalidades',
      'en': 'Technologies and Features',
      'es': 'Tecnologías y Funcionalidades'
    },
    geolocation: {
      'pt-BR': 'Geolocalização e mapas de calor com base em ocorrências registradas',
      'en': 'Geolocation and heat maps based on recorded occurrences',
      'es': 'Geolocalización y mapas de calor basados en incidencias registradas'
    },
    dashboards: {
      'pt-BR': 'Dashboards interativos com gráficos atualizados',
      'en': 'Interactive dashboards with updated charts',
      'es': 'Paneles interactivos con gráficos actualizados'
    },
    temporalAnalysis: {
      'pt-BR': 'Análise temporal para identificação de sazonalidades',
      'en': 'Temporal analysis for seasonality identification',
      'es': 'Análisis temporal para identificación de estacionalidades'
    },
    predictiveAlgorithms: {
      'pt-BR': 'Algoritmos preditivos para análise de risco',
      'en': 'Predictive algorithms for risk analysis',
      'es': 'Algoritmos predictivos para análisis de riesgo'
    },
    responsiveDesign: {
      'pt-BR': 'Design responsivo em qualquer dispositivo',
      'en': 'Responsive design on any device',
      'es': 'Diseño responsivo en cualquier dispositivo'
    },
    specificObjectives: {
      'pt-BR': 'Objetivos Específicos',
      'en': 'Specific Objectives',
      'es': 'Objetivos Específicos'
    },
    dataCollection: {
      'pt-BR': 'Coletar e organizar dados públicos de segurança, com base em fontes como o dados.gov.br',
      'en': 'Collect and organize public security data, based on sources such as dados.gov.br',
      'es': 'Recopilar y organizar datos públicos de seguridad, basados en fuentes como dados.gov.br'
    },
    interface: {
      'pt-BR': 'Construir uma interface gráfica responsiva e intuitiva, acessível em diversos dispositivos',
      'en': 'Build a responsive and intuitive graphical interface, accessible on various devices',
      'es': 'Construir una interfaz gráfica responsiva e intuitiva, accesible en diversos dispositivos'
    },
    filters: {
      'pt-BR': 'Implementar filtros por tipo de ocorrência, período, localização e outros critérios relevantes',
      'en': 'Implement filters by occurrence type, period, location, and other relevant criteria',
      'es': 'Implementar filtros por tipo de incidencia, período, ubicación y otros criterios relevantes'
    },
    visualization: {
      'pt-BR': 'Aplicar ferramentas de visualização de dados como dashboards, gráficos dinâmicos e mapas interativos',
      'en': 'Apply data visualization tools such as dashboards, dynamic charts, and interactive maps',
      'es': 'Aplicar herramientas de visualización de datos como paneles, gráficos dinámicos y mapas interactivos'
    },
    predictive: {
      'pt-BR': 'Utilizar técnicas de análise preditiva para antecipar possíveis focos de criminalidade',
      'en': 'Use predictive analysis techniques to anticipate possible crime hotspots',
      'es': 'Utilizar técnicas de análisis predictivo para anticipar posibles focos de criminalidad'
    },
    projectTeam: {
      'pt-BR': 'Equipe do Projeto',
      'en': 'Project Team',
      'es': 'Equipo del Proyecto'
    },
    teamDescription: {
      'pt-BR': 'Este projeto é uma iniciativa dos alunos do curso de Análise e Desenvolvimento de Sistemas do Centro Universitário FACENS, desenvolvido como parte da disciplina UPX2 - Usina de Projetos Experimentais II.',
      'en': 'This project is an initiative of students from the Systems Analysis and Development course at FACENS University Center, developed as part of the UPX2 - Experimental Project Plant II discipline.',
      'es': 'Este proyecto es una iniciativa de los estudiantes del curso de Análisis y Desarrollo de Sistemas del Centro Universitario FACENS, desarrollado como parte de la asignatura UPX2 - Usina de Proyectos Experimentales II.'
    },
    advisor: {
      'pt-BR': 'Orientador:',
      'en': 'Advisor:',
      'es': 'Orientador:'
    },
    devTeam: {
      'pt-BR': 'Equipe de Desenvolvimento:',
      'en': 'Development Team:',
      'es': 'Equipo de Desarrollo:'
    },
    semester: {
      'pt-BR': 'Semestre: 2º Semestre – 2025',
      'en': 'Semester: 2nd Semester – 2025',
      'es': 'Semestre: 2º Semestre – 2025'
    },
    conclusion: {
      'pt-BR': 'Conclusão',
      'en': 'Conclusion',
      'es': 'Conclusión'
    },
    conclusionText: {
      'pt-BR': 'O INFOSP reforça o papel da tecnologia como aliada na busca por uma sociedade mais segura. Ao oferecer uma ferramenta de análise de dados aberta e acessível, o projeto contribui com a construção de políticas públicas mais eficientes, baseadas em evidências concretas e na participação ativa da população.',
      'en': 'INFOSP reinforces the role of technology as an ally in the search for a safer society. By offering an open and accessible data analysis tool, the project contributes to the construction of more efficient public policies, based on concrete evidence and active population participation.',
      'es': 'INFOSP refuerza el papel de la tecnología como aliada en la búsqueda de una sociedad más segura. Al ofrecer una herramienta de análisis de datos abierta y accesible, el proyecto contribuye a la construcción de políticas públicas más eficientes, basadas en evidencias concretas y en la participación activa de la población.'
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container py-4 px-4 md:px-6 lg:px-8">
        <DashboardHeaderWithLang />
        
        <Tabs defaultValue="sobre" className="mb-6">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="dashboard" asChild>
              <Link to="/">{pageTranslations.dashboard[currentLanguage]}</Link>
            </TabsTrigger>
            <TabsTrigger value="relatorios" asChild>
              <Link to="/relatorios">{pageTranslations.reports[currentLanguage]}</Link>
            </TabsTrigger>
            <TabsTrigger value="sobre">{pageTranslations.about[currentLanguage]}</TabsTrigger>
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
                    <h1 className="text-4xl font-bold mb-4 text-primary">
                      {pageTranslations.projectName[currentLanguage]}
                    </h1>
                    <div className="h-1 w-24 bg-primary mx-auto mb-6 rounded-full"></div>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                      {pageTranslations.subtitle[currentLanguage]}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-secondary/20 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                      <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                        <span className="mr-2 text-3xl">🎯</span> {pageTranslations.generalObjective[currentLanguage]}
                      </h2>
                      <p className="text-muted-foreground">
                        {pageTranslations.objectiveDescription[currentLanguage]}
                      </p>
                    </div>

                    <div className="bg-secondary/20 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                      <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                        <span className="mr-2 text-3xl">🧠</span> {pageTranslations.technologiesFeatures[currentLanguage]}
                      </h2>
                      <ul className="list-none space-y-2 text-muted-foreground">
                        <li className="flex items-center"><span className="mr-2 font-bold">🗺️</span> {pageTranslations.geolocation[currentLanguage]}</li>
                        <li className="flex items-center"><span className="mr-2 font-bold">📊</span> {pageTranslations.dashboards[currentLanguage]}</li>
                        <li className="flex items-center"><span className="mr-2 font-bold">⏱️</span> {pageTranslations.temporalAnalysis[currentLanguage]}</li>
                        <li className="flex items-center"><span className="mr-2 font-bold">🧮</span> {pageTranslations.predictiveAlgorithms[currentLanguage]}</li>
                        <li className="flex items-center"><span className="mr-2 font-bold">📱</span> {pageTranslations.responsiveDesign[currentLanguage]}</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-primary/5 p-6 rounded-lg shadow-sm">
                    <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                      <span className="mr-2 text-3xl">📌</span> {pageTranslations.specificObjectives[currentLanguage]}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-primary">
                        <p className="text-muted-foreground">{pageTranslations.dataCollection[currentLanguage]}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-primary">
                        <p className="text-muted-foreground">{pageTranslations.interface[currentLanguage]}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-primary">
                        <p className="text-muted-foreground">{pageTranslations.filters[currentLanguage]}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-primary">
                        <p className="text-muted-foreground">{pageTranslations.visualization[currentLanguage]}</p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-primary">
                        <p className="text-muted-foreground">{pageTranslations.predictive[currentLanguage]}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                      <span className="mr-2 text-3xl">👥</span> {pageTranslations.projectTeam[currentLanguage]}
                    </h2>
                    <div className="mb-4">
                      <p className="text-muted-foreground">
                        {pageTranslations.teamDescription[currentLanguage]}
                      </p>
                    </div>
                    
                    <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                      <p className="font-medium mb-1">{pageTranslations.advisor[currentLanguage]}</p>
                      <p className="text-muted-foreground mb-4">Prof. Evandro Klengenfuss Veronez</p>
                      
                      <p className="font-medium mb-1">{pageTranslations.devTeam[currentLanguage]}</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        <div className="bg-secondary/20 p-2 rounded text-center text-muted-foreground">André Vitor</div>
                        <div className="bg-secondary/20 p-2 rounded text-center text-muted-foreground">João Iauch</div>
                        <div className="bg-secondary/20 p-2 rounded text-center text-muted-foreground">João Honorato</div>
                        <div className="bg-secondary/20 p-2 rounded text-center text-muted-foreground">Kaick Gomes</div>
                        <div className="bg-secondary/20 p-2 rounded text-center text-muted-foreground">Murilo Pires</div>
                        <div className="bg-secondary/20 p-2 rounded text-center text-muted-foreground">Philippe Georges</div>
                      </div>
                      
                      <p className="text-muted-foreground mt-4">{pageTranslations.semester[currentLanguage]}</p>
                    </div>
                  </div>

                  <div className="bg-primary/5 p-6 rounded-lg shadow-sm border border-primary/20">
                    <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
                      <span className="mr-2 text-3xl">📢</span> {pageTranslations.conclusion[currentLanguage]}
                    </h2>
                    <p className="text-muted-foreground">
                      {pageTranslations.conclusionText[currentLanguage]}
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
