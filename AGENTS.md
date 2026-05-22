# NFT_PlayerCard Project Guidance

## Project Identity

- Project name: `NFT_PlayerCard`
- Official GitHub repo: `NFT_PlayerCard`
- GitHub Pages URL: `https://jerrychen-web.github.io/NFT_PlayerCard/`
- Stable version tag: `v1.0-single-file-online`
- Official local path: `C:\AI\Codex\NFT_PlayerCard`
- Source prototype: `C:\AI\ChatGPT\NFT_PlayerCard\v2\index.html`
- Old repo: `NFT_PlayerCard_v4_v2_2`

The old repo `NFT_PlayerCard_v4_v2_2` must not be modified, overwritten, deleted, or used as a push target. The official repo for current work is `NFT_PlayerCard`.

## Branch Policy

- `main` is the stable online GitHub Pages demo branch.
- Do not experiment directly on `main`.
- `phase2-modularization` is the modularization, refactor, and new feature development branch.
- Keep `main` deployable and stable while feature work happens on development branches.

## Hard Constraints

- Do not put all program logic back into `index.html`.
- Do not use React, Vue, Angular, npm build, Vite, Next.js, backend services, or databases.
- Keep the project deployable as static files on GitHub Pages.
- Do not modify `legacy/v1.0-single-file-online/index.html`.
- Do not change UI, data, animations, market behavior, Oracle behavior, Metadata behavior, or Studio behavior unless the active phase explicitly asks for it.

## Path Safety

Production HTML, CSS, and JavaScript must not use:

- `C:/AI/...`
- `file://`
- `localhost`
- `127.0.0.1`

All production paths must be relative paths that work on GitHub Pages.

## File Ownership Map

When changing a feature, start with the files below before touching broader code.

### Market

- `src/js/ui/renderMarket.js`
- `src/css/market.css`
- `src/js/marketSimulator.js`
- `src/js/priceHistory.js`
- `src/data/marketSeeds.js`

### Cards

- `src/js/ui/renderCard.js`
- `src/css/cards.css`
- `src/data/rarityConfig.js`
- `src/js/imageResolver.js`

### Modal Details

- `src/js/ui/renderModal.js`
- `src/css/modal.css`
- `src/js/i18n.js`
- `src/js/metadata.js`

### Animations

- `src/js/animations.js`
- `src/css/animations.css`
- `src/data/animationPresets.js`

### Data

- `src/data/`

### Metadata

- `src/js/metadata.js`

### Oracle

- `src/js/oracle.js`
- `src/js/ui/renderOracle.js`

### Images

- `src/js/imageResolver.js`
- `assets/images/`
- `assets/uploads/`

### Translation

- `src/js/i18n.js`
- `src/data/playerProfiles.localized.js`

## Design Direction

The product should feel like:

- Japanese dark luxury
- NFT exchange
- Dynamic player card collection
- Card-game SSR reveal
- Blockchain digital art showcase

Do not turn the project into:

- A generic corporate website
- A generic dashboard
- A generic AI purple-gradient page

## Responsive Requirements

- Support mobile, tablet, and desktop.
- At 390px mobile width, the page must not horizontally overflow.
- Text, buttons, cards, modals, navigation, and market layouts must remain usable on small screens.

## Required Checks After Changes

After each change, check:

- `git status`
- Browser console errors
- Whether the local page can open
- Whether GitHub Pages relative paths remain safe

For UI or runtime changes, also check the affected view directly in a browser.

## Legacy And Recovery

- The stable single-file backup lives at `legacy/v1.0-single-file-online/index.html`.
- Never modify that legacy backup.
- If modularization fails, recover from tag `v1.0-single-file-online`.
- Root `index.html` should remain deployable until the project explicitly switches GitHub Pages to a modular entrypoint.

## Long-Term Goals

- Football Top 100
- Basketball Top 100
- Baseball Top 100
- NFT Mint
- Secondary market
- Oracle
- Dynamic Metadata
- Price curves
- Character-level transition animations
- Image upload
- Social and official data
- Translation system
- GitHub Pages online showcase
