
// Dados completos de ocorrências OCO-01 a OCO-23
export const allOccurrencesData = [
  { id: "OCO-01", description: "vehicleTheft", status: "Crítica", 2022: 58, 2023: 62, 2024: 68, 2025: 57, total: 245 },
  { id: "OCO-02", description: "streetLightingIssue", status: "Alta", 2022: 45, 2023: 55, 2024: 60, 2025: 50, total: 210 },
  { id: "OCO-03", description: "trafficAccident", status: "Média", 2022: 40, 2023: 48, 2024: 52, 2025: 40, total: 180 },
  { id: "OCO-04", description: "propertyInvasion", status: "Alta", 2022: 35, 2023: 42, 2024: 48, 2025: 40, total: 165 },
  { id: "OCO-05", description: "publicPropertyVandalism", status: "Alta", 2022: 30, 2023: 38, 2024: 45, 2025: 42, total: 155 },
  { id: "OCO-06", description: "domesticViolence", status: "Crítica", 2022: 32, 2023: 35, 2024: 38, 2025: 40, total: 145 },
  { id: "OCO-07", description: "drugTrafficking", status: "Crítica", 2022: 28, 2023: 32, 2024: 35, 2025: 38, total: 133 },
  { id: "OCO-08", description: "noisePollution", status: "Média", 2022: 25, 2023: 30, 2024: 32, 2025: 35, total: 122 },
  { id: "OCO-09", description: "publicPropertyDamage", status: "Alta", 2022: 22, 2023: 28, 2024: 30, 2025: 32, total: 112 },
  { id: "OCO-10", description: "fraudAndScam", status: "Alta", 2022: 20, 2023: 25, 2024: 28, 2025: 30, total: 103 },
  { id: "OCO-11", description: "illegalConstruction", status: "Média", 2022: 18, 2023: 22, 2024: 25, 2025: 28, total: 93 },
  { id: "OCO-12", description: "waterLeakage", status: "Média", 2022: 15, 2023: 20, 2024: 22, 2025: 25, total: 82 },
  { id: "OCO-13", description: "animalAbuse", status: "Alta", 2022: 12, 2023: 18, 2024: 20, 2025: 22, total: 72 },
  { id: "OCO-14", description: "environmentalViolation", status: "Média", 2022: 10, 2023: 15, 2024: 18, 2025: 20, total: 63 },
  { id: "OCO-15", description: "publicTransportIssue", status: "Baixa", 2022: 8, 2023: 12, 2024: 15, 2025: 18, total: 53 },
  { id: "OCO-16", description: "roadDamage", status: "Baixa", 2022: 6, 2023: 10, 2024: 12, 2025: 15, total: 43 },
  { id: "OCO-17", description: "garbageIssue", status: "Baixa", 2022: 5, 2023: 8, 2024: 10, 2025: 12, total: 35 },
  { id: "OCO-18", description: "sewerIssue", status: "Média", 2022: 4, 2023: 6, 2024: 8, 2025: 10, total: 28 },
  { id: "OCO-19", description: "publicSpaceOccupation", status: "Baixa", 2022: 3, 2023: 5, 2024: 6, 2025: 8, total: 22 },
  { id: "OCO-20", description: "powerOutage", status: "Baixa", 2022: 2, 2023: 4, 2024: 5, 2025: 6, total: 17 },
  { id: "OCO-21", description: "internetOutage", status: "Baixa", 2022: 2, 2023: 3, 2024: 4, 2025: 5, total: 14 },
  { id: "OCO-22", description: "publicHealthIssue", status: "Média", 2022: 1, 2023: 2, 2024: 3, 2025: 4, total: 10 },
  { id: "OCO-23", description: "educationIssue", status: "Baixa", 2022: 1, 2023: 1, 2024: 2, 2025: 3, total: 7 }
];

export const statusStyle = {
  Crítica: "bg-occurrence-critical text-white",
  Alta: "bg-occurrence-high text-white",
  Média: "bg-occurrence-medium text-white",
  Baixa: "bg-occurrence-low text-white"
};
