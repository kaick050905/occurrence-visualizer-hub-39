
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun, Globe, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ThemeSelector from './ThemeSelector';

const DashboardHeader: React.FC = () => {
  const today = new Date();
  const { theme, setTheme, isDarkMode } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [themeDialogOpen, setThemeDialogOpen] = useState(false);
  
  const formattedDate = today.toLocaleDateString(
    language === 'pt' ? 'pt-BR' : language === 'es' ? 'es' : 'en-US', 
    {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  );

  // Capitalize the first letter
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  const toggleBasicTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

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
          {/* Seletor de idioma */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="transition-all duration-300 hover:rotate-12"
                aria-label={t('language')}
              >
                <Globe className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('pt')}>
                {t('portuguese')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('en')}>
                {t('english')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('es')}>
                {t('spanish')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Seletor de tema avançado */}
          <Dialog open={themeDialogOpen} onOpenChange={setThemeDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="transition-all duration-300 hover:rotate-12"
                aria-label="Personalizar tema"
              >
                <Palette className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Personalização de Tema</DialogTitle>
              </DialogHeader>
              <ThemeSelector />
            </DialogContent>
          </Dialog>

          {/* Toggle rápido light/dark */}
          <Button
            variant="outline"
            size="icon"
            className="transition-all duration-300 hover:rotate-12"
            onClick={toggleBasicTheme}
            aria-label={isDarkMode ? t('lightMode') : t('darkMode')}
          >
            {isDarkMode ? (
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
