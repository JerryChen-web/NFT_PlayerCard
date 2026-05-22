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

## Visual Design Quality Rules

This project is not a normal dashboard and not a generic AI-generated page. The overall visual quality must preserve:

- Japanese dark luxury style
- Premium NFT exchange feel
- Dynamic sports trading card identity
- Card-game SSR reveal atmosphere
- Blockchain digital art showcase
- High-end collector marketplace
- Sports data visualization product

Avoid:

- Generic corporate landing pages
- Generic dashboard templates
- Plain table-heavy UI
- Generic purple or blue AI gradients
- Low-contrast gray cards
- Too many repeated identical panels
- Overcrowded filters and controls
- Mobile layouts that only shrink the desktop UI

Visual material direction:

- Dark base surfaces
- Gold, cyan, and red as accent colors
- Rarity-specific glow effects
- Metallic highlights
- Premium collector-card layering
- Washi paper, field-line, and exchange-grid textures
- Cards with thickness, shadows, and layered borders
- NFT market layouts that feel like an exchange without becoming a plain stock table

## Card Design Rules

Player cards are the core of this project. No change should make the cards feel ordinary.

Cards must include:

- Clear player name
- Clear team, league, and position
- OVR or primary stat value
- Rarity label
- Card number or token identity
- Market status: Mint, Listed, Owned, or Offer Only
- Distinct visual treatment by rarity
- Premium fallback when an image fails
- Mobile-readable content
- Buttons that do not squeeze core card information

Card image requirements:

- The player's face or main body should be clear.
- Do not crop images down to only a cap, forehead, or half face.
- Action photos are acceptable when the main subject is clear.
- Fallbacks must feel like special design cards, not missing-data placeholders.
- When image or material licensing is not verified, mark it as classroom demo or pending license verification.

## Animation Design Rules

Animations should create collector-card ritual without hurting usability.

Animation principles:

- Higher rarity should have stronger effects.
- Common and Uncommon should stay subtle.
- Rare and Super Rare can use light streaks.
- Epic and Legendary can use glow, particles, and sweep highlights.
- Mythic, Limited, and One of One should feel more premium and rare.
- Animations must not cover important text.
- Animations must not cause mobile jank.
- Animation ON / OFF must be supported.
- `prefers-reduced-motion` must be supported.
- Detail transition animations must be skippable and replayable.

Player-specific transition directions:

- Messi: gold passing lines, number 10 stamp, field vision.
- Mbappe: sprint afterimages, blue-white-red speed lines.
- Haaland: thunder shot, goal-net vibration.
- LeBron: crown, number 23, court dominance.
- Curry: three-point arc, Deep Range halo.
- Jokic: PTS / REB / AST triple data streams.
- Ohtani: two-way pitching and hitting, red-blue split.
- Judge: home run arc, number 99 power.
- Soto: strike-zone lock, Plate Vision.

## Market UI Rules

The market page must not feel cramped and must not become a normal data table.

The market page should include:

- Clear market hero
- Search bar
- Collapsible filter panel
- Quick filter chips
- Market stats cards
- Trending cards
- Undervalued cards
- Recent sales
- Price history
- NFT transaction confirmation area

Avoid:

- More than six select controls stacked vertically.
- Too much information packed into the first viewport.
- Mobile filters that consume the whole screen by default.
- Tables that break on mobile.
- Price, listing, and offer information mixed together in a confusing way.

Mobile market requirements:

- Filter panel collapsed by default.
- Tables transformed into card layouts or safe horizontal scrolling.
- Buy, Sell, and Offer buttons large enough to tap.
- Transaction information grouped into clear sections.
- No horizontal overflow.

## Modal / Detail Page Rules

Player detail content is dense, so modal and detail views must stay clear.

Modal rules:

- On mobile, modals should be close to full-screen.
- Modal content must scroll vertically.
- Close button must be fixed or otherwise easy to reach.
- Content must not be hidden behind the header.
- Metadata JSON should be collapsible or scrollable by default.
- Long text needs comfortable line height.
- Chinese and English body text should use consistent fonts.
- JSON, token, and txHash values may use monospace.
- Normal body copy must not fall back to browser-default serif.
- Long-term detail views should move toward tabs: Overview / Career / Stats / Market / Social / Metadata / Asset.

## Typography Rules

- Primary site fonts should use `Noto Sans TC`, `Microsoft JhengHei`, `PingFang TC`, and `system-ui`.
- English and Chinese body text should feel visually consistent.
- Only JSON, tokenId, txHash, serial, and code-like values should use monospace.
- Chinese paragraph line height must not be cramped.
- Long English paragraphs must not be too narrow.
- Mobile text must not be too small.
- Button text must not squeeze or overflow.

## Accessibility Rules

- Interactive elements need a visible focus state.
- Buttons must be keyboard-operable.
- When a modal opens, background mis-clicks should be prevented.
- Modal close buttons must be clear.
- Color contrast must be sufficient.
- Do not communicate state by color alone.
- Hover effects must not be the only access path on mobile.
- Animations must support reduced motion.
- Form fields need labels or clear placeholders.
- External links must use `target="_blank"` with `rel="noopener noreferrer"`.

## Responsive Requirements

- Support mobile, tablet, and desktop.
- At 390px mobile width, the page must not horizontally overflow.
- Text, buttons, cards, modals, navigation, and market layouts must remain usable on small screens.

## Responsive Visual QA Rules

After each UI or CSS change, check at least:

- 390px mobile width
- 768px tablet portrait
- 1024px tablet landscape
- 1440px desktop
- 1920px desktop
- 2560px or larger screens

Visual acceptance checks:

- No horizontal scrollbar.
- Cards are not crushed.
- Text does not overflow.
- Buttons do not overlap.
- Modals scroll correctly.
- Market filters do not squeeze content.
- Sidebar and topbar do not cover main content.
- Metadata JSON does not blow out the layout.
- Image fallback works.
- Animations do not block operation.

## GitHub Pages Deployment QA

The production site must run correctly on GitHub Pages.

After each change, check:

- All CSS uses relative paths.
- All JS uses relative paths.
- All images use relative paths or publicly loadable URLs.
- No dependency on `C:/AI/...`.
- No dependency on `file://`.
- No dependency on `localhost`.
- No dependency on `127.0.0.1`.
- No feature requires `npm install`.
- No feature requires a backend server.
- `localStorage` still works on GitHub Pages.

## Design Acceptance Checklist

After each future UI change, self-check:

- Does it still feel like a premium NFT player-card site?
- Does it still keep the Japanese dark luxury direction?
- Does it feel more like collectible cards than a normal dashboard?
- Does it avoid the generic AI webpage look?
- Is the market page more comfortable?
- Are the cards more attractive?
- Is the detail page clearer?
- Is the mobile version genuinely usable?
- Are animations premium without being disruptive?
- Is GitHub Pages still deployable?

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
