
import React from 'react';
import { Card } from '@/components/ui/card';

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
    <Card className="mb-6 p-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <img 
          src="/lovable-uploads/fcf12f31-12c0-4ba3-9909-00dfc69ade2e.png" 
          alt="Info SP Logo" 
          className="h-12 md:h-14"
        />
        <p className="text-muted-foreground">{capitalizedDate}</p>
      </div>
    </Card>
  );
};

export default DashboardHeader;
