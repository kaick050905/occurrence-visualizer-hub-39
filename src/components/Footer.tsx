
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-6 px-4 border-t bg-background/80 backdrop-blur-sm mt-8">
      <div className="container flex flex-col items-center justify-center text-center gap-2">
        <p className="text-sm text-muted-foreground">
          Todos os dados foram retirados da Secretaria de Segurança Pública do Estado de São Paulo
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          © 2025 InfoSP - Sistema de Visualização de Ocorrências
        </p>
      </div>
    </footer>
  );
};

export default Footer;
