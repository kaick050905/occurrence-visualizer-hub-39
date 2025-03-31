
import { supabase } from "@/integrations/supabase/client";

// Region services
export const fetchRegions = async () => {
  console.log("Fetching regions...");
  const { data, error } = await supabase
    .from('region')
    .select('*');
  
  if (error) {
    console.error('Error fetching regions:', error);
    throw error;
  }
  
  console.log("Regions fetched:", data);
  return data || [];
};

// Locations services
export const fetchLocations = async () => {
  console.log("Fetching locations...");
  const { data, error } = await supabase
    .from('locations')
    .select(`
      *,
      region:region(*)
    `);
  
  if (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
  
  console.log("Locations fetched:", data);
  return data || [];
};

// Get locations by region ID
export const fetchLocationsByRegion = async (regionId: number) => {
  console.log(`Fetching locations for region ID: ${regionId}`);
  const { data, error } = await supabase
    .from('locations')
    .select(`
      *,
      region:region(*)
    `)
    .eq('ID_REGIAO', regionId);
  
  if (error) {
    console.error('Error fetching locations by region:', error);
    throw error;
  }
  
  console.log(`Locations for region ${regionId} fetched:`, data);
  return data || [];
};

// Occurrences services
export const fetchOccurrences = async () => {
  console.log("Fetching occurrences...");
  const { data, error } = await supabase
    .from('occurrences')
    .select(`
      *,
      location:locations(*),
      tipo:relacao(*)
    `);
  
  if (error) {
    console.error('Error fetching occurrences:', error);
    throw error;
  }
  
  console.log("Occurrences fetched:", data);
  return data || [];
};

// Get occurrences by location ID
export const fetchOccurrencesByLocation = async (locationId: number) => {
  console.log(`Fetching occurrences for location ID: ${locationId}`);
  const { data, error } = await supabase
    .from('occurrences')
    .select(`
      *,
      location:locations(*),
      tipo:relacao(*)
    `)
    .eq('ID_LOCALIDADE', locationId);
  
  if (error) {
    console.error('Error fetching occurrences by location:', error);
    throw error;
  }
  
  console.log(`Occurrences for location ${locationId} fetched:`, data);
  return data || [];
};

// Get occurrences by type
export const fetchOccurrencesByType = async (tipoOco: string) => {
  console.log(`Fetching occurrences for type: ${tipoOco}`);
  const { data, error } = await supabase
    .from('occurrences')
    .select(`
      *,
      location:locations(*),
      tipo:relacao(*)
    `)
    .eq('TIPO_OCO', tipoOco);
  
  if (error) {
    console.error('Error fetching occurrences by type:', error);
    throw error;
  }
  
  console.log(`Occurrences for type ${tipoOco} fetched:`, data);
  return data || [];
};

// Relacao services (tipos de ocorrência)
export const fetchTiposOcorrencia = async () => {
  console.log("Fetching tipos de ocorrência...");
  const { data, error } = await supabase
    .from('relacao')
    .select('*');
  
  if (error) {
    console.error('Error fetching tipos de ocorrência:', error);
    throw error;
  }
  
  console.log("Tipos de ocorrência fetched:", data);
  return data || [];
};

// Get most common occurrence types with count
export const fetchMostCommonOccurrenceTypes = async (limit = 5) => {
  console.log(`Fetching most common occurrence types (limit: ${limit})...`);
  const { data, error } = await supabase
    .from('occurrences')
    .select(`
      TIPO_OCO,
      tipo:relacao(*)
    `);
  
  if (error) {
    console.error('Error fetching occurrence types:', error);
    throw error;
  }

  console.log("Raw occurrence types data:", data);

  // Process and count locally
  const typeCount: Record<string, { count: number, type: any }> = {};
  
  if (data && data.length > 0) {
    data.forEach(occurrence => {
      if (occurrence.TIPO_OCO) {
        if (!typeCount[occurrence.TIPO_OCO]) {
          typeCount[occurrence.TIPO_OCO] = { 
            count: 0, 
            type: occurrence.tipo 
          };
        }
        typeCount[occurrence.TIPO_OCO].count++;
      }
    });
  
    // Convert to array and sort
    const sortedTypes = Object.entries(typeCount)
      .map(([id, { count, type }]) => ({
        id,
        description: type?.["DESCRICAO RESUMIDA"] || id,
        status: type?.NÍVEL || "Média",
        count
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
    
    console.log("Processed occurrence types:", sortedTypes);
    return sortedTypes;
  }
  
  console.log("No occurrence types found, returning empty array");
  return [];
};

// Get occurrences by year (for charts)
export const fetchOccurrencesByYear = async () => {
  console.log("Fetching occurrences by year...");
  const { data, error } = await supabase
    .from('occurrences')
    .select('ANO, QUANTIDADE');
  
  if (error) {
    console.error('Error fetching occurrences by year:', error);
    throw error;
  }
  
  console.log("Occurrences by year raw data:", data);
  
  // Group by year
  const yearlyData: Record<string, number> = {};
  
  if (data && data.length > 0) {
    data.forEach(item => {
      const year = item.ANO?.toString() || 'Unknown';
      const quantity = parseInt(item.QUANTIDADE || '0');
      
      if (!isNaN(quantity)) {
        if (!yearlyData[year]) {
          yearlyData[year] = 0;
        }
        yearlyData[year] += quantity;
      }
    });
    
    // Convert to array format for charts
    const result = Object.entries(yearlyData).map(([name, total]) => ({ name, total }));
    console.log("Processed yearly data:", result);
    return result;
  }
  
  // Return sample data for development if we don't have real data
  console.log("No yearly data found, returning sample data");
  return [
    { name: "2022", total: 1540 },
    { name: "2023", total: 1780 },
    { name: "2024", total: 1650 }
  ];
};
