
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, MapPin, Shield, AlertTriangle, TrendingDown, TrendingUp, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useTheme } from "next-themes";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock data for cities and regions
const citiesData = {
  dangerous: { name: "Peruíbe", count: 1245, trend: 12 },
  safe: { name: "Valinhos", count: 120, trend: -23 }
};

const regionsData = {
  dangerous: { name: "Capital", count: 2245, trend: 14 },
  safe: { name: "Campinas", count: 320, trend: -18 }
};

// Crime statistics data
const crimeStats = [
  { 
    type: "theft", 
    count: 12567, 
    yearGrowth: 7.5,
    icon: <TrendingUp className="h-6 w-6 text-orange-500" />,
    color: "border-l-orange-500",
    description: "theft"
  },
  { 
    type: "robbery", 
    count: 8932, 
    yearGrowth: 5.2,
    icon: <TrendingDown className="h-6 w-6 text-red-600" />,
    color: "border-l-red-600",
    description: "robbery"
  }
];

interface SingleCityRegionCardProps {
  title: string;
  data: {
    name: string;
    count: number;
    trend: number;
  };
  icon: React.ReactNode;
  colorClass: string;
  tooltipDescription: string;
}

// Component for city or region safety card with a single item
const SingleCityRegionCard: React.FC<SingleCityRegionCardProps> = ({ title, data, icon, colorClass, tooltipDescription }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  return (
    <Card className={cn("border-l-4 h-full transition-all duration-300", colorClass)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-md font-medium">{title}</CardTitle>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="p-2 max-w-xs">
              <p>{tooltipDescription}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{data.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">{data.count}</span>
              <div className={cn(
                "flex items-center text-xs rounded-full px-2 py-0.5",
                data.trend > 0 
                  ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300" 
                  : "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
              )}>
                {data.trend > 0 ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
                {Math.abs(data.trend)}%
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Component for crime statistics card
const CrimeStatCard: React.FC<{ data: typeof crimeStats[0] }> = ({ data }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  
  // Fix the translation key to use the right property
  const translationKey = data.type === 'theft' ? 'numberOfThefts' : 'numberOfRobberies';
  
  return (
    <Card className={cn("border-l-4 h-full transition-all duration-300", data.color)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-md font-medium">
            {t(translationKey)}
          </CardTitle>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="p-2 max-w-xs">
              <p>{t(data.description)}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        {data.icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data.count.toLocaleString('pt-BR')}</div>
        <div className="mt-2 flex items-center text-xs">
          <span className={cn(
            "inline-flex items-center rounded-sm px-2 py-1 font-medium",
            data.yearGrowth > 0
              ? "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300"
              : "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
          )}>
            {data.yearGrowth > 0 ? "+" : ""}
            {data.yearGrowth}%
          </span>
          <span className="ml-1 text-muted-foreground">{t('annualGrowth')}</span>
        </div>
      </CardContent>
    </Card>
  );
};

const SafetyCardsCarousel: React.FC = () => {
  // Create autoplay plugin instance with options
  const autoplayPlugin = React.useMemo(() => 
    Autoplay({ 
      delay: 3000, // 3 seconds delay between slides
      stopOnInteraction: false, // Continue autoplay after user interaction
      stopOnMouseEnter: true, // Pause on mouse hover
    }), 
    []
  );

  const [api, setApi] = useState<any>(null);
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  // Set up embla carousel with autoplay plugin
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      align: "start", 
      loop: true,
      skipSnaps: false
    }, 
    [autoplayPlugin]
  );

  useEffect(() => {
    if (emblaApi) {
      setApi(emblaApi);
    }
  }, [emblaApi]);

  // Traduções para tooltips
  const tooltipDescriptions = {
    dangerousCity: t('dangerousCity'),
    safeCity: t('safeCity'),
    dangerousRegion: t('dangerousRegion'),
    safeRegion: t('safeRegion')
  };

  return (
    <div className="mt-4 md:mt-6">
      <TooltipProvider>
        <Carousel 
          opts={{ 
            align: "start", 
            loop: true 
          }}
          plugins={[autoplayPlugin]}
          setApi={setApi}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            <CarouselItem className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <SingleCityRegionCard 
                title={t('dangerousCity')} 
                data={citiesData.dangerous} 
                icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
                colorClass="border-l-red-500"
                tooltipDescription={tooltipDescriptions.dangerousCity}
              />
            </CarouselItem>
            <CarouselItem className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <SingleCityRegionCard 
                title={t('safeCity')} 
                data={citiesData.safe} 
                icon={<Shield className="h-5 w-5 text-green-500" />}
                colorClass="border-l-green-500"
                tooltipDescription={tooltipDescriptions.safeCity}
              />
            </CarouselItem>
            <CarouselItem className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <SingleCityRegionCard 
                title={t('dangerousRegion')}
                data={regionsData.dangerous} 
                icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
                colorClass="border-l-red-500"
                tooltipDescription={tooltipDescriptions.dangerousRegion}
              />
            </CarouselItem>
            <CarouselItem className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <SingleCityRegionCard 
                title={t('safeRegion')} 
                data={regionsData.safe} 
                icon={<Shield className="h-5 w-5 text-green-500" />}
                colorClass="border-l-green-500"
                tooltipDescription={tooltipDescriptions.safeRegion}
              />
            </CarouselItem>
            <CarouselItem className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <CrimeStatCard data={crimeStats[0]} />
            </CarouselItem>
            <CarouselItem className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <CrimeStatCard data={crimeStats[1]} />
            </CarouselItem>
          </CarouselContent>
          <div className="flex justify-center mt-4">
            <CarouselPrevious className="static transform-none mr-2" />
            <CarouselNext className="static transform-none" />
          </div>
        </Carousel>
      </TooltipProvider>
    </div>
  );
};

export default SafetyCardsCarousel;
