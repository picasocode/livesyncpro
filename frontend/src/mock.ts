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

export const PLUGINS = [
  { id: 'meet', name: 'Google Meet', color: '#00796B', icon: 'videocam', users: '2.1M', tag: 'Most installed' },
  { id: 'zoom', name: 'Zoom', color: '#2D8CFF', icon: 'videocam-outline', users: '1.8M', tag: 'Top rated' },
  { id: 'teams', name: 'Microsoft Teams', color: '#5B5FC7', icon: 'people', users: '1.4M', tag: 'Enterprise' },
  { id: 'slack', name: 'Slack Huddles', color: '#4A154B', icon: 'chatbubbles', users: '680K', tag: 'New' },
];

export const MEETINGS = [
  {
    id: 'm1',
    title: 'Q1 Product Review — Tokyo Team',
    date: 'Today · 10:30',
    duration: '48 min',
    from: 'ja',
    to: 'en',
    participants: 7,
    platform: 'meet',
    preview: '次の四半期のロードマップについて話しましょう。',
    translatedPreview: 'Let\'s discuss the roadmap for the next quarter.',
  },
  {
    id: 'm2',
    title: 'Investor Pitch — Madrid',
    date: 'Yesterday · 15:00',
    duration: '32 min',
    from: 'es',
    to: 'en',
    participants: 4,
    platform: 'zoom',
    preview: 'El crecimiento del último trimestre superó todas las expectativas.',
    translatedPreview: 'Last quarter\'s growth exceeded all expectations.',
  },
  {
    id: 'm3',
    title: 'Engineering Standup — Berlin',
    date: 'Mar 12 · 09:00',
    duration: '21 min',
    from: 'de',
    to: 'en',
    participants: 9,
    platform: 'teams',
    preview: 'Das neue Feature ist in der Staging-Umgebung bereit.',
    translatedPreview: 'The new feature is ready in the staging environment.',
  },
  {
    id: 'm4',
    title: 'Customer Discovery — Mumbai',
    date: 'Mar 10 · 18:00',
    duration: '56 min',
    from: 'hi',
    to: 'en',
    participants: 3,
    platform: 'slack',
    preview: 'हमारे ग्राहक वास्तव में इस सुविधा की मांग कर रहे हैं।',
    translatedPreview: 'Our customers are really asking for this feature.',
  },
  {
    id: 'm5',
    title: 'Partner Sync — Paris',
    date: 'Mar 8 · 14:30',
    duration: '41 min',
    from: 'fr',
    to: 'en',
    participants: 5,
    platform: 'meet',
    preview: 'Nous devrions finaliser le contrat cette semaine.',
    translatedPreview: 'We should finalize the contract this week.',
  },
];

export const LIVE_TRANSCRIPT = [
  { speaker: 'Sofia Martín', lang: 'es', original: 'Hola a todos, gracias por unirse a la reunión.', translated: 'Hi everyone, thanks for joining the meeting.', t: '00:02' },
  { speaker: 'Kenji Tanaka', lang: 'ja', original: 'こちらこそ、お招きいただきありがとうございます。', translated: 'Thank you for having me.', t: '00:09' },
  { speaker: 'Sofia Martín', lang: 'es', original: 'Hoy vamos a revisar el roadmap y las métricas clave del trimestre.', translated: 'Today we\'ll review the roadmap and the key quarterly metrics.', t: '00:14' },
  { speaker: 'Amélie Dubois', lang: 'fr', original: 'J\'ai préparé un résumé avec les points les plus importants.', translated: 'I prepared a summary with the most important points.', t: '00:22' },
];

export const TEAM = [
  { id: 't1', name: 'Sofia Martín', role: 'Admin', email: 'sofia@company.com', lang: 'es', avatar: AVATARS[0] },
  { id: 't2', name: 'Kenji Tanaka', role: 'Member', email: 'kenji@company.com', lang: 'ja', avatar: AVATARS[1] },
  { id: 't3', name: 'Amélie Dubois', role: 'Member', email: 'amelie@company.com', lang: 'fr', avatar: AVATARS[2] },
  { id: 't4', name: 'Rahul Verma', role: 'Member', email: 'rahul@company.com', lang: 'hi', avatar: AVATARS[3] },
  { id: 't5', name: 'Lena Müller', role: 'Viewer', email: 'lena@company.com', lang: 'de', avatar: AVATARS[4] },
];

export const getLang = (code: string) => LANGUAGES.find((l) => l.code === code) || LANGUAGES[0];
