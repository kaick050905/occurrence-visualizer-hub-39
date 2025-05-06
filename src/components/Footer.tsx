
import React from "react";
import { ExternalLink } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from 'next-themes';

const Footer: React.FC = () => {
  const isMobile = useIsMobile();
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  
  // Logo paths based on language and theme
  const logoPath = () => {
    if (theme === 'dark') {
      // Dark theme logos
      switch (language) {
        case 'en':
          return "/lovable-uploads/d600f854-bfa6-4afa-907c-b3886c0bb55f.png";
        case 'es':
          return "/lovable-uploads/e09f8826-ca9a-4ad5-8c5c-044da129304a.png"; // Nova imagem em espanhol para tema escuro
        case 'pt':
        default:
          return "/lovable-uploads/75a9ae91-6d83-4a1f-a42c-704de28c652d.png";
      }
    } else {
      // Light theme logos
      switch (language) {
        case 'en':
          return "/lovable-uploads/d600f854-bfa6-4afa-907c-b3886c0bb55f.png";
        case 'es':
          return "/lovable-uploads/a780149c-0fe8-4dc1-a890-7cd0f20e7052.png"; // Nova imagem em espanhol para tema claro
        case 'pt':
        default:
          return "/lovable-uploads/5cd52671-40fe-4a7d-81de-0196a97a84c6.png";
      }
    }
  };
  
  return (
    <footer className="py-6 px-4 border-t bg-background/80 backdrop-blur-sm mt-8">
      <div className="container flex flex-col items-center justify-center text-center gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <a 
            href="https://www.ssp.sp.gov.br/estatistica" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            aria-label={t('securityDepartment')}
          >
            <img 
              src={logoPath()} 
              alt={t('securityDepartment')} 
              className={`${isMobile ? 'w-48' : 'w-56'} h-auto`}
            />
            <ExternalLink size={16} className="text-muted-foreground" />
          </a>
        </div>
        
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            {t('allDataFrom')}{' '}
            <a 
              href="https://www.ssp.sp.gov.br/estatistica" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-primary transition-colors"
            >
              {t('securityDepartment')}
            </a>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
