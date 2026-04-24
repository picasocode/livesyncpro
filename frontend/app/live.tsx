import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing, withSequence } from 'react-native-reanimated';
import { theme } from '../src/theme';
import { LIVE_TRANSCRIPT, AVATARS, LANGUAGES, getLang } from '../src/mock';

function Bar({ delay, height }: { delay: number; height: number }) {
  const h = useSharedValue(height * 0.3);
  useEffect(() => {
    h.value = withRepeat(
      withSequence(
        withTiming(height, { duration: 400 + delay, easing: Easing.inOut(Easing.quad) }),
        withTiming(height * 0.2, { duration: 400 + delay, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      true,
    );
  }, [h, delay, height]);
  const style = useAnimatedStyle(() => ({ height: h.value }));
  return <Animated.View style={[styles.bar, style]} />;
}

export default function Live() {
  const router = useRouter();
  const [muted, setMuted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [targetLang, setTargetLang] = useState('en');

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % LIVE_TRANSCRIPT.length), 3500);
    return () => clearInterval(t);
  }, []);

  const current = LIVE_TRANSCRIPT[idx];
  const fromLang = getLang(current.lang);
  const toLang = getLang(targetLang);
  const speakerAvatar = AVATARS[idx % AVATARS.length];

  return (
    <View style={styles.root}>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()} testID="live-close-btn">
            <Ionicons name="chevron-down" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.topInfo}>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
            <Text style={styles.meetingName}>Tokyo Team Sync · 00:{String(12 + idx).padStart(2, '0')}:42</Text>
          </View>
          <TouchableOpacity style={styles.closeBtn} testID="live-menu-btn">
            <Ionicons name="ellipsis-horizontal" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Participants */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.participantRow}>
          {AVATARS.slice(0, 5).map((a, i) => (
            <View key={i} style={[styles.participant, i === idx % 5 && styles.participantActive]}>
              <Image source={{ uri: a }} style={styles.participantImg} />
              {i === idx % 5 && <View style={styles.speakingDot} />}
            </View>
          ))}
          <View style={styles.participantMore}>
            <Text style={styles.participantMoreText}>+3</Text>
          </View>
        </ScrollView>

        {/* Live caption stage */}
        <ScrollView contentContainerStyle={styles.stage} showsVerticalScrollIndicator={false}>
          <View style={styles.speakerPill}>
            <Image source={{ uri: speakerAvatar }} style={styles.speakerAvatar} />
            <Text style={styles.speakerName}>{current.speaker}</Text>
            <View style={styles.speakerLang}>
              <Text style={styles.speakerLangFlag}>{fromLang.flag}</Text>
              <Text style={styles.speakerLangText}>{fromLang.native}</Text>
            </View>
          </View>

          <Text style={styles.originalLabel}>ORIGINAL · {fromLang.name.toUpperCase()}</Text>
          <Text style={styles.originalText}>{current.original}</Text>

          <View style={styles.arrowWrap}>
            <View style={styles.arrowLine} />
            <View style={styles.arrowIcon}>
              <Ionicons name="arrow-down" size={14} color={theme.colors.brand} />
            </View>
            <View style={styles.arrowLine} />
          </View>

          <Text style={styles.translatedLabel}>TRANSLATED · {toLang.name.toUpperCase()}</Text>
          <Text style={styles.translatedText}>{current.translated}</Text>

          <Text style={styles.confidence}>98% confidence · AI voice-matched</Text>
        </ScrollView>

        {/* Language pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.langPills}>
          <Text style={styles.langPillsLabel}>TRANSLATE TO</Text>
          {LANGUAGES.map((l) => (
            <TouchableOpacity
              key={l.code}
              style={[styles.langPill, targetLang === l.code && styles.langPillActive]}
              onPress={() => setTargetLang(l.code)}
              testID={`live-lang-${l.code}`}
            >
              <Text style={styles.langPillFlag}>{l.flag}</Text>
              <Text style={[styles.langPillText, targetLang === l.code && styles.langPillTextActive]}>{l.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Waveform + controls */}
        <View style={styles.bottom}>
          <View style={styles.waveform}>
            {[16, 28, 42, 24, 56, 38, 62, 30, 50, 20, 40, 28, 18, 36, 52, 24, 40, 30].map((h, i) => (
              <Bar key={i} delay={i * 40} height={h} />
            ))}
          </View>

          <View style={styles.controls}>
            <TouchableOpacity style={styles.secondaryCtrl} testID="live-captions-btn">
              <Ionicons name="closed-captioning" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.micBtn, muted && styles.micBtnMuted]}
              onPress={() => setMuted(!muted)}
              activeOpacity={0.85}
              testID="live-mic-btn"
            >
              <Ionicons name={muted ? 'mic-off' : 'mic'} size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.endBtn} onPress={() => router.back()} testID="live-end-btn">
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryCtrl} testID="live-share-btn">
              <Ionicons name="share-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#09090B' },
  topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, gap: 12 },
  closeBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  topInfo: { flex: 1, alignItems: 'center' },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(255,51,102,0.15)', paddingVertical: 3, paddingHorizontal: 8, borderRadius: 999, marginBottom: 2 },
  liveDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: theme.colors.live },
  liveText: { color: theme.colors.live, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  meetingName: { color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: '600' },

  participantRow: { paddingHorizontal: 16, gap: 10, paddingVertical: 8 },
  participant: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: 'transparent', position: 'relative' },
  participantActive: { borderColor: theme.colors.success },
  participantImg: { width: '100%', height: '100%', borderRadius: 22 },
  speakingDot: { position: 'absolute', bottom: -2, right: -2, width: 12, height: 12, borderRadius: 6, backgroundColor: theme.colors.success, borderWidth: 2, borderColor: '#09090B' },
  participantMore: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  participantMoreText: { color: '#fff', fontSize: 12, fontWeight: '700' },

  stage: { paddingHorizontal: 28, paddingTop: 16, paddingBottom: 16 },
  speakerPill: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.06)', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999, marginBottom: 20 },
  speakerAvatar: { width: 22, height: 22, borderRadius: 11 },
  speakerName: { color: '#fff', fontSize: 12, fontWeight: '700' },
  speakerLang: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,255,255,0.08)', paddingVertical: 2, paddingHorizontal: 6, borderRadius: 999 },
  speakerLangFlag: { fontSize: 11 },
  speakerLangText: { color: 'rgba(255,255,255,0.85)', fontSize: 10, fontWeight: '600' },

  originalLabel: { color: theme.colors.textTertiary, fontSize: 10, fontWeight: '800', letterSpacing: 1.4, marginBottom: 8 },
  originalText: { color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 26, fontWeight: '500' },
  arrowWrap: { flexDirection: 'row', alignItems: 'center', marginVertical: 18, gap: 10 },
  arrowLine: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.1)' },
  arrowIcon: { width: 28, height: 28, borderRadius: 14, backgroundColor: theme.colors.brandSoft, alignItems: 'center', justifyContent: 'center' },
  translatedLabel: { color: theme.colors.brand, fontSize: 10, fontWeight: '800', letterSpacing: 1.4, marginBottom: 8 },
  translatedText: { color: '#fff', fontSize: 28, lineHeight: 36, fontWeight: '700', letterSpacing: -0.5 },
  confidence: { color: theme.colors.textTertiary, fontSize: 11, marginTop: 16, fontWeight: '500' },

  langPills: { paddingHorizontal: 16, gap: 8, paddingVertical: 10, alignItems: 'center' },
  langPillsLabel: { color: theme.colors.textTertiary, fontSize: 9, fontWeight: '800', letterSpacing: 1.4, marginRight: 4 },
  langPill: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 7, paddingHorizontal: 12, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  langPillActive: { backgroundColor: theme.colors.brand, borderColor: theme.colors.brand },
  langPillFlag: { fontSize: 13 },
  langPillText: { color: 'rgba(255,255,255,0.85)', fontSize: 12, fontWeight: '600' },
  langPillTextActive: { color: '#fff' },

  bottom: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 4 },
  waveform: { height: 64, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, paddingHorizontal: 6 },
  bar: { width: 3, borderRadius: 2, backgroundColor: theme.colors.brand },

  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  secondaryCtrl: { width: 52, height: 52, borderRadius: 26, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  micBtn: { width: 72, height: 72, borderRadius: 36, backgroundColor: theme.colors.brand, alignItems: 'center', justifyContent: 'center' },
  micBtnMuted: { backgroundColor: 'rgba(255,255,255,0.1)' },
  endBtn: { width: 62, height: 52, borderRadius: 26, backgroundColor: theme.colors.live, alignItems: 'center', justifyContent: 'center' },
});
