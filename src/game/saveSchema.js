import { SAVE_SCHEMA_VERSION } from './constants.js';

export function createSaveEnvelope(state) {
  return {
    schemaVersion: SAVE_SCHEMA_VERSION,
    savedAt: new Date().toISOString(),
    state,
  };
}

export function validateSaveEnvelope(save) {
  if (!save || typeof save !== 'object') {
    return { valid: false, reason: 'Save must be an object.' };
  }

  if (save.schemaVersion !== SAVE_SCHEMA_VERSION) {
    return { valid: false, reason: 'Unsupported save schema version.' };
  }

  if (!save.state || typeof save.state !== 'object') {
    return { valid: false, reason: 'Save state is missing.' };
  }

  return { valid: true };
}
