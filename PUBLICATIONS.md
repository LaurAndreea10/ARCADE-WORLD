# Portfolio releases

The Arhipelagul launcher and `portfolio-publications.json` are synchronized from
the portfolio's `projects.json`, using its `scripts/sync-publications.mjs`.

With both repositories checked out, run from the portfolio directory:

```sh
node scripts/sync-publications.mjs --arcade ../ARCADE-WORLD
node scripts/sync-publications.mjs --check --arcade ../ARCADE-WORLD
```

Commit both repositories after a version/title/destination change. The snapshot
also describes Baseline Voyage and GENOBOARD for publication identity; it does
not claim those games are integrated into this catalogue.

Arhipelagul uses the existing dialog launcher and new-tab fallback. The existing
mobile More catalogue automatically clones the new card. No score bridge or
changes to the core game bundle are introduced.
