
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, MapPin, Shield, AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";
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

// Mock data for cities and regions
const citiesData = {
  dangerous: { name: "São Paulo - Centro", count: 1245, trend: 12 },
  safe: { name: "Florianópolis - Lagoa", count: 120, trend: -23 }
};

const regionsData = {
  dangerous: { name: "Zona Norte - SP", count: 2245, trend: 14 },
  safe: { name: "Zona Sul - Florianópolis", count: 320, trend: -18 }
};

// Crime statistics data
const crimeStats = [
  { 
    type: "Furto", 
    count: 12567, 
    yearGrowth: 7.5,
    icon: <TrendingUp className="h-6 w-6 text-orange-500" />,
    color: "border-l-orange-500"
  },
  { 
    type: "Roubo", 
    count: 8932, 
    yearGrowth: 5.2,
    icon: <TrendingDown className="h-6 w-6 text-red-600" />,
    color: "border-l-red-600"
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
}

// Component for city or region safety card with a single item
const SingleCityRegionCard: React.FC<SingleCityRegionCardProps> = ({ title, data, icon, colorClass }) => {
  const { theme } = useTheme();
  
  return (
    <Card className={cn("border-l-4 h-full transition-all duration-300", colorClass)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
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
  
  return (
    <Card className={cn("border-l-4 h-full transition-all duration-300", data.color)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Número de {data.type}</CardTitle>
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
          <span className="ml-1 text-muted-foreground">crescimento anual</span>
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

  return (
    <div className="mt-6">
      <Carousel 
        opts={{ 
          align: "start", 
          loop: true 
        }}
        plugins={[autoplayPlugin]}
        setApi={setApi}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          <CarouselItem className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/3">
            <SingleCityRegionCard 
              title="Cidade Mais Perigosa" 
              data={citiesData.dangerous} 
              icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
              colorClass="border-l-red-500"
            />
          </CarouselItem>
          <CarouselItem className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/3">
            <SingleCityRegionCard 
              title="Cidade Mais Segura" 
              data={citiesData.safe} 
              icon={<Shield className="h-5 w-5 text-green-500" />}
              colorClass="border-l-green-500"
            />
          </CarouselItem>
          <CarouselItem className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/3">
            <SingleCityRegionCard 
              title="Região Mais Perigosa" 
              data={regionsData.dangerous} 
              icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
              colorClass="border-l-red-500"
            />
          </CarouselItem>
          <CarouselItem className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/3">
            <SingleCityRegionCard 
              title="Região Mais Segura" 
              data={regionsData.safe} 
              icon={<Shield className="h-5 w-5 text-green-500" />}
              colorClass="border-l-green-500"
            />
          </CarouselItem>
          <CarouselItem className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/3">
            <CrimeStatCard data={crimeStats[0]} />
          </CarouselItem>
          <CarouselItem className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/3">
            <CrimeStatCard data={crimeStats[1]} />
          </CarouselItem>
        </CarouselContent>
        <div className="flex justify-center mt-4">
          <CarouselPrevious className="static transform-none mr-2" />
          <CarouselNext className="static transform-none" />
        </div>
      </Carousel>
    </div>
  );
};

export default SafetyCardsCarousel;
