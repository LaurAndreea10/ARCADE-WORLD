# Accessibility and Performance Checklist

This checklist turns the README accessibility claims into repeatable verification steps.

## Accessibility

### Keyboard

- `Space` rolls dice only when the main game is ready.
- `B`, `T`, `F`, arrow keys, and numeric shortcuts do not trap focus.
- Modal close buttons are reachable with Tab and Escape.
- Focus returns to the previous control after closing a modal.

### Motion

- Respect `prefers-reduced-motion: reduce`.
- Disable or shorten token travel animations, confetti, particles, and card flips when reduced motion is enabled.
- Avoid animation as the only way to communicate state changes.

### Contrast and Text

- Verify all text meets WCAG AA contrast against glassmorphism panels.
- Keep labels visible on mobile tiles, not only icons.
- Preserve readable font sizes at 320px, 375px, 768px, and desktop widths.

### Touch

- Keep important controls at least 44px tall/wide.
- Avoid hover-only interactions on mobile.
- Respect safe-area insets on phones with notches.

### ARIA

- Give modals `role="dialog"` and `aria-modal="true"`.
- Give the dice button an accessible label that includes the current player.
- Mark live turn updates with `aria-live="polite"`.
- Keep decorative particles and purely visual SVGs hidden from assistive tech.

## Performance

### Baseline Checks

Run Lighthouse against:

- desktop 1440px;
- mobile 375px;
- reduced-motion mode;
- a long saved game with all players and many completed tiles.

### Metrics to Track

- Lighthouse Performance score;
- First Contentful Paint;
- Largest Contentful Paint;
- Total Blocking Time;
- DOM node count;
- localStorage usage;
- average FPS with particles enabled and disabled.

### Optimization Ideas

- Pause particles when the tab is hidden.
- Batch DOM updates during token movement.
- Avoid re-rendering the full board after every small state change.
- Lazy-load iframe mini-games only when selected.
- Cap confetti particle counts on mobile devices.

## Evidence to Add to README

After running audits, add:

```md
## Quality Snapshot

| Check | Result |
|---|---:|
| Lighthouse Mobile | TBD |
| Lighthouse Desktop | TBD |
| Unit Tests | Passing |
| Keyboard Navigation | Verified |
| Reduced Motion | Verified |
```
