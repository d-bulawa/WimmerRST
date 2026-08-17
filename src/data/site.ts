// Zentrale Inhalts- und Struktur-Quelle der Seite.
// Bündelt Navigation, Firmenfakten, Leistungen und Marken an einem Ort,
// damit Inhalte konsistent bleiben und nicht über einzelne Seiten verstreut sind.

export const company = {
  name: 'Wimmer Rennsporttechnik Solingen GmbH',
  shortName: 'Wimmer RST',
  founded: 1990,
  address: {
    street: 'Löhdorferstr. 231',
    zip: '42699',
    city: 'Solingen',
    country: 'Deutschland',
  },
  phone: '+49 212 264 3000',
  phoneDisplay: '+49 212 - 2 64 30 00',
  fax: '+49 212 264 3488',
  email: 'info@wimmer-rst.de',
  hours: [
    { days: 'Montag – Freitag', time: '08:00 – 17:00 Uhr' },
    { days: 'Mittagspause', time: '12:15 – 13:15 Uhr' },
  ],
  facilitySize: '2.400 m²',
  manager: 'Dipl.-Ing. Thorsten Wimmer',
} as const;

export const stats = [
  { value: '35+', label: 'Jahre Erfahrung seit 1990' },
  { value: '2.400 m²', label: 'Werkstatt- & Prüfstandsfläche' },
  { value: 'bis 2.000 PS', label: 'Leistungsmessung auf dem Prüfstand' },
  { value: 'TÜV', label: 'zertifizierter Fachbetrieb' },
] as const;

export type NavChild = { label: string; href: string; blurb: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const leistungenChildren: NavChild[] = [
  {
    label: 'Chiptuning & Leistungssteigerung',
    href: '/leistungen/chiptuning',
    blurb: 'Individuelle Software-Optimierung für Benziner, Diesel & Turbomotoren.',
  },
  {
    label: 'Auspuffanlagenbau',
    href: '/leistungen/auspuffanlagen',
    blurb: 'Handgefertigte Edelstahl-Sportauspuffanlagen mit TÜV-Abnahme.',
  },
  {
    label: 'Fahrwerkstechnik',
    href: '/leistungen/fahrwerkstechnik',
    blurb: 'Gewindefahrwerke, Tieferlegungsfedern & Spurverbreiterungen.',
  },
  {
    label: 'Bremsanlagen',
    href: '/leistungen/bremsanlagen',
    blurb: 'Hochleistungs-Bremsanlagen von Brembo und eigene Wimmer-Systeme.',
  },
  {
    label: 'Sportkupplungen',
    href: '/leistungen/sportkupplungen',
    blurb: 'Verbesserte Kraftübertragung passend zu Ihrem Leistungsniveau.',
  },
  {
    label: 'Zubehör & Anbauteile',
    href: '/leistungen/zubehoer',
    blurb: 'Ladeluftkühler, Ansaugschläuche, Überrollkäfige, Felgen & mehr.',
  },
];

export const nav: NavItem[] = [
  { label: 'Start', href: '/' },
  { label: 'Leistungen', href: '/leistungen', children: leistungenChildren },
  { label: 'Marken & Partner', href: '/marken' },
  { label: 'Referenzen', href: '/referenzen' },
  { label: 'Unternehmen', href: '/unternehmen' },
  { label: 'Kontakt', href: '/kontakt' },
];

export type Brand = { name: string; category: string; description: string };

export const brands: Brand[] = [
  { name: 'H&R', category: 'Fahrwerkstechnik', description: 'Gewindefahrwerke & Tieferlegungsfedern mit TÜV-Zertifizierung, seit den späten 1980ern.' },
  { name: 'KW automotive', category: 'Fahrwerkstechnik', description: 'Über 4.600 Gewindefahrwerk-Anwendungen für nahezu jedes Fahrzeug, in acht Ausbaustufen.' },
  { name: 'ST suspensions', category: 'Fahrwerkstechnik', description: 'Federn, Dämpfer, komplette Gewindefahrwerke sowie Stabilisatoren und Spurverbreiterungen.' },
  { name: 'Bilstein', category: 'Fahrwerkstechnik', description: 'Dämpfertechnik für komfortable bis sportliche Abstimmung.' },
  { name: 'Capristo', category: 'Auspuffanlagen', description: 'Hochwertige Sport-Auspuffanlagen, bei Wimmer erhältlich und verbaut.' },
  { name: 'Brembo', category: 'Bremsanlagen', description: 'Hochleistungsbremsen für spürbar kürzere Bremswege.' },
  { name: 'ZF Sachs Race Engineering', category: 'Sportkupplungen', description: 'Kupplungstechnik für verbesserte Kraftübertragung.' },
  { name: 'LUK', category: 'Sportkupplungen', description: 'Kupplungssysteme als Ergänzung zur Leistungssteigerung.' },
  { name: 'KTM X-Bow', category: 'Fahrzeuge', description: 'Wimmer ist seit 2010 Händler des Leichtbau-Sportwagens KTM X-Bow.' },
  { name: 'Yamaha & Mercury', category: 'Bootsmotoren', description: 'Leistungssteigerung und Service auch für größere Bootsmotoren.' },
];

export type FaqItem = { question: string; answer: string };
