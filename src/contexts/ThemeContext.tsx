
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark' | 'blue' | 'green' | 'purple' | 'orange';
export type PrimaryColor = 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'pink';

interface ThemeContextType {
  theme: ThemeMode;
  primaryColor: PrimaryColor;
  setTheme: (theme: ThemeMode) => void;
  setPrimaryColor: (color: PrimaryColor) => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const themeClasses = {
  light: 'light',
  dark: 'dark',
  blue: 'theme-blue',
  green: 'theme-green',
  purple: 'theme-purple',
  orange: 'theme-orange',
};

const primaryColorClasses = {
  blue: 'primary-blue',
  green: 'primary-green',
  purple: 'primary-purple',
  orange: 'primary-orange',
  red: 'primary-red',
  pink: 'primary-pink',
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [primaryColor, setPrimaryColor] = useState<PrimaryColor>('blue');

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme') as ThemeMode;
    const savedColor = localStorage.getItem('app-primary-color') as PrimaryColor;
    
    if (savedTheme) setTheme(savedTheme);
    if (savedColor) setPrimaryColor(savedColor);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes
    Object.values(themeClasses).forEach(cls => root.classList.remove(cls));
    Object.values(primaryColorClasses).forEach(cls => root.classList.remove(cls));
    
    // Add current theme and color classes
    root.classList.add(themeClasses[theme]);
    root.classList.add(primaryColorClasses[primaryColor]);
    
    localStorage.setItem('app-theme', theme);
    localStorage.setItem('app-primary-color', primaryColor);
  }, [theme, primaryColor]);

  const isDarkMode = theme === 'dark' || theme === 'blue' || theme === 'purple';

  return (
    <ThemeContext.Provider value={{
      theme,
      primaryColor,
      setTheme,
      setPrimaryColor,
      isDarkMode
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
