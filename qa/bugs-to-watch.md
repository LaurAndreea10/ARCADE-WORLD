# Bugs to watch
- Player count switching from PvP to Solo should rebuild forms cleanly
- Imported saves may contain stale tile counts after content updates
- iframe result messages should be validated by origin in production
- Large boards should not overflow on small screens

- CSS still contains layered historical overrides; visuals are stable but stylesheet should be consolidated in a dedicated cleanup pass
- React port is buildable, but it is still a foundation layer rather than feature parity with static master
