// Hängt jeden internen Link/Asset-Pfad an die konfigurierte Base-URL an.
// Nötig, weil die Seite sowohl unter der Root-Domain (Produktion,
// BASE_URL "/") als auch unter einem Unterpfad laufen kann (z. B. GitHub-
// Pages-Vorschau unter /WimmerRST/) – ohne das müssten alle internen
// Links bei jedem Deploy-Ziel angepasst werden.
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL ?? '/';
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  return `${cleanBase}${path}`;
}
