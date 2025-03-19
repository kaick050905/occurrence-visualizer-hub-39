
import React from 'react';
import { Bell, Search, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const DashboardHeader: React.FC = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Capitalize the first letter
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <Card className="mb-6 p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold">INFO SP</h1>
        <p className="text-muted-foreground">{capitalizedDate}</p>
      </div>
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar ocorrências..."
            className="pl-8 w-full"
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button size="icon" variant="outline" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
                3
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0">
            <div className="border-b px-4 py-3">
              <h3 className="font-semibold">Notificações</h3>
            </div>
            <div className="px-4 py-2 text-sm">
              <div className="flex items-start gap-4 border-b pb-2 mb-2">
                <div className="mt-1 h-2 w-2 rounded-full bg-destructive animate-pulse-slow" />
                <div>
                  <p className="font-medium">Nova ocorrência crítica</p>
                  <p className="text-muted-foreground">Ocorrência #1234 registrada como crítica</p>
                  <p className="text-xs text-muted-foreground mt-1">5 minutos atrás</p>
                </div>
              </div>
              <div className="flex items-start gap-4 border-b pb-2 mb-2">
                <div className="mt-1 h-2 w-2 rounded-full bg-occurrence-high animate-pulse-slow" />
                <div>
                  <p className="font-medium">Ocorrência atualizada</p>
                  <p className="text-muted-foreground">Ocorrência #1198 teve status alterado</p>
                  <p className="text-xs text-muted-foreground mt-1">27 minutos atrás</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 h-2 w-2 rounded-full bg-occurrence-medium animate-pulse-slow" />
                <div>
                  <p className="font-medium">Relatório diário gerado</p>
                  <p className="text-muted-foreground">O relatório de ontem está disponível</p>
                  <p className="text-xs text-muted-foreground mt-1">1 hora atrás</p>
                </div>
              </div>
            </div>
            <div className="border-t px-4 py-2">
              <Button variant="ghost" className="w-full justify-center">Ver todas</Button>
            </div>
          </PopoverContent>
        </Popover>
        <Button size="icon" variant="outline">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </Card>
  );
};

export default DashboardHeader;
