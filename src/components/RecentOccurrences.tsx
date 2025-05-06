
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Filter, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import OccurrenceDetails from "./OccurrenceDetails";
import { useLanguage } from "@/contexts/LanguageContext";

// Sample data for most recurring occurrences
const recurringOccurrencesData = [
  {
    id: "TP-001",
    description: "vehicleTheft",
    status: "Crítica",
    count: 245,
  },
  {
    id: "TP-002",
    description: "streetLightingIssue",
    status: "Alta",
    count: 210,
  },
  {
    id: "TP-003",
    description: "trafficAccident",
    status: "Média",
    count: 180,
  },
  {
    id: "TP-004",
    description: "propertyInvasion",
    status: "Alta",
    count: 165,
  },
  {
    id: "TP-005",
    description: "publicPropertyVandalism",
    status: "Alta",
    count: 155,
  }
];

const statusStyle = {
  Crítica: "bg-occurrence-critical text-white",
  Alta: "bg-occurrence-high text-white",
  Média: "bg-occurrence-medium text-white",
  Baixa: "bg-occurrence-low text-white",
  "Em Progresso": "bg-blue-500 text-white",
  Resolvida: "bg-green-600 text-white",
  Cancelada: "bg-gray-500 text-white"
};

const RecentOccurrences: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [selectedOccurrence, setSelectedOccurrence] = useState<(typeof recurringOccurrencesData[0] & { translatedDesc?: string }) | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { t } = useLanguage();

  const getStatus = (status: string) => {
    if (status === "Crítica") return t('critical');
    if (status === "Alta") return t('high');
    if (status === "Média") return t('medium');
    if (status === "Baixa") return t('low');
    return status;
  };

  const toggleStatusFilter = (status: string) => {
    setStatusFilter(prevFilters => 
      prevFilters.includes(status)
        ? prevFilters.filter(s => s !== status)
        : [...prevFilters, status]
    );
  };

  const handleOccurrenceClick = (occurrence: typeof recurringOccurrencesData[0]) => {
    const translatedDesc = t(occurrence.description);
    setSelectedOccurrence({ 
      ...occurrence, 
      translatedDesc 
    });
    setIsDialogOpen(true);
  };

  const filteredOccurrences = statusFilter.length > 0
    ? recurringOccurrencesData.filter(item => statusFilter.includes(item.status))
    : recurringOccurrencesData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle>{t('mostRecurringOccurrences')}</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('mostFrequentTypes')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <CardDescription>{t('mostFrequentTypes')}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  <span>{t('filter')}</span>
                  {statusFilter.length > 0 && (
                    <Badge variant="secondary" className="ml-1 rounded-full px-1">
                      {statusFilter.length}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-3">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">{t('filterByLevel')}</h4>
                  <div className="space-y-2">
                    {["Crítica", "Alta", "Média", "Baixa"].map((status) => (
                      <div key={status} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`status-${status}`} 
                          checked={statusFilter.includes(status)}
                          onCheckedChange={() => toggleStatusFilter(status)}
                        />
                        <Label htmlFor={`status-${status}`} className="flex items-center space-x-1 text-sm">
                          <span>{getStatus(status)}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('typeId')}</TableHead>
                  <TableHead>{t('description')}</TableHead>
                  <TableHead>{t('level')}</TableHead>
                  <TableHead>{t('totalOccurrences')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOccurrences.map((occurrence, index) => (
                  <motion.tr
                    key={occurrence.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
                    onClick={() => handleOccurrenceClick(occurrence)}
                  >
                    <TableCell className="font-medium">{occurrence.id}</TableCell>
                    <TableCell>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <span className="cursor-help">{t(occurrence.description)}</span>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                          <div className="flex justify-between">
                            <div>
                              <h4 className="text-sm font-semibold">{t(occurrence.description)}</h4>
                              <p className="text-sm text-muted-foreground">
                                {t('referenceCode')}: {occurrence.id}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-xs">{t('occurrencePercentage')} {Math.round((occurrence.count / 955) * 100)}% {t('ofTotalRecorded')}.</p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(statusStyle[occurrence.status as keyof typeof statusStyle])}>
                        {getStatus(occurrence.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{occurrence.count}</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4">
          <div className="text-xs text-muted-foreground">
            {t('showingOf')} {filteredOccurrences.length} {t('of')} {recurringOccurrencesData.length} {t('occurrences')}
          </div>
          <Button variant="outline" size="sm" className="gap-1 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
            <span>{t('viewAll')}</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      {/* Occurrence Details Dialog */}
      <OccurrenceDetails 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        occurrence={selectedOccurrence ? {
          ...selectedOccurrence,
          description: selectedOccurrence.translatedDesc || t(selectedOccurrence.description)
        } : null} 
      />
    </motion.div>
  );
};

export default RecentOccurrences;
