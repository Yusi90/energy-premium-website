# Asset Prompts: Energy Transformation Scrollytelling

Diese Prompts dienen der späteren Generierung echter Keyframes, Image-Sequences oder fal.ai Image-to-Video-Clips. Die aktuelle Demo nutzt bewusst lokale SVG-Platzhalter unter `public/generated/energy-transformation/`.

## Zielbild

Eine ruhige, hochwertige, technische und cinematic Transformation: Eine dunkle Projektfläche entwickelt sich über PV-Modulfelder, Batteriespeicher und Netzanschluss zu einem netzgekoppelten Energieinfrastruktur-Asset.

## Stilregeln

- Premium, ruhig, technisch, investorenfähig.
- Dunkles Graphit-Grün, tiefes Energie-Grün, Solar-Gold, weiches Cyan.
- Keine grellen Neonfarben.
- Keine Comic-Optik.
- Keine Logos, keine Marken, kein Text im Bild.
- Keine Privatjet-, Luxusreise- oder Lifestyle-Ästhetik.
- Keine Menschen im Vordergrund.
- Keine überfüllten Stockfoto-Solarbilder.

## OpenAI Image Prompts für Keyframes

### Keyframe 01 — Fläche analysieren

Cinematic aerial view of a large undeveloped landscape prepared for renewable energy infrastructure, dark graphite green atmosphere, subtle topographic contour lines, technical land survey overlays, soft morning haze, premium architectural visualization, restrained solar gold highlights, soft cyan grid hints, no text, no logos, no people, high detail, wide 1880 by 920 composition.

### Keyframe 02 — PV-Park planen

Cinematic technical aerial visualization of a solar park layout emerging over a dark landscape, elegant rows of photovoltaic panel fields appearing as precise geometric structures, subtle maintenance roads, transformer positions, muted solar gold accents, deep energy green background, soft cyan engineering lines, premium investor-grade infrastructure rendering, no text, no logos.

### Keyframe 03 — Speicher integrieren

Premium cinematic energy infrastructure scene with photovoltaic fields and a battery storage park integrated near the grid connection area, minimal container forms, restrained cyan energy pulses, deep graphite green color palette, solar gold highlights, technical but calm, realistic architectural visualization, no text, no logos, no humans.

### Keyframe 04 — Netz anschließen

Wide cinematic view of a grid-connected renewable energy asset: PV park, battery storage containers, transformer station and subtle overhead/grid connection structure, elegant cyan and gold energy flow lines, dark premium atmosphere, high trust, infrastructure oriented, no text, no logos, no people.

## fal.ai Image-to-Video Prompt

Model: `fal-ai/kling-video/v2.1/pro/image-to-video`

> Create a slow cinematic scroll-scrub style transformation of a renewable energy infrastructure asset. Start with a dark technical landscape survey, then reveal photovoltaic panel fields, then battery storage containers, then a grid connection and subtle energy flow lines. Motion must be calm, premium, investor-grade, precise and infrastructure-oriented. Avoid fast camera moves, no bounce, no flashy neon, no people, no logos, no text, no comic style. Use deep graphite green, energy green, restrained solar gold and soft cyan accents.

### Wichtiger fal.ai-Hinweis

fal.ai Image-to-Video benötigt eine öffentlich erreichbare Bild-URL. Lokale Dateipfade wie `public/generated/...` funktionieren nicht direkt. Keyframes müssen vorher z. B. über einen öffentlichen Storage, CDN oder signierte URL erreichbar gemacht werden.

## Desktop-Sequenzplanung

- Zielgröße Master: 1880 × 920 oder größer.
- Dauer für Scrub-Basis: 6–10 Sekunden pro Haupttransformation oder 160–240 Frames gesamt.
- Export später bevorzugt als WebP-Sequenz mit Poster.
- Pfad: `public/generated/energy-transformation/`.
- Manifest: `public/generated/energy-transformation/manifest.json`.
- Benennung: `frame_0001.webp`, `frame_0002.webp`, ... oder SVG/JPG/PNG je nach Pipeline.

## Mobile-Sequenzplanung

- Separater vertikaler oder quadratischer Crop empfohlen.
- Weniger Frames möglich, z. B. 48–96 Frames.
- Fokus stärker auf klare Zustände statt komplexe Details.
- Eigener Manifest-Pfad möglich: `public/generated/energy-transformation-mobile/manifest.json`.

## Negative Prompts

text, logo, watermark, brand mark, people posing, private jet, luxury travel, airport lounge, cartoon, comic, neon cyberpunk, oversaturated colors, cluttered interface, busy UI, unrealistic sci-fi city, low resolution, distorted solar panels, illegible technical text, stock photo look, aggressive motion blur

## Hinweise zur späteren Generierung

1. Erst vier starke Keyframes erzeugen.
2. Keyframes visuell angleichen: Perspektive, Licht, Farbwelt, Infrastrukturmaßstab.
3. Keyframes über öffentlich erreichbare URLs an fal.ai übergeben.
4. Videos mit `scripts/compile_sequence.py` in Frames umwandeln.
5. Manifest prüfen und in `CanvasSequence` laden.
6. SVG-Platzhalter erst ersetzen, wenn echte Frames qualitätsgesichert sind.
