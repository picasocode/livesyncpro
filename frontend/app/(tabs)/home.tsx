import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme, shadows } from '../../src/theme';
import { PLUGINS, MEETINGS, AVATARS, getLang } from '../../src/mock';

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greet}>Good morning,</Text>
            <Text style={styles.name}>Alex ✳︎</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn} testID="home-profile-btn">
            <Image source={{ uri: AVATARS[5] }} style={styles.profileImg} />
          </TouchableOpacity>
        </View>

        {/* Hero start card */}
        <View style={styles.heroCard}>
          <View style={styles.heroRow}>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveBadgeText}>READY</Text>
            </View>
            <Text style={styles.heroLatency}>42ms latency</Text>
          </View>
          <Text style={styles.heroTitle}>Start a live{'\n'}translated meeting</Text>
          <Text style={styles.heroSub}>9 languages · realtime captions · on-device privacy</Text>

          <TouchableOpacity
            style={styles.ctaPrimary}
            activeOpacity={0.85}
            onPress={() => router.push('/live')}
            testID="home-start-live-btn"
          >
            <Ionicons name="radio" size={18} color="#fff" />
            <Text style={styles.ctaPrimaryText}>Start Live Translation</Text>
          </TouchableOpacity>

          <View style={styles.quickRow}>
            <TouchableOpacity style={styles.quickBtn} testID="home-join-btn">
              <Ionicons name="enter-outline" size={18} color={theme.colors.ink} />
              <Text style={styles.quickText}>Join</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickBtn} testID="home-schedule-btn">
              <Ionicons name="calendar-outline" size={18} color={theme.colors.ink} />
              <Text style={styles.quickText}>Schedule</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickBtn} testID="home-invite-btn">
              <Ionicons name="person-add-outline" size={18} color={theme.colors.ink} />
              <Text style={styles.quickText}>Invite</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Plugins */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Install plugins</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/plugins')} testID="home-all-plugins-btn">
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}>
          {PLUGINS.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={[styles.pluginCard, { backgroundColor: p.color }]}
              activeOpacity={0.9}
              onPress={() => router.push(`/plugin/${p.id}` as any)}
              testID={`home-plugin-${p.id}-btn`}
            >
              <View style={styles.pluginIconBg}>
                <Ionicons name={p.icon as any} size={22} color="#fff" />
              </View>
              <Text style={styles.pluginCardTag}>{p.tag}</Text>
              <Text style={styles.pluginCardName}>{p.name}</Text>
              <View style={styles.pluginCardFoot}>
                <Text style={styles.pluginCardUsers}>{p.users} installs</Text>
                <Ionicons name="arrow-forward" size={16} color="#fff" />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Recent */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent meetings</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/history')} testID="home-all-history-btn">
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {MEETINGS.slice(0, 3).map((m) => {
          const from = getLang(m.from);
          const to = getLang(m.to);
          return (
            <TouchableOpacity
              key={m.id}
              style={styles.meetingCard}
              onPress={() => router.push(`/transcript/${m.id}` as any)}
              testID={`home-meeting-${m.id}-btn`}
              activeOpacity={0.85}
            >
              <View style={styles.meetingTop}>
                <View style={styles.langPill}>
                  <Text style={styles.langFlag}>{from.flag}</Text>
                  <Ionicons name="arrow-forward" size={12} color={theme.colors.textSecondary} />
                  <Text style={styles.langFlag}>{to.flag}</Text>
                </View>
                <Text style={styles.meetingDate}>{m.date}</Text>
              </View>
              <Text style={styles.meetingTitle} numberOfLines={1}>{m.title}</Text>
              <Text style={styles.meetingPreview} numberOfLines={1}>"{m.translatedPreview}"</Text>
              <View style={styles.meetingFoot}>
                <View style={styles.metaRow}>
                  <Ionicons name="people-outline" size={13} color={theme.colors.textTertiary} />
                  <Text style={styles.metaText}>{m.participants}</Text>
                </View>
                <View style={styles.metaRow}>
                  <Ionicons name="time-outline" size={13} color={theme.colors.textTertiary} />
                  <Text style={styles.metaText}>{m.duration}</Text>
                </View>
                <View style={[styles.platformDot, { backgroundColor: PLUGINS.find((p) => p.id === m.platform)?.color }]} />
                <Text style={styles.metaText}>{PLUGINS.find((p) => p.id === m.platform)?.name}</Text>
              </View>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity style={styles.upgradeBanner} onPress={() => router.push('/pricing')} testID="home-upgrade-banner">
          <View style={{ flex: 1 }}>
            <Text style={styles.upgradeTitle}>Unlock Pro · unlimited minutes</Text>
            <Text style={styles.upgradeSub}>Clone your voice in 9 languages</Text>
          </View>
          <View style={styles.upgradeArrow}>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.bg },
  content: { paddingBottom: 32 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 8, paddingBottom: 20 },
  greet: { fontSize: 14, color: theme.colors.textSecondary, fontWeight: '500' },
  name: { fontSize: 26, fontWeight: '800', color: theme.colors.ink, letterSpacing: -0.8, marginTop: 2 },
  profileBtn: { width: 44, height: 44, borderRadius: 22, overflow: 'hidden', borderWidth: 2, borderColor: '#fff', ...shadows.soft },
  profileImg: { width: '100%', height: '100%' },

  heroCard: { marginHorizontal: 20, backgroundColor: theme.colors.ink, borderRadius: 24, padding: 24, marginBottom: 28 },
  heroRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.1)', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 999 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: theme.colors.success },
  liveBadgeText: { color: '#fff', fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  heroLatency: { color: theme.colors.textTertiary, fontSize: 11, fontWeight: '600' },
  heroTitle: { color: '#fff', fontSize: 30, fontWeight: '800', letterSpacing: -1, lineHeight: 36, marginBottom: 8 },
  heroSub: { color: '#A1A1AA', fontSize: 13, marginBottom: 20 },
  ctaPrimary: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: theme.colors.brand, paddingVertical: 14, borderRadius: 12, marginBottom: 12 },
  ctaPrimaryText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  quickRow: { flexDirection: 'row', gap: 8 },
  quickBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.08)', paddingVertical: 12, borderRadius: 10 },
  quickText: { color: '#fff', fontSize: 13, fontWeight: '600' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 12, marginTop: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: theme.colors.ink, letterSpacing: -0.4 },
  seeAll: { fontSize: 13, fontWeight: '600', color: theme.colors.brand },

  pluginCard: { width: 180, height: 170, borderRadius: 18, padding: 16, justifyContent: 'space-between', marginBottom: 24 },
  pluginIconBg: { width: 40, height: 40, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' },
  pluginCardTag: { color: 'rgba(255,255,255,0.85)', fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  pluginCardName: { color: '#fff', fontSize: 18, fontWeight: '800', letterSpacing: -0.3 },
  pluginCardFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  pluginCardUsers: { color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: '600' },

  meetingCard: { marginHorizontal: 20, marginBottom: 12, backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: theme.colors.border },
  meetingTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  langPill: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: theme.colors.bg, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 999 },
  langFlag: { fontSize: 14 },
  meetingDate: { fontSize: 11, color: theme.colors.textTertiary, fontWeight: '600' },
  meetingTitle: { fontSize: 15, fontWeight: '700', color: theme.colors.ink, marginBottom: 4 },
  meetingPreview: { fontSize: 13, color: theme.colors.textSecondary, fontStyle: 'italic', marginBottom: 10 },
  meetingFoot: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 11, color: theme.colors.textSecondary, fontWeight: '500' },
  platformDot: { width: 6, height: 6, borderRadius: 3, marginLeft: 4 },

  upgradeBanner: { marginHorizontal: 20, marginTop: 16, flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.brand, borderRadius: 16, padding: 18 },
  upgradeTitle: { color: '#fff', fontSize: 15, fontWeight: '800', marginBottom: 2 },
  upgradeSub: { color: 'rgba(255,255,255,0.85)', fontSize: 12 },
  upgradeArrow: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
});
