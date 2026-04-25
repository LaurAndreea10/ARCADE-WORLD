# Save System

Arcade World stores local progress in the browser and supports export/import flows. Save data must be treated as untrusted input because users can edit JSON files or sync links manually.

## Save Envelope

All exported saves should use this envelope:

```json
{
  "schemaVersion": 1,
  "savedAt": "2026-04-25T00:00:00.000Z",
  "state": {}
}
```

## Import Flow

```text
raw JSON / URL hash
  ↓
parseImportedSave
  ↓
migrateSave
  ↓
validateSaveEnvelope
  ↓
apply to game state or show recovery UI
```

## Recovery UX

If a save cannot be parsed or validated, show actions from `getRecoveryActions`:

- download broken save;
- reset save;
- try repair.

This prevents players from losing data without a chance to inspect or export it.

## Migration Rules

- Never mutate the original imported object.
- Add one migration per schema version.
- Keep old migrations permanently.
- Add tests for every migration.
- Reject saves newer than the supported schema version.

## Current Migration

Version `0` or legacy raw state is wrapped into the version `1` envelope:

```js
{
  schemaVersion: 1,
  savedAt: legacy.savedAt ?? new Date().toISOString(),
  state: legacy.state ?? legacy,
}
```
