import React, { createContext, useContext, useState, useEffect } from 'react';

// Define os idiomas suportados
export type Language = 'pt' | 'en' | 'es';

// Interface para as traduções
export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Traduções para os componentes da aplicação
export const translations: Translations = {
  dashboard: {
    pt: 'Painel',
    en: 'Dashboard',
    es: 'Panel'
  },
  reports: {
    pt: 'Relatórios',
    en: 'Reports',
    es: 'Informes'
  },
  about: {
    pt: 'Sobre o projeto',
    en: 'About the project',
    es: 'Sobre el proyecto'
  },
  dangerousCity: {
    pt: 'Cidade Mais Perigosa',
    en: 'Most Dangerous City',
    es: 'Ciudad Más Peligrosa'
  },
  safeCity: {
    pt: 'Cidade Mais Segura',
    en: 'Safest City',
    es: 'Ciudad Más Segura'
  },
  dangerousRegion: {
    pt: 'Região Mais Perigosa',
    en: 'Most Dangerous Region',
    es: 'Región Más Peligrosa'
  },
  safeRegion: {
    pt: 'Região Mais Segura',
    en: 'Safest Region',
    es: 'Región Más Segura'
  },
  theft: {
    pt: 'Furto',
    en: 'Theft',
    es: 'Hurto'
  },
  rape: {
    pt: 'Estupro',
    en: 'Rape',
    es: 'Violación'
  },
  homicide: {
    pt: 'Homicídio',
    en: 'Homicide',
    es: 'Asesinato'
  },
  robbery: {
    pt: 'Roubo',
    en: 'Robbery',
    es: 'Robo'
  },
  numberOfThefts: {
    pt: 'Número de Furtos',
    en: 'Number of Thefts',
    es: 'Número de Hurtos'
  },
  numberOfRobberies: {
    pt: 'Número de Roubos',
    en: 'Number of Robberies',
    es: 'Número de Robos'
  },
  annualGrowth: {
    pt: 'crescimento anual',
    en: 'annual growth',
    es: 'crecimiento anual'
  },
  geographicDistribution: {
    pt: 'Distribuição Geográfica',
    en: 'Geographic Distribution',
    es: 'Distribución Geográfica'
  },
  localityData: {
    pt: 'Dados por Localidade',
    en: 'Locality Data',
    es: 'Datos por Localidad'
  },
  recentOccurrences: {
    pt: 'Ocorrências Recentes',
    en: 'Recent Occurrences',
    es: 'Ocurrencias Recientes'
  },
  occurrenceCharts: {
    pt: 'Gráficos de Ocorrências',
    en: 'Occurrence Charts',
    es: 'Gráficos de Ocurrencias'
  },
  lightMode: {
    pt: 'Modo claro',
    en: 'Light mode',
    es: 'Modo claro'
  },
  darkMode: {
    pt: 'Modo escuro',
    en: 'Dark mode',
    es: 'Modo oscuro'
  },
  language: {
    pt: 'Idioma',
    en: 'Language',
    es: 'Idioma'
  },
  portuguese: {
    pt: 'Português',
    en: 'Portuguese',
    es: 'Portugués'
  },
  english: {
    pt: 'Inglês',
    en: 'English',
    es: 'Inglés'
  },
  spanish: {
    pt: 'Espanhol',
    en: 'Spanish',
    es: 'Español'
  },
  // Novas traduções para todas as páginas
  // Reports page
  availableReports: {
    pt: 'Relatórios Disponíveis',
    en: 'Available Reports',
    es: 'Informes Disponibles'
  },
  accessSystemReports: {
    pt: 'Acesse os relatórios do sistema',
    en: 'Access system reports',
    es: 'Acceder a los informes del sistema'
  },
  downloadSpreadsheet: {
    pt: 'Baixar Planilha',
    en: 'Download Spreadsheet',
    es: 'Descargar Hoja de Cálculo'
  },
  accessAndExport: {
    pt: 'Acesse e exporte relatórios de segurança e ocorrências',
    en: 'Access and export security and occurrence reports',
    es: 'Accede y exporta informes de seguridad y ocurrencias'
  },
  reportID: {
    pt: 'ID',
    en: 'ID',
    es: 'ID'
  },
  reportTitle: {
    pt: 'Título',
    en: 'Title',
    es: 'Título'
  },
  reportDate: {
    pt: 'Data',
    en: 'Date',
    es: 'Fecha'
  },
  reportType: {
    pt: 'Tipo',
    en: 'Type',
    es: 'Tipo'
  },
  reportStatus: {
    pt: 'Status',
    en: 'Status',
    es: 'Estado'
  },
  reportAction: {
    pt: 'Ação',
    en: 'Action',
    es: 'Acción'
  },
  download: {
    pt: 'Baixar',
    en: 'Download',
    es: 'Descargar'
  },
  available: {
    pt: 'Disponível',
    en: 'Available',
    es: 'Disponible'
  },
  monthly: {
    pt: 'Mensal',
    en: 'Monthly',
    es: 'Mensual'
  },
  monthlyAnalysis: {
    pt: 'Análise mensal de ocorrências',
    en: 'Monthly occurrence analysis',
    es: 'Análisis mensual de ocurrencias'
  },
  downloadStarted: {
    pt: 'Download da planilha iniciado',
    en: 'Spreadsheet download started',
    es: 'Descarga de la hoja de cálculo iniciada'
  },
  // Geographic Distribution
  distribution: {
    pt: 'Distribuição',
    en: 'Distribution',
    es: 'Distribución'
  },
  byRegion: {
    pt: 'Por Região',
    en: 'By Region',
    es: 'Por Región'
  },
  byType: {
    pt: 'Por Tipo',
    en: 'By Type',
    es: 'Por Tipo'
  },
  occurrences: {
    pt: 'ocorrências',
    en: 'occurrences',
    es: 'ocurrencias'
  },
  // Regional Data
  regionalData: {
    pt: 'Dados por Região',
    en: 'Regional Data',
    es: 'Datos Regionales'
  },
  detailedAnalysis: {
    pt: 'Análise detalhada de ocorrências por região e bairro',
    en: 'Detailed analysis of occurrences by region and neighborhood',
    es: 'Análisis detallado de ocurrencias por región y barrio'
  },
  regions: {
    pt: 'Regiões',
    en: 'Regions',
    es: 'Regiones'
  },
  occurrencesByRegion: {
    pt: 'Distribuição de ocorrências por região',
    en: 'Distribution of occurrences by region',
    es: 'Distribución de ocurrencias por región'
  },
  neighborhoods: {
    pt: 'Bairros',
    en: 'Neighborhoods',
    es: 'Barrios'
  },
  clearFilter: {
    pt: 'Limpar Filtro',
    en: 'Clear Filter',
    es: 'Limpiar Filtro'
  },
  searchNeighborhood: {
    pt: 'Pesquisar bairro...',
    en: 'Search neighborhood...',
    es: 'Buscar barrio...'
  },
  occurrencesInNeighborhoods: {
    pt: 'Ocorrências em bairros da',
    en: 'Occurrences in neighborhoods of',
    es: 'Ocurrencias en barrios de'
  },
  occurrencesByNeighborhood: {
    pt: 'Ocorrências por bairro em todas as regiões',
    en: 'Occurrences by neighborhood in all regions',
    es: 'Ocurrencias por barrio en todas las regiones'
  },
  noNeighborhood: {
    pt: 'Nenhum bairro encontrado',
    en: 'No neighborhood found',
    es: 'No se encontró ningún barrio'
  },
  heatMap: {
    pt: 'Mapa de Calor',
    en: 'Heat Map',
    es: 'Mapa de Calor'
  },
  geographicVisualization: {
    pt: 'Visualização geográfica das ocorrências por região',
    en: 'Geographic visualization of occurrences by region',
    es: 'Visualización geográfica de ocurrencias por región'
  },
  mapInDevelopment: {
    pt: 'Mapa em desenvolvimento',
    en: 'Map in development',
    es: 'Mapa en desarrollo'
  },
  heatMapSoon: {
    pt: 'O mapa de calor com visualização geográfica das ocorrências estará disponível em breve.',
    en: 'The heat map with geographic visualization of occurrences will be available soon.',
    es: 'El mapa de calor con visualización geográfica de las ocurrencias estará disponible pronto.'
  },
  // Recent Occurrences
  mostRecurringOccurrences: {
    pt: 'Ocorrências Mais Recorrentes',
    en: 'Most Recurring Occurrences',
    es: 'Ocurrencias Más Recurrentes'
  },
  mostFrequentTypes: {
    pt: 'Tipos de ocorrências mais frequentes no sistema',
    en: 'Most frequent types of occurrences in the system',
    es: 'Tipos de ocurrencias más frecuentes en el sistema'
  },
  filter: {
    pt: 'Filtrar',
    en: 'Filter',
    es: 'Filtrar'
  },
  filterByLevel: {
    pt: 'Filtrar por nível',
    en: 'Filter by level',
    es: 'Filtrar por nivel'
  },
  typeId: {
    pt: 'ID Tipo',
    en: 'Type ID',
    es: 'ID Tipo'
  },
  description: {
    pt: 'Descrição',
    en: 'Description',
    es: 'Descripción'
  },
  level: {
    pt: 'Nível',
    en: 'Level',
    es: 'Nivel'
  },
  totalOccurrences: {
    pt: 'Total Ocorrências',
    en: 'Total Occurrences',
    es: 'Total Ocurrencias'
  },
  showingOf: {
    pt: 'Mostrando',
    en: 'Showing',
    es: 'Mostrando'
  },
  of: {
    pt: 'de',
    en: 'of',
    es: 'de'
  },
  viewAll: {
    pt: 'Ver Todas',
    en: 'View All',
    es: 'Ver Todas'
  },
  referenceCode: {
    pt: 'Código de referência',
    en: 'Reference code',
    es: 'Código de referencia'
  },
  occurrencePercentage: {
    pt: 'Este tipo de ocorrência representa',
    en: 'This type of occurrence represents',
    es: 'Este tipo de ocurrencia representa'
  },
  ofTotalRecorded: {
    pt: 'do total registrado',
    en: 'of the total recorded',
    es: 'del total registrado'
  },
  // Critical, High, Medium, Low
  critical: {
    pt: 'Crítica',
    en: 'Critical',
    es: 'Crítica'
  },
  high: {
    pt: 'Alta',
    en: 'High',
    es: 'Alta'
  },
  medium: {
    pt: 'Média',
    en: 'Medium',
    es: 'Media'
  },
  low: {
    pt: 'Baixa',
    en: 'Low',
    es: 'Baja'
  },
  // City and Region Details
  cityDetails: {
    pt: 'Detalhes da Cidade',
    en: 'City Details',
    es: 'Detalles de la Ciudad'
  },
  regionDetails: {
    pt: 'Detalhes da Região',
    en: 'Region Details',
    es: 'Detalles de la Región'
  },
  recordedCrimes: {
    pt: 'Números de crimes registrados e gráficos detalhados dos últimos anos',
    en: 'Numbers of recorded crimes and detailed charts from recent years',
    es: 'Números de delitos registrados y gráficos detallados de los últimos años'
  },
  bars: {
    pt: 'Barras',
    en: 'Bars',
    es: 'Barras'
  },
  lines: {
    pt: 'Linhas',
    en: 'Lines',
    es: 'Líneas'
  },
  pie: {
    pt: 'Pizza',
    en: 'Pie',
    es: 'Circular'
  },
  cities: {
    pt: 'Cidades',
    en: 'Cities',
    es: 'Ciudades'
  },
  crimesByYear: {
    pt: 'Crimes por Ano',
    en: 'Crimes by Year',
    es: 'Crímenes por Año'
  },
  temporalEvolution: {
    pt: 'Evolução Temporal',
    en: 'Temporal Evolution',
    es: 'Evolución Temporal'
  },
  distributionByType: {
    pt: 'Distribuição por Tipo',
    en: 'Distribution by Type',
    es: 'Distribución por Tipo'
  },
  citiesOfRegion: {
    pt: 'Cidades da Região',
    en: 'Cities of the Region',
    es: 'Ciudades de la Región'
  },
  population: {
    pt: 'População',
    en: 'Population',
    es: 'Población'
  },
  occurrencesIn2024: {
    pt: 'Ocorrências em 2024',
    en: 'Occurrences in 2024',
    es: 'Ocurrencias en 2024'
  },
  // NotFound page
  notFoundTitle: {
    pt: '404',
    en: '404',
    es: '404'
  },
  pageNotFound: {
    pt: 'Oops! Página não encontrada',
    en: 'Oops! Page not found',
    es: 'Oops! Página no encontrada'
  },
  returnToHome: {
    pt: 'Retornar à Página Inicial',
    en: 'Return to Home',
    es: 'Volver al Inicio'
  },
  // About page
  projectInfoSP: {
    pt: '🔍 Projeto INFOSP',
    en: '🔍 INFOSP Project',
    es: '🔍 Proyecto INFOSP'
  },
  mappingAndAnalysis: {
    pt: 'Mapeamento e Análise Preditiva de Ocorrências Criminais no Estado de São Paulo',
    en: 'Mapping and Predictive Analysis of Criminal Occurrences in the State of São Paulo',
    es: 'Mapeo y Análisis Predictivo de Ocurrencias Criminales en el Estado de São Paulo'
  },
  generalObjective: {
    pt: 'Objetivo Geral',
    en: 'General Objective',
    es: 'Objetivo General'
  },
  generalObjectiveDesc: {
    pt: 'Desenvolver uma plataforma interativa que reúna, organize e exiba dados públicos sobre ocorrências criminais no Estado de São Paulo. A plataforma utiliza recursos visuais, como mapas, gráficos e dashboards, além de ferramentas de análise preditiva que ajudam a identificar padrões e tendências criminais.',
    en: 'Develop an interactive platform that collects, organizes, and displays public data on criminal occurrences in the State of São Paulo. The platform uses visual resources, such as maps, charts, and dashboards, as well as predictive analysis tools that help identify criminal patterns and trends.',
    es: 'Desarrollar una plataforma interactiva que reúna, organice y muestre datos públicos sobre ocurrencias criminales en el Estado de São Paulo. La plataforma utiliza recursos visuales, como mapas, gráficos y paneles, además de herramientas de análisis predictivo que ayudan a identificar patrones y tendencias criminales.'
  },
  technologiesAndFeatures: {
    pt: 'Tecnologias e Funcionalidades',
    en: 'Technologies and Features',
    es: 'Tecnologías y Funcionalidades'
  },
  geolocation: {
    pt: 'Geolocalização e mapas de calor com base em ocorrências registradas',
    en: 'Geolocation and heat maps based on registered occurrences',
    es: 'Geolocalización y mapas de calor basados en ocurrencias registradas'
  },
  interactiveDashboards: {
    pt: 'Dashboards interativos com gráficos atualizados',
    en: 'Interactive dashboards with updated charts',
    es: 'Paneles interactivos con gráficos actualizados'
  },
  temporalAnalysis: {
    pt: 'Análise temporal para identificação de sazonalidades',
    en: 'Temporal analysis for seasonality identification',
    es: 'Análisis temporal para identificación de estacionalidades'
  },
  predictiveAlgorithms: {
    pt: 'Algoritmos preditivos para análise de risco',
    en: 'Predictive algorithms for risk analysis',
    es: 'Algoritmos predictivos para análisis de riesgo'
  },
  responsiveDesign: {
    pt: 'Design responsivo em qualquer dispositivo',
    en: 'Responsive design on any device',
    es: 'Diseño responsivo en cualquier dispositivo'
  },
  specificObjectives: {
    pt: 'Objetivos Específicos',
    en: 'Specific Objectives',
    es: 'Objetivos Específicos'
  },
  collectData: {
    pt: 'Coletar e organizar dados públicos de segurança, com base em fontes como o dados.gov.br',
    en: 'Collect and organize public security data, based on sources such as dados.gov.br',
    es: 'Recopilar y organizar datos públicos de seguridad, basados en fuentes como dados.gov.br'
  },
  buildInterface: {
    pt: 'Construir uma interface gráfica responsiva e intuitiva, acessível em diversos dispositivos',
    en: 'Build a responsive and intuitive graphical interface, accessible on various devices',
    es: 'Construir una interfaz gráfica receptiva e intuitiva, accesible en varios dispositivos'
  },
  implementFilters: {
    pt: 'Implementar filtros por tipo de ocorrência, período, localização e outros critérios relevantes',
    en: 'Implement filters by type of occurrence, period, location, and other relevant criteria',
    es: 'Implementar filtros por tipo de ocurrencia, período, ubicación y otros criterios relevantes'
  },
  applyVisualization: {
    pt: 'Aplicar ferramentas de visualização de dados como dashboards, gráficos dinâmicos e mapas interativos',
    en: 'Apply data visualization tools such as dashboards, dynamic charts, and interactive maps',
    es: 'Aplicar herramientas de visualización de datos como paneles, gráficos dinámicos y mapas interactivos'
  },
  usePredictive: {
    pt: 'Utilizar técnicas de análise preditiva para antecipar possíveis focos de criminalidade',
    en: 'Use predictive analysis techniques to anticipate possible crime hotspots',
    es: 'Utilizar técnicas de análisis predictivo para anticipar posibles focos de criminalidad'
  },
  projectTeam: {
    pt: 'Equipe do Projeto',
    en: 'Project Team',
    es: 'Equipo del Proyecto'
  },
  teamDescription: {
    pt: 'Este projeto é uma iniciativa dos alunos do curso de Análise e Desenvolvimento de Sistemas do Centro Universitário FACENS, desenvolvido como parte da disciplina UPX2 - Usina de Projetos Experimentais II.',
    en: 'This project is an initiative of students from the Systems Analysis and Development course at FACENS University Center, developed as part of the UPX2 - Experimental Projects Plant II discipline.',
    es: 'Este proyecto es una iniciativa de estudiantes del curso de Análisis y Desarrollo de Sistemas del Centro Universitario FACENS, desarrollado como parte de la disciplina UPX2 - Planta de Proyectos Experimentales II.'
  },
  advisor: {
    pt: 'Orientador',
    en: 'Advisor',
    es: 'Asesor'
  },
  developmentTeam: {
    pt: 'Equipe de Desenvolvimento',
    en: 'Development Team',
    es: 'Equipo de Desarrollo'
  },
  semester: {
    pt: 'Semestre',
    en: 'Semestre',
    es: 'Semestre'
  },
  semesterValue: {
    pt: '2º Semestre – 2025',
    en: '2nd Semester – 2025',
    es: '2do Semestre – 2025'
  },
  conclusion: {
    pt: 'Conclusão',
    en: 'Conclusion',
    es: 'Conclusión'
  },
  conclusionText: {
    pt: 'O INFOSP reforça o papel da tecnologia como aliada na busca por uma sociedade mais segura. Ao oferecer uma ferramenta de análise de dados aberta e acessível, o projeto contribui com a construção de políticas públicas mais eficientes, baseadas em evidências concretas e na participação ativa da população.',
    en: 'INFOSP reinforces the role of technology as an ally in the search for a safer society. By offering an open and accessible data analysis tool, the project contributes to the construction of more efficient public policies, based on concrete evidence and active participation of the population.',
    es: 'INFOSP refuerza el papel de la tecnología como aliada en la búsqueda de una sociedad más segura. Al ofrecer una herramienta de análisis de datos abierta y accesible, el proyecto contribuye a la construcción de políticas públicas más eficientes, basadas en evidencias concretas y en la participación activa de la población.'
  },
  // Footer
  allDataFrom: {
    pt: 'Todos os dados foram retirados da',
    en: 'All data was taken from the',
    es: 'Todos los datos fueron tomados de la'
  },
  securityDepartment: {
    pt: 'Secretaria de Segurança Pública do Estado de São Paulo',
    en: 'São Paulo State Public Security Department',
    es: 'Secretaría de Seguridad Pública del Estado de São Paulo'
  },
  copyright: {
    pt: '© 2025 InfoSP - Sistema de Visualização de Ocorrências',
    en: '© 2025 InfoSP - Occurrence Visualization System',
    es: '© 2025 InfoSP - Sistema de Visualización de Ocurrencias'
  },
  // Back button
  back: {
    pt: 'Voltar',
    en: 'Back',
    es: 'Volver'
  },
  // Region/City not found
  regionNotFound: {
    pt: 'Região não encontrada',
    en: 'Region not found',
    es: 'Región no encontrada'
  },
  cityNotFound: {
    pt: 'Cidade não encontrada',
    en: 'City not found',
    es: 'Ciudad no encontrada'
  },
  noDataAvailable: {
    pt: 'Não existem dados disponíveis para essa região',
    en: 'No data available for this region',
    es: 'No hay datos disponibles para esta región'
  },
  noDataAvailableCity: {
    pt: 'Não existem dados disponíveis para essa cidade',
    en: 'No data available for this city',
    es: 'No hay datos disponibles para esta ciudad'
  },
  // Charts tooltips
  crimesByYearTooltip: {
    pt: 'Distribuição anual de crimes por tipo na região. Cada barra representa o número de ocorrências para cada categoria de crime.',
    en: 'Annual distribution of crimes by type in the region. Each bar represents the number of occurrences for each crime category.',
    es: 'Distribución anual de crímenes por tipo en la región. Cada barra representa el número de ocurrencias para cada categoría de crimen.'
  },
  temporalEvolutionTooltip: {
    pt: 'Tendência temporal dos diferentes tipos de crime na região, permitindo visualizar padrões de crescimento ou redução ao longo dos anos.',
    en: 'Temporal trend of different types of crime in the region, allowing visualization of growth or reduction patterns over the years.',
    es: 'Tendencia temporal de diferentes tipos de crimen en la región, permitiendo visualizar patrones de crecimiento o reducción a lo largo de los años.'
  },
  distributionByTypeTooltip: {
    pt: 'Proporção relativa de cada tipo de crime no total de ocorrências da região. Visualiza como cada crime contribui para o panorama geral de segurança.',
    en: 'Relative proportion of each type of crime in the total occurrences of the region. Visualizes how each crime contributes to the overall security landscape.',
    es: 'Proporción relativa de cada tipo de crimen en el total de ocurrencias de la región. Visualiza cómo cada crimen contribuye al panorama general de seguridad.'
  },
  citiesOfRegionTooltip: {
    pt: 'Lista de cidades pertencentes à região com suas respectivas informações demográficas e estatísticas de ocorrências.',
    en: 'List of cities belonging to the region with their respective demographic information and occurrence statistics.',
    es: 'Lista de ciudades pertenecientes a la región con su respectiva información demográfica y estadísticas de ocurrencias.'
  },
  // More terms for charts and other components
  in2024: {
    pt: 'em 2024',
    en: 'in 2024',
    es: 'en 2024'
  },
  // OccurrenceCharts
  top10Cities: {
    pt: 'Top 10 Cidades com Mais Ocorrências',
    en: 'Top 10 Cities with Most Occurrences',
    es: 'Top 10 Ciudades con Más Ocurrencias'
  },
  top10CitiesTooltip: {
    pt: 'As 10 cidades com maior número de ocorrências, coloridas por nível de severidade predominante. Barras mais longas indicam mais ocorrências.',
    en: 'The 10 cities with the highest number of occurrences, colored by predominant severity level. Longer bars indicate more occurrences.',
    es: 'Las 10 ciudades con mayor número de ocurrencias, coloreadas por nivel de severidad predominante. Barras más largas indican más ocurrencias.'
  },
  year: {
    pt: 'Ano',
    en: 'Year',
    es: 'Año'
  },
  crimeEvolutionByYear: {
    pt: 'Evolução de Crimes por Ano',
    en: 'Crime Evolution by Year',
    es: 'Evolución de Crímenes por Año'
  },
  crimeEvolutionTooltip: {
    pt: 'Evolução anual das ocorrências por tipo de crime. Selecione o tipo de crime para visualizar a tendência ao longo dos anos.',
    en: 'Annual evolution of occurrences by crime type. Select the crime type to visualize the trend over the years.',
    es: 'Evolución anual de las ocurrencias por tipo de crimen. Seleccione el tipo de crimen para visualizar la tendencia a lo largo de los años.'
  },
  crimeType: {
    pt: 'Tipo de Crime',
    en: 'Crime Type',
    es: 'Tipo de Crimen'
  },
  totalOf: {
    pt: 'Total de',
    en: 'Total of',
    es: 'Total de'
  },
  totalOccurrencesLastYears: {
    pt: 'Total de Ocorrências dos Últimos Anos',
    en: 'Total Occurrences of Recent Years',
    es: 'Total de Ocurrencias de los Últimos Años'
  },
  totalOccurrencesTooltip: {
    pt: 'Comparativo anual do total de ocorrências registradas. Barras em tons mais claros representam anos em andamento com dados parciais.',
    en: 'Annual comparison of total recorded occurrences. Bars in lighter shades represent years in progress with partial data.',
    es: 'Comparación anual del total de ocurrencias registradas. Las barras en tonos más claros representan años en curso con datos parciales.'
  },
  yearlyRecords: {
    pt: 'Registros anuais de 2022 a 2025',
    en: 'Annual records from 2022 to 2025',
    es: 'Registros anuales de 2022 a 2025'
  },
  distributionTooltip: {
    pt: 'Distribuição percentual das ocorrências por nível de prioridade. Cada segmento representa uma proporção das ocorrências totais conforme sua classificação de gravidade.',
    en: 'Percentage distribution of occurrences by priority level. Each segment represents a proportion of total occurrences according to their severity classification.',
    es: 'Distribución porcentual de las ocurrencias por nivel de prioridad. Cada segmento representa una proporción de las ocurrencias totales según su clasificación de gravedad.'
  },
  Críticas: {
    pt: 'Críticas',
    en: 'Critical',
    es: 'Críticas'
  },
  Altas: {
    pt: 'Altas',
    en: 'High',
    es: 'Altas'
  },
  Médias: {
    pt: 'Médias',
    en: 'Medium',
    es: 'Medias'
  },
  Baixas: {
    pt: 'Baixas',
    en: 'Low',
    es: 'Bajas'
  },
  // LocalityData
  localityDataDescription: {
    pt: 'Informações sobre cidades, população, IDH e ocorrências',
    en: 'Information about cities, population, HDI and occurrences',
    es: 'Información sobre ciudades, población, IDH y ocurrencias'
  },
  searchCityRegion: {
    pt: 'Pesquisar cidade ou região...',
    en: 'Search city or region...',
    es: 'Buscar ciudad o región...'
  },
  byCity: {
    pt: 'Por Cidade',
    en: 'By City',
    es: 'Por Ciudad'
  },
  byRegion: {
    pt: 'Por Região',
    en: 'By Region',
    es: 'Por Región'
  },
  region: {
    pt: 'Região',
    en: 'Region',
    es: 'Región'
  },
  noCityFound: {
    pt: 'Nenhuma cidade encontrada',
    en: 'No city found',
    es: 'Ninguna ciudad encontrada'
  },
  noRegionFound: {
    pt: 'Nenhuma região encontrada',
    en: 'No region found',
    es: 'Ninguna región encontrada'
  },
  occurrenceDistribution: {
    pt: 'Distribuição de ocorrências',
    en: 'Occurrence distribution',
    es: 'Distribución de ocurrencias'
  },
  regionRepresents: {
    pt: 'A região de',
    en: 'The region of',
    es: 'La región de'
  },
  representsPercentage: {
    pt: 'representa',
    en: 'represents',
    es: 'representa'
  },
  ofTotalOccurrences: {
    pt: 'das ocorrências totais no estado',
    en: 'of total occurrences in the state',
    es: 'de las ocurrencias totales en el estado'
  },
  withTotal: {
    pt: 'com um total de',
    en: 'with a total of',
    es: 'con un total de'
  },
  recordsIn2024: {
    pt: 'registros em 2024',
    en: 'records in 2024',
    es: 'registros en 2024'
  },
  viewRegionDetails: {
    pt: 'Ver detalhes da região',
    en: 'View region details',
    es: 'Ver detalles de la región'
  }
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Tenta recuperar o idioma do localStorage ou usa 'pt' como padrão
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'pt';
  });

  // Salva o idioma no localStorage quando ele muda
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Função para traduzir textos
  const t = (key: string): string => {
    const keys = key.split('.');
    let translation = translations;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (translation[keys[i]]) {
        translation = translation[keys[i]] as unknown as Translations;
      } else {
        return key;
      }
    }

    const lastKey = keys[keys.length - 1];
    
    if (translation[lastKey] && translation[lastKey][language]) {
      return translation[lastKey][language];
    }
    
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
