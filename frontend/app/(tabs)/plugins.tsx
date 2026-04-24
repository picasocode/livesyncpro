import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme, shadows } from '../../src/theme';
import { PLUGINS } from '../../src/mock';

export default function Plugins() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Plugins</Text>
          <Text style={styles.subtitle}>Add LinguaLive to your favorite meeting tool — one click install, zero config.</Text>
        </View>

        <View style={styles.grid}>
          {PLUGINS.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={[styles.card, { backgroundColor: p.color }]}
              activeOpacity={0.9}
              onPress={() => router.push(`/plugin/${p.id}` as any)}
              testID={`plugins-card-${p.id}`}
            >
              <View style={styles.cardTop}>
                <View style={styles.iconWrap}>
                  <Ionicons name={p.icon as any} size={26} color="#fff" />
                </View>
                <View style={styles.installedBadge}>
                  <Ionicons name="checkmark" size={12} color="#fff" />
                  <Text style={styles.installedText}>Ready</Text>
                </View>
              </View>
              <Text style={styles.tag}>{p.tag.toUpperCase()}</Text>
              <Text style={styles.name}>{p.name}</Text>
              <Text style={styles.installs}>{p.users} installs</Text>
              <View style={styles.cta}>
                <Text style={styles.ctaText}>View overlay</Text>
                <Ionicons name="arrow-forward" size={14} color="#fff" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Ionicons name="shield-checkmark" size={22} color={theme.colors.brand} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>On-device processing</Text>
            <Text style={styles.infoDesc}>Audio never leaves the device by default. Enterprise-grade encryption for cloud mode.</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoIcon}>
            <Ionicons name="flash" size={22} color={theme.colors.brand} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>42ms avg latency</Text>
            <Text style={styles.infoDesc}>Lower than most native caption systems. Works even on 4G.</Text>
          </View>
        </View>

        <View style={styles.requestCard}>
          <Text style={styles.requestEyebrow}>DON'T SEE YOUR TOOL?</Text>
          <Text style={styles.requestTitle}>Request a new integration</Text>
          <Text style={styles.requestDesc}>Webex, Discord, Google Chat — tell us what you use.</Text>
          <TouchableOpacity style={styles.requestBtn} testID="plugins-request-btn">
            <Text style={styles.requestBtnText}>Request plugin</Text>
            <Ionicons name="arrow-forward" size={16} color={theme.colors.ink} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.bg },
  header: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 20 },
  title: { fontSize: 32, fontWeight: '800', color: theme.colors.ink, letterSpacing: -1 },
  subtitle: { fontSize: 14, color: theme.colors.textSecondary, marginTop: 6, lineHeight: 20 },

  grid: { paddingHorizontal: 20, flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 28 },
  card: { width: '48%', aspectRatio: 0.85, borderRadius: 20, padding: 16, justifyContent: 'space-between', ...shadows.soft },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  iconWrap: { width: 48, height: 48, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' },
  installedBadge: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: 'rgba(255,255,255,0.22)', paddingVertical: 4, paddingHorizontal: 7, borderRadius: 999 },
  installedText: { color: '#fff', fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
  tag: { color: 'rgba(255,255,255,0.82)', fontSize: 9, fontWeight: '800', letterSpacing: 1.2 },
  name: { color: '#fff', fontSize: 18, fontWeight: '800', letterSpacing: -0.3, marginTop: 2 },
  installs: { color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: '600', marginTop: 4 },
  cta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 },
  ctaText: { color: '#fff', fontSize: 12, fontWeight: '700' },

  infoCard: { marginHorizontal: 20, marginBottom: 10, backgroundColor: '#fff', borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14, borderWidth: 1, borderColor: theme.colors.border },
  infoIcon: { width: 44, height: 44, borderRadius: 10, backgroundColor: theme.colors.brandSoft, alignItems: 'center', justifyContent: 'center' },
  infoTitle: { fontSize: 14, fontWeight: '700', color: theme.colors.ink, marginBottom: 2 },
  infoDesc: { fontSize: 12, color: theme.colors.textSecondary, lineHeight: 16 },

  requestCard: { marginHorizontal: 20, marginTop: 18, backgroundColor: theme.colors.ink, borderRadius: 20, padding: 22 },
  requestEyebrow: { color: theme.colors.textTertiary, fontSize: 10, fontWeight: '800', letterSpacing: 1.4, marginBottom: 8 },
  requestTitle: { color: '#fff', fontSize: 22, fontWeight: '800', letterSpacing: -0.5, marginBottom: 6 },
  requestDesc: { color: '#A1A1AA', fontSize: 13, lineHeight: 19, marginBottom: 16 },
  requestBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: '#fff', paddingVertical: 13, borderRadius: 10 },
  requestBtnText: { color: theme.colors.ink, fontSize: 14, fontWeight: '700' },
});
