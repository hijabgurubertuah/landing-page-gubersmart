// ATURAN BAKU: lihat designSystem. UI harus selalu minimalis, bersih, dan tanpa teks petunjuk.

import { CMSSettings } from '../types';

function adjustBrightness(hex: string, percent: number): string {
  if (!hex || !hex.startsWith('#')) return hex;
  let num = parseInt(hex.replace('#', ''), 16);
  if (isNaN(num)) return hex;

  let r = (num >> 16) + Math.round((255 * percent) / 100);
  let g = ((num >> 8) & 0x00ff) + Math.round((255 * percent) / 100);
  let b = (num & 0x0000ff) + Math.round((255 * percent) / 100);

  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function applyDynamicTheme(cms: Partial<CMSSettings>) {
  if (typeof document === 'undefined') return;

  const theme = cms.theme;
  const identity = cms.identity;

  // 1. Update Title and Favicon
  if (identity?.pageTitle || identity?.appName) {
    document.title = identity.pageTitle || identity.appName || 'Guber Smart';
  }

  if (identity?.pageDescription) {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', identity.pageDescription);
    }
  }

  if (identity?.favicon) {
    let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = identity.favicon;
  }

  // 2. Set CSS Custom Properties on documentElement
  if (theme) {
    const primary = theme.primaryColor || '#07142b';
    const secondary = theme.secondaryColor || '#0b1c38';
    const accent = theme.accentColor || '#c9a35a';
    const accentLight = adjustBrightness(accent, 20);
    const accentDark = adjustBrightness(accent, -20);
    const bg = theme.bgColor || '#f8f5ef';
    const text = theme.textColor || '#1b2433';
    const radius = theme.borderRadius || '18px';

    const root = document.documentElement;
    root.style.setProperty('--color-primary', primary);
    root.style.setProperty('--color-secondary', secondary);
    root.style.setProperty('--color-accent', accent);
    root.style.setProperty('--color-accent-light', accentLight);
    root.style.setProperty('--color-accent-dark', accentDark);
    root.style.setProperty('--color-bg', bg);
    root.style.setProperty('--color-text', text);
    root.style.setProperty('--border-radius', radius);

    // 3. Inject / Update Dynamic Stylesheet to reactively bind all Tailwind and UI elements
    let styleTag = document.getElementById('guber-dynamic-theme-style') as HTMLStyleElement | null;
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'guber-dynamic-theme-style';
      document.head.appendChild(styleTag);
    }

    styleTag.textContent = `
      :root {
        --color-primary: ${primary};
        --color-secondary: ${secondary};
        --color-accent: ${accent};
        --color-accent-light: ${accentLight};
        --color-accent-dark: ${accentDark};
        --color-bg: ${bg};
        --color-text: ${text};
        --border-radius: ${radius};
      }

      /* Dynamically override hardcoded utility colors */
      .bg-\\[\\#07142b\\] { background-color: var(--color-primary) !important; }
      .bg-\\[\\#0b1c38\\] { background-color: var(--color-secondary) !important; }
      .text-\\[\\#c9a35a\\] { color: var(--color-accent) !important; }
      .text-\\[\\#e8cd8f\\] { color: var(--color-accent-light) !important; }
      .text-\\[\\#a77d36\\] { color: var(--color-accent-dark) !important; }
      .border-\\[\\#c9a35a\\] { border-color: var(--color-accent) !important; }
      .border-\\[\\#c9a35a\\]\\/60 { border-color: ${accent}99 !important; }
      .border-\\[\\#c9a35a\\]\\/50 { border-color: ${accent}80 !important; }
      .border-\\[\\#c9a35a\\]\\/30 { border-color: ${accent}4d !important; }
      .border-\\[\\#c9a35a\\]\\/20 { border-color: ${accent}33 !important; }
      .bg-\\[\\#f8f5ef\\] { background-color: var(--color-bg) !important; }
      .text-\\[\\#1b2433\\] { color: var(--color-text) !important; }

      .gold-gradient-bg {
        background: linear-gradient(135deg, var(--color-accent-light) 0%, var(--color-accent) 50%, var(--color-accent-dark) 100%) !important;
      }

      .gold-gradient-text {
        background: linear-gradient(135deg, var(--color-accent-light) 0%, var(--color-accent) 50%, var(--color-accent-dark) 100%) !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
      }
    `;
  }
}
