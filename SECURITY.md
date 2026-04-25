# Security Policy

Arcade World is a static browser game, but it still handles local saves, URL hash sync data, iframe mini-games, and cross-window messages. Please report security issues responsibly.

## Supported Versions

The `main` branch and the latest GitHub Pages deployment are supported.

## Reporting a Vulnerability

Please open a private security advisory on GitHub or contact the repository owner. Do not publicly disclose exploitable issues before a fix is available.

Include:

- affected URL or file;
- reproduction steps;
- expected behavior;
- actual behavior;
- browser/device information;
- any proof-of-concept payload, kept minimal.

## Security Areas to Review

### iframe Mini-games

- Only trusted origins should be accepted in `postMessage` handlers.
- iframe messages must be data-only and never executable code.
- iframe elements should use `sandbox` wherever possible.
- The iframe bridge should fall back safely if an external game fails to load.

### Save Import and Sync Links

- Treat imported JSON and URL hash payloads as untrusted input.
- Validate schema version before applying imported state.
- Keep recovery options available for corrupted saves.
- Never store secrets in localStorage.

### DOM Safety

- Avoid injecting unsanitized strings into `innerHTML`.
- Prefer `textContent` for player names and user-controlled labels.
- Keep external links explicit and reviewed.

### Dependencies

Runtime dependencies are intentionally avoided. Development dependencies should be kept minimal and updated when security advisories are published.
