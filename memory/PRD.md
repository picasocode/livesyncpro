# LinguaLive — Pitch UI

Live voice-translation app for meetings, live streams, huddles — plus plugin previews for Google Meet, Zoom, Microsoft Teams, Slack.

## Scope
- **UI-only pitch** (no real translation backend). All data is mocked in `/app/frontend/src/mock.ts`.
- Expo React Native with expo-router file-based routing.

## Screens delivered
| Route | Purpose |
|---|---|
| `/` | Onboarding / hero pitch |
| `/(tabs)/home` | Dashboard: start live, plugin shortcuts, recent meetings |
| `/(tabs)/history` | Transcripts list with search + filter chips |
| `/(tabs)/plugins` | 4 plugin cards + features |
| `/(tabs)/settings` | Profile, languages, voice, team, billing |
| `/live` | Live translation: speaker pill, bilingual caption, animated waveform, language pills, mic/end controls |
| `/transcript/[id]` | Audio player + bilingual/translated-only toggle transcript |
| `/plugin/[id]` | Simulated plugin overlay inside a phone frame (Meet/Zoom/Teams/Slack specific) |
| `/team` | Workspace card, seat usage, member list, invite link |
| `/pricing` | Free / Pro / Business plans with monthly-yearly toggle |

## Design system
- Theme: Swiss high-contrast light (pure whites, ink blacks)
- Brand: Electric Cobalt `#0055FF`
- Tokens in `/app/frontend/src/theme.ts`
- Icons: `@expo/vector-icons` (Ionicons, MaterialCommunityIcons)
- Animation: `react-native-reanimated` for live waveform
- Gradient: `expo-linear-gradient` for onboarding hero overlay

## Languages showcased
English, Spanish, French, German, Japanese, Mandarin, Hindi, Arabic, Portuguese.

## Not implemented (intentional)
- Real ASR / MT / TTS pipeline
- Auth, backend persistence, billing checkout
- Push notifications, offline storage

## Files
- `/app/frontend/app/**` — screens
- `/app/frontend/src/mock.ts` — mock meetings, team, transcripts
- `/app/frontend/src/theme.ts` — design tokens
- `/app/design_guidelines.json` — full design spec
