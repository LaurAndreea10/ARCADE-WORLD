import { SAVE_SCHEMA_VERSION } from './constants.js';

export const saveMigrations = Object.freeze({
  0: (save) => ({
    schemaVersion: 1,
    savedAt: save.savedAt ?? new Date().toISOString(),
    state: save.state ?? save,
  }),
});

export function migrateSave(save, targetVersion = SAVE_SCHEMA_VERSION) {
  if (!save || typeof save !== 'object') {
    return { success: false, reason: 'Save must be an object.' };
  }

  let current = structuredCloneSafe(save);
  let version = Number(current.schemaVersion ?? 0);

  while (version < targetVersion) {
    const migration = saveMigrations[version];

    if (!migration) {
      return { success: false, reason: `Missing migration from version ${version}.` };
    }

    current = migration(current);
    version = Number(current.schemaVersion ?? version + 1);
  }

  if (version > targetVersion) {
    return { success: false, reason: `Save version ${version} is newer than supported version ${targetVersion}.` };
  }

  return { success: true, save: current };
}

export function structuredCloneSafe(value) {
  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value));
}
