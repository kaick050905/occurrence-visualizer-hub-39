
import React from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

const DashboardHeader: React.FC = () => {
  const today = new Date();
  const { theme } = useTheme();
  
  const formattedDate = today.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Capitalize the first letter
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-6 p-4 flex justify-between items-center bg-opacity-90 backdrop-blur-sm shadow-md">
        <div className="flex items-center gap-3">
          <motion.img 
            src="/lovable-uploads/fcf12f31-12c0-4ba3-9909-00dfc69ade2e.png" 
            alt="Info SP Logo" 
            className="h-12 md:h-14"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
          <motion.p 
            className="text-muted-foreground font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {capitalizedDate}
          </motion.p>
        </div>
      </Card>
    </motion.div>
  );
};

export default DashboardHeader;
