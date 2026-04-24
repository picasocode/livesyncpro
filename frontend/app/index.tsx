import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeIn, FadeInUp } from 'react-native-reanimated';
import PressableScale from '../src/components/PressableScale';
import { theme } from '../src/theme';
import { HERO, AVATARS } from '../src/mock';

const { width } = Dimensions.get('window');

export default function Onboarding() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <Animated.Image
        entering={FadeIn.duration(900)}
        source={{ uri: HERO }}
        style={styles.hero}
      />
      <LinearGradient
        colors={['rgba(249,250,251,0)', 'rgba(249,250,251,0.65)', '#F9FAFB']}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <Animated.View entering={FadeInDown.delay(150).duration(600)} style={styles.topRow}>
          <View style={styles.logoWrap}>
            <View style={styles.logoDot} />
            <Text style={styles.logoText}>Lingua<Text style={{ color: theme.colors.brand }}>Live</Text></Text>
          </View>
          <View style={styles.liveBadge} testID="onboarding-live-badge">
            <View style={styles.liveDot} />
            <Text style={styles.liveBadgeText}>LIVE AI · 42ms</Text>
          </View>
        </Animated.View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }} />

          <Animated.View
            entering={FadeInUp.delay(350).duration(700).springify().damping(14)}
            style={styles.glass}
          >
            <Text style={styles.eyebrow}>TRANSLATED CALLS · MEETINGS · TALKS</Text>
            <Text style={styles.headline}>
              Talk to anyone,{'\n'}in any{' '}
              <Text style={{ color: theme.colors.brand }}>language.</Text>
            </Text>
            <Text style={styles.subhead}>
              One-on-one calls, group meetings and live talks — all translated in real time. Your voice, their language.
            </Text>

            <View style={styles.featureRow}>
              {[
                { icon: 'call', label: 'Calls' },
                { icon: 'people', label: 'Meetings' },
                { icon: 'radio', label: 'Talks' },
              ].map((f, i) => (
                <Animated.View
                  key={f.label}
                  entering={FadeInDown.delay(550 + i * 100).duration(500)}
                  style={styles.featurePill}
                >
                  <Ionicons name={f.icon as any} size={13} color={theme.colors.brand} />
                  <Text style={styles.featurePillText}>{f.label}</Text>
                </Animated.View>
              ))}
            </View>

            <View style={styles.avatarStackRow}>
              <View style={styles.avatars}>
                {AVATARS.slice(0, 4).map((a, i) => (
                  <Image key={i} source={{ uri: a }} style={[styles.avatar, { marginLeft: i === 0 ? 0 : -14 }]} />
                ))}
              </View>
              <Text style={styles.socialText}>Trusted by 12,000+ global teams</Text>
            </View>

            <PressableScale
              style={styles.primaryBtn}
              onPress={() => router.replace('/(tabs)/home')}
              haptic="medium"
              testID="onboarding-get-started-btn"
            >
              <Text style={styles.primaryBtnText}>Get Started</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </PressableScale>

            <PressableScale
              style={styles.secondaryBtn}
              onPress={() => router.push('/pricing')}
              testID="onboarding-view-pricing-btn"
              pressScale={0.97}
            >
              <Text style={styles.secondaryBtnText}>See plans & pricing</Text>
            </PressableScale>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.bg },
  hero: { position: 'absolute', top: 0, left: 0, right: 0, width, height: width * 1.3 },
  safe: { flex: 1 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 8 },
  logoWrap: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: theme.colors.brand },
  logoText: { fontSize: 18, fontWeight: '800', color: theme.colors.ink, letterSpacing: -0.3 },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#09090B', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: theme.colors.live },
  liveBadgeText: { color: '#fff', fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  content: { flexGrow: 1, paddingHorizontal: 20, paddingBottom: 24 },
  glass: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: theme.colors.border,
    boxShadow: '0px 12px 24px rgba(0,0,0,0.12)',
    elevation: 8,
  },
  eyebrow: { fontSize: 11, fontWeight: '800', color: theme.colors.brand, letterSpacing: 1.4, marginBottom: 12 },
  headline: { fontSize: 36, lineHeight: 42, fontWeight: '800', color: theme.colors.ink, letterSpacing: -1.2, marginBottom: 12 },
  subhead: { fontSize: 15, lineHeight: 22, color: theme.colors.textSecondary, marginBottom: 16 },
  featureRow: { flexDirection: 'row', gap: 8, marginBottom: 18 },
  featurePill: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: theme.colors.brandSoft, paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999 },
  featurePillText: { fontSize: 12, fontWeight: '700', color: theme.colors.brand },
  avatarStackRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 12 },
  avatars: { flexDirection: 'row' },
  avatar: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: '#fff' },
  socialText: { fontSize: 12, color: theme.colors.textSecondary, fontWeight: '500', flex: 1 },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: theme.colors.brand, paddingVertical: 16, borderRadius: 14, marginBottom: 6 },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  secondaryBtn: { alignItems: 'center', paddingVertical: 12 },
  secondaryBtnText: { color: theme.colors.ink, fontSize: 14, fontWeight: '600', textDecorationLine: 'underline' },
});
