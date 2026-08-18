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
  faxDisplay: '+49 212 - 2 64 34 88',
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

export type NavChild = { label: string; href: string; blurb: string; icon?: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const leistungenChildren: NavChild[] = [
  {
    label: 'Chiptuning & Leistungssteigerung',
    href: '/leistungen/chiptuning',
    blurb: 'Individuelle Software-Optimierung für Benziner, Diesel & Turbomotoren.',
    icon: '/images/products/icon_prod_chip.png',
  },
  {
    label: 'Auspuffanlagenbau',
    href: '/leistungen/auspuffanlagen',
    blurb: 'Handgefertigte Edelstahl-Sportauspuffanlagen – auch für Oldtimer & Youngtimer, mit TÜV-Abnahme.',
    icon: '/images/products/icon_prod_exhaust.png',
  },
  {
    label: 'Fahrwerkstechnik',
    href: '/leistungen/fahrwerkstechnik',
    blurb: 'Gewindefahrwerke, Tieferlegungsfedern & Spurverbreiterungen.',
    icon: '/images/products/icon_prod_suspension.png',
  },
  {
    label: 'Bremsanlagen',
    href: '/leistungen/bremsanlagen',
    blurb: 'Hochleistungs-Bremsanlagen von Brembo und eigene Wimmer-Systeme.',
    icon: '/images/products/icon_prod_brakes.png',
  },
  {
    label: 'Sportkupplungen',
    href: '/leistungen/sportkupplungen',
    blurb: 'Verbesserte Kraftübertragung passend zu Ihrem Leistungsniveau.',
    icon: '/images/products/icon_prod_clutch.png',
  },
  {
    label: 'Zubehör & Anbauteile',
    href: '/leistungen/zubehoer',
    blurb: 'Ladeluftkühler, Ansaugschläuche, Überrollkäfige, Felgen & mehr.',
    icon: '/images/products/icon_prod_misc.png',
  },
];

// Eigene Liste fürs Nav-Dropdown: ergänzt die eigentlichen Leistungen um
// die Wohnmobilvermietung, ohne die Leistungen-Karten auf /leistungen,
// der Startseite, im Footer oder auf der 404-Seite zu verändern (die
// nutzen weiterhin leistungenChildren pur).
export const leistungenNavChildren: NavChild[] = [
  ...leistungenChildren,
  {
    label: 'Wohnmobilvermietung',
    href: '/wohnmobil',
    blurb: 'Niesmann & Bischoff Flair 920 – Vermietung abseits des Kerngeschäfts.',
  },
];

export const nav: NavItem[] = [
  { label: 'Start', href: '/' },
  { label: 'Leistungen', href: '/leistungen', children: leistungenNavChildren },
  { label: 'Fahrzeugsuche', href: '/fahrzeugsuche' },
  { label: 'Marken & Partner', href: '/marken' },
  { label: 'Referenzen', href: '/referenzen' },
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

// url = jeweils die echte, recherchierte offizielle Website der Marke.
// logo = Pfad (ohne Base-URL, siehe withBase() in lib/url.ts) zu einer
// echten Logo-Datei unter /public/images/brand; fehlt eine Logo-Datei für
// eine Marke, bleibt das Feld leer und die Karte zeigt einen klar
// erkennbaren Monogramm-Platzhalter statt eines (unsicheren)
// nachgebauten Logos.
export type Brand = {
  name: string;
  category: string;
  description: string;
  url: string;
  logo?: string;
};

export const brands: Brand[] = [
  { name: 'H&R', category: 'Fahrwerkstechnik', description: 'Gewindefahrwerke & Tieferlegungsfedern mit TÜV-Zertifizierung, seit den späten 1980ern.', url: 'https://www.h-r.com', logo: '/images/brand/logo_brand_hr.png' },
  { name: 'KW automotive', category: 'Fahrwerkstechnik', description: 'Seit über 20 Jahren Partner: Wimmer ist KW Performance Partner Pro mit 5 Jahren Garantie auf verbaute KW-Fahrwerke.', url: 'https://www.kwsuspensions.de', logo: '/images/brand/logo_brand_kw.png' },
  { name: 'ST suspensions', category: 'Fahrwerkstechnik', description: 'Federn, Dämpfer, komplette Gewindefahrwerke sowie Stabilisatoren und Spurverbreiterungen.', url: 'https://www.stsuspensions.com/de', logo: '/images/brand/logo_brand_st.png' },
  { name: 'Bilstein', category: 'Fahrwerkstechnik', description: 'Dämpfertechnik für komfortable bis sportliche Abstimmung.', url: 'https://bilstein.com/de/', logo: '/images/brand/logo_brand_bilstein.png' },
  { name: 'Capristo', category: 'Auspuffanlagen', description: 'Hochwertige Sport-Auspuffanlagen, bei Wimmer erhältlich und verbaut.', url: 'https://www.capristo.de', logo: '/images/brand/logo_brand_capristo.png' },
  { name: 'Brembo', category: 'Bremsanlagen', description: 'Bremsscheiben, -beläge und komplette Kits (u. a. B-M, GT, GT-R) für spürbar kürzere Bremswege.', url: 'https://www.brembo.com/de', logo: '/images/brand/logo_brand_brembo.png' },
  { name: 'Movit', category: 'Bremsanlagen', description: 'Hochleistungs-Bremsanlagen im Programm, passend zu unterschiedlichen Leistungsstufen.', url: 'https://www.movitbrakes.com/', logo: '/images/brand/logo_brand_movit.png' },
  { name: 'StopTech', category: 'Bremsanlagen', description: 'Bremsanlagen für sportliche und leistungsgesteigerte Fahrzeuge.', url: 'https://stoptechco.com/', logo: '/images/brand/logo_brand_stoptech.png' },
  { name: 'Fischer Hydraulik', category: 'Bremsanlagen', description: 'Stahlflex-Bremsschläuche für ein präzises, standfestes Bremsgefühl.', url: 'https://www.fischer-hydraulik.de', logo: '/images/brand/logo_brand_fischer.png' },
  { name: 'ZF Sachs Race Engineering', category: 'Sportkupplungen', description: 'Kupplungstechnik für verbesserte Kraftübertragung.', url: 'https://www.sachsperformance.com', logo: '/images/brand/logo_brand_zf.png' },
  { name: 'LUK', category: 'Sportkupplungen', description: 'Kupplungssysteme als Ergänzung zur Leistungssteigerung.', url: 'https://www.schaeffler.com', logo: '/images/brand/logo_brand_luk.png' },
  { name: 'BMC', category: 'Zubehör', description: 'Sportluftfilter inklusive Reinigungsservice für optimierten Ansaugweg.', url: 'https://www.bmcairfilters.com/en', logo: '/images/brand/logo_brand_bmc.png' },
  { name: 'K&N', category: 'Zubehör', description: 'Sportluftfilter und Ansaugsysteme für spürbar mehr Ansaugleistung.', url: 'https://www.knfilters.eu/de/', logo: '/images/brand/logo_brand_kn.png' },
  { name: 'KTM X-Bow', category: 'Fahrzeuge', description: 'Wimmer ist seit 2010 Händler des Leichtbau-Sportwagens KTM X-Bow – Verkauf, Wartung und Tuning.', url: 'https://ktm-xbow.com/de', logo: '/images/brand/logo_brand_ktm.png' },
  { name: 'Yamaha', category: 'Bootsmotoren', description: 'Seit 2016 auch Datensätze und Leistungssteigerung für größere Bootsmotoren.', url: 'https://www.yamaha-motor.eu/de/de/marine-engines/', logo: '/images/brand/logo_brand_yamaha.png' },
  { name: 'Mercury', category: 'Bootsmotoren', description: 'Leistungssteigerung und Service auch für Mercury-Bootsmotoren.', url: 'https://www.mercurymarine.com/de/de', logo: '/images/brand/logo_brand_mercury.png' },
  { name: 'Technohull', category: 'Partner', description: 'Externer Partner für RIB-Boote, verlinkt von unserer Seite.', url: 'https://technohull.com', logo: '/images/brand/logo_brand_technohull.png' },
];

export type ReferenceImage = { src: string; alt: string; caption: string };

export const referenzenGallery: ReferenceImage[] = [
  { src: '/images/referenzen/porsche-tunnel.jpg', alt: 'Porsche 911 Turbo mit Chamäleon-Folierung in einer Tunneldurchfahrt', caption: 'Porsche 911 Turbo' },
  { src: '/images/referenzen/porsche-esso.jpg', alt: 'Porsche 911 Turbo mit orangener Vollfolierung an einer Tankstelle', caption: 'Porsche 911 Turbo' },
  { src: '/images/referenzen/vw-touareg.jpg', alt: 'VW Touareg mit Wimmer-Fahrzeugbeschriftung im Wald', caption: 'VW Touareg' },
  { src: '/images/referenzen/golf-drift.jpg', alt: 'VW Polo WRC mit Wimmer-Rennlackierung im Drift', caption: 'VW Polo WRC' },
];

export type FaqItem = { question: string; answer: string };
