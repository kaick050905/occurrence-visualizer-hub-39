
// This file provides mock data for the occurrence monitoring dashboard

// Types for our data models
export interface Occurrence {
  id: string;
  description: string;
  location: string;
  status: 'Crítica' | 'Alta' | 'Média' | 'Baixa' | 'Em Progresso' | 'Resolvida' | 'Cancelada';
  category: string;
  date: string;
  time: string;
  assigned: string;
  region: string;
}

export interface StatusCount {
  critical: number;
  high: number;
  medium: number;
  low: number;
  inProgress: number;
  resolved: number;
  canceled: number;
}

// Status count for today
export const todayStatusCount: StatusCount = {
  critical: 7,
  high: 15,
  medium: 32,
  low: 40,
  inProgress: 28,
  resolved: 23,
  canceled: 4,
};

// Categories for occurrences
export const occurrenceCategories = [
  "Infraestrutura",
  "Segurança",
  "Ambiental",
  "Transporte",
  "Sanitária",
  "Outros"
];

// Regions for geographic distribution
export const regions = [
  "Zona Norte",
  "Zona Sul",
  "Zona Leste",
  "Zona Oeste",
  "Centro"
];

// Helper function to format date
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('pt-BR');
};

// Helper function to format time
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
};

// Generate a random status with weighted probability
export const getRandomStatus = (): Occurrence['status'] => {
  const r = Math.random();
  if (r < 0.05) return 'Crítica';
  if (r < 0.15) return 'Alta';
  if (r < 0.35) return 'Média';
  if (r < 0.55) return 'Baixa';
  if (r < 0.70) return 'Em Progresso';
  if (r < 0.90) return 'Resolvida';
  return 'Cancelada';
};

// Generate random occurrence data (for future expansion)
export const generateRandomOccurrences = (count: number): Occurrence[] => {
  const occurrences: Occurrence[] = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);
    
    occurrences.push({
      id: `OC-${1000 + i}`,
      description: `Ocorrência ${i + 1}`,
      location: `Local ${i + 1}`,
      status: getRandomStatus(),
      category: occurrenceCategories[Math.floor(Math.random() * occurrenceCategories.length)],
      date: formatDate(date),
      time: formatTime(date),
      assigned: `Equipe ${i % 5 + 1}`,
      region: regions[Math.floor(Math.random() * regions.length)]
    });
  }
  
  return occurrences;
};
