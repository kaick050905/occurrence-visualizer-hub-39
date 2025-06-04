
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PieData {
  name: string;
  value: number;
  status: string;
  color: string;
}

interface PieChartComponentProps {
  data: PieData[];
}

const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => {
  const { t } = useLanguage();

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-xl backdrop-blur-sm z-50">
          <p className="font-semibold text-foreground text-sm">{payload[0].name}</p>
          <p className="text-primary font-medium text-sm">{`${t('total')}: ${payload[0].value}`}</p>
          <p className="text-xs text-muted-foreground">{`${((payload[0].value / data.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-xl border-0 bg-gradient-to-br from-card via-card to-primary/5">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-t-lg">
        <CardTitle className="text-lg md:text-xl flex items-center gap-2">
          <PieChartIcon className="h-4 md:h-5 w-4 md:w-5 text-primary" />
          <span className="text-sm md:text-xl">{t('occurrenceDistribution')} - Top 10</span>
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">{t('distributionByType')}</CardDescription>
      </CardHeader>
      <CardContent className="p-3 md:p-6">
        <div className="w-full h-[300px] md:h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius="80%"
                innerRadius="40%"
                paddingAngle={2}
                dataKey="value"
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
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={60}
                wrapperStyle={{ paddingTop: "10px", fontSize: "12px" }}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PieChartComponent;
