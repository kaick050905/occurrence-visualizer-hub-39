import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  pt: {
    // Existing translations
    dashboard: 'Painel',
    reports: 'Relatórios',
    about: 'Sobre',
    occurrences: 'Ocorrências',
    analytics: 'Análise',
    settings: 'Configurações',
    systemName: 'Sistema de Segurança Pública',
    totalOccurrences: 'Total de Ocorrências',
    criticalAlerts: 'Alertas Críticos',
    monthlyGrowth: 'Crescimento Mensal',
    
    // New translations for Reports page
    dataVisualization: 'Visualização de Dados',
    interactiveCharts: 'Gráficos Interativos para Análise',
    pieChart: 'Gráfico Pizza',
    lineChart: 'Gráfico Linhas',
    completeOccurrenceReport: 'Relatório Completo de Ocorrências',
    allOccurrenceTypes: 'Todos os Tipos de Ocorrência',
    to: 'ao',
    total: 'Total',
    year: 'Ano',
    
    // Occurrence types (OCO-01 to OCO-23)
    vehicleTheft: 'Furto de Veículo',
    streetLightingIssue: 'Problema de Iluminação Pública',
    trafficAccident: 'Acidente de Trânsito',
    propertyInvasion: 'Invasão de Propriedade',
    publicPropertyVandalism: 'Vandalismo de Patrimônio Público',
    domesticViolence: 'Violência Doméstica',
    drugTrafficking: 'Tráfico de Drogas',
    armedRobbery: 'Assalto à Mão Armada',
    noisePollution: 'Poluição Sonora',
    waterIssues: 'Problemas de Água',
    illegalConstruction: 'Construção Irregular',
    animalAbuse: 'Maus-tratos de Animais',
    environmentalCrime: 'Crime Ambiental',
    publicTransportIssue: 'Problema no Transporte Público',
    cybercrime: 'Crime Cibernético',
    fraudAndScam: 'Fraude e Golpe',
    publicHealthViolation: 'Violação de Saúde Pública',
    childAbuse: 'Abuso Infantil',
    elderlyAbuse: 'Abuso de Idosos',
    corruptionCase: 'Caso de Corrupção',
    hateCrime: 'Crime de Ódio',
    terrorism: 'Terrorismo',
    humanTrafficking: 'Tráfico Humano',
    
    // Status levels
    critical: 'Crítica',
    high: 'Alta',
    medium: 'Média',
    low: 'Baixa',
    
    // Other existing translations
    accessAndExport: 'Acesse e exporte dados do sistema',
    downloadSpreadsheet: 'Baixar Planilha',
    downloadStarted: 'Download iniciado',
    typeId: 'ID do Tipo',
    description: 'Descrição',
    level: 'Nível'
  },
  en: {
    // Existing translations
    dashboard: 'Dashboard',
    reports: 'Reports',
    about: 'About',
    occurrences: 'Occurrences',
    analytics: 'Analytics',
    settings: 'Settings',
    systemName: 'Public Security System',
    totalOccurrences: 'Total Occurrences',
    criticalAlerts: 'Critical Alerts',
    monthlyGrowth: 'Monthly Growth',
    
    // New translations for Reports page
    dataVisualization: 'Data Visualization',
    interactiveCharts: 'Interactive Charts for Analysis',
    pieChart: 'Pie Chart',
    lineChart: 'Line Chart',
    completeOccurrenceReport: 'Complete Occurrence Report',
    allOccurrenceTypes: 'All Occurrence Types',
    to: 'to',
    total: 'Total',
    year: 'Year',
    
    // Occurrence types (OCO-01 to OCO-23)
    vehicleTheft: 'Vehicle Theft',
    streetLightingIssue: 'Street Lighting Issue',
    trafficAccident: 'Traffic Accident',
    propertyInvasion: 'Property Invasion',
    publicPropertyVandalism: 'Public Property Vandalism',
    domesticViolence: 'Domestic Violence',
    drugTrafficking: 'Drug Trafficking',
    armedRobbery: 'Armed Robbery',
    noisePollution: 'Noise Pollution',
    waterIssues: 'Water Issues',
    illegalConstruction: 'Illegal Construction',
    animalAbuse: 'Animal Abuse',
    environmentalCrime: 'Environmental Crime',
    publicTransportIssue: 'Public Transport Issue',
    cybercrime: 'Cybercrime',
    fraudAndScam: 'Fraud and Scam',
    publicHealthViolation: 'Public Health Violation',
    childAbuse: 'Child Abuse',
    elderlyAbuse: 'Elderly Abuse',
    corruptionCase: 'Corruption Case',
    hateCrime: 'Hate Crime',
    terrorism: 'Terrorism',
    humanTrafficking: 'Human Trafficking',
    
    // Status levels
    critical: 'Critical',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    
    // Other existing translations
    accessAndExport: 'Access and export system data',
    downloadSpreadsheet: 'Download Spreadsheet',
    downloadStarted: 'Download started',
    typeId: 'Type ID',
    description: 'Description',
    level: 'Level'
  },
  es: {
    // Existing translations
    dashboard: 'Panel',
    reports: 'Informes',
    about: 'Acerca de',
    occurrences: 'Ocurrencias',
    analytics: 'Análisis',
    settings: 'Configuraciones',
    systemName: 'Sistema de Seguridad Pública',
    totalOccurrences: 'Total de Ocurrencias',
    criticalAlerts: 'Alertas Críticas',
    monthlyGrowth: 'Crecimiento Mensual',
    
    // New translations for Reports page
    dataVisualization: 'Visualización de Datos',
    interactiveCharts: 'Gráficos Interactivos para Análisis',
    pieChart: 'Gráfico Circular',
    lineChart: 'Gráfico de Líneas',
    completeOccurrenceReport: 'Informe Completo de Ocurrencias',
    allOccurrenceTypes: 'Todos los Tipos de Ocurrencia',
    to: 'al',
    total: 'Total',
    year: 'Año',
    
    // Occurrence types (OCO-01 to OCO-23)
    vehicleTheft: 'Robo de Vehículo',
    streetLightingIssue: 'Problema de Iluminación Pública',
    trafficAccident: 'Accidente de Tráfico',
    propertyInvasion: 'Invasión de Propiedad',
    publicPropertyVandalism: 'Vandalismo de Patrimonio Público',
    domesticViolence: 'Violencia Doméstica',
    drugTrafficking: 'Tráfico de Drogas',
    armedRobbery: 'Robo a Mano Armada',
    noisePollution: 'Contaminación Acústica',
    waterIssues: 'Problemas de Agua',
    illegalConstruction: 'Construcción Ilegal',
    animalAbuse: 'Maltrato Animal',
    environmentalCrime: 'Crimen Ambiental',
    publicTransportIssue: 'Problema de Transporte Público',
    cybercrime: 'Cibercrimen',
    fraudAndScam: 'Fraude y Estafa',
    publicHealthViolation: 'Violación de Salud Pública',
    childAbuse: 'Abuso Infantil',
    elderlyAbuse: 'Abuso de Ancianos',
    corruptionCase: 'Caso de Corrupción',
    hateCrime: 'Crimen de Odio',
    terrorism: 'Terrorismo',
    humanTrafficking: 'Tráfico Humano',
    
    // Status levels
    critical: 'Crítica',
    high: 'Alta',
    medium: 'Media',
    low: 'Baja',
    
    // Other existing translations
    accessAndExport: 'Accede y exporta datos del sistema',
    downloadSpreadsheet: 'Descargar Hoja de Cálculo',
    downloadStarted: 'Descarga iniciada',
    typeId: 'ID del Tipo',
    description: 'Descripción',
    level: 'Nivel'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
