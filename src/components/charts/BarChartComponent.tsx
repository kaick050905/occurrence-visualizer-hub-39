
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { BarChart3 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface BarData {
  name: string;
  fullName: string;
  total: number;
  status: string;
  color: string;
}

interface BarChartComponentProps {
  data: BarData[];
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ data }) => {
  const { t } = useLanguage();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-xl backdrop-blur-sm z-50">
          <p className="font-semibold text-foreground text-sm">{payload[0].payload?.fullName || label}</p>
          <p className="text-primary font-medium text-sm">{`${t('total')}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-xl border-0 bg-gradient-to-br from-card via-card to-green-500/5">
      <CardHeader className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-t-lg">
        <CardTitle className="text-lg md:text-xl flex items-center gap-2">
          <BarChart3 className="h-4 md:h-5 w-4 md:w-5 text-green-600" />
          <span className="text-sm md:text-xl">Ranking de Ocorrências - Top 15</span>
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">Visualização em barras das principais ocorrências</CardDescription>
      </CardHeader>
      <CardContent className="p-3 md:p-6">
        <div className="w-full h-[400px] md:h-[600px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data} 
              margin={{ top: 20, right: 10, left: 10, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="name"
                stroke="hsl(var(--foreground))"
                fontSize={8}
                fontWeight={500}
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
              />
              <YAxis 
                stroke="hsl(var(--foreground))"
                fontSize={10}
                fontWeight={500}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="total" 
                radius={[4, 4, 0, 0]}
                stroke="#fff"
                strokeWidth={1}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    className="hover:opacity-80 transition-opacity duration-200"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarChartComponent;
