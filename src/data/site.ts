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
  registerCourt: 'Solingen',
  ustId: 'DE 812660097',
  history:
    'Wimmer Rennsporttechnik ist 1990 in den Räumlichkeiten einer Tankstelle mit Chiptuning und Motorumbauten gestartet. Heute arbeiten wir unter modernsten Bedingungen und den Vorgaben der TÜV-Zertifizierung auf 2.400 m² Hallenfläche.',
  kwPartnership:
    'Seit über 20 Jahren sind wir KW Performance Partner Pro und geben 5 Jahre Garantie auf verbaute KW-Fahrwerke.',
  warranty:
    'Auf Teile, die wir anbieten oder selbst herstellen, achten wir auf beste Qualität. Verbaute Komponenten haben in der Regel Straßenzulassung und werden bei Bedarf direkt an unserer TÜV-Prüfstelle im Haus abgenommen – ausgenommen reine Rennsport-/Motorsportfahrzeuge, für die andere Regeln gelten.',
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
    blurb: 'Handgefertigte Edelstahl-Sportauspuffanlagen – auch für Oldtimer & Youngtimer, mit TÜV-Abnahme.',
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
  { label: 'Fahrzeugsuche', href: '/fahrzeugsuche' },
  { label: 'Marken & Partner', href: '/marken' },
  { label: 'Referenzen', href: '/referenzen' },
  { label: 'Unternehmen', href: '/unternehmen' },
  { label: 'Kontakt', href: '/kontakt' },
];

// Reale Hersteller-Liste inkl. IDs aus der bestehenden Fahrzeugsuche
// (Hersteller → Modell → Fahrzeug), unverändert übernommen aus dem
// Kunden-Export der alten Startseite. Führende/nachgestellte Leerzeichen
// im Originaltext wurden getrimmt, Dubletten (z. B. "Smart", "KTM") sind
// im Originaldatensatz so vorhanden und wurden nicht zusammengeführt, da
// unklar ist, ob sie unterschiedliche Datensätze referenzieren.
export type Manufacturer = { id: string; name: string };

export const manufacturers: Manufacturer[] = [
  { id: '22890', name: 'Alfa Romeo' },
  { id: '22892', name: 'Audi' },
  { id: '22894', name: 'Bentley' },
  { id: '22896', name: 'BMW' },
  { id: '22898', name: 'Cadillac' },
  { id: '22899', name: 'Chevrolet' },
  { id: '22900', name: 'Chrysler' },
  { id: '22901', name: 'Citroen' },
  { id: '22902', name: 'Dacia' },
  { id: '22903', name: 'Daewoo' },
  { id: '22904', name: 'Daihatsu' },
  { id: '22905', name: 'Dodge' },
  { id: '22907', name: 'Fiat' },
  { id: '22909', name: 'Ford' },
  { id: '22910', name: 'GMC' },
  { id: '22911', name: 'Honda' },
  { id: '22913', name: 'Hyundai' },
  { id: '22914', name: 'Infiniti' },
  { id: '22915', name: 'Isuzu' },
  { id: '22917', name: 'Jaguar' },
  { id: '22918', name: 'Jeep' },
  { id: '22919', name: 'Kia' },
  { id: '22921', name: 'Lada' },
  { id: '22923', name: 'Lancia' },
  { id: '22924', name: 'Land Rover' },
  { id: '22926', name: 'LEVC' },
  { id: '22927', name: 'Lexus' },
  { id: '22928', name: 'MAN' },
  { id: '22929', name: 'Maserati' },
  { id: '22930', name: 'Mazda' },
  { id: '22931', name: 'Smart' },
  { id: '22932', name: 'Mercedes' },
  { id: '23062', name: 'MG' },
  { id: '22933', name: 'Mini' },
  { id: '22934', name: 'Mitsubishi' },
  { id: '22935', name: 'Nissan' },
  { id: '22936', name: 'Opel' },
  { id: '22937', name: 'Peugeot' },
  { id: '22939', name: 'Pontiac' },
  { id: '22940', name: 'Porsche' },
  { id: '22941', name: 'Proton' },
  { id: '22942', name: 'Renault' },
  { id: '22944', name: 'Rover' },
  { id: '22945', name: 'Saab' },
  { id: '22947', name: 'Seat' },
  { id: '22948', name: 'Skoda' },
  { id: '22949', name: 'Ssangyong' },
  { id: '22950', name: 'StreetScooter' },
  { id: '22951', name: 'Subaru' },
  { id: '22952', name: 'Suzuki' },
  { id: '22953', name: 'Tesla' },
  { id: '22954', name: 'Toyota' },
  { id: '22957', name: 'Volvo' },
  { id: '22958', name: 'VW' },
  { id: '90001', name: 'Alpina' },
  { id: '90002', name: 'Aston Martin' },
  { id: '90003', name: 'Ferrari' },
  { id: '90004', name: 'Hummer' },
  { id: '90005', name: 'Iveco' },
  { id: '90006', name: 'Lotus' },
  { id: '90007', name: 'Morgan' },
  { id: '90008', name: 'Smart' },
  { id: '90009', name: 'KTM' },
  { id: '90010', name: 'Wiesmann' },
  { id: '90011', name: 'KTM' },
  { id: '90012', name: 'Morgan' },
  { id: '90013', name: 'Cadillac DeVille' },
  { id: '90014', name: 'Cadillac' },
  { id: '90015', name: 'Hymer' },
  { id: '90017', name: 'KG Mobility' },
];

export type Brand = { name: string; category: string; description: string };

export const brands: Brand[] = [
  { name: 'H&R', category: 'Fahrwerkstechnik', description: 'Gewindefahrwerke & Tieferlegungsfedern mit TÜV-Zertifizierung, seit den späten 1980ern.' },
  { name: 'KW automotive', category: 'Fahrwerkstechnik', description: 'Seit über 20 Jahren Partner: Wimmer ist KW Performance Partner Pro mit 5 Jahren Garantie auf verbaute KW-Fahrwerke.' },
  { name: 'ST suspensions', category: 'Fahrwerkstechnik', description: 'Federn, Dämpfer, komplette Gewindefahrwerke sowie Stabilisatoren und Spurverbreiterungen.' },
  { name: 'Bilstein', category: 'Fahrwerkstechnik', description: 'Dämpfertechnik für komfortable bis sportliche Abstimmung.' },
  { name: 'Capristo', category: 'Auspuffanlagen', description: 'Hochwertige Sport-Auspuffanlagen, bei Wimmer erhältlich und verbaut.' },
  { name: 'Brembo', category: 'Bremsanlagen', description: 'Bremsscheiben, -beläge und komplette Kits (u. a. B-M, GT, GT-R) für spürbar kürzere Bremswege.' },
  { name: 'Movit & StopTech', category: 'Bremsanlagen', description: 'Weitere Hochleistungs-Bremsanlagen im Programm, passend zu unterschiedlichen Leistungsstufen.' },
  { name: 'Fischer Hydraulik', category: 'Bremsanlagen', description: 'Stahlflex-Bremsschläuge für ein präzises, standfestes Bremsgefühl.' },
  { name: 'ZF Sachs Race Engineering', category: 'Sportkupplungen', description: 'Kupplungstechnik für verbesserte Kraftübertragung.' },
  { name: 'LUK', category: 'Sportkupplungen', description: 'Kupplungssysteme als Ergänzung zur Leistungssteigerung.' },
  { name: 'BMC & K&N', category: 'Zubehör', description: 'Sportluftfilter inklusive Reinigungsservice für optimierten Ansaugweg.' },
  { name: 'KTM X-Bow', category: 'Fahrzeuge', description: 'Wimmer ist seit 2010 Händler des Leichtbau-Sportwagens KTM X-Bow – Verkauf, Wartung und Tuning.' },
  { name: 'Yamaha & Mercury', category: 'Bootsmotoren', description: 'Seit 2016 auch Datensätze und Leistungssteigerung für größere Bootsmotoren.' },
  { name: 'Technohull', category: 'Partner', description: 'Externer Partner für RIB-Boote, verlinkt von unserer Seite (technohull.com).' },
];

export type FaqItem = { question: string; answer: string };
