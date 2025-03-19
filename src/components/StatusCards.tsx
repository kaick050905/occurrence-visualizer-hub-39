
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
  trend: number;
  trendLabel: string;
  className?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
  trendLabel,
  className,
}) => {
  return (
    <Card className={cn("zoom-in-out", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className="mt-2 flex items-center text-xs">
          <span
            className={cn(
              "inline-flex items-center rounded-sm px-1 py-0.5 font-medium",
              trend > 0
                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
            )}
          >
            {trend > 0 ? "+" : ""}
            {trend}%
          </span>
          <span className="ml-1 text-muted-foreground">{trendLabel}</span>
        </div>
      </CardContent>
    </Card>
  );
};

const StatusCards: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatusCard
        title="Ocorrências Críticas"
        value={7}
        icon={<AlertCircle className="h-4 w-4 text-occurrence-critical" />}
        description="Ocorrências de alta prioridade"
        trend={12}
        trendLabel="desde ontem"
        className="border-l-4 border-l-occurrence-critical"
      />
      <StatusCard
        title="Ocorrências Abertas"
        value={42}
        icon={<AlertTriangle className="h-4 w-4 text-occurrence-high" />}
        description="Aguardando resolução"
        trend={4}
        trendLabel="desde ontem"
        className="border-l-4 border-l-occurrence-high"
      />
      <StatusCard
        title="Em Atendimento"
        value={16}
        icon={<Clock className="h-4 w-4 text-occurrence-medium" />}
        description="Ocorrências em andamento"
        trend={-8}
        trendLabel="desde ontem"
        className="border-l-4 border-l-occurrence-medium"
      />
      <StatusCard
        title="Resolvidas Hoje"
        value={23}
        icon={<CheckCircle2 className="h-4 w-4 text-occurrence-low" />}
        description="Ocorrências encerradas"
        trend={-15}
        trendLabel="desde ontem"
        className="border-l-4 border-l-occurrence-low"
      />
    </div>
  );
};

export default StatusCards;
