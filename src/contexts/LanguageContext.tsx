
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
