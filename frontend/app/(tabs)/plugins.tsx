import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import PressableScale from '../../src/components/PressableScale';
import { theme } from '../../src/theme';
import { PLUGINS, AVATARS } from '../../src/mock';

export default function Discover() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.duration(500)} style={styles.header}>
          <Text style={styles.title}>Discover</Text>
          <Text style={styles.subtitle}>Extend LinguaLive beyond the app</Text>
        </Animated.View>

        {/* Promo hero banner — main advertisement */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.promoBanner}>
          <View style={styles.promoBlob1} />
          <View style={styles.promoBlob2} />
          <View style={styles.promoContent}>
            <View style={styles.promoTag}>
              <Ionicons name="megaphone" size={11} color="#fff" />
              <Text style={styles.promoTagText}>NEW</Text>
            </View>
            <Text style={styles.promoTitle}>Also works inside{'\n'}Meet, Zoom, Teams{'\n'}& Slack.</Text>
            <Text style={styles.promoSub}>Install once — real-time translation appears as a floating widget in every call, for every participant.</Text>

            <View style={styles.promoLogosRow}>
              {PLUGINS.map((p) => (
                <View key={p.id} style={[styles.promoLogo, { backgroundColor: p.color }]}>
                  <Ionicons name={p.icon as any} size={16} color="#fff" />
                </View>
              ))}
            </View>
          </View>
        </Animated.View>

        {/* Section: Plugins catalog */}
        <Animated.View entering={FadeInDown.delay(180).duration(500)}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Plugins</Text>
            <Text style={styles.sectionHint}>Sponsored · free while in beta</Text>
          </View>
        </Animated.View>

        {PLUGINS.map((p, i) => (
          <Animated.View key={p.id} entering={FadeInRight.delay(220 + i * 80).duration(450)}>
            <PressableScale
              style={styles.pluginAd}
              onPress={() => router.push(`/plugin/${p.id}` as any)}
              testID={`discover-plugin-${p.id}`}
              pressScale={0.98}
            >
              <View style={[styles.pluginAdIcon, { backgroundColor: p.color }]}>
                <Ionicons name={p.icon as any} size={24} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.pluginAdRow}>
                  <Text style={styles.pluginAdName}>{p.name}</Text>
                  <View style={[styles.pluginAdTag, { backgroundColor: p.color + '18' }]}>
                    <Text style={[styles.pluginAdTagText, { color: p.color }]}>{p.tag}</Text>
                  </View>
                </View>
                <Text style={styles.pluginAdDesc}>Translation overlay for {p.name.replace(' Huddles', '')} — captions in 9 languages.</Text>
                <View style={styles.pluginAdMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="download-outline" size={11} color={theme.colors.textTertiary} />
                    <Text style={styles.metaText}>{p.users}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="star" size={11} color="#F59E0B" />
                    <Text style={styles.metaText}>4.8</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="flash" size={11} color="#10B981" />
                    <Text style={styles.metaText}>42ms</Text>
                  </View>
                </View>
              </View>
              <View style={[styles.installCta, { backgroundColor: p.color }]}>
                <Text style={styles.installCtaText}>Install</Text>
              </View>
            </PressableScale>
          </Animated.View>
        ))}

        {/* Featured story ad */}
        <Animated.View entering={FadeInDown.delay(500).duration(500)} style={styles.storyCard}>
          <Image source={{ uri: AVATARS[0] }} style={styles.storyImage} />
          <View style={styles.storyOverlay}>
            <View style={styles.storyTag}>
              <Text style={styles.storyTagText}>CUSTOMER STORY</Text>
            </View>
            <Text style={styles.storyTitle}>How Acme Global closed a $2M deal in Japanese — without a translator.</Text>
            <View style={styles.storyFoot}>
              <Text style={styles.storyFootText}>Read case study</Text>
              <Ionicons name="arrow-forward" size={14} color="#fff" />
            </View>
          </View>
        </Animated.View>

        {/* Voice cloning feature ad */}
        <Animated.View entering={FadeInDown.delay(580).duration(500)}>
          <PressableScale
            style={styles.featureAd}
            onPress={() => router.push('/pricing')}
            testID="discover-voice-clone-ad"
            pressScale={0.98}
          >
            <View style={styles.featureAdLeft}>
              <View style={styles.featureAdEyebrow}>
                <Ionicons name="sparkles" size={10} color={theme.colors.brand} />
                <Text style={styles.featureAdEyebrowText}>PRO FEATURE</Text>
              </View>
              <Text style={styles.featureAdTitle}>Clone your voice in{'\n'}9 languages.</Text>
              <Text style={styles.featureAdSub}>Keep your tone, accent and emotion — even when you speak Japanese.</Text>
              <View style={styles.featureAdBtn}>
                <Text style={styles.featureAdBtnText}>Try it free</Text>
                <Ionicons name="arrow-forward" size={14} color="#fff" />
              </View>
            </View>
            <View style={styles.voiceWaveWrap}>
              {[0.3, 0.6, 1, 0.7, 0.9, 0.5, 0.8, 0.4, 1, 0.6, 0.3].map((h, j) => (
                <View key={j} style={[styles.voiceWaveBar, { height: 8 + h * 52 }]} />
              ))}
            </View>
          </PressableScale>
        </Animated.View>

        {/* Upcoming integrations */}
        <Animated.View entering={FadeInDown.delay(660).duration(500)}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Coming soon</Text>
            <Text style={styles.sectionHint}>Vote for what's next</Text>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(720).duration(500)} style={styles.comingRow}>
          {[
            { name: 'Webex', color: '#0A8A5F', icon: 'videocam' },
            { name: 'Discord', color: '#5865F2', icon: 'game-controller' },
            { name: 'WhatsApp', color: '#25D366', icon: 'logo-whatsapp' },
          ].map((c) => (
            <View key={c.name} style={styles.comingCard}>
              <View style={[styles.comingIcon, { backgroundColor: c.color + '18' }]}>
                <Ionicons name={c.icon as any} size={18} color={c.color} />
              </View>
              <Text style={styles.comingName}>{c.name}</Text>
              <Text style={styles.comingBadge}>Q2</Text>
            </View>
          ))}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.bg },
  header: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 18 },
  title: { fontSize: 32, fontWeight: '800', color: theme.colors.ink, letterSpacing: -1 },
  subtitle: { fontSize: 14, color: theme.colors.textSecondary, marginTop: 4 },

  promoBanner: { marginHorizontal: 20, borderRadius: 24, backgroundColor: '#09090B', padding: 24, overflow: 'hidden', marginBottom: 28, position: 'relative' },
  promoBlob1: { position: 'absolute', top: -60, right: -40, width: 180, height: 180, borderRadius: 90, backgroundColor: theme.colors.brand, opacity: 0.35 },
  promoBlob2: { position: 'absolute', bottom: -50, left: -30, width: 140, height: 140, borderRadius: 70, backgroundColor: '#FF3366', opacity: 0.2 },
  promoContent: { position: 'relative', zIndex: 2 },
  promoTag: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: theme.colors.brand, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 999, marginBottom: 16 },
  promoTagText: { color: '#fff', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  promoTitle: { color: '#fff', fontSize: 26, fontWeight: '800', letterSpacing: -1, lineHeight: 32 },
  promoSub: { color: 'rgba(255,255,255,0.7)', fontSize: 13, lineHeight: 20, marginTop: 10, marginBottom: 20 },
  promoLogosRow: { flexDirection: 'row', gap: 8 },
  promoLogo: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: 'rgba(255,255,255,0.1)' },

  sectionRow: { paddingHorizontal: 20, marginBottom: 12, marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: theme.colors.ink, letterSpacing: -0.4 },
  sectionHint: { fontSize: 10, color: theme.colors.textTertiary, fontWeight: '700', letterSpacing: 0.5 },

  pluginAd: { flexDirection: 'row', alignItems: 'center', gap: 14, marginHorizontal: 20, marginBottom: 10, padding: 14, backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border },
  pluginAdIcon: { width: 54, height: 54, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  pluginAdRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  pluginAdName: { fontSize: 15, fontWeight: '800', color: theme.colors.ink, letterSpacing: -0.3 },
  pluginAdTag: { paddingVertical: 2, paddingHorizontal: 7, borderRadius: 6 },
  pluginAdTagText: { fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
  pluginAdDesc: { fontSize: 12, color: theme.colors.textSecondary, marginBottom: 6, lineHeight: 16 },
  pluginAdMeta: { flexDirection: 'row', gap: 12 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  metaText: { fontSize: 11, color: theme.colors.textSecondary, fontWeight: '600' },
  installCta: { paddingVertical: 9, paddingHorizontal: 14, borderRadius: 999 },
  installCtaText: { color: '#fff', fontSize: 11, fontWeight: '800' },

  storyCard: { marginHorizontal: 20, marginTop: 24, borderRadius: 20, overflow: 'hidden', height: 220, position: 'relative' },
  storyImage: { width: '100%', height: '100%' },
  storyOverlay: { position: 'absolute', left: 0, right: 0, bottom: 0, padding: 20, backgroundColor: 'rgba(9,9,11,0.78)' },
  storyTag: { alignSelf: 'flex-start', backgroundColor: theme.colors.brand, paddingVertical: 3, paddingHorizontal: 8, borderRadius: 6, marginBottom: 10 },
  storyTagText: { color: '#fff', fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  storyTitle: { color: '#fff', fontSize: 16, fontWeight: '700', lineHeight: 22, letterSpacing: -0.3 },
  storyFoot: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12 },
  storyFootText: { color: '#fff', fontSize: 12, fontWeight: '700' },

  featureAd: { marginHorizontal: 20, marginTop: 20, marginBottom: 10, borderRadius: 20, backgroundColor: theme.colors.brand, padding: 20, flexDirection: 'row', alignItems: 'center', overflow: 'hidden' },
  featureAdLeft: { flex: 1 },
  featureAdEyebrow: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,255,255,0.18)', alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 999, marginBottom: 12 },
  featureAdEyebrowText: { color: '#fff', fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  featureAdTitle: { color: '#fff', fontSize: 22, fontWeight: '800', letterSpacing: -0.6, lineHeight: 28 },
  featureAdSub: { color: 'rgba(255,255,255,0.85)', fontSize: 12, lineHeight: 17, marginTop: 8, marginBottom: 14 },
  featureAdBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, alignSelf: 'flex-start', backgroundColor: theme.colors.ink, paddingVertical: 8, paddingHorizontal: 14, borderRadius: 999 },
  featureAdBtnText: { color: '#fff', fontSize: 11, fontWeight: '800' },
  voiceWaveWrap: { marginLeft: 14, flexDirection: 'row', alignItems: 'center', gap: 3, height: 64 },
  voiceWaveBar: { width: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.75)' },

  comingRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginTop: 4 },
  comingCard: { flex: 1, backgroundColor: '#fff', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: theme.colors.border, alignItems: 'center' },
  comingIcon: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  comingName: { fontSize: 12, fontWeight: '800', color: theme.colors.ink },
  comingBadge: { fontSize: 9, color: theme.colors.textTertiary, fontWeight: '700', letterSpacing: 0.8, marginTop: 3 },
});
