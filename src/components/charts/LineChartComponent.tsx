
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { allOccurrencesData } from "@/data/occurrenceData";
import { vibrantColors } from "@/utils/occurrenceDataProcessor";

interface LineChartComponentProps {
  data: any[];
}

const LineChartComponent: React.FC<LineChartComponentProps> = ({ data }) => {
  const { t } = useLanguage();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-xl backdrop-blur-sm z-50">
          <p className="font-semibold text-foreground text-sm">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-primary font-medium text-sm">
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-xl border-0 bg-gradient-to-br from-card via-card to-blue-500/5">
      <CardHeader className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-t-lg">
        <CardTitle className="text-lg md:text-xl flex items-center gap-2">
          <TrendingUp className="h-4 md:h-5 w-4 md:w-5 text-blue-600" />
          <span className="text-sm md:text-xl">{t('yearlyEvolution')} - Top 8</span>
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">{t('evolutionOverYears')}</CardDescription>
      </CardHeader>
      <CardContent className="p-3 md:p-6">
        <div className="w-full h-[300px] md:h-[500px] overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="year" 
                stroke="hsl(var(--foreground))"
                fontSize={10}
                fontWeight={500}
              />
              <YAxis 
                stroke="hsl(var(--foreground))"
                fontSize={10}
                fontWeight={500}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={50}
                wrapperStyle={{ paddingTop: "10px", fontSize: "10px" }}
              />
              {allOccurrencesData.slice(0, 8).map((occurrence, index) => (
                <Line
                  key={occurrence.id}
                  type="monotone"
                  dataKey={t(occurrence.description)}
                  stroke={vibrantColors[index]}
                  strokeWidth={2}
                  dot={{ fill: vibrantColors[index], strokeWidth: 1, r: 3 }}
                  activeDot={{ r: 4, stroke: vibrantColors[index], strokeWidth: 1 }}
                  name={t(occurrence.description)}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LineChartComponent;
