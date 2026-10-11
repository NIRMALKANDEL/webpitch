# Assets and licences

## Photos — Unsplash

All photos are free (non-Plus) images from [Unsplash](https://unsplash.com), used under the
[Unsplash License](https://unsplash.com/license) (free for commercial use, no attribution required).
They are loaded from `images.unsplash.com` by ID, so every ID in `src/` maps to `https://unsplash.com/photos/<id>`.
Only free results were used; Unsplash+ images were filtered out when sourcing.

## Videos — Pexels

Free videos from [Pexels](https://www.pexels.com), used under the [Pexels License](https://www.pexels.com/license/).
They are streamed from Pexels' CDN in 4K, 1080p or 720p depending on the visitor's screen and connection (`src/lib/media.ts`).

| Used in | Pexels video |
|---|---|
| Restaurant hero | [36099938 — bread baking in a clay oven](https://www.pexels.com/video/36099938/) |
| Real-estate hero | [36783891 — aerial coastal skyline](https://www.pexels.com/video/36783891/) |
| What's possible (floor picker) | [31973183 — aerial housing complex](https://www.pexels.com/video/31973183/) |
| Furniture craft film | [5972632 — carpenter shaving wood](https://www.pexels.com/video/5972632/) |
| Manufacturer band | [5121753 — flowing molten steel](https://www.pexels.com/video/5121753/) |
| Fashion hero | [35764326 — woman in traditional outfit](https://www.pexels.com/video/35764326/) |
| Fashion (spare) | [32210739 — backstage at a fashion show](https://www.pexels.com/video/32210739/) |
| Photography hero | [29766220 — Indian wedding ritual](https://www.pexels.com/video/29766220/) |
| Photography showreel | [29766214 — wedding celebration with henna](https://www.pexels.com/video/29766214/) |

**Before going live at scale:** hotlinking works, but for full control download the clips, compress them,
and host them on Vercel Blob or another CDN, then update `src/lib/media.ts`.

## 3D models

No downloaded models. The armchair, the bolt assembly, the apartment tower and the hero carousel are built in code
(`src/components/three/`, `src/app/(demo-sites)/demos/real-estate/_parts/TowerScene.tsx`).

## Other

- `public/avatar.svg` and `public/favicon.svg`: drawn for this project.
- `public/previews/*.jpg`: screenshots of the demos, captured with Playwright.
- `public/demos/furniture/woodgrain-catalogue-sample.pdf`: generated sample file, labelled as a demo.
- Fonts: Google Fonts via `next/font` (SIL Open Font License).
