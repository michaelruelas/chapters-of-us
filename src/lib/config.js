import rawConfig from '../../public/config.json';

const DEFAULT_THEME = 'navy';
const VALID_THEMES = new Set(['navy', 'sage', 'gray']);

export function normalizeConfig(config) {
  const safe = config ?? {};
  return {
    siteTitle: safe.siteTitle || 'Chapters of Us',
    landingTitle: safe.landingTitle || 'Our Story',
    landingSubtitle: safe.landingSubtitle || 'years',
    description: safe.description || 'Our love story through the years',
    anniversaryDate: safe.anniversaryDate,
    theme: VALID_THEMES.has(safe.theme) ? safe.theme : DEFAULT_THEME,
    timelineEvents: Array.isArray(safe.timelineEvents) ? safe.timelineEvents : [],
  };
}

export const siteConfig = normalizeConfig(rawConfig);

export function getAnniversaryYears(overrideDate, now = new Date()) {
  const dateString = overrideDate || siteConfig.anniversaryDate;
  if (!dateString) return 0;
  const anniversary = new Date(dateString);
  if (Number.isNaN(anniversary.getTime())) return 0;
  if (anniversary > now) return 0;
  const years = now.getFullYear() - anniversary.getFullYear();
  const anniversaryThisYear = new Date(
    now.getFullYear(),
    anniversary.getMonth(),
    anniversary.getDate(),
  );
  return now >= anniversaryThisYear ? years : Math.max(years - 1, 0);
}
