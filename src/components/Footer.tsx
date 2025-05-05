
import React from "react";
import { ExternalLink } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer: React.FC = () => {
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  
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
              src="/lovable-uploads/5cd52671-40fe-4a7d-81de-0196a97a84c6.png" 
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
