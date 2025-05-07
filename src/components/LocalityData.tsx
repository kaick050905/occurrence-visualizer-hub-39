
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, Activity, BarChart, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

// Updated region data model with more details
const regionsData = [
  {
    name: "Araçatuba",
    count: 14541,
    percentage: 1.12,
    status: "Crítica",
    population: "800 mil",
    hdi: 0.741,
    occurrences2024: 14541
  },
  {
    name: "Bauru",
    count: 36387,
    percentage: 2.81,
    status: "Crítica",
    population: "1.4 milhões",
    hdi: 0.738,
    occurrences2024: 36387
  },
  {
    name: "Campinas",
    count: 81866,
    percentage: 6.31,
    status: "Crítica",
    population: "3.4 milhões",
    hdi: 0.756,
    occurrences2024: 81866
  },
  {
    name: "Capital",
    count: 587160,
    percentage: 45.29,
    status: "Crítica",
    population: "11.8 milhões",
    hdi: 0.805,
    occurrences2024: 587160
  },
  {
    name: "Grande São Paulo",
    count: 257592,
    percentage: 19.87,
    status: "Crítica",
    population: "9.2 milhões",
    hdi: 0.759,
    occurrences2024: 257592
  },
  {
    name: "Piracicaba",
    count: 63820,
    percentage: 4.92,
    status: "Crítica",
    population: "1.5 milhões",
    hdi: 0.753,
    occurrences2024: 63820
  },
  {
    name: "Presidente Prudente",
    count: 18561,
    percentage: 1.43,
    status: "Crítica",
    population: "788 mil",
    hdi: 0.738,
    occurrences2024: 18561
  },
  {
    name: "Ribeirão Preto",
    count: 40017,
    percentage: 3.09,
    status: "Crítica",
    population: "1.7 milhões",
    hdi: 0.741,
    occurrences2024: 40017
  },
  {
    name: "Santos",
    count: 72493,
    percentage: 5.59,
    status: "Crítica",
    population: "1.8 milhões",
    hdi: 0.724,
    occurrences2024: 72493
  },
  {
    name: "Sorocaba",
    count: 55483,
    percentage: 4.28,
    status: "Crítica",
    population: "2.18 milhões",
    hdi: 0.720,
    occurrences2024: 55483
  },
  {
    name: "São José do Rio Preto",
    count: 21838,
    percentage: 1.68,
    status: "Crítica",
    population: "970 mil",
    hdi: 0.743,
    occurrences2024: 21838
  },
  {
    name: "São jose dos campos",
    count: 46782,
    percentage: 3.61,
    status: "Crítica",
    population: "2.5 milhões",
    hdi: 0.735,
    occurrences2024: 46782
  },
];

// Sample data for cities
const citiesData = [
  {
    name: "São Paulo",
    region: "Capital",
    population: "11.5 milhões",
    hdi: 0.805,
    occurrences2024: 587160
  },
  {
    name: "Campinas",
    region: "Campinas",
    population: "1.1 milhões",
    hdi: 0.805,
    occurrences2024: 38140
  },
  {
    name: "Guarulhos",
    region: "Grande São Paulo",
    population: "1.3 milhões",
    hdi: 0.763,
    occurrences2024: 37946
  },
  {
    name: "Santo André",
    region: "Grande São Paulo",
    population: "749 mil",
    hdi: 0.815,
    occurrences2024: 30216
  },
  {
    name: "São Bernardo do Campo",
    region: "Grande São Paulo",
    population: "811 mil",
    hdi: 0.805,
    occurrences2024: 23652
  },
  {
    name: "Osasco",
    region: "Grande São Paulo",
    population: "729 mil",
    hdi: 0.776,
    occurrences2024: 22104
  },
  {
    name: "Sorocaba",
    region: "Sorocaba",
    population: "724 mil",
    hdi: 0.798,
    occurrences2024: 17616
  },
  {
    name: "Praia Grande",
    region: "Santos",
    population: "350 mil",
    hdi: 0.754,
    occurrences2024: 15545
  },
  {
    name: "Diadema",
    region: "Grande São Paulo",
    population: "393 mil",
    hdi: 0.757,
    occurrences2024: 12444
  },
  {
    name: "Santos",
    region: "Santos",
    population: "419 mil",
    hdi: 0.84,
    occurrences2024: 12228
  },
  {
    name: "São José dos Campos",
    region: "São jose dos campos",
    population: "697 mil",
    hdi: 0.807,
    occurrences2024: 11629
  },
  {
    name: "Mauá",
    region: "Grande São Paulo",
    population: "418 mil",
    hdi: 0.766,
    occurrences2024: 11500
  },
  {
    name: "São Vicente",
    region: "Santos",
    population: "330 mil",
    hdi: 0.768,
    occurrences2024: 11447
  },
  {
    name: "Carapicuíba",
    region: "Grande São Paulo",
    population: "387 mil",
    hdi: 0.749,
    occurrences2024: 10975
  },
  {
    name: "Itaquaquecetuba",
    region: "Grande São Paulo",
    population: "369 mil",
    hdi: 0.714,
    occurrences2024: 9653
  },
  {
    name: "Guarujá",
    region: "Santos",
    population: "288 mil",
    hdi: 0.751,
    occurrences2024: 9497
  },
  {
    name: "Mogi das Cruzes",
    region: "Grande São Paulo",
    population: "452 mil",
    hdi: 0.783,
    occurrences2024: 9262
  },
  {
    name: "Jundiaí",
    region: "Campinas",
    population: "443 mil",
    hdi: 0.822,
    occurrences2024: 9153
  },
  {
    name: "Bauru",
    region: "Bauru",
    population: "379 mil",
    hdi: 0.801,
    occurrences2024: 8983
  },
  {
    name: "Suzano",
    region: "Grande São Paulo",
    population: "307 mil",
    hdi: 0.765,
    occurrences2024: 8455
  },
  {
    name: "Taboão da Serra",
    region: "Grande São Paulo",
    population: "274 mil",
    hdi: 0.769,
    occurrences2024: 8405
  },
  {
    name: "Piracicaba",
    region: "Piracicaba",
    population: "423 mil",
    hdi: 0.785,
    occurrences2024: 7790
  },
  {
    name: "Limeira",
    region: "Piracicaba",
    population: "292 mil",
    hdi: 0.775,
    occurrences2024: 7278
  },
  {
    name: "Cotia",
    region: "Grande São Paulo",
    population: "274 mil",
    hdi: 0.78,
    occurrences2024: 7085
  },
  {
    name: "Barueri",
    region: "Grande São Paulo",
    population: "316 mil",
    hdi: 0.786,
    occurrences2024: 7064
  },
  {
    name: "Embu das Artes",
    region: "Grande São Paulo",
    population: "251 mil",
    hdi: 0.735,
    occurrences2024: 6952
  },
  {
    name: "Taubaté",
    region: "São jose dos campos",
    population: "311 mil",
    hdi: 0.8,
    occurrences2024: 6446
  },
  {
    name: "Sumaré",
    region: "Piracicaba",
    population: "280 mil",
    hdi: 0.762,
    occurrences2024: 6269
  },
  {
    name: "Ferraz de Vasconcelos",
    region: "Grande São Paulo",
    population: "179 mil",
    hdi: 0.738,
    occurrences2024: 5923
  },
  {
    name: "Hortolândia",
    region: "Piracicaba",
    population: "237 mil",
    hdi: 0.756,
    occurrences2024: 5449
  },
  {
    name: "Itapevi",
    region: "Grande São Paulo",
    population: "232 mil",
    hdi: 0.735,
    occurrences2024: 5289
  },
  {
    name: "Americana",
    region: "Piracicaba",
    population: "237 mil",
    hdi: 0.811,
    occurrences2024: 5243
  },
  {
    name: "Marília",
    region: "Bauru",
    population: "238 mil",
    hdi: 0.798,
    occurrences2024: 5216
  },
  {
    name: "Itapecerica da Serra",
    region: "Grande São Paulo",
    population: "159 mil",
    hdi: 0.742,
    occurrences2024: 5178
  },
  {
    name: "Rio Claro",
    region: "Piracicaba",
    population: "201 mil",
    hdi: 0.803,
    occurrences2024: 5141
  },
  {
    name: "Itanhaém",
    region: "Santos",
    population: "112 mil",
    hdi: 0.745,
    occurrences2024: 4936
  },
  {
    name: "Araçatuba",
    region: "Araçatuba",
    population: "200 mil",
    hdi: 0.788,
    occurrences2024: 4875
  },
  {
    name: "Presidente Prudente",
    region: "Presidente Prudente",
    population: "226 mil",
    hdi: 0.806,
    occurrences2024: 4778
  },
  {
    name: "São Caetano do Sul",
    region: "Grande São Paulo",
    population: "166 mil",
    hdi: 0.862,
    occurrences2024: 4310
  },
  {
    name: "Jacareí",
    region: "São jose dos campos",
    population: "240 mil",
    hdi: 0.777,
    occurrences2024: 4268
  },
  {
    name: "Francisco Morato",
    region: "Grande São Paulo",
    population: "165 mil",
    hdi: 0.703,
    occurrences2024: 4264
  },
  {
    name: "Indaiatuba",
    region: "Campinas",
    population: "256 mil",
    hdi: 0.788,
    occurrences2024: 3840
  },
  {
    name: "Poá",
    region: "Grande São Paulo",
    population: "104 mil",
    hdi: 0.771,
    occurrences2024: 3785
  },
  {
    name: "Caraguatatuba",
    region: "São jose dos campos",
    population: "135 mil",
    hdi: 0.759,
    occurrences2024: 3765
  },
  {
    name: "Mongaguá",
    region: "Santos",
    population: "62 mil",
    hdi: 0.754,
    occurrences2024: 3742
  },
  {
    name: "Mogi Guaçu",
    region: "Campinas",
    population: "154 mil",
    hdi: 0.774,
    occurrences2024: 3402
  },
  {
    name: "Peruíbe",
    region: "Santos",
    population: "68 mil",
    hdi: 0.749,
    occurrences2024: 3315
  },
  {
    name: "Araras",
    region: "Piracicaba",
    population: "131 mil",
    hdi: 0.781,
    occurrences2024: 3267
  },
  {
    name: "Franca",
    region: "Ribeirão Preto",
    population: "353 mil",
    hdi: 0.78,
    occurrences2024: 3266
  },
  {
    name: "Bragança Paulista",
    region: "Campinas",
    population: "177 mil",
    hdi: 0.776,
    occurrences2024: 3217
  },
  {
    name: "Franco da Rocha",
    region: "Grande São Paulo",
    population: "145 mil",
    hdi: 0.731,
    occurrences2024: 3212
  },
  {
    name: "Cubatão",
    region: "Santos",
    population: "112 mil",
    hdi: 0.737,
    occurrences2024: 3137
  },
  {
    name: "Santa Bárbara d'Oeste",
    region: "Piracicaba",
    population: "183 mil",
    hdi: 0.819,
    occurrences2024: 3115
  },
  {
    name: "Itapetininga",
    region: "Sorocaba",
    population: "158 mil",
    hdi: 0.763,
    occurrences2024: 2948
  },
  {
    name: "São José do Rio Preto",
    region: "São José do Rio Preto",
    population: "480 mil",
    hdi: 0.797,
    occurrences2024: 2948
  },
  {
    name: "Itu. São Paulo",
    region: "Sorocaba",
    population: "168 mil",
    hdi: 0.773,
    occurrences2024: 2806
  },
  {
    name: "Jaú",
    region: "Bauru",
    population: "133 mil",
    hdi: 0.778,
    occurrences2024: 2801
  },
  {
    name: "Botucatu",
    region: "Sorocaba",
    population: "145 mil",
    hdi: 0.8,
    occurrences2024: 2607
  },
  {
    name: "Ubatuba",
    region: "São jose dos campos",
    population: "93 mil",
    hdi: 0.751,
    occurrences2024: 2575
  },
  {
    name: "Bertioga",
    region: "Santos",
    population: "64 mil",
    hdi: 0.73,
    occurrences2024: 2575
  },
  {
    name: "Araraquara",
    region: "Ribeirão Preto",
    population: "242 mil",
    hdi: 0.815,
    occurrences2024: 2557
  },
  {
    name: "Atibaia",
    region: "Campinas",
    population: "159 mil",
    hdi: 0.765,
    occurrences2024: 2548
  },
  {
    name: "Birigui",
    region: "Araçatuba",
    population: "119 mil",
    hdi: 0.78,
    occurrences2024: 2494
  },
  {
    name: "Pindamonhangaba",
    region: "São jose dos campos",
    population: "165 mil",
    hdi: 0.773,
    occurrences2024: 2434
  },
  {
    name: "São Carlos",
    region: "Ribeirão Preto",
    population: "255 mil",
    hdi: 0.805,
    occurrences2024: 2365
  },
  {
    name: "Paulínia",
    region: "Campinas",
    population: "111 mil",
    hdi: 0.795,
    occurrences2024: 2347
  },
  {
    name: "Ourinhos",
    region: "Bauru",
    population: "104 mil",
    hdi: 0.778,
    occurrences2024: 2264
  },
  {
    name: "Catanduva",
    region: "São José do Rio Preto",
    population: "116 mil",
    hdi: 0.785,
    occurrences2024: 2257
  },
  {
    name: "Assis",
    region: "Presidente Prudente",
    population: "101 mil",
    hdi: 0.805,
    occurrences2024: 2257
  },
  {
    name: "Lins. São Paulo",
    region: "Bauru",
    population: "77 mil",
    hdi: 0.786,
    occurrences2024: 2207
  },
  {
    name: "Jandira",
    region: "Grande São Paulo",
    population: "118 mil",
    hdi: 0.76,
    occurrences2024: 2067
  },
  {
    name: "Mogi Mirim",
    region: "Campinas",
    population: "93 mil",
    hdi: 0.784,
    occurrences2024: 2053
  },
  {
    name: "Leme",
    region: "Piracicaba",
    population: "98 mil",
    hdi: 0.744,
    occurrences2024: 2051
  },
  {
    name: "Ribeirão Pires",
    region: "Grande São Paulo",
    population: "116 mil",
    hdi: 0.784,
    occurrences2024: 2048
  },
  {
    name: "Arujá",
    region: "Grande São Paulo",
    population: "87 mil",
    hdi: 0.784,
    occurrences2024: 2024
  },
  {
    name: "Santana de Parnaíba",
    region: "Grande São Paulo",
    population: "154 mil",
    hdi: 0.814,
    occurrences2024: 2014
  },
  {
    name: "Valinhos",
    region: "Campinas",
    population: "126 mil",
    hdi: 0.819,
    occurrences2024: 2014
  },
  {
    name: "Cajamar",
    region: "Grande São Paulo",
    population: "93 mil",
    hdi: 0.728,
    occurrences2024: 2008
  },
  {
    name: "Guaratinguetá",
    region: "São jose dos campos",
    population: "118 mil",
    hdi: 0.798,
    occurrences2024: 2003
  },
  {
    name: "São Sebastião",
    region: "São jose dos campos",
    population: "82 mil",
    hdi: 0.772,
    occurrences2024: 1991
  },
  {
    name: "Várzea Paulista",
    region: "Campinas",
    population: "116 mil",
    hdi: 0.759,
    occurrences2024: 1990
  },
  {
    name: "Sertãozinho",
    region: "Ribeirão Preto",
    population: "127 mil",
    hdi: 0.761,
    occurrences2024: 1972
  },
  {
    name: "Caçapava",
    region: "São jose dos campos",
    population: "96 mil",
    hdi: 0.788,
    occurrences2024: 1959
  },
  {
    name: "Votorantim",
    region: "Sorocaba",
    population: "128 mil",
    hdi: 0.767,
    occurrences2024: 1882
  },
  {
    name: "Mairiporã",
    region: "Grande São Paulo",
    population: "94 mil",
    hdi: 0.788,
    occurrences2024: 1847
  },
  {
    name: "Tatuí",
    region: "Sorocaba",
    population: "124 mil",
    hdi: 0.752,
    occurrences2024: 1837
  },
  {
    name: "Votuporanga",
    region: "São José do Rio Preto",
    population: "97 mil",
    hdi: 0.79,
    occurrences2024: 1790
  },
  {
    name: "Campo Limpo Paulista",
    region: "Campinas",
    population: "78 mil",
    hdi: 0.769,
    occurrences2024: 1730
  },
  {
    name: "Mococa",
    region: "Piracicaba",
    population: "68 mil",
    hdi: 0.762,
    occurrences2024: 1659
  },
  {
    name: "São João da Boa Vista",
    region: "Piracicaba",
    population: "93 mil",
    hdi: 0.797,
    occurrences2024: 1657
  },
  {
    name: "Caieiras",
    region: "Grande São Paulo",
    population: "95 mil",
    hdi: 0.781,
    occurrences2024: 1588
  },
  {
    name: "Avaré. São Paulo",
    region: "Sorocaba",
    population: "93 mil",
    hdi: 0.767,
    occurrences2024: 1554
  },
  {
    name: "Jaboticabal",
    region: "Ribeirão Preto",
    population: "72 mil",
    hdi: 0.778,
    occurrences2024: 1536
  },
  {
    name: "Barretos",
    region: "Ribeirão Preto",
    population: "122 mil",
    hdi: 0.789,
    occurrences2024: 1456
  },
  {
    name: "Salto. São Paulo",
    region: "Sorocaba",
    population: "134 mil",
    hdi: 0.809,
    occurrences2024: 1443
  },
  {
    name: "Ribeirão Preto",
    region: "Ribeirão Preto",
    population: "699 mil",
    hdi: 0.8,
    occurrences2024: 1426
  },
  {
    name: "Boituva",
    region: "Sorocaba",
    population: "61 mil",
    hdi: 0.78,
    occurrences2024: 1414
  },
  {
    name: "Jaguariúna",
    region: "Campinas",
    population: "59 mil",
    hdi: 0.784,
    occurrences2024: 1402
  },
  {
    name: "Embu-Guaçu",
    region: "Grande São Paulo",
    population: "67 mil",
    hdi: 0.749,
    occurrences2024: 1370
  },
  {
    name: "Cruzeiro",
    region: "São jose dos campos",
    population: "75 mil",
    hdi: 0.788,
    occurrences2024: 1366
  },
  {
    name: "Bebedouro",
    region: "Ribeirão Preto",
    population: "76 mil",
    hdi: 0.78,
    occurrences2024: 1365
  },
  {
    name: "Ibiúna",
    region: "Sorocaba",
    population: "76 mil",
    hdi: 0.71,
    occurrences2024: 1364
  },
  {
    name: "Fernandópolis",
    region: "São José do Rio Preto",
    population: "71 mil",
    hdi: 0.797,
    occurrences2024: 1291
  },
  {
    name: "Matão",
    region: "Ribeirão Preto",
    population: "79 mil",
    hdi: 0.773,
    occurrences2024: 1249
  },
  {
    name: "Lorena",
    region: "São jose dos campos",
    population: "85 mil",
    hdi: 0.766,
    occurrences2024: 1249
  },
  {
    name: "São Roque. São Paulo",
    region: "Sorocaba",
    population: "79 mil",
    hdi: 0.82,
    occurrences2024: 1248
  },
  {
    name: "Tupâ",
    region: "Bauru",
    population: "64 mil",
    hdi: 0.771,
    occurrences2024: 1233
  },
  {
    name: "Itatiba",
    region: "Campinas",
    population: "122 mil",
    hdi: 0.778,
    occurrences2024: 1222
  },
  {
    name: "Itapeva. São Paulo",
    region: "Sorocaba",
    population: "90 mil",
    hdi: 0.732,
    occurrences2024: 1222
  },
  {
    name: "Penápolis",
    region: "Araçatuba",
    population: "62 mil",
    hdi: 0.759,
    occurrences2024: 1183
  },
  {
    name: "Andradina",
    region: "Araçatuba",
    population: "60 mil",
    hdi: 0.779,
    occurrences2024: 1178
  },
  {
    name: "Itapira",
    region: "Campinas",
    population: "72 mil",
    hdi: 0.762,
    occurrences2024: 1158
  },
  {
    name: "Vinhedo",
    region: "Campinas",
    population: "77 mil",
    hdi: 0.817,
    occurrences2024: 1152
  },
  {
    name: "Ibitinga",
    region: "Ribeirão Preto",
    population: "60 mil",
    hdi: 0.747,
    occurrences2024: 1148
  },
  {
    name: "Itupeva",
    region: "Campinas",
    population: "71 mil",
    hdi: 0.762,
    occurrences2024: 1141
  },
  {
    name: "Pirassununga",
    region: "Piracicaba",
    population: "74 mil",
    hdi: 0.801,
    occurrences2024: 1122
  },
  {
    name: "Cosmópolis",
    region: "Piracicaba",
    population: "60 mil",
    hdi: 0.769,
    occurrences2024: 1122
  },
  {
    name: "Registro",
    region: "Santos",
    population: "60 mil",
    hdi: 0.754,
    occurrences2024: 1096
  },
  {
    name: "Nova Odessa",
    region: "Piracicaba",
    population: "62 mil",
    hdi: 0.791,
    occurrences2024: 1088
  },
  {
    name: "Jales",
    region: "São José do Rio Preto",
    population: "49 mil",
    hdi: 0.776,
    occurrences2024: 1040
  },
  {
    name: "Monte Mor",
    region: "Piracicaba",
    population: "65 mil",
    hdi: 0.733,
    occurrences2024: 1030
  },
  {
    name: "Taquaritinga",
    region: "Ribeirão Preto",
    population: "52 mil",
    hdi: 0.748,
    occurrences2024: 1026
  },
  {
    name: "Dracena",
    region: "Presidente Prudente",
    population: "45 mil",
    hdi: 0.776,
    occurrences2024: 1025
  },
  {
    name: "Mirassol",
    region: "São José do Rio Preto",
    population: "63 mil",
    hdi: 0.762,
    occurrences2024: 1002
  },
  {
    name: "Garça",
    region: "Bauru",
    population: "42 mil",
    hdi: 0.769,
    occurrences2024: 988
  },
  {
    name: "Lençóis Paulista",
    region: "Bauru",
    population: "67 mil",
    hdi: 0.764,
    occurrences2024: 985
  },
  {
    name: "Batatais",
    region: "Ribeirão Preto",
    population: "58 mil",
    hdi: 0.761,
    occurrences2024: 950
  },
  {
    name: "Campos do Jordão",
    region: "São jose dos campos",
    population: "47 mil",
    hdi: 0.749,
    occurrences2024: 934
  },
  {
    name: "Ilhabela",
    region: "São jose dos campos",
    population: "35 mil",
    hdi: 0.756,
    occurrences2024: 901
  },
  {
    name: "Artur Nogueira",
    region: "Piracicaba",
    population: "51 mil",
    hdi: 0.749,
    occurrences2024: 885
  },
  {
    name: "Olímpia",
    region: "Ribeirão Preto",
    population: "55 mil",
    hdi: 0.773,
    occurrences2024: 878
  },
  {
    name: "Porto Ferreira",
    region: "Ribeirão Preto",
    population: "53 mil",
    hdi: 0.751,
    occurrences2024: 876
  },
  {
    name: "Aparecida",
    region: "São jose dos campos",
    population: "33 mil",
    hdi: 0.755,
    occurrences2024: 866
  },
  {
    name: "São Joaquim da Barra",
    region: "Ribeirão Preto",
    population: "49 mil",
    hdi: 0.762,
    occurrences2024: 835
  },
  {
    name: "Vargem Grande Paulista",
    region: "Grande São Paulo",
    population: "50 mil",
    hdi: 0.77,
    occurrences2024: 825
  },
  {
    name: "Santa Cruz do Rio Pardo",
    region: "Bauru",
    population: "46 mil",
    hdi: 0.762,
    occurrences2024: 821
  },
  {
    name: "Pederneiras",
    region: "Bauru",
    population: "45 mil",
    hdi: 0.739,
    occurrences2024: 817
  },
  {
    name: "Itararé",
    region: "Sorocaba",
    population: "44 mil",
    hdi: 0.703,
    occurrences2024: 811
  },
  {
    name: "Amparo",
    region: "Campinas",
    population: "68 mil",
    hdi: 0.785,
    occurrences2024: 804
  },
  {
    name: "Jardinópolis",
    region: "Ribeirão Preto",
    population: "45 mil",
    hdi: 0.735,
    occurrences2024: 798
  },
  {
    name: "Capão Bonito",
    region: "Sorocaba",
    population: "46 mil",
    hdi: 0.721,
    occurrences2024: 773
  },
  {
    name: "Santa Isabel",
    region: "Grande São Paulo",
    population: "53 mil",
    hdi: 0.738,
    occurrences2024: 761
  },
  {
    name: "Itápolis",
    region: "Ribeirão Preto",
    population: "39 mil",
    hdi: 0.744,
    occurrences2024: 750
  },
  {
    name: "São José do Rio Pardo",
    region: "Piracicaba",
    population: "52 mil",
    hdi: 0.774,
    occurrences2024: 738
  },
  {
    name: "Santa Fé do Sul",
    region: "São José do Rio Preto",
    population: "35 mil",
    hdi: 0.784,
    occurrences2024: 737
  },
  {
    name: "Presidente Epitácio",
    region: "Presidente Prudente",
    population: "40 mil",
    hdi: 0.75,
    occurrences2024: 732
  },
  {
    name: "Juquitiba",
    region: "Grande São Paulo",
    population: "27 mil",
    hdi: 0.709,
    occurrences2024: 719
  },
  {
    name: "Novo Horizonte",
    region: "São José do Rio Preto",
    population: "38 mil",
    hdi: 0.753,
    occurrences2024: 714
  },
  {
    name: "Porto Feliz",
    region: "Sorocaba",
    population: "56 mil",
    hdi: 0.758,
    occurrences2024: 714
  },
  {
    name: "Ilha Comprida",
    region: "Santos",
    population: "13 mil",
    hdi: 0.725,
    occurrences2024: 707
  },
  {
    name: "Mairinque",
    region: "Sorocaba",
    population: "50 mil",
    hdi: 0.743,
    occurrences2024: 673
  },
  {
    name: "Capivari",
    region: "Piracicaba",
    population: "50 mil",
    hdi: 0.75,
    occurrences2024: 671
  },
  {
    name: "São Manuel",
    region: "Sorocaba",
    population: "37 mil",
    hdi: 0.744,
    occurrences2024: 670
  },
  {
    name: "Vargem Grande do Sul",
    region: "Piracicaba",
    population: "40 mil",
    hdi: 0.737,
    occurrences2024: 668
  },
  {
    name: "Serrana",
    region: "Ribeirão Preto",
    population: "44 mil",
    hdi: 0.729,
    occurrences2024: 666
  },
  {
    name: "Ituverava",
    region: "Ribeirão Preto",
    population: "38 mil",
    hdi: 0.765,
    occurrences2024: 663
  },
  {
    name: "Monte Alto",
    region: "Ribeirão Preto",
    population: "48 mil",
    hdi: 0.768,
    occurrences2024: 658
  },
  {
    name: "Miracatu",
    region: "Santos",
    population: "19 mil",
    hdi: 0.697,
    occurrences2024: 656
  },
  {
    name: "José Bonifácio",
    region: "São José do Rio Preto",
    population: "37 mil",
    hdi: 0.777,
    occurrences2024: 654
  },
  {
    name: "Louveira",
    region: "Campinas",
    population: "52 mil",
    hdi: 0.777,
    occurrences2024: 620
  },
  {
    name: "Guariba",
    region: "Ribeirão Preto",
    population: "37 mil",
    hdi: 0.719,
    occurrences2024: 606
  },
  {
    name: "Iguape",
    region: "Santos",
    population: "29 mil",
    hdi: 0.726,
    occurrences2024: 602
  },
  {
    name: "Agudos",
    region: "Bauru",
    population: "38 mil",
    hdi: 0.745,
    occurrences2024: 598
  },
  {
    name: "Piedade. São Paulo",
    region: "Sorocaba",
    population: "53 mil",
    hdi: 0.716,
    occurrences2024: 595
  },
  {
    name: "Salto de Pirapora",
    region: "Sorocaba",
    population: "44 mil",
    hdi: 0.729,
    occurrences2024: 590
  },
  {
    name: "Bariri",
    region: "Bauru",
    population: "32 mil",
    hdi: 0.75,
    occurrences2024: 590
  },
  {
    name: "Tanabi",
    region: "São José do Rio Preto",
    population: "25 mil",
    hdi: 0.748,
    occurrences2024: 582
  },
  {
    name: "Paraguaçu Paulista",
    region: "Presidente Prudente",
    population: "41 mil",
    hdi: 0.762,
    occurrences2024: 581
  },
  {
    name: "Tremembé",
    region: "São jose dos campos",
    population: "51 mil",
    hdi: 0.785,
    occurrences2024: 573
  },
  {
    name: "Guararema",
    region: "Grande São Paulo",
    population: "31 mil",
    hdi: 0.731,
    occurrences2024: 568
  },
  {
    name: "Guaíra",
    region: "Ribeirão Preto",
    population: "39 mil",
    hdi: 0.753,
    occurrences2024: 566
  },
  {
    name: "Jarinu",
    region: "Campinas",
    population: "38 mil",
    hdi: 0.733,
    occurrences2024: 566
  },
  {
    name: "Espírito Santo do Pinhal",
    region: "Piracicaba",
    population: "40 mil",
    hdi: 0.787,
    occurrences2024: 564
  },
  {
    name: "Promissão",
    region: "Bauru",
    population: "35 mil",
    hdi: 0.743,
    occurrences2024: 562
  },
  {
    name: "Aguaí",
    region: "Piracicaba",
    population: "32 mil",
    hdi: 0.715,
    occurrences2024: 557
  },
  {
    name: "Rio Grande da Serra",
    region: "Grande São Paulo",
    population: "44 mil",
    hdi: 0.749,
    occurrences2024: 556
  },
  {
    name: "Morro Agudo",
    region: "Ribeirão Preto",
    population: "28 mil",
    hdi: 0.712,
    occurrences2024: 553
  },
  {
    name: "Conchal",
    region: "Piracicaba",
    population: "28 mil",
    hdi: 0.708,
    occurrences2024: 550
  },
  {
    name: "Ilha Solteira",
    region: "Araçatuba",
    population: "26 mil",
    hdi: 0.812,
    occurrences2024: 542
  },
  {
    name: "Cabreúva",
    region: "Campinas",
    population: "47 mil",
    hdi: 0.738,
    occurrences2024: 541
  },
  {
    name: "Cerquilho",
    region: "Sorocaba",
    population: "45 mil",
    hdi: 0.782,
    occurrences2024: 541
  },
  {
    name: "Américo Brasiliense",
    region: "Ribeirão Preto",
    population: "33 mil",
    hdi: 0.751,
    occurrences2024: 533
  },
  {
    name: "Barra Bonita. São Paulo",
    region: "Bauru",
    population: "34 mil",
    hdi: 0.788,
    occurrences2024: 526
  },
  {
    name: "Adamantina",
    region: "Presidente Prudente",
    population: "35 mil",
    hdi: 0.79,
    occurrences2024: 522
  },
  {
    name: "Pedreira",
    region: "Campinas",
    population: "43 mil",
    hdi: 0.769,
    occurrences2024: 520
  },
  {
    name: "Rancharia",
    region: "Presidente Prudente",
    population: "29 mil",
    hdi: 0.751,
    occurrences2024: 513
  },
  {
    name: "Cajati",
    region: "Santos",
    population: "29 mil",
    hdi: 0.694,
    occurrences2024: 511
  },
  {
    name: "Pitangueiras",
    region: "Ribeirão Preto",
    population: "34 mil",
    hdi: 0.723,
    occurrences2024: 510
  },
  {
    name: "Cajuru",
    region: "Ribeirão Preto",
    population: "24 mil",
    hdi: 0.713,
    occurrences2024: 506
  },
  {
    name: "Araçoiaba da Serra",
    region: "Sorocaba",
    population: "32 mil",
    hdi: 0.776,
    occurrences2024: 501
  },
  {
    name: "Cordeirópolis",
    region: "Piracicaba",
    population: "25 mil",
    hdi: 0.758,
    occurrences2024: 497
  },
  {
    name: "Casa Branca",
    region: "Piracicaba",
    population: "28 mil",
    hdi: 0.73,
    occurrences2024: 496
  },
  {
    name: "Tietê. São Paulo",
    region: "Sorocaba",
    population: "38 mil",
    hdi: 0.778,
    occurrences2024: 494
  },
  {
    name: "São Pedro",
    region: "Piracicaba",
    population: "38 mil",
    hdi: 0.755,
    occurrences2024: 490
  },
  {
    name: "Osvaldo Cruz",
    region: "Presidente Prudente",
    population: "31 mil",
    hdi: 0.762,
    occurrences2024: 483
  },
  {
    name: "Descalvado",
    region: "Ribeirão Preto",
    population: "32 mil",
    hdi: 0.76,
    occurrences2024: 480
  },
  {
    name: "Orlândia",
    region: "Ribeirão Preto",
    population: "38 mil",
    hdi: 0.78,
    occurrences2024: 475
  },
  {
    name: "Cândido Mota",
    region: "Presidente Prudente",
    population: "29 mil",
    hdi: 0.747,
    occurrences2024: 472
  },
  {
    name: "Pontal",
    region: "Ribeirão Preto",
    population: "38 mil",
    hdi: 0.725,
    occurrences2024: 472
  },
  {
    name: "Igarapava",
    region: "Ribeirão Preto",
    population: "26 mil",
    hdi: 0.768,
    occurrences2024: 468
  },
  {
    name: "Cravinhos",
    region: "Ribeirão Preto",
    population: "33 mil",
    hdi: 0.756,
    occurrences2024: 466
  },
  {
    name: "Miguelópolis",
    region: "Ribeirão Preto",
    population: "19 mil",
    hdi: 0.741,
    occurrences2024: 462
  },
  {
    name: "Presidente Venceslau",
    region: "Presidente Prudente",
    population: "35 mil",
    hdi: 0.763,
    occurrences2024: 458
  },
  {
    name: "Rio das Pedras",
    region: "Piracicaba",
    population: "31 mil",
    hdi: 0.759,
    occurrences2024: 458
  },
  {
    name: "Juquiá",
    region: "Santos",
    population: "17 mil",
    hdi: 0.7,
    occurrences2024: 458
  },
  {
    name: "Cachoeira Paulista",
    region: "São jose dos campos",
    population: "32 mil",
    hdi: 0.764,
    occurrences2024: 457
  },
  {
    name: "Dois Córregos",
    region: "Bauru",
    population: "25 mil",
    hdi: 0.725,
    occurrences2024: 454
  },
  {
    name: "Ibaté",
    region: "Ribeirão Preto",
    population: "32 mil",
    hdi: 0.703,
    occurrences2024: 453
  },
  {
    name: "Socorro",
    region: "Campinas",
    population: "40 mil",
    hdi: 0.729,
    occurrences2024: 445
  },
  {
    name: "Piraju",
    region: "Sorocaba",
    population: "29 mil",
    hdi: 0.758,
    occurrences2024: 442
  },
  {
    name: "Iperó",
    region: "Sorocaba",
    population: "36 mil",
    hdi: 0.719,
    occurrences2024: 434
  },
  {
    name: "Guararapes",
    region: "Araçatuba",
    population: "31 mil",
    hdi: 0.763,
    occurrences2024: 430
  },
  {
    name: "Santa Rita do Passa Quatro",
    region: "Ribeirão Preto",
    population: "25 mil",
    hdi: 0.775,
    occurrences2024: 419
  },
  {
    name: "Serra Negra",
    region: "Campinas",
    population: "30 mil",
    hdi: 0.767,
    occurrences2024: 417
  },
  {
    name: "Taquarituba",
    region: "Sorocaba",
    population: "24 mil",
    hdi: 0.701,
    occurrences2024: 412
  },
  {
    name: "Brotas",
    region: "Piracicaba",
    population: "24 mil",
    hdi: 0.74,
    occurrences2024: 410
  },
  {
    name: "Martinópolis",
    region: "Presidente Prudente",
    population: "25 mil",
    hdi: 0.721,
    occurrences2024: 406
  },
  {
    name: "Araçariguama",
    region: "Sorocaba",
    population: "22 mil",
    hdi: 0.704,
    occurrences2024: 404
  },
  {
    name: "Santa Cruz das Palmeiras",
    region: "Piracicaba",
    population: "29 mil",
    hdi: 0.728,
    occurrences2024: 395
  },
  {
    name: "Pereira Barreto",
    region: "Araçatuba",
    population: "24 mil",
    hdi: 0.766,
    occurrences2024: 393
  },
  {
    name: "Palmital",
    region: "Presidente Prudente",
    population: "20 mil",
    hdi: 0.746,
    occurrences2024: 392
  },
  {
    name: "Biritiba-Mirim",
    region: "Grande São Paulo",
    population: "30 mil",
    hdi: 0.712,
    occurrences2024: 383
  },
  {
    name: "Santa Gertrudes",
    region: "Piracicaba",
    population: "24 mil",
    hdi: 0.737,
    occurrences2024: 381
  },
  {
    name: "Santo Antônio de Posse",
    region: "Campinas",
    population: "23 mil",
    hdi: 0.702,
    occurrences2024: 379
  },
  {
    name: "São Miguel Arcanjo. São Paulo",
    region: "Sorocaba",
    population: "32 mil",
    hdi: 0.71,
    occurrences2024: 379
  },
  {
    name: "Monte Aprazível",
    region: "São José do Rio Preto",
    population: "22 mil",
    hdi: 0.785,
    occurrences2024: 379
  },
  {
    name: "São Lourenço da Serra",
    region: "Grande São Paulo",
    population: "16 mil",
    hdi: 0.728,
    occurrences2024: 377
  },
  {
    name: "Igaraçu do Tietê",
    region: "Bauru",
    population: "23 mil",
    hdi: 0.727,
    occurrences2024: 375
  },
  {
    name: "Teodoro Sampaio. São Paulo",
    region: "Presidente Prudente",
    population: "22 mil",
    hdi: 0.741,
    occurrences2024: 375
  },
  {
    name: "Laranjal Paulista",
    region: "Sorocaba",
    population: "26 mil",
    hdi: 0.729,
    occurrences2024: 369
  },
  {
    name: "Brodowski",
    region: "Ribeirão Preto",
    population: "25 mil",
    hdi: 0.755,
    occurrences2024: 366
  },
  {
    name: "Itaí",
    region: "Sorocaba",
    population: "25 mil",
    hdi: 0.713,
    occurrences2024: 365
  },
  {
    name: "Cerqueira César",
    region: "Sorocaba",
    population: "21 mil",
    hdi: 0.729,
    occurrences2024: 363
  },
  {
    name: "Bady Bassitt",
    region: "São José do Rio Preto",
    population: "27 mil",
    hdi: 0.746,
    occurrences2024: 354
  },
  {
    name: "Barrinha",
    region: "Ribeirão Preto",
    population: "32 mil",
    hdi: 0.725,
    occurrences2024: 353
  },
  {
    name: "Piracaia",
    region: "Campinas",
    population: "26 mil",
    hdi: 0.739,
    occurrences2024: 341
  },
  {
    name: "Álvares Machado",
    region: "Presidente Prudente",
    population: "27 mil",
    hdi: 0.758,
    occurrences2024: 340
  },
  {
    name: "Nova Castilho",
    region: "Araçatuba",
    population: "1 mil",
    hdi: 0.756,
    occurrences2024: 335
  },
  {
    name: "Tambaú",
    region: "Piracicaba",
    population: "21 mil",
    hdi: 0.731,
    occurrences2024: 333
  },
  {
    name: "Pirapozinho",
    region: "Presidente Prudente",
    population: "25 mil",
    hdi: 0.776,
    occurrences2024: 330
  },
  {
    name: "Mirandópolis",
    region: "Araçatuba",
    population: "28 mil",
    hdi: 0.751,
    occurrences2024: 330
  },
  {
    name: "Potirendaba",
    region: "São José do Rio Preto",
    population: "18 mil",
    hdi: 0.747,
    occurrences2024: 329
  },
  {
    name: "Guapiaçu",
    region: "São José do Rio Preto",
    population: "22 mil",
    hdi: 0.725,
    occurrences2024: 324
  },
  {
    name: "Apiaí",
    region: "Sorocaba",
    population: "25 mil",
    hdi: 0.71,
    occurrences2024: 323
  },
  {
    name: "Bom Jesus dos Perdões",
    region: "Campinas",
    population: "22 mil",
    hdi: 0.713,
    occurrences2024: 323
  },
  {
    name: "Capela do Alto",
    region: "Sorocaba",
    population: "23 mil",
    hdi: 0.699,
    occurrences2024: 322
  },
  {
    name: "Lucélia",
    region: "Presidente Prudente",
    population: "20 mil",
    hdi: 0.752,
    occurrences2024: 318
  },
  {
    name: "Santa Rosa do Viterbo",
    region: "Ribeirão Preto",
    population: "23 mil",
    hdi: 0.77,
    occurrences2024: 317
  },
  {
    name: "Itirapina",
    region: "Piracicaba",
    population: "16 mil",
    hdi: 0.724,
    occurrences2024: 311
  },
  {
    name: "Valparaíso",
    region: "Araçatuba",
    population: "24 mil",
    hdi: 0.725,
    occurrences2024: 310
  },
  {
    name: "Ipuã",
    region: "Ribeirão Preto",
    population: "14 mil",
    hdi: 0.749,
    occurrences2024: 303
  },
  {
    name: "Iracemápolis",
    region: "Piracicaba",
    population: "22 mil",
    hdi: 0.776,
    occurrences2024: 302
  },
  {
    name: "Pedregulho",
    region: "Ribeirão Preto",
    population: "16 mil",
    hdi: 0.715,
    occurrences2024: 299
  },
  {
    name: "Bastos",
    region: "Bauru",
    population: "22 mil",
    hdi: 0.751,
    occurrences2024: 295
  },
  {
    name: "Pirajuí",
    region: "Bauru",
    population: "22 mil",
    hdi: 0.749,
    occurrences2024: 289
  },
  {
    name: "Fartura",
    region: "Sorocaba",
    population: "17 mil",
    hdi: 0.732,
    occurrences2024: 288
  },
  {
    name: "Monte Azul Paulista",
    region: "Ribeirão Preto",
    population: "18 mil",
    hdi: 0.753,
    occurrences2024: 288
  },
  {
    name: "Pilar do Sul",
    region: "Sorocaba",
    population: "28 mil",
    hdi: 0.69,
    occurrences2024: 287
  },
  {
    name: "Cananéia",
    region: "Santos",
    population: "12 mil",
    hdi: 0.72,
    occurrences2024: 286
  },
  {
    name: "Pariquera-Açu",
    region: "Santos",
    population: "19 mil",
    hdi: 0.736,
    occurrences2024: 284
  },
  {
    name: "Buritama",
    region: "Araçatuba",
    population: "17 mil",
    hdi: 0.763,
    occurrences2024: 283
  },
  {
    name: "Patrocínio Paulista",
    region: "Ribeirão Preto",
    population: "15 mil",
    hdi: 0.73,
    occurrences2024: 282
  },
  {
    name: "Nazaré Paulista",
    region: "Campinas",
    population: "18 mil",
    hdi: 0.678,
    occurrences2024: 279
  },
  {
    name: "Angatuba",
    region: "Sorocaba",
    population: "24 mil",
    hdi: 0.719,
    occurrences2024: 278
  },
  {
    name: "Alumínio",
    region: "Sorocaba",
    population: "17 mil",
    hdi: 0.766,
    occurrences2024: 273
  },
  {
    name: "Paraibuna",
    region: "São jose dos campos",
    population: "18 mil",
    hdi: 0.719,
    occurrences2024: 272
  },
  {
    name: "Rejente Feijo",
    region: "Presidente Prudente",
    population: "21 mil",
    hdi: 0.768,
    occurrences2024: 271
  },
  {
    name: "Mirante do Paranapanema",
    region: "Presidente Prudente",
    population: "16 mil",
    hdi: 0.724,
    occurrences2024: 270
  },
  {
    name: "Panorama",
    region: "Presidente Prudente",
    population: "15 mil",
    hdi: 0.722,
    occurrences2024: 268
  },
  {
    name: "Buri. São Paulo",
    region: "Sorocaba",
    population: "20 mil",
    hdi: 0.636,
    occurrences2024: 261
  },
  {
    name: "Itatinga",
    region: "Sorocaba",
    population: "19 mil",
    hdi: 0.706,
    occurrences2024: 257
  },
  {
    name: "Potim",
    region: "São jose dos campos",
    population: "20 mil",
    hdi: 0.697,
    occurrences2024: 256
  },
  {
    name: "Cesário Lange",
    region: "Sorocaba",
    population: "19 mil",
    hdi: 0.706,
    occurrences2024: 250
  },
  {
    name: "Nova Granada",
    region: "São José do Rio Preto",
    population: "19 mil",
    hdi: 0.739,
    occurrences2024: 249
  },
  {
    name: "Junqueirópolis",
    region: "Presidente Prudente",
    population: "20 mil",
    hdi: 0.745,
    occurrences2024: 246
  },
  {
    name: "Pirapora do Bom Jesus",
    region: "Grande São Paulo",
    population: "18 mil",
    hdi: 0.727,
    occurrences2024: 245
  },
  {
    name: "Guaiçara",
    region: "Bauru",
    population: "11 mil",
    hdi: 0.739,
    occurrences2024: 244
  },
  {
    name: "Conchas",
    region: "Sorocaba",
    population: "15 mil",
    hdi: 0.736,
    occurrences2024: 243
  },
  {
    name: "Boa Esperança do Sul",
    region: "Ribeirão Preto",
    population: "13 mil",
    hdi: 0.681,
    occurrences2024: 243
  },
  {
    name: "Itariri",
    region: "Santos",
    population: "16 mil",
    hdi: 0.677,
    occurrences2024: 243
  },
  {
    name: "Pradópolis",
    region: "Ribeirão Preto",
    population: "17 mil",
    hdi: 0.733,
    occurrences2024: 242
  },
  {
    name: "Piratininga",
    region: "Bauru",
    population: "15 mil",
    hdi: 0.779,
    occurrences2024: 240
  },
  {
    name: "Tabatinga",
    region: "Ribeirão Preto",
    population: "15 mil",
    hdi: 0.704,
    occurrences2024: 240
  },
  {
    name: "Viradouro",
    region: "Ribeirão Preto",
    population: "17 mil",
    hdi: 0.739,
    occurrences2024: 239
  },
  {
    name: "Igaratá",
    region: "São jose dos campos",
    population: "11 mil",
    hdi: 0.711,
    occurrences2024: 238
  },
  {
    name: "Colina",
    region: "Ribeirão Preto",
    population: "18 mil",
    hdi: 0.757,
    occurrences2024: 238
  },
  {
    name: "São Simão",
    region: "Ribeirão Preto",
    population: "13 mil",
    hdi: 0.766,
    occurrences2024: 238
  },
  {
    name: "Paranapanema",
    region: "Sorocaba",
    population: "19 mil",
    hdi: 0.717,
    occurrences2024: 235
  },
  {
    name: "Cardoso",
    region: "São José do Rio Preto",
    population: "11 mil",
    hdi: 0.722,
    occurrences2024: 232
  },
  {
    name: "Rosana. São Paulo",
    region: "Presidente Prudente",
    population: "17 mil",
    hdi: 0.764,
    occurrences2024: 230
  },
  {
    name: "Bernardino de Campos",
    region: "Bauru",
    population: "12 mil",
    hdi: 0.734,
    occurrences2024: 229
  },
  {
    name: "Cafelândia. São Paulo",
    region: "Bauru",
    population: "17 mil",
    hdi: 0.788,
    occurrences2024: 225
  },
  {
    name: "Jacupiranga",
    region: "Santos",
    population: "16 mil",
    hdi: 0.717,
    occurrences2024: 224
  },
  {
    name: "Salesópolis",
    region: "Grande São Paulo",
    population: "15 mil",
    hdi: 0.732,
    occurrences2024: 222
  },
  {
    name: "Sete Barras",
    region: "Santos",
    population: "13 mil",
    hdi: 0.673,
    occurrences2024: 222
  },
  {
    name: "Charqueada",
    region: "Piracicaba",
    population: "16 mil",
    hdi: 0.736,
    occurrences2024: 219
  },
  {
    name: "Engenheiro Coelho",
    region: "Piracicaba",
    population: "20 mil",
    hdi: 0.732,
    occurrences2024: 218
  },
  {
    name: "Altinópolis",
    region: "Ribeirão Preto",
    population: "17 mil",
    hdi: 0.73,
    occurrences2024: 217
  },
  {
    name: "Borborema",
    region: "Ribeirão Preto",
    population: "14 mil",
    hdi: 0.73,
    occurrences2024: 215
  },
  {
    name: "Itapuí",
    region: "Bauru",
    population: "14 mil",
    hdi: 0.725,
    occurrences2024: 214
  },
  {
    name: "Estiva Gerbi",
    region: "Campinas",
    population: "11 mil",
    hdi: 0.74,
    occurrences2024: 213
  },
  {
    name: "Iacanga",
    region: "Bauru",
    population: "10 mil",
    hdi: 0.745,
    occurrences2024: 212
  },
  {
    name: "Caconde",
    region: "Piracicaba",
    population: "17 mil",
    hdi: 0.72,
    occurrences2024: 211
  },
  {
    name: "Santa Branca",
    region: "São jose dos campos",
    population: "14 mil",
    hdi: 0.735,
    occurrences2024: 211
  },
  {
    name: "Elias Fausto",
    region: "Piracicaba",
    population: "18 mil",
    hdi: 0.695,
    occurrences2024: 209
  },
  {
    name: "Guaraci",
    region: "Ribeirão Preto",
    population: "10 mil",
    hdi: 0.737,
    occurrences2024: 209
  },
  {
    name: "Guapiara",
    region: "Sorocaba",
    population: "17 mil",
    hdi: 0.675,
    occurrences2024: 209
  },
  {
    name: "Cedral",
    region: "São José do Rio Preto",
    population: "13 mil",
    hdi: 0.766,
    occurrences2024: 208
  },
  {
    name: "Pedro de Toledo",
    region: "Santos",
    population: "11 mil",
    hdi: 0.696,
    occurrences2024: 208
  },
  {
    name: "Salto Grande. São Paulo",
    region: "Bauru",
    population: "9 mil",
    hdi: 0.704,
    occurrences2024: 208
  },
  {
    name: "Macatuba",
    region: "Bauru",
    population: "17 mil",
    hdi: 0.77,
    occurrences2024: 207
  },
  {
    name: "Águas de Lindoia",
    region: "Campinas",
    population: "18 mil",
    hdi: 0.745,
    occurrences2024: 206
  },
  {
    name: "Queluz",
    region: "São jose dos campos",
    population: "9 mil",
    hdi: 0.722,
    occurrences2024: 204
  },
  {
    name: "Joanópolis",
    region: "Campinas",
    population: "13 mil",
    hdi: 0.699,
    occurrences2024: 204
  },
  {
    name: "Chavantes",
    region: "Bauru",
    population: "12 mil",
    hdi: 0.729,
    occurrences2024: 202
  },
  {
    name: "Itajobi",
    region: "São José do Rio Preto",
    population: "17 mil",
    hdi: 0.73,
    occurrences2024: 202
  },
  {
    name: "Santa Adélia",
    region: "São José do Rio Preto",
    population: "14 mil",
    hdi: 0.76,
    occurrences2024: 198
  },
  {
    name: "Cunha",
    region: "São jose dos campos",
    population: "22 mil",
    hdi: 0.684,
    occurrences2024: 198
  },
  {
    name: "Itaberá",
    region: "Sorocaba",
    population: "18 mil",
    hdi: 0.693,
    occurrences2024: 197
  },
  {
    name: "Ribeirão Branco",
    region: "Sorocaba",
    population: "19 mil",
    hdi: 0.639,
    occurrences2024: 196
  },
  {
    name: "Valentim Gentil",
    region: "São José do Rio Preto",
    population: "14 mil",
    hdi: 0.735,
    occurrences2024: 194
  },
  {
    name: "Pindorama",
    region: "São José do Rio Preto",
    population: "15 mil",
    hdi: 0.737,
    occurrences2024: 192
  },
  {
    name: "Pinhalzinho",
    region: "Campinas",
    population: "15 mil",
    hdi: 0.725,
    occurrences2024: 191
  },
  {
    name: "Rincão",
    region: "Ribeirão Preto",
    population: "9 mil",
    hdi: 0.734,
    occurrences2024: 189
  },
  {
    name: "Auriflama",
    region: "Araçatuba",
    population: "14 mil",
    hdi: 0.773,
    occurrences2024: 188
  },
  {
    name: "Urupês",
    region: "São José do Rio Preto",
    population: "14 mil",
    hdi: 0.745,
    occurrences2024: 186
  },
  {
    name: "Vera Cruz. São Paulo",
    region: "Bauru",
    population: "10 mil",
    hdi: 0.754,
    occurrences2024: 184
  },
  {
    name: "Pompeia. São Paulo",
    region: "Bauru",
    population: "21 mil",
    hdi: 0.786,
    occurrences2024: 183
  },
  {
    name: "Roseira",
    region: "São jose dos campos",
    population: "11 mil",
    hdi: 0.737,
    occurrences2024: 183
  },
  {
    name: "Serra Azul",
    region: "Ribeirão Preto",
    population: "13 mil",
    hdi: 0.686,
    occurrences2024: 181
  },
  {
    name: "Tarumã",
    region: "Presidente Prudente",
    population: "15 mil",
    hdi: 0.753,
    occurrences2024: 179
  },
  {
    name: "Itaporanga. São Paulo",
    region: "Sorocaba",
    population: "14 mil",
    hdi: 0.719,
    occurrences2024: 178
  },
  {
    name: "Taguaí",
    region: "Sorocaba",
    population: "13 mil",
    hdi: 0.709,
    occurrences2024: 178
  },
  {
    name: "Maracaí",
    region: "Presidente Prudente",
    population: "13 mil",
    hdi: 0.771,
    occurrences2024: 178
  },
  {
    name: "Holambra",
    region: "Campinas",
    population: "15 mil",
    hdi: 0.793,
    occurrences2024: 174
  },
  {
    name: "Barra do Turvo",
    region: "Santos",
    population: "7 mil",
    hdi: 0.641,
    occurrences2024: 174
  },
  {
    name: "Cristais Paulista",
    region: "Ribeirão Preto",
    population: "9 mil",
    hdi: 0.734,
    occurrences2024: 173
  },
  {
    name: "Cosmorama",
    region: "São José do Rio Preto",
    population: "9 mil",
    hdi: 0.722,
    occurrences2024: 173
  },
  {
    name: "Ouroeste",
    region: "São José do Rio Preto",
    population: "10 mil",
    hdi: 0.77,
    occurrences2024: 169
  },
  {
    name: "Mineiros do Tietê",
    region: "Bauru",
    population: "11 mil",
    hdi: 0.73,
    occurrences2024: 169
  },
  {
    name: "Pacaembu",
    region: "Presidente Prudente",
    population: "15 mil",
    hdi: 0.725,
    occurrences2024: 168
  },
  {
    name: "Parapuã",
    region: "Bauru",
    population: "11 mil",
    hdi: 0.737,
    occurrences2024: 167
  },
  {
    name: "Tupi Paulista",
    region: "Presidente Prudente",
    population: "16 mil",
    hdi: 0.769,
    occurrences2024: 164
  },
  {
    name: "Luís Antônio",
    region: "Ribeirão Preto",
    population: "12 mil",
    hdi: 0.731,
    occurrences2024: 164
  },
  {
    name: "Ipaussu",
    region: "Bauru",
    population: "14 mil",
    hdi: 0.727,
    occurrences2024: 163
  },
  {
    name: "Quatá",
    region: "Bauru",
    population: "13 mil",
    hdi: 0.738,
    occurrences2024: 162
  },
  {
    name: "Porangaba",
    region: "Sorocaba",
    population: "10 mil",
    hdi: 0.703,
    occurrences2024: 161
  },
  {
    name: "Bofete",
    region: "Sorocaba",
    population: "10 mil",
    hdi: 0.705,
    occurrences2024: 161
  },
  {
    name: "Piquete",
    region: "São jose dos campos",
    population: "12 mil",
    hdi: 0.757,
    occurrences2024: 159
  },
  {
    name: "Severínia",
    region: "Ribeirão Preto",
    population: "15 mil",
    hdi: 0.715,
    occurrences2024: 158
  },
  {
    name: "Bocaina",
    region: "Bauru",
    population: "11 mil",
    hdi: 0.742,
    occurrences2024: 157
  },
  {
    name: "Eldorado",
    region: "Santos",
    population: "13 mil",
    hdi: 0.691,
    occurrences2024: 156
  },
  {
    name: "Riolândia",
    region: "São José do Rio Preto",
    population: "10 mil",
    hdi: 0.703,
    occurrences2024: 155
  },
  {
    name: "Ibirá",
    region: "São José do Rio Preto",
    population: "12 mil",
    hdi: 0.74,
    occurrences2024: 154
  },
  {
    name: "Morungaba",
    region: "Campinas",
    population: "14 mil",
    hdi: 0.715,
    occurrences2024: 153
  },
  {
    name: "Gália",
    region: "Bauru",
    population: "6 mil",
    hdi: 0.709,
    occurrences2024: 151
  },
  {
    name: "Sarapuí",
    region: "Sorocaba",
    population: "10 mil",
    hdi: 0.707,
    occurrences2024: 150
  },
  {
    name: "Arealva",
    region: "Bauru",
    population: "8 mil",
    hdi: 0.744,
    occurrences2024: 150
  },
  {
    name: "Santo Anastácio",
    region: "Presidente Prudente",
    population: "18 mil",
    hdi: 0.753,
    occurrences2024: 149
  },
  {
    name: "Tabapuã",
    region: "São José do Rio Preto",
    population: "11 mil",
    hdi: 0.735,
    occurrences2024: 148
  },
  {
    name: "Avanhandava",
    region: "Araçatuba",
    population: "11 mil",
    hdi: 0.705,
    occurrences2024: 147
  },
  {
    name: "Sabino. são paulo",
    region: "Bauru",
    population: "5 mil",
    hdi: 0.728,
    occurrences2024: 147
  },
  {
    name: "São José da Bela Vista",
    region: "Ribeirão Preto",
    population: "8 mil",
    hdi: 0.693,
    occurrences2024: 146
  },
  {
    name: "Guareí",
    region: "Sorocaba",
    population: "15 mil",
    hdi: 0.687,
    occurrences2024: 146
  },
  {
    name: "Ribeirão Bonito",
    region: "Ribeirão Preto",
    population: "11 mil",
    hdi: 0.712,
    occurrences2024: 144
  },
  {
    name: "Colômbia",
    region: "Ribeirão Preto",
    population: "7 mil",
    hdi: 0.71,
    occurrences2024: 144
  },
  {
    name: "Sales Oliveira",
    region: "Ribeirão Preto",
    population: "11 mil",
    hdi: 0.772,
    occurrences2024: 143
  },
  {
    name: "Duartina",
    region: "Bauru",
    population: "12 mil",
    hdi: 0.748,
    occurrences2024: 142
  },
  {
    name: "Pirangi",
    region: "Ribeirão Preto",
    population: "11 mil",
    hdi: 0.756,
    occurrences2024: 140
  },
  {
    name: "Guatapará",
    region: "Ribeirão Preto",
    population: "7 mil",
    hdi: 0.743,
    occurrences2024: 138
  },
  {
    name: "Getulina",
    region: "Bauru",
    population: "10 mil",
    hdi: 0.717,
    occurrences2024: 136
  },
  {
    name: "Vargem",
    region: "Campinas",
    population: "11 mil",
    hdi: 0.699,
    occurrences2024: 135
  },
  {
    name: "Divinolândia",
    region: "Piracicaba",
    population: "11 mil",
    hdi: 0.734,
    occurrences2024: 134
  },
  {
    name: "Bálsamo",
    region: "São José do Rio Preto",
    population: "10 mil",
    hdi: 0.756,
    occurrences2024: 134
  },
  {
    name: "Mendonça",
    region: "São José do Rio Preto",
    population: "6 mil",
    hdi: 0.744,
    occurrences2024: 134
  },
  {
    name: "Tapiraí",
    region: "Piracicaba",
    population: "8 mil",
    hdi: 0.681,
    occurrences2024: 134
  },
  {
    name: "Guarantã",
    region: "Bauru",
    population: "6 mil",
    hdi: 0.713,
    occurrences2024: 132
  },
  {
    name: "Torrinha",
    region: "Piracicaba",
    population: "9 mil",
    hdi: 0.744,
    occurrences2024: 132
  },
  {
    name: "Palmares Paulista",
    region: "São José do Rio Preto",
    population: "10 mil",
    hdi: 0.722,
    occurrences2024: 132
  },
  {
    name: "Santo Antônio da Alegria",
    region: "Ribeirão Preto",
    population: "7 mil",
    hdi: 0.702,
    occurrences2024: 132
  },
  {
    name: "Nuporanga",
    region: "Ribeirão Preto",
    population: "7 mil",
    hdi: 0.746,
    occurrences2024: 131
  },
  {
    name: "Palmeira d'Oeste",
    region: "São José do Rio Preto",
    population: "9 mil",
    hdi: 0.753,
    occurrences2024: 130
  },
  {
    name: "Pardinho",
    region: "Sorocaba",
    population: "7 mil",
    hdi: 0.727,
    occurrences2024: 130
  },
  {
    name: "Guaimbê",
    region: "Bauru",
    population: "6 mil",
    hdi: 0.728,
    occurrences2024: 130
  },
  {
    name: "Nhandeara",
    region: "São José do Rio Preto",
    population: "10 mil",
    hdi: 0.751,
    occurrences2024: 130
  },
  {
    name: "Narandiba",
    region: "Presidente Prudente",
    population: "6 mil",
    hdi: 0.718,
    occurrences2024: 130
  },
  {
    name: "Palestina",
    region: "São José do Rio Preto",
    population: "11 mil",
    hdi: 0.732,
    occurrences2024: 129
  },
  {
    name: "Rifaina",
    region: "Ribeirão Preto",
    population: "4 mil",
    hdi: 0.74,
    occurrences2024: 129
  },
  {
    name: "Nova Europa",
    region: "Ribeirão Preto",
    population: "9 mil",
    hdi: 0.765,
    occurrences2024: 128
  },
  {
    name: "Uchôa",
    region: "São José do Rio Preto",
    population: "10 mil",
    hdi: 0.75,
    occurrences2024: 125
  },
  {
    name: "Estrela d'Oeste",
    region: "São José do Rio Preto",
    population: "9 mil",
    hdi: 0.76,
    occurrences2024: 124
  },
  {
    name: "Canitar",
    region: "Bauru",
    population: "6 mil",
    hdi: 0.68,
    occurrences2024: 124
  },
  {
    name: "Cajobi",
    region: "Ribeirão Preto",
    population: "9 mil",
    hdi: 0.734,
    occurrences2024: 124
  },
  {
    name: "São Pedro do Turvo",
    region: "Bauru",
    population: "7 mil",
    hdi: 0.703,
    occurrences2024: 123
  },
  {
    name: "Pereiras",
    region: "Sorocaba",
    population: "9 mil",
    hdi: 0.736,
    occurrences2024: 123
  },
  {
    name: "Flórida Paulista",
    region: "Presidente Prudente",
    population: "13 mil",
    hdi: 0.715,
    occurrences2024: 122
  },
  {
    name: "Itobi",
    region: "Piracicaba",
    population: "8 mil",
    hdi: 0.717,
    occurrences2024: 118
  },
  {
    name: "Urânia",
    region: "São José do Rio Preto",
    population: "9 mil",
    hdi: 0.746,
    occurrences2024: 116
  },
  {
    name: "Restinga",
    region: "Ribeirão Preto",
    population: "6 mil",
    hdi: 0.705,
    occurrences2024: 114
  },
  {
    name: "São Luiz do Paraitinga",
    region: "São jose dos campos",
    population: "10 mil",
    hdi: 0.697,
    occurrences2024: 114
  },
  {
    name: "Águas de Santa Bárbara",
    region: "Sorocaba",
    population: "7 mil",
    hdi: 0.757,
    occurrences2024: 114
  },
  {
    name: "Neves Paulista",
    region: "São José do Rio Preto",
    population: "10 mil",
    hdi: 0.754,
    occurrences2024: 114
  },
  {
    name: "Icém",
    region: "São José do Rio Preto",
    population: "8 mil",
    hdi: 0.72,
    occurrences2024: 113
  },
  {
    name: "Ariranha",
    region: "São José do Rio Preto",
    population: "8 mil",
    hdi: 0.733,
    occurrences2024: 113
  },
  {
    name: "Santo Antônio do Aracanguá",
    region: "Araçatuba",
    population: "8 mil",
    hdi: 0.757,
    occurrences2024: 113
  },
  {
    name: "São Sebastião da Grama",
    region: "Piracicaba",
    population: "10 mil",
    hdi: 0.701,
    occurrences2024: 113
  },
  {
    name: "Canas",
    region: "São jose dos campos",
    population: "5 mil",
    hdi: 0.704,
    occurrences2024: 111
  },
  {
    name: "Barbosa",
    region: "Araçatuba",
    population: "6 mil",
    hdi: 0.699,
    occurrences2024: 111
  },
  {
    name: "Ipeúna",
    region: "Piracicaba",
    population: "7 mil",
    hdi: 0.753,
    occurrences2024: 111
  },
  {
    name: "Tuiuti",
    region: "Campinas",
    population: "7 mil",
    hdi: 0.728,
    occurrences2024: 111
  },
  {
    name: "Fernando Prestes",
    region: "Ribeirão Preto",
    population: "6 mil",
    hdi: 0.758,
    occurrences2024: 111
  },
  {
    name: "Terra Roxa",
    region: "Ribeirão Preto",
    population: "8 mil",
    hdi: 0.749,
    occurrences2024: 110
  },
  {
    name: "Santo Antônio do Pinhal",
    region: "São jose dos campos",
    population: "7 mil",
    hdi: 0.706,
    occurrences2024: 110
  },
  {
    name: "Ubarana",
    region: "São José do Rio Preto",
    population: "5 mil",
    hdi: 0.7,
    occurrences2024: 108
  },
  {
    name: "Aramina",
    region: "Ribeirão Preto",
    population: "5 mil",
    hdi: 0.74,
    occurrences2024: 108
  },
  {
    name: "Sales",
    region: "São José do Rio Preto",
    population: "6 mil",
    hdi: 0.751,
    occurrences2024: 108
  },
  {
    name: "Sud Mennucci",
    region: "Araçatuba",
    population: "7 mil",
    hdi: 0.747,
    occurrences2024: 106
  },
  {
    name: "Iepê",
    region: "Presidente Prudente",
    population: "8 mil",
    hdi: 0.736,
    occurrences2024: 106
  },
  {
    name: "Presidente Bernardes",
    region: "Presidente Prudente",
    population: "14 mil",
    hdi: 0.757,
    occurrences2024: 105
  },
  {
    name: "Três Fronteiras",
    region: "São José do Rio Preto",
    population: "7 mil",
    hdi: 0.753,
    occurrences2024: 104
  },
  {
    name: "Tapiraí. São Paulo",
    region: "Sorocaba",
    population: "8 mil",
    hdi: 0.681,
    occurrences2024: 103
  },
  {
    name: "General Salgado",
    region: "Araçatuba",
    population: "10 mil",
    hdi: 0.747,
    occurrences2024: 102
  },
  {
    name: "Itirapuã",
    region: "Ribeirão Preto",
    population: "6 mil",
    hdi: 0.707,
    occurrences2024: 102
  },
  {
    name: "Ipiguá",
    region: "São José do Rio Preto",
    population: "7 mil",
    hdi: 0.73,
    occurrences2024: 102
  },
  {
    name: "Nova Campina",
    region: "Sorocaba",
    population: "8 mil",
    hdi: 0.651,
    occurrences2024: 101
  },
  {
    name: "Dourado",
    region: "Ribeirão Preto",
    population: "8 mil",
    hdi: 0.738,
    occurrences2024: 101
  },
  {
    name: "Taiaçu",
    region: "Ribeirão Preto",
    population: "6 mil",
    hdi: 0.71,
    occurrences2024: 99
  },
  {
    name: "Areiópolis",
    region: "Sorocaba",
    population: "10 mil",
    hdi: 0.695,
    occurrences2024: 98
  },
  {
    name: "Rinópolis",
    region: "Bauru",
    population: "9 mil",
    hdi: 0.723,
    occurrences2024: 98
  },
  {
    name: "Rafard",
    region: "Piracicaba",
    population: "9 mil",
    hdi: 0.745,
    occurrences2024: 97
  },
  {
    name: "Manduri",
    region: "Sorocaba",
    population: "10 mil",
    hdi: 0.739,
    occurrences2024: 96
  },
  {
    name: "São Bento do Sapucaí",
    region: "São jose dos campos",
    population: "12 mil",
    hdi: 0.72,
    occurrences2024: 96
  },
  {
    name: "Lavrinhas",
    region: "São jose dos campos",
    population: "7 mil",
    hdi: 0.729,
    occurrences2024: 95
  },
  {
    name: "Tarabai. São Paulo",
    region: "Presidente Prudente",
    population: "7 mil",
    hdi: 0.726,
    occurrences2024: 95
  },
  {
    name: "Herculândia",
    region: "Bauru",
    population: "9 mil",
    hdi: 0.727,
    occurrences2024: 95
  },
  {
    name: "Clementina",
    region: "Araçatuba",
    population: "7 mil",
    hdi: 0.725,
    occurrences2024: 94
  },
  {
    name: "Jaci",
    region: "São José do Rio Preto",
    population: "8 mil",
    hdi: 0.723,
    occurrences2024: 94
  },
  {
    name: "Monte Alegre do Sul",
    region: "Campinas",
    population: "9 mil",
    hdi: 0.759,
    occurrences2024: 94
  },
  {
    name: "Dumont",
    region: "Ribeirão Preto",
    population: "9 mil",
    hdi: 0.744,
    occurrences2024: 94
  },
  {
    name: "Ouro Verde",
    region: "Presidente Prudente",
    population: "8 mil",
    hdi: 0.692,
    occurrences2024: 93
  },
  {
    name: "Jambeiro",
    region: "São jose dos campos",
    population: "6 mil",
    hdi: 0.756,
    occurrences2024: 93
  },
  {
    name: "Águas da Prata",
    region: "Piracicaba",
    population: "7 mil",
    hdi: 0.781,
    occurrences2024: 92
  },
  {
    name: "Santa Lúcia",
    region: "Ribeirão Preto",
    population: "7 mil",
    hdi: 0.737,
    occurrences2024: 92
  },
  {
    name: "Alambari",
    region: "Sorocaba",
    population: "6 mil",
    hdi: 0.712,
    occurrences2024: 92
  },
  {
    name: "Catiguá",
    region: "São José do Rio Preto",
    population: "7 mil",
    hdi: 0.751,
    occurrences2024: 92
  },
  {
    name: "Pratânia",
    region: "Sorocaba",
    population: "5 mil",
    hdi: 0.701,
    occurrences2024: 92
  },
  {
    name: "Irapuã",
    region: "São José do Rio Preto",
    population: "7 mil",
    hdi: 0.713,
    occurrences2024: 92
  },
  {
    name: "Saltinho",
    region: "Piracicaba",
    population: "8 mil",
    hdi: 0.791,
    occurrences2024: 91
  },
  {
    name: "Ibirarema",
    region: "Presidente Prudente",
    population: "6 mil",
    hdi: 0.708,
    occurrences2024: 89
  },
  {
    name: "Bananal",
    region: "São jose dos campos",
    population: "10 mil",
    hdi: 0.733,
    occurrences2024: 88
  },
  {
    name: "Iaras",
    region: "Sorocaba",
    population: "8 mil",
    hdi: 0.674,
    occurrences2024: 88
  },
  {
    name: "Campina do Monte Alegre",
    region: "Sorocaba",
    population: "6 mil",
    hdi: 0.717,
    occurrences2024: 88
  },
  {
    name: "Mirassolândia",
    region: "São José do Rio Preto",
    population: "5 mil",
    hdi: 0.738,
    occurrences2024: 88
  },
  {
    name: "Santo Antônio do Jardim",
    region: "Piracicaba",
    population: "6 mil",
    hdi: 0.714,
    occurrences2024: 87
  },
  {
    name: "Bilac",
    region: "Araçatuba",
    population: "7 mil",
    hdi: 0.768,
    occurrences2024: 86
  },
  {
    name: "Taiúva",
    region: "Ribeirão Preto",
    population: "7 mil",
    hdi: 0.76,
    occurrences2024: 86
  },
  {
    name: "Dobrada",
    region: "Ribeirão Preto",
    population: "9 mil",
    hdi: 0.718,
    occurrences2024: 86
  },
  {
    name: "Santa Ernestina",
    region: "Ribeirão Preto",
    population: "6 mil",
    hdi: 0.738,
    occurrences2024: 85
  },
  {
    name: "Santa Maria da Serra",
    region: "Piracicaba",
    population: "5 mil",
    hdi: 0.686,
    occurrences2024: 83
  },
  {
    name: "Anhembi",
    region: "Sorocaba",
    population: "6 mil",
    hdi: 0.721,
    occurrences2024: 82
  },
  {
    name: "Euclides da Cunha Paulista",
    region: "Presidente Prudente",
    population: "8 mil",
    hdi: 0.704,
    occurrences2024: 82
  },
  {
    name: "Indiaporã",
    region: "São José do Rio Preto",
    population: "4 mil",
    hdi: 0.751,
    occurrences2024: 82
  },
  {
    name: "Onda Verde",
    region: "São José do Rio Preto",
    population: "5 mil",
    hdi: 0.738,
    occurrences2024: 80
  },
  {
    name: "Monteiro Lobato",
    region: "São jose dos campos",
    population: "4 mil",
    hdi: 0.71,
    occurrences2024: 80
  },
  {
    name: "Boraceia",
    region: "Bauru",
    population: "5 mil",
    hdi: 0.754,
    occurrences2024: 80
  },
  {
    name: "Adolfo",
    region: "São José do Rio Preto",
    population: "4 mil",
    hdi: 0.73,
    occurrences2024: 80
  },
  {
    name: "Poloni",
    region: "São José do Rio Preto",
    population: "6 mil",
    hdi: 0.766,
    occurrences2024: 79
  },
  {
    name: "Avaí",
    region: "Bauru",
    population: "4 mil",
    hdi: 0.714,
    occurrences2024: 79
  },
  {
    name: "Paranapuã",
    region: "São José do Rio Preto",
    population: "4 mil",
    hdi: 0.732,
    occurrences2024: 79
  },
  {
    name: "Analândia",
    region: "Piracicaba",
    population: "5 mil",
    hdi: 0.754,
    occurrences2024: 78
  },
  {
    name: "Macaubal",
    region: "São José do Rio Preto",
    population: "7 mil",
    hdi: 0.743,
    occurrences2024: 78
  },
  {
    name: "Corumbataí",
    region: "Piracicaba",
    population: "4 mil",
    hdi: 0.754,
    occurrences2024: 77
  },
  {
    name: "Guzolândia",
    region: "Araçatuba",
    population: "4 mil",
    hdi: 0.697,
    occurrences2024: 77
  },
  {
    name: "Santa Cruz da Conceição",
    region: "Piracicaba",
    population: "4 mil",
    hdi: 0.79,
    occurrences2024: 77
  },
  {
    name: "Guaraçaí",
    region: "Araçatuba",
    population: "7 mil",
    hdi: 0.719,
    occurrences2024: 77
  },
  {
    name: "Nova Aliança",
    region: "São José do Rio Preto",
    population: "7 mil",
    hdi: 0.738,
    occurrences2024: 76
  },
  {
    name: "Lindóia",
    region: "Campinas",
    population: "7 mil",
    hdi: 0.742,
    occurrences2024: 74
  },
  {
    name: "Paulo de Faria",
    region: "São José do Rio Preto",
    population: "7 mil",
    hdi: 0.725,
    occurrences2024: 74
  },
  {
    name: "Iacri",
    region: "Bauru",
    population: "6 mil",
    hdi: 0.733,
    occurrences2024: 74
  },
  {
    name: "Jeriquara",
    region: "Ribeirão Preto",
    population: "4 mil",
    hdi: 0.703,
    occurrences2024: 73
  },
  {
    name: "Natividade da Serra",
    region: "São jose dos campos",
    population: "7 mil",
    hdi: 0.655,
    occurrences2024: 73
  },
  {
    name: "Glicério",
    region: "Araçatuba",
    population: "4 mil",
    hdi: 0.735,
    occurrences2024: 73
  },
  {
    name: "Coroados",
    region: "Araçatuba",
    population: "5 mil",
    hdi: 0.719,
    occurrences2024: 73
  },
  {
    name: "Vista Alegre do Alto",
    region: "Ribeirão Preto",
    population: "8 mil",
    hdi: 0.744,
    occurrences2024: 72
  },
  {
    name: "Taquarivaí",
    region: "Sorocaba",
    population: "7 mil",
    hdi: 0.679,
    occurrences2024: 72
  },
  {
    name: "Espírito Santo do Turvo",
    region: "Bauru",
    population: "4 mil",
    hdi: 0.696,
    occurrences2024: 71
  },
  {
    name: "Irapuru",
    region: "Presidente Prudente",
    population: "7 mil",
    hdi: 0.712,
    occurrences2024: 71
  },
  {
    name: "Riversul",
    region: "Sorocaba",
    population: "6 mil",
    hdi: 0.664,
    occurrences2024: 71
  },
  {
    name: "Buritizal",
    region: "Ribeirão Preto",
    population: "4 mil",
    hdi: 0.735,
    occurrences2024: 71
  },
  {
    name: "Américo de Campos",
    region: "São José do Rio Preto",
    population: "6 mil",
    hdi: 0.745,
    occurrences2024: 70
  },
  {
    name: "Arandu. São Paulo",
    region: "Sorocaba",
    population: "7 mil",
    hdi: 0.69,
    occurrences2024: 70
  },
  {
    name: "Indiana",
    region: "Presidente Prudente",
    population: "5 mil",
    hdi: 0.761,
    occurrences2024: 68
  },
  {
    name: "Iporanga",
    region: "Santos",
    population: "4 mil",
    hdi: 0.703,
    occurrences2024: 68
  },
  {
    name: "Ubirajara. São Paulo",
    region: "Bauru",
    population: "5 mil",
    hdi: 0.764,
    occurrences2024: 67
  },
  {
    name: "Echaporã",
    region: "Bauru",
    population: "6 mil",
    hdi: 0.745,
    occurrences2024: 66
  },
  {
    name: "João Ramalho",
    region: "Presidente Prudente",
    population: "4 mil",
    hdi: 0.741,
    occurrences2024: 65
  },
  {
    name: "Campos Novos Paulista",
    region: "Presidente Prudente",
    population: "5 mil",
    hdi: 0.706,
    occurrences2024: 65
  },
  {
    name: "Nipoã",
    region: "São José do Rio Preto",
    population: "5 mil",
    hdi: 0.713,
    occurrences2024: 65
  },
  {
    name: "Nova Independência",
    region: "Araçatuba",
    population: "5 mil",
    hdi: 0.735,
    occurrences2024: 65
  },
  {
    name: "Aparecida d'Oeste",
    region: "São José do Rio Preto",
    population: "4 mil",
    hdi: 0.721,
    occurrences2024: 65
  },
  {
    name: "Planalto",
    region: "São José do Rio Preto",
    population: "4 mil",
    hdi: 0.719,
    occurrences2024: 65
  },
  {
    name: "Reginópolis",
    region: "Bauru",
    population: "8 mil",
    hdi: 0.728,
    occurrences2024: 65
  },
  {
    name: "Ribeirão Corrente",
    region: "Ribeirão Preto",
    population: "5 mil",
    hdi: 0.711,
    occurrences2024: 64
  },
  {
    name: "Taciba",
    region: "Presidente Prudente",
    population: "6 mil",
    hdi: 0.723,
    occurrences2024: 64
  },
  {
    name: "Alfredo Marcondes",
    region: "Presidente Prudente",
    population: "4 mil",
    hdi: 0.741,
    occurrences2024: 64
  },
  {
    name: "Paraíso",
    region: "São José do Rio Preto",
    population: "6 mil",
    hdi: 0.749,
    occurrences2024: 64
  },
  {
    name: "Cabrália Paulista",
    region: "Bauru",
    population: "4 mil",
    hdi: 0.694,
    occurrences2024: 63
  },
  {
    name: "Jaborandi",
    region: "Ribeirão Preto",
    population: "6 mil",
    hdi: 0.711,
    occurrences2024: 63
  },
  {
    name: "Pontalinda",
    region: "São José do Rio Preto",
    population: "4 mil",
    hdi: 0.702,
    occurrences2024: 61
  },
  {
    name: "Quintana. São Paulo",
    region: "Bauru",
    population: "7 mil",
    hdi: 0.732,
    occurrences2024: 61
  },
  {
    name: "Lagoinha",
    region: "São jose dos campos",
    population: "5 mil",
    hdi: 0.693,
    occurrences2024: 61
  },
  {
    name: "Pedra Bela",
    region: "Campinas",
    population: "7 mil",
    hdi: 0.677,
    occurrences2024: 61
  },
  {
    name: "Itapura",
    region: "Araçatuba",
    population: "4 mil",
    hdi: 0.72,
    occurrences2024: 61
  },
  {
    name: "Sarutaiá",
    region: "Sorocaba",
    population: "4 mil",
    hdi: 0.688,
    occurrences2024: 60
  },
  {
    name: "Gavião Peixoto",
    region: "Ribeirão Preto",
    population: "5 mil",
    hdi: 0.719,
    occurrences2024: 60
  },
  {
    name: "Cândido Rodrigues",
    region: "Ribeirão Preto",
    population: "3 mil",
    hdi: 0.789,
    occurrences2024: 60
  },
  {
    name: "Santópolis do Aguapeí",
    region: "Araçatuba",
    population: "4 mil",
    hdi: 0.74,
    occurrences2024: 59
  },
  {
    name: "Ocauçu",
    region: "Bauru",
    population: "4 mil",
    hdi: 0.717,
    occurrences2024: 59
  },
  {
    name: "Álvaro de Carvalho",
    region: "Bauru",
    population: "5 mil",
    hdi: 0.688,
    occurrences2024: 58
  },
  {
    name: "Parisi",
    region: "São José do Rio Preto",
    population: "3 mil",
    hdi: 0.721,
    occurrences2024: 58
  },
  {
    name: "Piacatu",
    region: "Araçatuba",
    population: "6 mil",
    hdi: 0.732,
    occurrences2024: 58
  },
  {
    name: "Silveiras",
    region: "São jose dos campos",
    population: "6 mil",
    hdi: 0.678,
    occurrences2024: 58
  },
  {
    name: "Álvares Florence",
    region: "São José do Rio Preto",
    population: "4 mil",
    hdi: 0.728,
    occurrences2024: 58
  },
  {
    name: "Santa Albertina",
    region: "São José do Rio Preto",
    population: "6 mil",
    hdi: 0.728,
    occurrences2024: 57
  },
  {
    name: "Oriente. São Paulo",
    region: "Bauru",
    population: "6 mil",
    hdi: 0.791,
    occurrences2024: 57
  },
  {
    name: "Braúna",
    region: "Araçatuba",
    population: "5 mil",
    hdi: 0.737,
    occurrences2024: 56
  },
  {
    name: "Monte Castelo",
    region: "Presidente Prudente",
    population: "4 mil",
    hdi: 0.741,
    occurrences2024: 55
  },
  {
    name: "Anhumas",
    region: "Presidente Prudente",
    population: "4 mil",
    hdi: 0.741,
    occurrences2024: 55
  },
  {
    name: "Orindiúva",
    region: "São José do Rio Preto",
    population: "6 mil",
    hdi: 0.767,
    occurrences2024: 55
  },
  {
    name: "Mombuca",
    region: "Piracicaba",
    population: "4 mil",
    hdi: 0.719,
    occurrences2024: 55
  },
  {
    name: "Sandovalina",
    region: "Presidente Prudente",
    population: "4 mil",
    hdi: 0.709,
    occurrences2024: 55
  },
  {
    name: "Quadra. São Paulo",
    region: "Sorocaba",
    population: "3 mil",
    hdi: 0.755,
    occurrences2024: 53
  },
  {
    name: "Populina",
    region: "São José do Rio Preto",
    population: "4 mil",
    hdi: 0.714,
    occurrences2024: 53
  },
  {
    name: "Ribeirão Grande",
    region: "Sorocaba",
    population: "7 mil",
    hdi: 0.705,
    occurrences2024: 53
  },
  {
    name: "Queiroz",
    region: "Bauru",
    population: "3 mil",
    hdi: 0.715,
    occurrences2024: 53
  },
  {
    name: "Redenção da Serra",
    region: "São jose dos campos",
    population: "4 mil",
    hdi: 0.657,
    occurrences2024: 52
  },
  {
    name: "Ribeirão do Sul",
    region: "Bauru",
    population: "5 mil",
    hdi: 0.747,
    occurrences2024: 52
  },
  {
    name: "Suzanápolis",
    region: "Araçatuba",
    population: "3 mil",
    hdi: 0.699,
    occurrences2024: 51
  },
  {
    name: "Júlio Mesquita",
    region: "Bauru",
    population: "4 mil",
    hdi: 0.716,
    occurrences2024: 51
  },
  {
    name: "Coronel Macedo",
    region: "Sorocaba",
    population: "4 mil",
    hdi: 0.69,
    occurrences2024: 50
  },
  {
    name: "Areias",
    region: "São jose dos campos",
    population: "4 mil",
    hdi: 0.697,
    occurrences2024: 50
  },
  {
    name: "Pongaí",
    region: "Bauru",
    population: "3 mil",
    hdi: 0.755,
    occurrences2024: 50
  },
  {
    name: "Florínea",
    region: "Presidente Prudente",
    population: "4 mil",
    hdi: 0.713,
    occurrences2024: 49
  },
  {
    name: "Murutinga do Sul",
    region: "Araçatuba",
    population: "4 mil",
    hdi: 0.726,
    occurrences2024: 49
  },
  {
    name: "Novais",
    region: "São José do Rio Preto",
    population: "4 mil",
    hdi: 0.719,
    occurrences2024: 49
  },
  {
    name: "Santo Expedito",
    region: "Presidente Prudente",
    population: "3 mil",
    hdi: 0.732,
    occurrences2024: 47
  },
  {
    name: "Rubinéia",
    region: "São José do Rio Preto",
    population: "4 mil",
    hdi: 0.759,
    occurrences2024: 47
  },
  {
    name: "Balbinos",
    region: "Bauru",
    population: "4 mil",
    hdi: 0.669,
    occurrences2024: 47
  },
  {
    name: "Tejupá",
    region: "Sorocaba",
    population: "4 mil",
    hdi: 0.668,
    occurrences2024: 46
  },
  {
    name: "Borebi",
    region: "Bauru",
    population: "3 mil",
    hdi: 0.705,
    occurrences2024: 46
  },
  {
    name: "Lavínia",
    region: "Araçatuba",
    population: "10 mil",
    hdi: 0.721,
    occurrences2024: 46
  },
  {
    name: "São José do Barreiro",
    region: "São jose dos campos",
    population: "4 mil",
    hdi: 0.684,
    occurrences2024: 45
  },
  {
    name: "Lupércio",
    region: "Bauru",
    population: "4 mil",
    hdi: 0.724,
    occurrences2024: 43
  },
  {
    name: "Meridiano",
    region: "São José do Rio Preto",
    population: "5 mil",
    hdi: 0.731,
    occurrences2024: 43
  },
  {
    name: "Altair",
    region: "Ribeirão Preto",
    population: "3 mil",
    hdi: 0.687,
    occurrences2024: 42
  },
  {
    name: "Caiuá",
    region: "Presidente Prudente",
    population: "5 mil",
    hdi: 0.697,
    occurrences2024: 41
  },
  {
    name: "Salmourão",
    region: "Presidente Prudente",
    population: "5 mil",
    hdi: 0.719,
    occurrences2024: 41
  },
  {
    name: "Floreal",
    region: "São José do Rio Preto",
    population: "3 mil",
    hdi: 0.747,
    occurrences2024: 41
  },
  {
    name: "Taquaral",
    region: "Ribeirão Preto",
    population: "3 mil",
    hdi: 0.759,
    occurrences2024: 41
  },
  {
    name: "Platina",
    region: "Presidente Prudente",
    population: "3 mil",
    hdi: 0.719,
    occurrences2024: 40
  },
  {
    name: "Itaju",
    region: "Bauru",
    population: "4 mil",
    hdi: 0.705,
    occurrences2024: 40
  },
  {
    name: "Presidente Alves",
    region: "Bauru",
    population: "4 mil",
    hdi: 0.735,
    occurrences2024: 40
  },
  {
    name: "Marapoama",
    region: "São José do Rio Preto",
    population: "3 mil",
    hdi: 0.752,
    occurrences2024: 39
  },
  {
    name: "Águas de São Pedro",
    region: "Piracicaba",
    population: "3 mil",
    hdi: 0.854,
    occurrences2024: 39
  },
  {
    name: "Luiziânia",
    region: "Araçatuba",
    population: "5 mil",
    hdi: 0.702,
    occurrences2024: 39
  },
  {
    name: "Zacarias",
    region: "São José do Rio Preto",
    population: "3 mil",
    hdi: 0.729,
    occurrences2024: 38
  },
  {
    name: "Gastão Vidigal",
    region: "Araçatuba",
    population: "3 mil",
    hdi: 0.723,
    occurrences2024: 38
  },
  {
    name: "Macedônia",
    region: "São José do Rio Preto",
    population: "4 mil",
    hdi: 0.74,
    occurrences2024: 38
  },
  {
    name: "Mira Estrela",
    region: "São José do Rio Preto",
    population: "3 mil",
    hdi: 0.743,
    occurrences2024: 38
  },
  {
    name: "Motuca",
    region: "Ribeirão Preto",
    population: "4 mil",
    hdi: 0.741,
    occurrences2024: 37
  },
  {
    name: "Nantes",
    region: "Presidente Prudente",
    population: "3 mil",
    hdi: 0.714,
    occurrences2024: 37
  },
  {
    name: "Jumirim",
    region: "Sorocaba",
    population: "3 mil",
    hdi: 0.741,
    occurrences2024: 37
  },
  {
    name: "Brejo Alegre",
    region: "Araçatuba",
    population: "3 mil",
    hdi: 0.71,
    occurrences2024: 36
  },
  {
    name: "Bom Sucesso de Itararé",
    region: "Sorocaba",
    population: "4 mil",
    hdi: 0.66,
    occurrences2024: 35
  },
  {
    name: "Barra do Chapéu",
    region: "Sorocaba",
    population: "5 mil",
    hdi: 0.66,
    occurrences2024: 35
  },
  {
    name: "Elisiário",
    region: "São José do Rio Preto",
    population: "3 mil",
    hdi: 0.747,
    occurrences2024: 35
  },
  {
    name: "Caiabu",
    region: "Presidente Prudente",
    population: "4 mil",
    hdi: 0.729,
    occurrences2024: 34
  },
  {
    name: "Nova Luzitânia",
    region: "Araçatuba",
    population: "3 mil",
    hdi: 0.743,
    occurrences2024: 34
  },
  {
    name: "Trabiju",
    region: "Ribeirão Preto",
    population: "2 mil",
    hdi: 0.722,
    occurrences2024: 34
  },
  {
    name: "Ribeira. São Paulo",
    region: "Sorocaba",
    population: "3 mil",
    hdi: 0.78,
    occurrences2024: 34
  },
  {
    name: "Fernão",
    region: "Bauru",
    population: "2 mil",
    hdi: 0.703,
    occurrences2024: 33
  },
  {
    name: "Santa Clara d'Oeste",
    region: "São José do Rio Preto",
    population: "3 mil",
    hdi: 0.754,
    occurrences2024: 33
  },
  {
    name: "Dolcinópolis",
    region: "São José do Rio Preto",
    population: "2 mil",
    hdi: 0.742,
    occurrences2024: 33
  },
  {
    name: "Mariápolis",
    region: "Presidente Prudente",
    population: "4 mil",
    hdi: 0.718,
    occurrences2024: 33
  },
  {
    name: "Itaoca",
    region: "Sorocaba",
    population: "3 mil",
    hdi: 0.65,
    occurrences2024: 32
  },
  {
    name: "Marabá Paulista",
    region: "Presidente Prudente",
    population: "5 mil",
    hdi: 0.677,
    occurrences2024: 32
  },
  {
    name: "Sebastianópolis do Sul",
    region: "São José do Rio Preto",
    population: "3 mil",
    hdi: 0.773,
    occurrences2024: 32
  },
  {
    name: "Barão de Antonina",
    region: "Sorocaba",
    population: "4 mil",
    hdi: 0.711,
    occurrences2024: 31
  },
  {
    name: "Turiúba",
    region: "Araçatuba",
    population: "2 mil",
    hdi: 0.751,
    occurrences2024: 31
  },
  {
    name: "Estrela do Norte",
    region: "Presidente Prudente",
    population: "3 mil",
    hdi: 0.74,
    occurrences2024: 31
  },
  {
    name: "Magda",
    region: "São José do Rio Preto",
    population: "3 mil",
    hdi: 0.753,
    occurrences2024: 31
  },
  {
    name: "Pontes Gestal",
    region: "São José do Rio Preto",
    population: "2 mil",
    hdi: 0.732,
    occurrences2024: 31
  },
  {
    name: "Alto Alegre",
    region: "Araçatuba",
    population: "4 mil",
    hdi: 0.7,
    occurrences2024: 30
  },
  {
    name: "Santa Cruz da Esperança",
    region: "Ribeirão Preto",
    population: "2 mil",
    hdi: 0.743,
    occurrences2024: 30
  },
  {
    name: "Guarani d'Oeste",
    region: "São José do Rio Preto",
    population: "2 mil",
    hdi: 0.732,
    occurrences2024: 30
  },
  {
    name: "Piquerobi",
    region: "Presidente Prudente",
    population: "3 mil",
    hdi: 0.711,
    occurrences2024: 30
  },
  {
    name: "Cássia dos Coqueiros",
    region: "Ribeirão Preto",
    population: "3 mil",
    hdi: 0.734,
    occurrences2024: 30
  },
  {
    name: "Rubiácea",
    region: "Araçatuba",
    population: "3 mil",
    hdi: 0.721,
    occurrences2024: 29
  },
  {
    name: "Paulistânia",
    region: "Bauru",
    population: "2 mil",
    hdi: 0.718,
    occurrences2024: 29
  },
  {
    name: "Pedranópolis",
    region: "São José do Rio Preto",
    population: "3 mil",
    hdi: 0.742,
    occurrences2024: 29
  },
  {
    name: "Nova Canaã Paulista",
    region: "São José do Rio Preto",
    population: "2 mil",
    hdi: 0.715,
    occurrences2024: 29
  },
  {
    name: "Santa Mercedes",
    region: "Presidente Prudente",
    population: "3 mil",
    hdi: 0.739,
    occurrences2024: 29
  },
  {
    name: "Gabriel Monteiro",
    region: "Araçatuba",
    population: "3 mil",
    hdi: 0.763,
    occurrences2024: 29
  },
  {
    name: "Bento de Abreu",
    region: "Araçatuba",
    population: "3 mil",
    hdi: 0.744,
    occurrences2024: 29
  },
  {
    name: "Óleo",
    region: "Bauru",
    population: "3 mil",
    hdi: 0.73,
    occurrences2024: 29
  },
  {
    name: "Mesópolis",
    region: "São José do Rio Preto",
    population: "2 mil",
    hdi: 0.724,
    occurrences2024: 28
  },
  {
    name: "Alvinlândia",
    region: "Bauru",
    population: "3 mil",
    hdi: 0.722,
    occurrences2024: 28
  },
  {
    name: "Emilianópolis",
    region: "Presidente Prudente",
    population: "3 mil",
    hdi: 0.727,
    occurrences2024: 27
  },
  {
    name: "Lucianópolis",
    region: "Bauru",
    population: "2 mil",
    hdi: 0.733,
    occurrences2024: 27
  },
  {
    name: "Lutécia",
    region: "Presidente Prudente",
    population: "3 mil",
    hdi: 0.72,
    occurrences2024: 27
  },
  {
    name: "Timburi",
    region: "Bauru",
    population: "2 mil",
    hdi: 0.71,
    occurrences2024: 25
  },
  {
    name: "Oscar Bressane",
    region: "Bauru",
    population: "2 mil",
    hdi: 0.749,
    occurrences2024: 25
  },
  {
    name: "Itapirapuã Paulista",
    region: "Sorocaba",
    population: "4 mil",
    hdi: 0.661,
    occurrences2024: 25
  },
  {
    name: "Santana da Ponte Pensa",
    region: "São José do Rio Preto",
    population: "2 mil",
    hdi: 0.773,
    occurrences2024: 24
  },
  {
    name: "Nova Guataporanga",
    region: "Presidente Prudente",
    population: "2 mil",
    hdi: 0.726,
    occurrences2024: 24
  },
  {
    name: "São João das Duas Pontes",
    region: "São José do Rio Preto",
    population: "3 mil",
    hdi: 0.72,
    occurrences2024: 24
  },
  {
    name: "Lourdes",
    region: "Araçatuba",
    population: "2 mil",
    hdi: 0.742,
    occurrences2024: 23
  },
  {
    name: "Flora Rica",
    region: "Presidente Prudente",
    population: "1 mil",
    hdi: 0.727,
    occurrences2024: 23
  },
  {
    name: "Inúbia Paulista",
    region: "Presidente Prudente",
    population: "4 mil",
    hdi: 0.759,
    occurrences2024: 23
  },
  {
    name: "Arapeí",
    region: "São jose dos campos",
    population: "2 mil",
    hdi: 0.68,
    occurrences2024: 21
  },
  {
    name: "Uru. São Paulo",
    region: "Bauru",
    population: "1 mil",
    hdi: 0.739,
    occurrences2024: 19
  },
  {
    name: "Santa Salete",
    region: "São José do Rio Preto",
    population: "2 mil",
    hdi: 0.772,
    occurrences2024: 19
  },
  {
    name: "Santa Rita d'Oeste",
    region: "São José do Rio Preto",
    population: "3 mil",
    hdi: 0.752,
    occurrences2024: 19
  },
  {
    name: "Vitória Brasil",
    region: "São José do Rio Preto",
    population: "2 mil",
    hdi: 0.725,
    occurrences2024: 19
  },
  {
    name: "Monções",
    region: "São José do Rio Preto",
    population: "2 mil",
    hdi: 0.772,
    occurrences2024: 18
  },
  {
    name: "São Francisco",
    region: "São José do Rio Preto",
    population: "3 mil",
    hdi: 0.723,
    occurrences2024: 18
  },
  {
    name: "Marinópolis",
    region: "São José do Rio Preto",
    population: "2 mil",
    hdi: 0.731,
    occurrences2024: 18
  },
  {
    name: "Cruzália",
    region: "Presidente Prudente",
    population: "2 mil",
    hdi: 0.774,
    occurrences2024: 17
  },
  {
    name: "União Paulista",
    region: "São José do Rio Preto",
    population: "2 mil",
    hdi: 0.749,
    occurrences2024: 17
  },
  {
    name: "Turmalina",
    region: "São José do Rio Preto",
    population: "2 mil",
    hdi: 0.736,
    occurrences2024: 15
  },
  {
    name: "Aspásia",
    region: "São José do Rio Preto",
    population: "2 mil",
    hdi: 0.735,
    occurrences2024: 15
  },
  {
    name: "Arco-Íris",
    region: "Bauru",
    population: "2 mil",
    hdi: 0.722,
    occurrences2024: 14
  },
  {
    name: "Dirce Reis",
    region: "São José do Rio Preto",
    population: "2 mil",
    hdi: 0.741,
    occurrences2024: 13
  },
  {
    name: "São João de Iracema",
    region: "Araçatuba",
    population: "2 mil",
    hdi: 0.748,
    occurrences2024: 13
  },
  {
    name: "Embaúba",
    region: "Ribeirão Preto",
    population: "2 mil",
    hdi: 0.73,
    occurrences2024: 13
  },
  {
    name: "Torre de Pedra",
    region: "Sorocaba",
    population: "2 mil",
    hdi: 0.714,
    occurrences2024: 12
  },
  {
    name: "Pracinha",
    region: "Presidente Prudente",
    population: "3 mil",
    hdi: 0.696,
    occurrences2024: 11
  },
  {
    name: "São João do Pau d'Alho",
    region: "Presidente Prudente",
    population: "2 mil",
    hdi: 0.754,
    occurrences2024: 10
  },
  {
    name: "Ribeirão dos Índios",
    region: "Presidente Prudente",
    population: "2 mil",
    hdi: 0.721,
    occurrences2024: 9
  },
  {
    name: "Borá",
    region: "Bauru",
    population: "1 mil",
    hdi: 0.746,
    occurrences2024: 0
  },

];

const getHDIColor = (hdi: number): string => {
  if (hdi >= 0.8) return "text-green-600 dark:text-green-400";
  if (hdi >= 0.7) return "text-yellow-600 dark:text-yellow-400";
  if (hdi >= 0.6) return "text-orange-600 dark:text-orange-400";
  return "text-red-600 dark:text-red-400";
};

const formatNumber = (num: number): string => {
  return num.toLocaleString('pt-BR');
};

const LocalityData: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("cidades");
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const filteredCities = citiesData.filter(city => 
    (city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.region.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedRegion ? city.region === selectedRegion : true)
  );

  const filteredRegions = regionsData.filter(region =>
    region.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCityClick = (name: string) => {
    navigate(`/cidade/${encodeURIComponent(name)}`);
  };

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(selectedRegion === region ? null : region);
    // When selecting a region, switch to cities tab
    if (selectedRegion !== region) {
      setActiveTab("cidades");
    }
  };
  
  const handleRegionClick = (name: string) => {
    setExpandedRegion(expandedRegion === name ? null : name);
  };

  const handleViewRegionDetails = (regionName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/regiao/${encodeURIComponent(regionName)}`);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{t('localityData')}</CardTitle>
        <CardDescription>{t('localityDataDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('searchCityRegion')}
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="cidades" className="flex-1">{t('byCity')}</TabsTrigger>
            <TabsTrigger value="regiao" className="flex-1">{t('byRegion')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cidades">
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {filteredCities.length > 0 ? (
                  filteredCities.map((city, index) => (
                    <button
                      type="button"
                      key={index}
                      className="w-full text-left p-4 border rounded-lg bg-gradient-to-r from-white to-gray-50 hover:shadow-lg hover:bg-gray-50 transition-all duration-300 outline-none focus:ring-2 focus:ring-primary dark:from-gray-800 dark:to-gray-900 dark:hover:bg-gray-800 dark:border-gray-700"
                      onClick={() => handleCityClick(city.name)}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-primary" />
                          <span className="font-semibold text-lg">{city.name}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {t('region')}: {city.region}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-blue-500" />
                          <div>
                            <div className="text-sm text-muted-foreground">{t('population')}</div>
                            <div className="font-medium">{city.population}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-purple-500" />
                          <div>
                            <div className="text-sm text-muted-foreground">IDH</div>
                            <div className={`font-medium ${getHDIColor(city.hdi)}`}>{city.hdi}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <BarChart className="h-4 w-4 text-red-500" />
                          <div>
                            <div className="text-sm text-muted-foreground">{t('occurrencesIn2024')}</div>
                            <div className="font-medium">{formatNumber(city.occurrences2024)}</div>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <p className="text-muted-foreground">{t('noCityFound')}</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="regiao">
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {filteredRegions.length > 0 ? (
                  filteredRegions.map((region, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <button
                        type="button"
                        className="w-full text-left p-4 bg-gradient-to-r from-white to-gray-50 hover:shadow-md hover:bg-gray-50 transition-all duration-300 outline-none focus:ring-2 focus:ring-primary dark:from-gray-800 dark:to-gray-900 dark:hover:bg-gray-800 dark:border-gray-700"
                        onClick={() => handleRegionClick(region.name)}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-primary" />
                            <span className="font-semibold text-lg">{region.name}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-blue-500" />
                            <div>
                              <div className="text-sm text-muted-foreground">{t('population')}</div>
                              <div className="font-medium">{region.population}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-purple-500" />
                            <div>
                              <div className="text-sm text-muted-foreground">IDH</div>
                              <div className={`font-medium ${getHDIColor(region.hdi)}`}>{region.hdi}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <BarChart className="h-4 w-4 text-red-500" />
                            <div>
                              <div className="text-sm text-muted-foreground">{t('occurrencesIn2024')}</div>
                              <div className="font-medium">{formatNumber(region.occurrences2024)}</div>
                            </div>
                          </div>
                        </div>
                      </button>
                      
                      {expandedRegion === region.name && (
                        <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{t('regionDetails')}</h4>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              region.status === "Crítica" ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" :
                              region.status === "Alta" ? "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" :
                              region.status === "Média" ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" :
                              "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            }`}>
                              {t(region.status.toLowerCase())}
                            </span>
                          </div>
                          
                          <div className="mt-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-muted-foreground">{t('occurrenceDistribution')}</span>
                              <span className="text-sm font-medium">{region.percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div 
                                className={`h-2.5 rounded-full ${
                                  region.status === "Crítica" ? "bg-occurrence-critical" :
                                  region.status === "Alta" ? "bg-occurrence-high" :
                                  region.status === "Média" ? "bg-occurrence-medium" :
                                  "bg-occurrence-low"
                                }`}
                                style={{ width: `${region.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="mt-4 text-sm text-muted-foreground">
                            <p>
                              {t('regionRepresents')} {region.name} {t('representsPercentage')} {region.percentage}% {t('ofTotalOccurrences')},
                              {t('withTotal')} {formatNumber(region.occurrences2024)} {t('recordsIn2024')}.
                            </p>
                            <div className="mt-4 flex justify-center">
                              <Button 
                                variant="outline"
                                onClick={(e) => handleViewRegionDetails(region.name, e)}
                              >
                                {t('viewRegionDetails')}
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <p className="text-muted-foreground">{t('noRegionFound')}</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LocalityData;
