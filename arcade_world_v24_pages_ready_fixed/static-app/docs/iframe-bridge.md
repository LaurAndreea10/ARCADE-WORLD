# Arcade World iframe bridge contract

Parent expects `postMessage` payloads shaped like:

```json
{
  "type": "arcade-world-result",
  "result": "finish|win|lose|abandon",
  "score": 220,
  "coins": 30,
  "xp": 20,
  "gameId": "basket"
}
```

Recommended lifecycle events:
- `arcade-world-handshake`
- `arcade-world-start`
- `arcade-world-progress`
- `arcade-world-result`

This makes automatic rewards and analytics reliable.
