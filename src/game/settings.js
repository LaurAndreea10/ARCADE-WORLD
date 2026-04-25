export const DEFAULT_SETTINGS = Object.freeze({
  theme: 'cyan',
  sound: true,
  motion: 'normal',
  largeUi: false,
  highContrast: false,
  autoSave: true,
  haptics: true,
});

export const SETTING_OPTIONS = Object.freeze({
  theme: ['cyan', 'purple', 'sunset'],
  motion: ['normal', 'reduced'],
});

export function normalizeSettings(settings = {}) {
  const normalized = {
    ...DEFAULT_SETTINGS,
    ...settings,
  };

  if (!SETTING_OPTIONS.theme.includes(normalized.theme)) {
    normalized.theme = DEFAULT_SETTINGS.theme;
  }

  if (!SETTING_OPTIONS.motion.includes(normalized.motion)) {
    normalized.motion = DEFAULT_SETTINGS.motion;
  }

  normalized.sound = Boolean(normalized.sound);
  normalized.largeUi = Boolean(normalized.largeUi);
  normalized.highContrast = Boolean(normalized.highContrast);
  normalized.autoSave = Boolean(normalized.autoSave);
  normalized.haptics = Boolean(normalized.haptics);

  return normalized;
}

export function applyReducedMotionPreference(settings, prefersReducedMotion) {
  return normalizeSettings({
    ...settings,
    motion: prefersReducedMotion ? 'reduced' : settings?.motion,
  });
}
