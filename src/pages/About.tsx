
import React from "react";
import DashboardHeader from "@/components/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container py-4 px-4 md:px-6 lg:px-8">
        <DashboardHeader />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-center text-2xl md:text-3xl">
                Sobre o Projeto INFOSP
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg">
                A segurança pública é uma preocupação constante para a população brasileira, especialmente em grandes centros urbanos. 
                Com o crescimento da violência e da criminalidade, torna-se essencial utilizar ferramentas tecnológicas que possibilitem 
                o monitoramento em tempo real e a análise de dados históricos para embasar decisões estratégicas.
              </p>
              
              <p className="text-lg">
                Pensando nisso, surgiu o INFOSP – Mapeamento e Análise Preditiva de Ocorrências Criminais no Estado de São Paulo. 
                Este projeto tem como principal objetivo facilitar o acesso às informações sobre ocorrências criminais, 
                promovendo transparência e incentivando a colaboração entre a sociedade civil e os órgãos de segurança pública.
              </p>
              
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-2 flex items-center gap-2">
                  🎯 Objetivo Geral
                </h2>
                <p className="text-lg">
                  Desenvolver uma plataforma interativa que reúna, organize e exiba dados públicos sobre ocorrências 
                  criminais no Estado de São Paulo. A plataforma utiliza recursos visuais, como mapas, gráficos e dashboards, 
                  além de ferramentas de análise preditiva que ajudam a identificar padrões e tendências criminais.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-2 flex items-center gap-2">
                  📌 Objetivos Específicos
                </h2>
                <ul className="list-disc pl-8 space-y-2 text-lg">
                  <li>Coletar e organizar dados públicos de segurança, com base em fontes como o dados.gov.br.</li>
                  <li>Construir uma interface gráfica responsiva e intuitiva, acessível em diversos dispositivos.</li>
                  <li>Implementar filtros por tipo de ocorrência, período, localização e outros critérios relevantes.</li>
                  <li>Aplicar ferramentas de visualização de dados como dashboards, gráficos dinâmicos e mapas interativos.</li>
                  <li>Utilizar técnicas de análise preditiva para antecipar possíveis focos de criminalidade e apoiar a formulação de políticas públicas.</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-2 flex items-center gap-2">
                  🧠 Tecnologias e Funcionalidades
                </h2>
                <p className="text-lg mb-2">O sistema INFOSP conta com:</p>
                <ul className="list-disc pl-8 space-y-2 text-lg">
                  <li>🗺️ Geolocalização e mapas de calor com base em ocorrências registradas.</li>
                  <li>📊 Dashboards interativos com gráficos atualizados.</li>
                  <li>⏱️ Análise temporal para identificação de sazonalidades e horários críticos.</li>
                  <li>🧮 Algoritmos preditivos para análise de risco e comportamento criminoso.</li>
                  <li>📱 Design responsivo, acessível via desktop e dispositivos móveis.</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-2 flex items-center gap-2">
                  👥 Sobre a Equipe
                </h2>
                <p className="text-lg">
                  Este projeto é uma iniciativa dos alunos do curso de Análise e Desenvolvimento de Sistemas 
                  do Centro Universitário FACENS, desenvolvido como parte da disciplina UPX2 - Usina de Projetos Experimentais II.
                </p>
                <p className="text-lg mt-2">
                  <strong>Orientador:</strong> Prof. Evandro Klengenfuss Veronez
                </p>
                <p className="text-lg mt-2">
                  <strong>Equipe de Desenvolvimento:</strong>
                </p>
                <ul className="list-disc pl-8 space-y-1 text-lg">
                  <li>André Vitor</li>
                  <li>João Iauch</li>
                  <li>João Honorato</li>
                  <li>Kaick Gomes</li>
                  <li>Murilo Pires</li>
                  <li>Philippe Georges</li>
                </ul>
                <p className="text-lg mt-2">
                  <strong>Semestre:</strong> 2º Semestre – 2025
                </p>
              </div>
              
              <div>
                <h2 className="text-xl md:text-2xl font-bold mb-2 flex items-center gap-2">
                  📢 Conclusão
                </h2>
                <p className="text-lg">
                  O INFOSP reforça o papel da tecnologia como aliada na busca por uma sociedade mais segura. 
                  Ao oferecer uma ferramenta de análise de dados aberta e acessível, o projeto contribui com a 
                  construção de políticas públicas mais eficientes, baseadas em evidências concretas e na participação 
                  ativa da população.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
