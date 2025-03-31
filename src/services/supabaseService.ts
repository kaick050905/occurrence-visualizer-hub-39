
import { supabase } from "@/integrations/supabase/client";

// Region services
export const fetchRegions = async () => {
  const { data, error } = await supabase
    .from('region')
    .select('*');
  
  if (error) {
    console.error('Error fetching regions:', error);
    throw error;
  }
  
  return data;
};

// Locations services
export const fetchLocations = async () => {
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
  
  return data;
};

// Get locations by region ID
export const fetchLocationsByRegion = async (regionId: number) => {
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
  
  return data;
};

// Occurrences services
export const fetchOccurrences = async () => {
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
  
  return data;
};

// Get occurrences by location ID
export const fetchOccurrencesByLocation = async (locationId: number) => {
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
  
  return data;
};

// Get occurrences by type
export const fetchOccurrencesByType = async (tipoOco: string) => {
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
  
  return data;
};

// Relacao services (tipos de ocorrência)
export const fetchTiposOcorrencia = async () => {
  const { data, error } = await supabase
    .from('relacao')
    .select('*');
  
  if (error) {
    console.error('Error fetching tipos de ocorrência:', error);
    throw error;
  }
  
  return data;
};

// Get most common occurrence types with count
export const fetchMostCommonOccurrenceTypes = async (limit = 5) => {
  const { data, error } = await supabase
    .from('occurrences')
    .select(`
      TIPO_OCO,
      tipo:relacao(*)
    `)
    .limit(1000); // Limite maior para processamento local
  
  if (error) {
    console.error('Error fetching occurrence types:', error);
    throw error;
  }

  // Process and count locally
  const typeCount: Record<string, { count: number, type: any }> = {};
  
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
  
  return sortedTypes;
};

// Get occurrences by year (for charts)
export const fetchOccurrencesByYear = async () => {
  const { data, error } = await supabase
    .from('occurrences')
    .select('ANO, QUANTIDADE')
    .order('ANO', { ascending: true });
  
  if (error) {
    console.error('Error fetching occurrences by year:', error);
    throw error;
  }
  
  // Group by year
  const yearlyData = data.reduce((acc: Record<string, number>, curr) => {
    const year = curr.ANO?.toString() || 'Unknown';
    const quantity = parseInt(curr.QUANTIDADE || '0');
    
    if (!isNaN(quantity)) {
      if (!acc[year]) {
        acc[year] = 0;
      }
      acc[year] += quantity;
    }
    
    return acc;
  }, {});
  
  // Convert to array format for charts
  return Object.entries(yearlyData).map(([name, total]) => ({ name, total }));
};
