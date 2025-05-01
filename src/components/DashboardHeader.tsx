
import React from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Moon, Sun, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const DashboardHeader: React.FC = () => {
  const today = new Date();
  const { theme, setTheme } = useTheme();
  
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
        
        <div className="flex items-center gap-2">
          <Link to="/sobre">
            <Button variant="outline" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Sobre o Projeto
            </Button>
          </Link>
          
          <Button
            variant="outline"
            size="icon"
            className="transition-all duration-300 hover:rotate-12 ml-2"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "dark" ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default DashboardHeader;
