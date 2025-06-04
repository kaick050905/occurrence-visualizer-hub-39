
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Palette, Sun, Moon, Zap, Leaf, Gem, Flame } from 'lucide-react';
import { useTheme, ThemeMode, PrimaryColor } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

const ThemeSelector: React.FC = () => {
  const { theme, primaryColor, setTheme, setPrimaryColor } = useTheme();
  const { t } = useLanguage();

  const themes: { mode: ThemeMode; label: string; icon: React.ReactNode; description: string }[] = [
    { mode: 'light', label: t('lightMode'), icon: <Sun className="w-4 h-4" />, description: 'Tema claro padrão' },
    { mode: 'dark', label: t('darkMode'), icon: <Moon className="w-4 h-4" />, description: 'Tema escuro padrão' },
    { mode: 'blue', label: 'Oceano', icon: <Zap className="w-4 h-4" />, description: 'Tons de azul profundo' },
    { mode: 'green', label: 'Floresta', icon: <Leaf className="w-4 h-4" />, description: 'Tons de verde natural' },
    { mode: 'purple', label: 'Cosmos', icon: <Gem className="w-4 h-4" />, description: 'Tons de roxo místico' },
    { mode: 'orange', label: 'Pôr do Sol', icon: <Flame className="w-4 h-4" />, description: 'Tons de laranja caloroso' },
  ];

  const colors: { color: PrimaryColor; label: string; bgClass: string }[] = [
    { color: 'blue', label: 'Azul', bgClass: 'bg-blue-500' },
    { color: 'green', label: 'Verde', bgClass: 'bg-green-500' },
    { color: 'purple', label: 'Roxo', bgClass: 'bg-purple-500' },
    { color: 'orange', label: 'Laranja', bgClass: 'bg-orange-500' },
    { color: 'red', label: 'Vermelho', bgClass: 'bg-red-500' },
    { color: 'pink', label: 'Rosa', bgClass: 'bg-pink-500' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Temas Disponíveis
          </CardTitle>
          <CardDescription>
            Escolha o tema que mais combina com você
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((themeOption) => (
              <div
                key={themeOption.mode}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                  theme === themeOption.mode
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setTheme(themeOption.mode)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {themeOption.icon}
                    <span className="font-medium">{themeOption.label}</span>
                  </div>
                  {theme === themeOption.mode && (
                    <Badge variant="default" className="text-xs">Ativo</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{themeOption.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cor Primária</CardTitle>
          <CardDescription>
            Personalize a cor principal da interface
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {colors.map((colorOption) => (
              <Button
                key={colorOption.color}
                variant={primaryColor === colorOption.color ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setPrimaryColor(colorOption.color)}
              >
                <div className={`w-3 h-3 rounded-full ${colorOption.bgClass}`} />
                {colorOption.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThemeSelector;
