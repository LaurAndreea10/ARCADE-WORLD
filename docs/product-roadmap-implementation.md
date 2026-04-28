# Product Roadmap Implementation

This document explains how the product-roadmap systems map to the live Arcade World experience.

## Implemented system layer

The module `src/game/productLoop.js` adds a testable product layer for the roadmap in issue #20:

- first-run onboarding slides;
- visible core-loop steps;
- starter mini-game set;
- progressive mini-game unlock rules;
- player profile defaults;
- shared mini-game result object;
- XP, coins, medal, boss-progress rewards;
- reward preview before a mini-game starts;
- daily challenge UI view model;
- Android-style back-stack behavior;
- local progress serialization and safe recovery;
- Play Store listing copy and screenshot checklist.

## Implemented UI overlay

The module `src/game/productLoopUi.js` mounts a non-invasive product loop assistant over the existing page.

It renders:

- first-run onboarding;
- profile/avatar cycling;
- level, XP, coins, and boss progress;
- reward preview;
- simulated shared result screen;
- daily challenge card;
- progressive mini-game unlock grid;
- haptic feedback where supported;
- local progress persistence.

To enable it in the live page, load `src/game/productLoopAutoMount.js` as a module near the end of `index.html`.

The overlay is intentionally separate from the monolithic `index.html` so it can be tested and iterated without risking regressions in the playable board.

## Recommended UI wiring order

### 1. First 60 seconds

Use `getOnboardingState()` and `advanceOnboarding()` for a 3-slide first-run flow:

1. Welcome to Arcade World.
2. Roll, play, claim.
3. Unlock the arcade.

Persist completion in local save data so returning players skip onboarding.

### 2. Profile / avatar step

Use `createPlayerProfile()` when a new player starts. The UI should ask for display name, avatar emoji/icon, and optional color/skin.

The profile starts with only the starter mini-games unlocked.

### 3. Mini-game unlocks

Use `getMiniGameUnlockState(miniGameId, profile)` to decide whether a tile or mini-game card is playable.

Starter games:

- basket;
- memory;
- breakout.

Locked cards should show their requirement, for example `Reach 120 XP` or `Capture 3 tiles`.

### 4. Reward preview

Before launching a mini-game, call `buildRewardPreview(miniGameId, difficulty)` and show possible win coins, possible win XP, participation reward, and why the player should care.

### 5. Shared result screen

After a mini-game ends, call `buildMiniGameResult()` and then `applyMiniGameResult()`.

The result screen should show victory state, medal, score, coins gained, XP gained, boss damage, newly unlocked mini-games, and the next CTA.

### 6. Daily challenge UI

The existing `src/game/dailyChallenge.js` can calculate the challenge and progress. Pass that progress into `buildDailyChallengeView()` to render a compact daily card.

Recommended placement: right sidebar or top HUD.

### 7. Android back behavior

Use `createAndroidBackStack()` on app start, `pushScreen(stack, screen)` when opening overlays, and `handleAndroidBack(stack)` when the Android/browser back action happens.

Expected behavior:

- result screen to mini-game;
- mini-game to board;
- board to confirm exit.

### 8. Local progress

Use `serializeLocalProgress(profile, extra)` before saving to localStorage. Use `parseLocalProgress(raw)` when loading.

Broken saves return a recovered fallback instead of crashing.

## Store listing preparation

`DEFAULT_STORE_LISTING` contains the tagline, short description, and 8 screenshot prompts.

This is not a substitute for final artwork, but it gives the exact capture list needed for a Play Store-style listing.

## Done criteria for issue #20

The roadmap can be considered implemented in the live UI when:

- onboarding appears for new players;
- the player picks a profile/avatar before the first roll;
- only 3 mini-games are available initially;
- locked mini-games show requirements;
- reward preview appears before launch;
- every mini-game ends in the same result screen;
- daily challenge is visible and claimable;
- Android back closes overlays logically;
- local save survives refresh and broken save recovery;
- store listing assets are captured from the final UI.
