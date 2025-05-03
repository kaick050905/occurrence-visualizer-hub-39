
import React from "react";
import { ExternalLink } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Footer: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <footer className="py-6 px-4 border-t bg-background/80 backdrop-blur-sm mt-8">
      <div className="container flex flex-col items-center justify-center text-center gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <a 
            href="https://www.ssp.sp.gov.br/estatistica" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            aria-label="Site da Secretaria de Segurança Pública do Estado de São Paulo"
          >
            <img 
              src="/lovable-uploads/0945e93e-596a-4140-be57-53889fe7ecce.png" 
              alt="Logo da Secretaria de Segurança Pública" 
              className={`${isMobile ? 'w-48' : 'w-56'} h-auto`}
            />
            <ExternalLink size={16} className="text-muted-foreground" />
          </a>
        </div>
        
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            Todos os dados foram retirados da {' '}
            <a 
              href="https://www.ssp.sp.gov.br/estatistica" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-primary transition-colors"
            >
              Secretaria de Segurança Pública do Estado de São Paulo
            </a>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © 2025 InfoSP - Sistema de Visualização de Ocorrências
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
