# Redesign: `/megahair` and `/unhas` landing pages

## Context

Both routes are standalone, single-file landing pages (`src/routes/megahair.tsx`,
`src/routes/unhas.tsx`), separate from the componentized homepage. `/megahair`
already carries correct SÜ Hair Concept branding and CTAs. `/unhas` was built
from `alongamentodeunhas.studiouber.com.br` as a content/design reference and
kept that reference's title, meta tags, color tokens (`--wine` via the
`.nail-page` utility in `src/styles.css`), and outbound CTA links instead of
pointing back at the business.

Studio Uber and SÜ Hair Concept are the same business at the same location —
Studio Uber is the nail-service brand name, SÜ Hair Concept the hair-service
brand name. `/unhas` keeping Studio Uber's name and color identity is
intentional; its booking CTAs pointing outward instead of to the real WhatsApp
number is not.

## Goals

1. Place the client-provided video (`IMG_0555.mp4`, a spoken testimonial/
   process reel with burned-in synced captions and a "Studio Über" bug —
   inspected by extracting frames, not a silent B-roll) on `/megahair` in a
   click-to-play testimonial section.
2. Fix `/unhas` so every booking CTA reaches the real business (`SITE.whatsapp`)
   and the page reads as part of SÜ Hair Concept rather than an unrelated site.
3. Modernize both pages visually (motion, hierarchy, mobile conversion) using
   patterns already established elsewhere in the codebase.
4. Add real content pulled from `suhairconcept.com.br/megahair/` where
   available — no invented claims (pricing, duration, guarantees, FAQ answers)
   since those aren't verifiable from the source site.

## Non-goals

- No restructuring into componentized sections (Approach A: refine the
  existing single-file pages in place, matching how these two routes already
  diverge from the homepage's component pattern).
- No new photography/gallery images beyond the 4 assets already in
  `src/assets` for these two pages — the reference nail site no longer hosts
  independent content to pull from (it now 301-redirects to
  `suhairconcept.com.br`), and downloading unknown external images without
  the client's say-so is out of scope.
- No fabricated FAQ, pricing, or duration content.

## Design

### `/megahair`

- **Hero**: unchanged — stays on the static `mega-hero.jpg` background. A
  muted autoplay loop doesn't work for this clip since it's a spoken
  testimonial with timed captions, not ambient B-roll.
- **New "Depoimento em vídeo" section**: click-to-play video card between the
  hero and the techniques section. Shows a poster frame (extracted from the
  video) with a play button overlay; clicking swaps in a native `<video
  controls>` element that plays with sound. Not autoplay, not looped.
- **New "Missão · Visão · Valores" section**: three cards using the verified
  text from `suhairconcept.com.br/megahair/`:
  - Missão: "Somos pessoas cuidando de pessoas, criando experiências
    cuidadosamente pensadas que transformam sonhos em realidade."
  - Visão: "Ser referência em experiências de beleza e cuidado, reconhecidos
    pela excelência, sofisticação."
  - Valores: "Elevar a autoestima por meio de experiências cuidadosamente
    criadas, em um ambiente sofisticado, acolhedor."
- **Motion/polish**: wrap existing sections with the codebase's `Reveal`
  component (already used on the homepage, not currently used on this route)
  for scroll-in animation. Add a persistent mobile-only floating WhatsApp CTA.
  Increase visual weight of stat callouts ("+10 anos", "Fios 100% humanos").

### `/unhas`

- **Branding fix**: keep the "Studio Uber" name and its wine/rose color
  identity (legitimate sub-brand), but:
  - Update `<title>`/meta description to identify it as the nail service of
    SÜ Hair Concept (e.g. "Alongamento de Unhas | Studio Uber — SÜ Hair
    Concept").
  - Replace every CTA currently pointing at
    `https://alongamentodeunhas.studiouber.com.br/` (a domain that no longer
    serves independent content — it 301s to `suhairconcept.com.br`) with
    `SITE.whatsapp`.
  - Header logo link changes from `/unhas` (self-link, dead-end) to `/` so
    visitors can reach the main site.
- **Motion/polish**: same `Reveal` treatment and floating mobile CTA as
  `/megahair`, for visual/interaction consistency across both landing pages.

### Shared / technical

- Both routes' `head()` OG/canonical URLs already reference
  `suhairconcept.lovable.app` — left as-is, out of scope.
- Work happens in a temporary local clone (not a persistent copy); commits
  are pushed straight to `main` on `github.com/mateusomelo/suhairconcept`,
  which syncs back into the Lovable project per `AGENTS.md`.
- No history rewriting (no force-push/amend), per `AGENTS.md` guidance for
  Lovable-connected repos.

## Testing

- `bun run build` (or the project's configured build script) to catch
  TypeScript/route errors before pushing.
- Manual visual check of both routes via `bun run dev` (or preview build) —
  hero video plays/loops, mobile floating CTA doesn't overlap content, all
  `/unhas` CTAs resolve to `SITE.whatsapp`.
