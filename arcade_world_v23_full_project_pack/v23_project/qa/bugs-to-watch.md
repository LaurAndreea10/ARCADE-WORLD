# Bugs to watch
- Player count switching from PvP to Solo should rebuild forms cleanly.
- Imported saves may contain stale tile counts after content updates.
- iframe result messages should be validated by origin in production.
- Large boards should not overflow on small screens.
- Rewards must not trigger twice on duplicate `finish` messages.
- Timeout/reconnect on minigame bridge should always recover control to board.
- AI should never attempt invalid capture/upgrade actions.
