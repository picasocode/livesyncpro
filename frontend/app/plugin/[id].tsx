import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { theme } from '../../src/theme';
import { PLUGINS, AVATARS, LIVE_TRANSCRIPT, getLang } from '../../src/mock';

const { width } = Dimensions.get('window');

export default function PluginPreview() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const plugin = PLUGINS.find((p) => p.id === id) || PLUGINS[0];
  const caption = LIVE_TRANSCRIPT[1];
  const spk = getLang(caption.lang);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} testID="plugin-back-btn">
          <Ionicons name="close" size={22} color={theme.colors.ink} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerEyebrow}>PLUGIN OVERLAY PREVIEW</Text>
          <Text style={styles.headerTitle}>{plugin.name}</Text>
        </View>
        <TouchableOpacity style={[styles.installBtn, { backgroundColor: plugin.color }]} testID="plugin-install-btn">
          <Text style={styles.installBtnText}>Install</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Device mock */}
        <View style={styles.phoneWrap}>
          <View style={styles.phone}>
            {/* Platform-specific header */}
            <View style={[styles.pfHeader, { backgroundColor: plugin.color }]}>
              <Ionicons name={plugin.icon as any} size={14} color="#fff" />
              <Text style={styles.pfHeaderTitle}>{plugin.name}</Text>
              <View style={styles.pfRecDot} />
              <Text style={styles.pfRecText}>REC</Text>
            </View>

            {/* Video grid */}
            <View style={styles.grid}>
              {AVATARS.slice(0, 4).map((a, i) => (
                <View key={i} style={styles.tile}>
                  <Image source={{ uri: a }} style={styles.tileImg} />
                  <View style={styles.tileName}>
                    <View style={[styles.micIcon, i === 1 && { backgroundColor: theme.colors.success }]}>
                      <Ionicons name={i === 1 ? 'mic' : 'mic-off'} size={9} color="#fff" />
                    </View>
                    <Text style={styles.tileNameText}>{['Sofia', 'Kenji', 'Amélie', 'Rahul'][i]}</Text>
                  </View>
                  {i === 1 && <View style={[styles.speakingRing, { borderColor: plugin.color }]} />}
                </View>
              ))}
            </View>

            {/* Floating translation widget */}
            <View style={styles.widget}>
              <View style={styles.widgetHeader}>
                <View style={styles.widgetBrand}>
                  <View style={styles.widgetLogo} />
                  <Text style={styles.widgetBrandText}>LinguaLive</Text>
                </View>
                <View style={styles.widgetLive}>
                  <View style={styles.liveDot} />
                  <Text style={styles.widgetLiveText}>LIVE · 42ms</Text>
                </View>
              </View>

              <View style={styles.widgetSpeaker}>
                <Image source={{ uri: AVATARS[1] }} style={styles.widgetAvatar} />
                <Text style={styles.widgetSpeakerName}>{caption.speaker}</Text>
                <View style={styles.widgetLangPill}>
                  <Text style={{ fontSize: 10 }}>{spk.flag}</Text>
                  <Text style={styles.widgetLangText}>{spk.native}</Text>
                </View>
              </View>

              <Text style={styles.widgetOrig} numberOfLines={1}>{caption.original}</Text>
              <Text style={styles.widgetTrans}>{caption.translated}</Text>

              <View style={styles.widgetActions}>
                <View style={styles.widgetAction}>
                  <Ionicons name="swap-vertical" size={12} color={theme.colors.textSecondary} />
                  <Text style={styles.widgetActionText}>EN</Text>
                </View>
                <View style={styles.widgetAction}>
                  <Ionicons name="volume-high-outline" size={12} color={theme.colors.textSecondary} />
                </View>
                <View style={styles.widgetAction}>
                  <MaterialCommunityIcons name="dots-horizontal" size={12} color={theme.colors.textSecondary} />
                </View>
              </View>
            </View>

            {/* Platform footer */}
            <View style={[styles.pfFoot, { backgroundColor: plugin.color }]}>
              {['mic-off', 'videocam-off', 'hand-left', 'chatbubble', 'call'].map((ic, i) => (
                <View key={ic} style={[styles.pfFootBtn, i === 4 && { backgroundColor: theme.colors.live }]}>
                  <Ionicons name={ic as any} size={14} color="#fff" />
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Feature bullets */}
        <View style={styles.featureBlock}>
          <Text style={styles.featureTitle}>How it works inside {plugin.name}</Text>
          {[
            { icon: 'apps', title: 'One-click install', desc: `Add LinguaLive from the ${plugin.name} app marketplace.` },
            { icon: 'layers-outline', title: 'Floating overlay', desc: 'Non-blocking widget lets everyone read captions in their own language.' },
            { icon: 'shield-checkmark', title: 'Works with E2EE', desc: 'Audio stays inside the meeting. We never record.' },
            { icon: 'cloud-download-outline', title: 'Auto-saves transcripts', desc: 'Open in the mobile app anytime, translated in 9 languages.' },
          ].map((f) => (
            <View key={f.title} style={styles.feature}>
              <View style={[styles.featIcon, { backgroundColor: plugin.color + '18' }]}>
                <Ionicons name={f.icon as any} size={18} color={plugin.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.featTitle}>{f.title}</Text>
                <Text style={styles.featDesc}>{f.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.bigInstall, { backgroundColor: plugin.color }]}
          onPress={() => router.back()}
          testID="plugin-bigInstall-btn"
        >
          <Ionicons name={plugin.icon as any} size={20} color="#fff" />
          <Text style={styles.bigInstallText}>Add to {plugin.name}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const PH_W = width - 40;
const PH_H = PH_W * 1.6;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.bg },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 14, gap: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: theme.colors.border },
  headerEyebrow: { fontSize: 10, fontWeight: '800', color: theme.colors.textTertiary, letterSpacing: 1.2 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: theme.colors.ink, letterSpacing: -0.3, marginTop: 2 },
  installBtn: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 999 },
  installBtnText: { color: '#fff', fontSize: 12, fontWeight: '800' },

  phoneWrap: { alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10 },
  phone: { width: PH_W, height: PH_H, backgroundColor: '#0D0D0F', borderRadius: 28, overflow: 'hidden', borderWidth: 2, borderColor: '#1C1C1E', position: 'relative' },

  pfHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14, paddingVertical: 12 },
  pfHeaderTitle: { color: '#fff', fontSize: 13, fontWeight: '700', flex: 1 },
  pfRecDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: theme.colors.live },
  pfRecText: { color: '#fff', fontSize: 9, fontWeight: '800', letterSpacing: 0.8 },

  grid: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', padding: 6, gap: 6 },
  tile: { width: (PH_W - 24) / 2 - 3, aspectRatio: 1, borderRadius: 10, overflow: 'hidden', position: 'relative' },
  tileImg: { width: '100%', height: '100%' },
  tileName: { position: 'absolute', bottom: 6, left: 6, flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(0,0,0,0.55)', paddingVertical: 3, paddingHorizontal: 6, borderRadius: 6 },
  micIcon: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#555', alignItems: 'center', justifyContent: 'center' },
  tileNameText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  speakingRing: { ...StyleSheet.absoluteFillObject, borderRadius: 10, borderWidth: 2.5 },

  widget: { position: 'absolute', left: 14, right: 14, bottom: 72, backgroundColor: 'rgba(255,255,255,0.97)', borderRadius: 16, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 20, elevation: 10 },
  widgetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  widgetBrand: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  widgetLogo: { width: 8, height: 8, borderRadius: 4, backgroundColor: theme.colors.brand },
  widgetBrandText: { fontSize: 11, fontWeight: '800', color: theme.colors.ink, letterSpacing: -0.2 },
  widgetLive: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: theme.colors.brandSoft, paddingVertical: 3, paddingHorizontal: 7, borderRadius: 999 },
  liveDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: theme.colors.brand },
  widgetLiveText: { fontSize: 9, fontWeight: '800', color: theme.colors.brand, letterSpacing: 0.8 },

  widgetSpeaker: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  widgetAvatar: { width: 18, height: 18, borderRadius: 9 },
  widgetSpeakerName: { fontSize: 11, fontWeight: '700', color: theme.colors.ink, flex: 1 },
  widgetLangPill: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: theme.colors.bg, paddingVertical: 2, paddingHorizontal: 6, borderRadius: 999 },
  widgetLangText: { fontSize: 9, fontWeight: '700', color: theme.colors.ink },

  widgetOrig: { fontSize: 11, color: theme.colors.textSecondary, fontStyle: 'italic', marginBottom: 4 },
  widgetTrans: { fontSize: 14, fontWeight: '700', color: theme.colors.ink, lineHeight: 20, letterSpacing: -0.2 },
  widgetActions: { flexDirection: 'row', gap: 8, marginTop: 12, paddingTop: 10, borderTopWidth: 1, borderTopColor: theme.colors.border },
  widgetAction: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: theme.colors.bg, paddingVertical: 5, paddingHorizontal: 8, borderRadius: 6 },
  widgetActionText: { fontSize: 9, fontWeight: '800', color: theme.colors.ink },

  pfFoot: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', paddingVertical: 14 },
  pfFootBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' },

  featureBlock: { marginHorizontal: 20, marginTop: 20, padding: 20, backgroundColor: '#fff', borderRadius: 20, borderWidth: 1, borderColor: theme.colors.border, gap: 14 },
  featureTitle: { fontSize: 16, fontWeight: '800', color: theme.colors.ink, letterSpacing: -0.3, marginBottom: 2 },
  feature: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  featIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  featTitle: { fontSize: 13, fontWeight: '700', color: theme.colors.ink, marginBottom: 2 },
  featDesc: { fontSize: 12, color: theme.colors.textSecondary, lineHeight: 17 },

  bigInstall: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginHorizontal: 20, marginTop: 20, paddingVertical: 16, borderRadius: 14 },
  bigInstallText: { color: '#fff', fontSize: 15, fontWeight: '800' },
});
