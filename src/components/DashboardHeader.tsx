
import React from 'react';
import { Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

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
      <div className="flex items-center gap-3">
        <img 
          src="/lovable-uploads/fcf12f31-12c0-4ba3-9909-00dfc69ade2e.png" 
          alt="Info SP Logo" 
          className="h-12 md:h-14"
        />
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
      </div>
    </Card>
  );
};

export default DashboardHeader;
