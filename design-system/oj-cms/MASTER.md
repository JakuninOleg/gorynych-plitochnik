# OJ CMS — reference-led design system

## Source of truth

The supplied OJ CMS dashboard mockup and approved OJ wordmark define the visual direction. Match their proportions, light typography, restrained borders and architectural imagery. Do not replace them with a generic dashboard layout or a circular OJ badge.

## Identity and typography

- `src/components/brand/oj-logo.tsx` contains the fixed SVG letterforms. The round O and narrow J are separate, with no enclosing circle or box.
- The full lockup is 50 × 38 px above a left-aligned, tracked CONTENT / MANAGEMENT descriptor. Use the compact vector mark when space is constrained.
- Inter Variable, with bundled Cyrillic support, is the interface and display family. Titles use weight 400; navigation 400–500; headings and document names 500–600.
- The desktop welcome heading is 44 px, line height 1.15, tracking −0.045em. Body 15–16 px, secondary interface text 12–13 px.
- Caveat Variable is used only for the decorative handwritten banner note. It is bundled locally and supports Cyrillic.
- No external runtime font requests. Both font packages include their OFL license.

## Palette

Semantic tokens live in `src/styles/tokens.css`.

- Canvas: #FAF9F7; sidebar: #F8F7F5.
- Surface: white; subtle surface: #F4F3F1; active navigation: #EEEDEB.
- Primary text: #121516; secondary text: #626567; tertiary text: #6D7073.
- Borders: #EAE9E7; stronger separators/control borders: #D3D4D3.
- Green and amber communicate publication state, always with a text label.
- Keep readable contrast, even where the mockup uses very pale small text.

## Desktop composition at 1536 × 1024

- Sidebar 268 px; topbar 80 px; content left gutter 40 px, right gutter 20 px.
- Sidebar: wordmark, Overview, expandable Collections (Pages/News), Globals, Media, Users (administrator only); separator; Settings, Documentation.
- Search, external site link, recent changes and profile in the topbar.
- Hero 188 px with a concrete villa image fading into the canvas.
- Workspace: flexible left column, 24 px gutter, 310 px right column.
- Four 186 px stat cards; recent document panel; 100 px help strip.
- Right: website preview and recent document activity.
- Misty mountain photograph at the sidebar foot, muted motto and attribution.
- Cards use 8–10 px radii and light borders. No floating shadows except popovers.

## Images

Use the local WebP assets under `public/images`. No remote hotlinks or geometric placeholder illustrations. The preview image follows the published homepage's selected media. Preserve custom uploads and saved content when upgrading legacy seed artwork.

## Interaction

- Search matches page/news titles and slugs. ArrowDown enters results; Escape dismisses and restores input focus.
- Sidebar can collapse; collections reveal their child routes.
- Profile contains demo role selection and reset controls, keeping the primary canvas clear.
- Row actions open the editor, preview or published page. Hidden controls are excluded from keyboard navigation.
- Mobile navigation is a modal drawer with focus trapping, body scroll lock, inert background and focus restoration after close.
- Settings and documentation links lead to real product pages, not component showcases.
- Counts reflect the current demo state; activity reflects existing document data, not a fabricated audit log.

## Responsive model

- 1200 px and above: two-column dashboard with four statistics.
- 768–1199 px: compact 224 px sidebar; preview/activity below primary content.
- Below 768 px: mobile drawer, full-width search, two statistics per row, compact document rows and stacked supporting panels.
- Verify at 375, 768, 1280 and 1536 px, including keyboard focus, image loading and horizontal overflow.
- Respect reduced motion; transitions support interaction and never animate dashboard entrance.

## Scope

This repository is an interactive frontend demonstration using browser-local state. The visual redesign does not turn it into a connected Payload installation. Real authentication, persistence and permissions require the planned backend integration.
