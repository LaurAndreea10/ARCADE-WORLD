import { ALLOWED_IFRAME_ORIGINS } from '../game/constants.js';

export function isAllowedIframeOrigin(origin, allowedOrigins = ALLOWED_IFRAME_ORIGINS) {
  return allowedOrigins.includes(origin);
}

export function parseMiniGameMessage(event, allowedOrigins = ALLOWED_IFRAME_ORIGINS) {
  if (!event || !isAllowedIframeOrigin(event.origin, allowedOrigins)) {
    return { accepted: false, reason: 'UNTRUSTED_ORIGIN' };
  }

  const data = event.data ?? {};
  if (data.type !== 'GAME_SCORE') {
    return { accepted: false, reason: 'UNSUPPORTED_MESSAGE' };
  }

  if (!Number.isFinite(data.score)) {
    return { accepted: false, reason: 'INVALID_SCORE' };
  }

  return {
    accepted: true,
    payload: {
      gameId: String(data.gameId ?? 'unknown'),
      score: data.score,
      won: Boolean(data.won),
    },
  };
}

export function createIframeLoadGuard({ timeoutMs = 8000, onTimeout, onLoad } = {}) {
  let settled = false;
  const timer = setTimeout(() => {
    if (!settled) {
      settled = true;
      onTimeout?.();
    }
  }, timeoutMs);

  return {
    loaded() {
      if (!settled) {
        settled = true;
        clearTimeout(timer);
        onLoad?.();
      }
    },
    cancel() {
      settled = true;
      clearTimeout(timer);
    },
  };
}
