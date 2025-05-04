import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart,
  Scatter,
  Cell
} from 'recharts';
import { useGlobal } from "@/contexts/GlobalContext";

const data = [
  {
    year: '2019',
    Furto: 2400,
    Roubo: 1398,
    Homicídio: 9800,
    Agressão: 3908,
  },
  {
    year: '2020',
    Furto: 2210,
    Roubo: 2800,
    Homicídio: 3908,
    Agressão: 4800,
  },
  {
    year: '2021',
    Furto: 2290,
    Roubo: 2387,
    Homicídio: 4800,
    Agressão: 3800,
  },
  {
    year: '2022',
    Furto: 2000,
    Roubo: 3800,
    Homicídio: 3800,
    Agressão: 4300,
  },
  {
    year: '2023',
    Furto: 2181,
    Roubo: 2000,
    Homicídio: 4300,
    Agressão: 4800,
  },
  {
    year: '2024',
    Furto: 2500,
    Roubo: 2100,
    Homicídio: 4800,
    Agressão: 4000,
  },
];

const crimeTypeColors = {
  Furto: '#82ca9d',
  Roubo: '#8884d8',
  Homicídio: '#ffc658',
  Agressão: '#a4de6c',
};

const OccurrenceCharts: React.FC = () => {
  const { translations, currentLanguage } = useGlobal();

  const chartTranslations = {
    occurrencesOverTime: {
      'pt-BR': 'Ocorrências ao Longo do Tempo',
      'en': 'Occurrences Over Time',
      'es': 'Ocurrencias a lo Largo del Tiempo'
    },
    year: {
      'pt-BR': 'Ano',
      'en': 'Year',
      'es': 'Año'
    },
    theft: {
      'pt-BR': 'Furto',
      'en': 'Theft',
      'es': 'Hurto'
    },
    robbery: {
      'pt-BR': 'Roubo',
      'en': 'Robbery',
      'es': 'Robo'
    },
    homicide: {
      'pt-BR': 'Homicídio',
      'en': 'Homicide',
      'es': 'Homicidio'
    },
    assault: {
      'pt-BR': 'Agressão',
      'en': 'Assault',
      'es': 'Agresión'
    },
    total: {
      'pt-BR': 'Total',
      'en': 'Total',
      'es': 'Total'
    }
  };

  const formatNumber = (value: number): string => {
    return value.toLocaleString(currentLanguage);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border rounded-md shadow-md p-2">
          <p className="font-bold">{`${chartTranslations.year[currentLanguage]}: ${label}`}</p>
          {payload.map((item: any) => (
            <p key={item.dataKey} className="text-gray-700">
              {`${chartTranslations[item.dataKey as keyof typeof chartTranslations]?.[currentLanguage] || item.dataKey}: ${formatNumber(item.value)}`}
            </p>
          ))}
        </div>
      );
    }

    return null;
  };

  const crimeTypes = ['Furto', 'Roubo', 'Homicídio', 'Agressão'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{chartTranslations.occurrencesOverTime[currentLanguage]}</CardTitle>
        <CardDescription>
          {translations.crimeDistribution[currentLanguage]}
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={formatNumber} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {crimeTypes.map((crimeType) => (
              <Bar key={crimeType} dataKey={crimeType} fill={crimeTypeColors[crimeType as keyof typeof crimeTypeColors]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={crimeTypeColors[crimeType as keyof typeof crimeTypeColors]} />
                ))}
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default OccurrenceCharts;
