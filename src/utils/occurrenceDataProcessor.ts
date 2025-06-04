
import { allOccurrencesData } from '@/data/occurrenceData';

export const vibrantColors = [
  "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444",
  "#ec4899", "#84cc16", "#f97316", "#6366f1", "#14b8a6",
  "#f43f5e", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b",
  "#ef4444", "#ec4899", "#84cc16", "#f97316", "#6366f1",
  "#14b8a6", "#f43f5e", "#8b5cf6"
];

export const processDataForCharts = (t: (key: string) => string) => {
  // Dados para gráfico de pizza - top 10 ocorrências
  const pieData = allOccurrencesData
    .slice(0, 10)
    .map((item, index) => ({
      name: t(item.description),
      value: item.total,
      status: item.status,
      color: vibrantColors[index]
    }));

  // Dados para gráfico de linhas - top 8 ocorrências
  const lineData = [
    { year: "2022", ...Object.fromEntries(allOccurrencesData.slice(0, 8).map(item => [t(item.description), item[2022]])) },
    { year: "2023", ...Object.fromEntries(allOccurrencesData.slice(0, 8).map(item => [t(item.description), item[2023]])) },
    { year: "2024", ...Object.fromEntries(allOccurrencesData.slice(0, 8).map(item => [t(item.description), item[2024]])) },
    { year: "2025", ...Object.fromEntries(allOccurrencesData.slice(0, 8).map(item => [t(item.description), item[2025]])) }
  ];

  // Dados para gráfico de barras - top 15 ocorrências
  const barData = allOccurrencesData
    .slice(0, 15)
    .map((item, index) => ({
      name: t(item.description).length > 12 ? t(item.description).substring(0, 12) + '...' : t(item.description),
      fullName: t(item.description),
      total: item.total,
      status: item.status,
      color: vibrantColors[index]
    }));

  return { pieData, lineData, barData };
};
