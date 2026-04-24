# LinguaLive — Translated Calls, Meetings & Talks

Pitch UI repositioned as a full **communications product** (calls + meetings + live talks), with plugin integrations demoted to a promotional "Discover" section.

## Positioning
**"Talk to anyone, in any language."** — real-time translated 1-on-1 calls, group meetings, and live broadcasts. Plus bonus plugins for Meet / Zoom / Teams / Slack.

## Tab structure
1. **Calls** (home) — 3-color mode grid (Call · Meeting · Talk), favorite contacts carousel, mixed recent activity
2. **History** — type filter chips (All / Calls / Meetings / Talks), missed-call badges, incoming/outgoing indicators
3. **Discover** — promotional plugin ads + customer stories + voice cloning feature ad + coming-soon integrations
4. **Settings** — language prefs, voice cloning, team, billing

## New screens
- `/call/new` — contact dialer with "You speak" language selector, voice/video call per contact
- `/live?mode=call` — 1:1 call stage (caller avatar + pulse ring, video toggle)
- `/live?mode=meeting` — group meeting (video-grid participants)
- `/live?mode=talk` — live broadcast (host + pulse ring + 248 listeners badge + heart button)

## Polish & animations
- `PressableScale` reusable component: spring scale-on-press + haptic feedback (light/medium/heavy)
- Entrance animations: `FadeInDown` / `FadeInUp` / `FadeInRight` / `SlideInDown` staggered across all screens
- Live screen: animated confidence bar, fade crossover between captions, `PulseRing` on call/talk stages
- Tab icons: spring scale bounce + active dot indicator on focus
- Onboarding hero fade-in, glass card slides up with springify
- Smoother stack transitions (slide-from-bottom for modals)

## Files
- New: `/app/frontend/src/components/PressableScale.tsx`, `/app/frontend/app/call/new.tsx`
- Rewritten: `index.tsx`, `(tabs)/_layout.tsx`, `(tabs)/home.tsx` (Calls), `(tabs)/plugins.tsx` (Discover), `(tabs)/history.tsx`, `live.tsx`, `src/mock.ts`
- Touched: `_layout.tsx`, `transcript/[id].tsx` (null-platform safety)

## Still UI-only
No ASR / MT / TTS / auth / payments wired. All data mocked.
