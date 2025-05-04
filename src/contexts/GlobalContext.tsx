
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define available languages
export type Language = 'pt-BR' | 'en' | 'es';

// Define the context shape
interface GlobalContextType {
  currentLanguage: Language;
  setCurrentLanguage: (lang: Language) => void;
  compareRegions: string[];
  toggleRegionComparison: (regionName: string) => void;
  translations: Record<string, Record<Language, string>>;
}

// Create the context
export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Translations for the application
const translations = {
  regionComparison: {
    'pt-BR': 'Comparativo entre Regiões',
    'en': 'Region Comparison',
    'es': 'Comparación entre Regiones',
  },
  selectRegions: {
    'pt-BR': 'Selecione até 3 regiões para comparar',
    'en': 'Select up to 3 regions to compare',
    'es': 'Seleccione hasta 3 regiones para comparar',
  },
  compareNow: {
    'pt-BR': 'Comparar Agora',
    'en': 'Compare Now',
    'es': 'Comparar Ahora',
  },
  addToComparison: {
    'pt-BR': 'Adicionar à comparação',
    'en': 'Add to comparison',
    'es': 'Añadir a la comparación',
  },
  population: {
    'pt-BR': 'População',
    'en': 'Population',
    'es': 'Población',
  },
  occurrences: {
    'pt-BR': 'Ocorrências',
    'en': 'Occurrences',
    'es': 'Ocurrencias',
  },
  year: {
    'pt-BR': 'Ano',
    'en': 'Year',
    'es': 'Año',
  },
  perCapita: {
    'pt-BR': 'Per Capita',
    'en': 'Per Capita',
    'es': 'Per Cápita',
  },
  crimeDistribution: {
    'pt-BR': 'Distribuição por Tipo de Crime',
    'en': 'Crime Type Distribution',
    'es': 'Distribución por Tipo de Crimen',
  },
  theft: {
    'pt-BR': 'Furto',
    'en': 'Theft',
    'es': 'Hurto',
  },
  robbery: {
    'pt-BR': 'Roubo',
    'en': 'Robbery',
    'es': 'Robo',
  },
  assault: {
    'pt-BR': 'Agressão',
    'en': 'Assault',
    'es': 'Agresión',
  },
  homicide: {
    'pt-BR': 'Homicídio',
    'en': 'Homicide',
    'es': 'Homicidio',
  },
  critical: {
    'pt-BR': 'Crítica',
    'en': 'Critical',
    'es': 'Crítica',
  },
  high: {
    'pt-BR': 'Alta',
    'en': 'High',
    'es': 'Alta',
  },
  medium: {
    'pt-BR': 'Média',
    'en': 'Medium',
    'es': 'Media',
  },
  low: {
    'pt-BR': 'Baixa',
    'en': 'Low',
    'es': 'Baja',
  },
  details: {
    'pt-BR': 'Detalhes',
    'en': 'Details',
    'es': 'Detalles',
  },
  viewRegion: {
    'pt-BR': 'Ver região',
    'en': 'View region',
    'es': 'Ver región',
  },
  total: {
    'pt-BR': 'Total',
    'en': 'Total',
    'es': 'Total',
  },
  hdi: {
    'pt-BR': 'IDH',
    'en': 'HDI',
    'es': 'IDH',
  },
  perThousand: {
    'pt-BR': 'Por 1000 hab.',
    'en': 'Per 1000 inhab.',
    'es': 'Por 1000 hab.',
  },
  moreDetails: {
    'pt-BR': 'Mais detalhes',
    'en': 'More details',
    'es': 'Más detalles',
  },
  barChart: {
    'pt-BR': 'Gráfico de Barras',
    'en': 'Bar Chart',
    'es': 'Gráfico de Barras',
  },
  radarChart: {
    'pt-BR': 'Gráfico de Radar',
    'en': 'Radar Chart',
    'es': 'Gráfico de Radar',
  },
};

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  // Set default language based on browser preference
  const getBrowserLanguage = (): Language => {
    const browserLang = navigator.language;
    if (browserLang.startsWith('es')) return 'es';
    if (browserLang.startsWith('en')) return 'en';
    return 'pt-BR'; // Default to Portuguese
  };

  const [currentLanguage, setCurrentLanguage] = useState<Language>(getBrowserLanguage());
  const [compareRegions, setCompareRegions] = useState<string[]>([]);

  // Function to add or remove regions from comparison
  const toggleRegionComparison = (regionName: string) => {
    setCompareRegions(prev => {
      if (prev.includes(regionName)) {
        return prev.filter(r => r !== regionName);
      } else {
        // Limit to 3 regions for comparison
        const newRegions = [...prev, regionName].slice(0, 3);
        return newRegions;
      }
    });
  };

  const value = {
    currentLanguage,
    setCurrentLanguage,
    compareRegions,
    toggleRegionComparison,
    translations
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the global context
export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};
