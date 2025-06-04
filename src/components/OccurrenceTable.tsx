
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { allOccurrencesData, statusStyle } from "@/data/occurrenceData";

interface OccurrenceTableProps {
  onViewDetails: (occurrence: typeof allOccurrencesData[0]) => void;
}

const OccurrenceTable: React.FC<OccurrenceTableProps> = ({ onViewDetails }) => {
  const { t } = useLanguage();

  const getStatus = (status: string) => {
    if (status === "Crítica") return t('critical');
    if (status === "Alta") return t('high');
    if (status === "Média") return t('medium');
    if (status === "Baixa") return t('low');
    return status;
  };

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-card via-card to-muted/20">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-purple-500/5 rounded-t-lg">
        <CardTitle className="text-lg md:text-xl">{t('allOccurrenceTypes')}</CardTitle>
        <CardDescription className="text-sm">{t('detailedOccurrenceData')}</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-auto max-h-[70vh]">
          <Table>
            <TableHeader className="sticky top-0 bg-muted/50 backdrop-blur-sm">
              <TableRow>
                <TableHead className="font-semibold text-xs md:text-sm">{t('typeId')}</TableHead>
                <TableHead className="font-semibold text-xs md:text-sm min-w-[120px]">{t('description')}</TableHead>
                <TableHead className="font-semibold text-xs md:text-sm">{t('level')}</TableHead>
                <TableHead className="font-semibold text-xs md:text-sm hidden md:table-cell">2022</TableHead>
                <TableHead className="font-semibold text-xs md:text-sm hidden md:table-cell">2023</TableHead>
                <TableHead className="font-semibold text-xs md:text-sm hidden sm:table-cell">2024</TableHead>
                <TableHead className="font-semibold text-xs md:text-sm">2025</TableHead>
                <TableHead className="font-semibold text-xs md:text-sm">{t('total')}</TableHead>
                <TableHead className="font-semibold text-xs md:text-sm">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allOccurrencesData.map((occurrence, index) => (
                <motion.tr
                  key={occurrence.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className="hover:bg-muted/50 transition-all duration-200 border-b border-border/50"
                >
                  <TableCell className="font-medium text-primary text-xs md:text-sm">{occurrence.id}</TableCell>
                  <TableCell className="max-w-[100px] md:max-w-xs truncate text-xs md:text-sm">{t(occurrence.description)}</TableCell>
                  <TableCell>
                    <Badge className={`${statusStyle[occurrence.status as keyof typeof statusStyle]} shadow-sm text-xs`}>
                      {getStatus(occurrence.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs md:text-sm hidden md:table-cell">{occurrence[2022]}</TableCell>
                  <TableCell className="font-mono text-xs md:text-sm hidden md:table-cell">{occurrence[2023]}</TableCell>
                  <TableCell className="font-mono text-xs md:text-sm hidden sm:table-cell">{occurrence[2024]}</TableCell>
                  <TableCell className="font-mono text-xs md:text-sm">{occurrence[2025]}</TableCell>
                  <TableCell className="font-bold text-sm md:text-lg">{occurrence.total}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onViewDetails(occurrence)}
                      className="gap-1 hover:shadow-md transition-all duration-200 text-xs p-2"
                    >
                      <Eye className="h-3 w-3" />
                      <span className="hidden sm:inline">{t('completeDetails')}</span>
                      <span className="sm:hidden">Ver</span>
                    </Button>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default OccurrenceTable;
