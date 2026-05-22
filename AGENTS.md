# NFT_PlayerCard Agent Notes

## Branch Roles

- `main` is the stable GitHub Pages branch. Keep it deployable.
- `phase2-modularization` is the active modularization development branch.
- Do not overwrite, delete, or push to the old `NFT_PlayerCard_v4_v2_2` repository.

## Modularization Rules

- Do not put all program logic back into `index.html`.
- Keep the root `index.html` deployable on GitHub Pages while modularization is in progress.
- Do not introduce npm, React, Vue, a backend service, build tooling, or machine-specific absolute paths.
- Prefer plain HTML, CSS, and JavaScript modules that can run from GitHub Pages.

## File Ownership Hints

- Market page work belongs in market-related files such as `src/css/market.css`, `src/js/marketSimulator.js`, and `src/js/ui/renderMarket.js`.
- Card UI work belongs in card-related files such as `src/css/cards.css` and `src/js/ui/renderCard.js`.
- Animation work belongs in `src/css/animations.css` and `src/js/animations.js`.
- Player, team, rarity, license, and seed data belongs in `src/data/`.

## Stability Rules

- Do not change UI, data, animations, market behavior, Oracle behavior, Metadata behavior, or Studio behavior unless the phase explicitly asks for it.
- Check Git status before and after changes.
- Preserve the legacy single-file backup under `legacy/v1.0-single-file-online/`.
