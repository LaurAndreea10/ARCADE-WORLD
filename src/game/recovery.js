import { migrateSave } from './saveMigrations.js';
import { validateSaveEnvelope } from './saveSchema.js';

export function parseImportedSave(rawValue) {
  try {
    const parsed = typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue;
    const migrated = migrateSave(parsed);

    if (!migrated.success) {
      return migrated;
    }

    const validation = validateSaveEnvelope(migrated.save);
    if (!validation.valid) {
      return { success: false, reason: validation.reason };
    }

    return { success: true, save: migrated.save };
  } catch (error) {
    return { success: false, reason: error instanceof Error ? error.message : 'Invalid save.' };
  }
}

export function createRecoverySnapshot(rawValue) {
  return {
    createdAt: new Date().toISOString(),
    rawValue: typeof rawValue === 'string' ? rawValue : JSON.stringify(rawValue, null, 2),
  };
}

export function getRecoveryActions(parseResult) {
  if (parseResult.success) {
    return ['continue'];
  }

  return ['download-broken-save', 'reset-save', 'try-repair'];
}
