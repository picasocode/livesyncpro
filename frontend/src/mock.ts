export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸', native: 'English' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', native: 'Español' },
  { code: 'fr', name: 'French', flag: '🇫🇷', native: 'Français' },
  { code: 'de', name: 'German', flag: '🇩🇪', native: 'Deutsch' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', native: '日本語' },
  { code: 'zh', name: 'Mandarin', flag: '🇨🇳', native: '中文' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', native: 'हिन्दी' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', native: 'العربية' },
  { code: 'pt', name: 'Portuguese', flag: '🇧🇷', native: 'Português' },
];

export const AVATARS = [
  'https://images.unsplash.com/photo-1758600587815-b654d1405e83?crop=entropy&cs=srgb&fm=jpg&w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1652477633088-da74a0225dfc?crop=entropy&cs=srgb&fm=jpg&w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1758600587853-3d2138df6b2b?crop=entropy&cs=srgb&fm=jpg&w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
];

export const HERO = 'https://images.unsplash.com/photo-1758598307153-f1c53d9db23e?crop=entropy&cs=srgb&fm=jpg&w=900&h=1200&fit=crop';

export const CONTACTS = [
  { id: 'c1', name: 'Sofia Martín', lang: 'es', avatar: AVATARS[0], status: 'online', location: 'Madrid' },
  { id: 'c2', name: 'Kenji Tanaka', lang: 'ja', avatar: AVATARS[1], status: 'online', location: 'Tokyo' },
  { id: 'c3', name: 'Amélie Dubois', lang: 'fr', avatar: AVATARS[2], status: 'away', location: 'Paris' },
  { id: 'c4', name: 'Rahul Verma', lang: 'hi', avatar: AVATARS[3], status: 'online', location: 'Mumbai' },
  { id: 'c5', name: 'Lena Müller', lang: 'de', avatar: AVATARS[4], status: 'offline', location: 'Berlin' },
  { id: 'c6', name: 'Liu Wei', lang: 'zh', avatar: AVATARS[5], status: 'online', location: 'Shanghai' },
];

export const CALL_MODES = [
  {
    id: 'call',
    name: '1-on-1 Call',
    desc: 'Translated voice or video',
    icon: 'call',
    color: '#0055FF',
    tag: 'Instant',
  },
  {
    id: 'meeting',
    name: 'Group Meeting',
    desc: 'Up to 50 people, 9 languages',
    icon: 'people',
    color: '#10B981',
    tag: 'Team',
  },
  {
    id: 'talk',
    name: 'Live Talk',
    desc: 'Broadcast with live subtitles',
    icon: 'radio',
    color: '#FF3366',
    tag: 'Stream',
  },
];

export const PLUGINS = [
  { id: 'meet', name: 'Google Meet', color: '#00796B', icon: 'videocam', users: '2.1M', tag: 'Most installed' },
  { id: 'zoom', name: 'Zoom', color: '#2D8CFF', icon: 'videocam-outline', users: '1.8M', tag: 'Top rated' },
  { id: 'teams', name: 'Microsoft Teams', color: '#5B5FC7', icon: 'people', users: '1.4M', tag: 'Enterprise' },
  { id: 'slack', name: 'Slack Huddles', color: '#4A154B', icon: 'chatbubbles', users: '680K', tag: 'New' },
];

// Mixed activity: calls + meetings + talks
export const ACTIVITY = [
  {
    id: 'a1',
    type: 'call',
    title: 'Sofia Martín',
    subtitle: 'Missed call · 1:1',
    date: 'Today · 11:42',
    duration: '—',
    from: 'es',
    to: 'en',
    participants: 2,
    platform: null,
    preview: 'Lost connection during translation',
    translatedPreview: '',
    contactId: 'c1',
    direction: 'incoming',
    missed: true,
  },
  {
    id: 'a2',
    type: 'meeting',
    title: 'Q1 Product Review — Tokyo Team',
    subtitle: 'Group meeting · 7 people',
    date: 'Today · 10:30',
    duration: '48 min',
    from: 'ja',
    to: 'en',
    participants: 7,
    platform: 'meet',
    preview: '次の四半期のロードマップについて話しましょう。',
    translatedPreview: 'Let\'s discuss the roadmap for the next quarter.',
    direction: 'outgoing',
  },
  {
    id: 'a3',
    type: 'talk',
    title: 'Future of Remote Work — Live Talk',
    subtitle: 'Broadcast · 248 listeners',
    date: 'Today · 08:00',
    duration: '1h 12m',
    from: 'en',
    to: 'es',
    participants: 248,
    platform: null,
    preview: 'Welcome everyone from 42 countries today.',
    translatedPreview: 'Bienvenidos a todos desde 42 países hoy.',
    direction: 'outgoing',
  },
  {
    id: 'a4',
    type: 'call',
    title: 'Kenji Tanaka',
    subtitle: 'Video call · 1:1',
    date: 'Yesterday · 17:20',
    duration: '22 min',
    from: 'ja',
    to: 'en',
    participants: 2,
    platform: null,
    contactId: 'c2',
    preview: 'デザインのレビューありがとう。',
    translatedPreview: 'Thanks for the design review.',
    direction: 'outgoing',
  },
  {
    id: 'a5',
    type: 'meeting',
    title: 'Investor Pitch — Madrid',
    subtitle: 'Group meeting · 4 people',
    date: 'Yesterday · 15:00',
    duration: '32 min',
    from: 'es',
    to: 'en',
    participants: 4,
    platform: 'zoom',
    preview: 'El crecimiento del último trimestre superó todas las expectativas.',
    translatedPreview: 'Last quarter\'s growth exceeded all expectations.',
    direction: 'outgoing',
  },
  {
    id: 'a6',
    type: 'call',
    title: 'Amélie Dubois',
    subtitle: 'Voice call · 1:1',
    date: 'Mar 12 · 14:00',
    duration: '18 min',
    from: 'fr',
    to: 'en',
    participants: 2,
    contactId: 'c3',
    platform: null,
    preview: 'Le contrat est prêt à être signé.',
    translatedPreview: 'The contract is ready to be signed.',
    direction: 'incoming',
  },
  {
    id: 'a7',
    type: 'meeting',
    title: 'Engineering Standup — Berlin',
    subtitle: 'Group meeting · 9 people',
    date: 'Mar 12 · 09:00',
    duration: '21 min',
    from: 'de',
    to: 'en',
    participants: 9,
    platform: 'teams',
    preview: 'Das neue Feature ist in der Staging-Umgebung bereit.',
    translatedPreview: 'The new feature is ready in the staging environment.',
    direction: 'outgoing',
  },
];

// Backwards compatibility alias
export const MEETINGS = ACTIVITY;

export const LIVE_TRANSCRIPT = [
  { speaker: 'Sofia Martín', lang: 'es', original: 'Hola a todos, gracias por unirse a la llamada.', translated: 'Hi everyone, thanks for joining the call.', t: '00:02' },
  { speaker: 'Kenji Tanaka', lang: 'ja', original: 'こちらこそ、お招きいただきありがとうございます。', translated: 'Thank you for having me.', t: '00:09' },
  { speaker: 'Sofia Martín', lang: 'es', original: 'Hoy vamos a revisar el roadmap y las métricas clave.', translated: 'Today we\'ll review the roadmap and key metrics.', t: '00:14' },
  { speaker: 'Amélie Dubois', lang: 'fr', original: 'J\'ai préparé un résumé avec les points importants.', translated: 'I prepared a summary with the important points.', t: '00:22' },
  { speaker: 'Rahul Verma', lang: 'hi', original: 'मुझे लगता है हमें अगले सप्ताह तक इसे पूरा कर लेना चाहिए।', translated: 'I think we should complete this by next week.', t: '00:30' },
];

export const TEAM = [
  { id: 't1', name: 'Sofia Martín', role: 'Admin', email: 'sofia@company.com', lang: 'es', avatar: AVATARS[0] },
  { id: 't2', name: 'Kenji Tanaka', role: 'Member', email: 'kenji@company.com', lang: 'ja', avatar: AVATARS[1] },
  { id: 't3', name: 'Amélie Dubois', role: 'Member', email: 'amelie@company.com', lang: 'fr', avatar: AVATARS[2] },
  { id: 't4', name: 'Rahul Verma', role: 'Member', email: 'rahul@company.com', lang: 'hi', avatar: AVATARS[3] },
  { id: 't5', name: 'Lena Müller', role: 'Viewer', email: 'lena@company.com', lang: 'de', avatar: AVATARS[4] },
];

export const getLang = (code: string) => LANGUAGES.find((l) => l.code === code) || LANGUAGES[0];
export const getContact = (id?: string | null) => CONTACTS.find((c) => c.id === id);
