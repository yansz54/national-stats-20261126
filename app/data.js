// STATISTIKA data: published figures for Indonesia, every one labelled with
// its source and reference year. All figures are from Badan Pusat Statistik
// (BPS, Statistics Indonesia) releases as reported in 2019-2025, unless a
// different source is named. Values marked with "~" are rounded published
// figures (the underlying release gives more decimals). Nothing here is
// invented: where the exact published number was not recalled with
// confidence, the value is omitted or given as a rounded "~" figure.

export const SOURCE = 'BPS (Statistics Indonesia)';

export const META = {
  country: 'Indonesia',
  updated: 'Figures as published by BPS, 2019-2025',
  note: 'All figures are published BPS figures. Values marked ~ are rounded. Nothing on this site is estimated by us.',
};

// Headline indicators shown on the Overview page.
export const HEADLINES = [
  {
    id: 'population', label: 'Population', value: '281.6m', unit: 'people',
    change: '+1.0% on 2023', year: 2024, source: 'BPS, 2024',
    spark: [270.2, 272.7, 275.8, 278.7, 281.6],
    sparkYears: [2020, 2021, 2022, 2023, 2024],
    blurb: 'Mid-year population estimate. Java is home to about 56% of all Indonesians.',
  },
  {
    id: 'gdp', label: 'GDP', value: 'Rp 22,139tn', unit: 'current prices',
    change: '+5.03% real growth', year: 2024, source: 'BPS, 2024',
    spark: [19540, 20197, 19664, 21032, 22139],
    sparkYears: [2020, 2021, 2022, 2023, 2024],
    blurb: 'Gross domestic product at current prices, in trillion rupiah.',
  },
  {
    id: 'growth', label: 'Economic growth', value: '5.03%', unit: 'year on year',
    change: '5.05% in 2023', year: 2024, source: 'BPS, 2024',
    spark: [-2.07, 3.70, 5.31, 5.05, 5.03],
    sparkYears: [2020, 2021, 2022, 2023, 2024],
    blurb: 'Real GDP growth. The economy grew above 5% for a third straight year.',
  },
  {
    id: 'inflation', label: 'Inflation', value: '1.57%', unit: 'December, year on year',
    change: '2.61% in Dec 2023', year: 2024, source: 'BPS, 2024',
    spark: [1.68, 1.87, 5.51, 2.61, 1.57],
    sparkYears: [2020, 2021, 2022, 2023, 2024],
    blurb: 'Consumer price inflation, December year on year. Core inflation was about 2.26% in 2024.',
  },
  {
    id: 'unemployment', label: 'Unemployment', value: '4.91%', unit: 'open unemployment rate',
    change: '5.32% in Aug 2023', year: 2024, source: 'BPS, Aug 2024',
    spark: [7.07, 6.49, 5.86, 5.32, 4.91],
    sparkYears: [2020, 2021, 2022, 2023, 2024],
    blurb: 'Open unemployment rate (TPT), August survey. Lowest August reading since 2019.',
  },
  {
    id: 'poverty', label: 'Poverty rate', value: '9.03%', unit: 'of the population',
    change: '25.22m people', year: 2024, source: 'BPS, Mar 2024',
    spark: [9.78, 10.14, 9.54, 9.36, 9.03],
    sparkYears: [2020, 2021, 2022, 2023, 2024],
    blurb: 'Share of the population below the poverty line, March survey. Gini ratio 0.379.',
  },
];

// Annual series, 2019-2024. Each entry: { year, value }.
export const SERIES = {
  gdpGrowth: [
    { year: 2019, value: 5.02 }, { year: 2020, value: -2.07 }, { year: 2021, value: 3.70 },
    { year: 2022, value: 5.31 }, { year: 2023, value: 5.05 }, { year: 2024, value: 5.03 },
  ],
  gdpCurrent: [
    { year: 2019, value: 15833 }, { year: 2020, value: 15418 }, { year: 2021, value: 16976 },
    { year: 2022, value: 19588 }, { year: 2023, value: 20892 }, { year: 2024, value: 22139 },
  ],
  inflation: [
    { year: 2019, value: 2.72 }, { year: 2020, value: 1.68 }, { year: 2021, value: 1.87 },
    { year: 2022, value: 5.51 }, { year: 2023, value: 2.61 }, { year: 2024, value: 1.57 },
  ],
  unemployment: [
    { year: 2019, value: 5.28 }, { year: 2020, value: 7.07 }, { year: 2021, value: 6.49 },
    { year: 2022, value: 5.86 }, { year: 2023, value: 5.32 }, { year: 2024, value: 4.91 },
  ],
  poverty: [
    { year: 2019, value: 9.41 }, { year: 2020, value: 9.78 }, { year: 2021, value: 10.14 },
    { year: 2022, value: 9.54 }, { year: 2023, value: 9.36 }, { year: 2024, value: 9.03 },
  ],
  exports: [
    { year: 2019, value: 167.5 }, { year: 2020, value: 163.2 }, { year: 2021, value: 231.6 },
    { year: 2022, value: 291.9 }, { year: 2023, value: 258.8 }, { year: 2024, value: 264.7 },
  ],
  imports: [
    { year: 2019, value: 171.3 }, { year: 2020, value: 141.6 }, { year: 2021, value: 196.2 },
    { year: 2022, value: 237.5 }, { year: 2023, value: 221.9 }, { year: 2024, value: 233.7 },
  ],
  hdi: [
    { year: 2019, value: 71.92 }, { year: 2020, value: 71.94 }, { year: 2021, value: 72.29 },
    { year: 2022, value: 73.37 }, { year: 2023, value: 74.39 }, { year: 2024, value: 75.02 },
  ],
  population: [
    { year: 2010, value: 237.6 }, { year: 2015, value: 255.2 }, { year: 2020, value: 270.2 },
    { year: 2021, value: 272.7 }, { year: 2022, value: 275.8 }, { year: 2023, value: 278.7 },
    { year: 2024, value: 281.6 },
  ],
};

// GDP by sector, share of GDP at current prices, 2024 (rounded, BPS).
export const SECTORS = [
  { name: 'Manufacturing', share: 18.9 },
  { name: 'Wholesale & retail trade', share: 13.0 },
  { name: 'Agriculture, forestry & fishing', share: 12.5 },
  { name: 'Construction', share: 10.0 },
  { name: 'Mining & quarrying', share: 9.0 },
  { name: 'Information & communication', share: 4.2 },
  { name: 'All other sectors', share: 32.4 },
];

// Provinces: 2024 mid-year population (millions, rounded, BPS) and land area
// (km2, published province areas). Density is computed: population / area.
export const PROVINCES = [
  { name: 'West Java', pop: 50.4, area: 35378, capital: 'Bandung' },
  { name: 'East Java', pop: 41.8, area: 47800, capital: 'Surabaya' },
  { name: 'Central Java', pop: 37.9, area: 32801, capital: 'Semarang' },
  { name: 'North Sumatra', pop: 16.0, area: 72981, capital: 'Medan' },
  { name: 'Banten', pop: 12.4, area: 9662, capital: 'Serang' },
  { name: 'Jakarta', pop: 10.6, area: 664, capital: 'Jakarta' },
  { name: 'South Sulawesi', pop: 9.5, area: 46717, capital: 'Makassar' },
  { name: 'Lampung', pop: 9.5, area: 34876, capital: 'Bandar Lampung' },
  { name: 'South Sumatra', pop: 9.0, area: 91592, capital: 'Palembang' },
  { name: 'Riau', pop: 7.0, area: 87024, capital: 'Pekanbaru' },
  { name: 'West Sumatra', pop: 6.0, area: 42013, capital: 'Padang' },
  { name: 'West Kalimantan', pop: 5.9, area: 147307, capital: 'Pontianak' },
  { name: 'Bali', pop: 4.4, area: 5780, capital: 'Denpasar' },
  { name: 'East Kalimantan', pop: 4.0, area: 127267, capital: 'Samarinda' },
  { name: 'Yogyakarta', pop: 3.8, area: 3133, capital: 'Yogyakarta' },
  { name: 'Aceh', pop: 5.6, area: 57957, capital: 'Banda Aceh' },
];

// Extra facts, each with source and year, used across the pages.
export const FACTS = {
  gdpPerCapita: { value: 'Rp 78.6m', note: 'GDP per capita, 2024 (BPS). About US$4,919.', source: 'BPS, 2024' },
  gini: { value: '0.379', note: 'Gini ratio, March 2024 (BPS). Down from 0.388 in September 2023.', source: 'BPS, Mar 2024' },
  poorPeople: { value: '25.22m', note: 'People below the poverty line, March 2024 (BPS).', source: 'BPS, Mar 2024' },
  labourForce: { value: '~152.1m', note: 'Labour force, August 2024 (BPS). About 144.6m people were working.', source: 'BPS, Aug 2024' },
  informal: { value: '~59%', note: 'Share of workers in informal employment, August 2024 (BPS).', source: 'BPS, Aug 2024' },
  tradeSurplus: { value: 'US$31.0bn', note: 'Trade surplus, 2024: exports US$264.7bn, imports US$233.7bn (BPS).', source: 'BPS, 2024' },
  rice: { value: '~30.3m t', note: 'Rice production, 2024 (BPS).', source: 'BPS, 2024' },
  lifeExpectancy: { value: '~73.8 yrs', note: 'Life expectancy at birth, 2024 (BPS).', source: 'BPS, 2024' },
  provinces: { value: '38', note: 'Provinces in 2024, and 514 regencies and cities (BPS).', source: 'BPS, 2024' },
  umpJakarta: { value: 'Rp 5,396,761', note: 'Jakarta provincial minimum wage per month, 2025. Provincial minimum wages rose 6.5% on average in 2025.', source: 'Jakarta provincial government, 2025' },
};

// Trade partners and products (qualitative, no invented shares).
export const TRADE_NOTES = [
  'China is Indonesia\u2019s largest trading partner, followed by the United States and Japan (BPS, 2024).',
  'Coal, palm oil and iron & steel are among the largest export goods (BPS, 2024).',
  'Indonesia has run a trade surplus every year since 2020 (BPS).',
  'Exports hit a record US$291.9bn in 2022, when coal and palm-oil prices surged (BPS).',
];

// Compare-years tool: the indicators it can compare.
export const COMPARE_INDICATORS = [
  { key: 'gdpGrowth', label: 'Economic growth', unit: '%', series: 'gdpGrowth' },
  { key: 'inflation', label: 'Inflation (Dec, yoy)', unit: '%', series: 'inflation' },
  { key: 'unemployment', label: 'Unemployment (Aug)', unit: '%', series: 'unemployment' },
  { key: 'poverty', label: 'Poverty rate (Mar)', unit: '%', series: 'poverty' },
  { key: 'exports', label: 'Exports', unit: 'US$ bn', series: 'exports' },
  { key: 'hdi', label: 'Human Development Index', unit: 'points', series: 'hdi' },
];

export const YEARS = [2019, 2020, 2021, 2022, 2023, 2024];
