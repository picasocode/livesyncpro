import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSpring,
  Easing,
  withSequence,
  FadeIn,
  FadeOut,
  FadeInDown,
  FadeInUp,
  SlideInDown,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import PressableScale from '../src/components/PressableScale';
import { theme } from '../src/theme';
import { LIVE_TRANSCRIPT, AVATARS, LANGUAGES, getLang, getContact, CONTACTS } from '../src/mock';

const { width } = Dimensions.get('window');

function Bar({ delay, peak }: { delay: number; peak: number }) {
  const h = useSharedValue(peak * 0.25);
  useEffect(() => {
    h.value = withRepeat(
      withSequence(
        withTiming(peak, { duration: 380 + delay, easing: Easing.inOut(Easing.quad) }),
        withTiming(peak * 0.2, { duration: 380 + delay, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      true,
    );
  }, [h, delay, peak]);
  const style = useAnimatedStyle(() => ({ height: h.value }));
  return <Animated.View style={[styles.bar, style]} />;
}

function PulseRing({ color }: { color: string }) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.6);
  useEffect(() => {
    scale.value = withRepeat(withTiming(1.6, { duration: 1400, easing: Easing.out(Easing.quad) }), -1, false);
    opacity.value = withRepeat(withTiming(0, { duration: 1400, easing: Easing.out(Easing.quad) }), -1, false);
  }, [scale, opacity]);
  const s = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }], opacity: opacity.value }));
  return <Animated.View style={[StyleSheet.absoluteFillObject, styles.pulseRing, s, { borderColor: color }]} />;
}

export default function Live() {
  const router = useRouter();
  const params = useLocalSearchParams<{ mode?: string; contact?: string }>();
  const mode = (params.mode as 'call' | 'meeting' | 'talk') || 'meeting';
  const contact = getContact(params.contact as string);

  const [muted, setMuted] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [idx, setIdx] = useState(0);
  const [targetLang, setTargetLang] = useState('en');
  const [timer, setTimer] = useState(0);
  const confidence = useSharedValue(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % LIVE_TRANSCRIPT.length);
      Haptics.selectionAsync().catch(() => {});
    }, 3800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTimer((v) => v + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    confidence.value = 0;
    confidence.value = withTiming(0.97, { duration: 1200, easing: Easing.out(Easing.cubic) });
  }, [idx, confidence]);

  const current = LIVE_TRANSCRIPT[idx];
  const fromLang = getLang(current.lang);
  const toLang = getLang(targetLang);
  const speakerAvatar = contact?.avatar || AVATARS[idx % AVATARS.length];

  const mm = String(Math.floor(timer / 60)).padStart(2, '0');
  const ss = String(timer % 60).padStart(2, '0');

  const modeLabel = mode === 'call' ? (contact ? `Call · ${contact.name}` : 'Voice call') : mode === 'talk' ? 'Live talk · 248 listeners' : 'Group meeting';

  const confBar = useAnimatedStyle(() => ({ width: `${confidence.value * 100}%` as any }));

  return (
    <View style={styles.root}>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        {/* Top bar */}
        <Animated.View entering={FadeInDown.duration(400)} style={styles.topBar}>
          <PressableScale style={styles.closeBtn} onPress={() => router.back()} testID="live-close-btn">
            <Ionicons name="chevron-down" size={22} color="#fff" />
          </PressableScale>
          <View style={styles.topInfo}>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>{mode === 'talk' ? 'ON AIR' : 'LIVE'}</Text>
            </View>
            <Text style={styles.meetingName} numberOfLines={1}>{modeLabel} · 00:{mm}:{ss}</Text>
          </View>
          <PressableScale style={styles.closeBtn} testID="live-menu-btn">
            <Ionicons name="ellipsis-horizontal" size={20} color="#fff" />
          </PressableScale>
        </Animated.View>

        {/* Mode-specific stage */}
        {mode === 'call' && contact && (
          <Animated.View entering={FadeInUp.delay(100).duration(500)} style={styles.callStage}>
            <View style={styles.callAvatarWrap}>
              <PulseRing color={theme.colors.brand} />
              <Image source={{ uri: contact.avatar }} style={styles.callAvatar} />
            </View>
            <Text style={styles.callName}>{contact.name}</Text>
            <View style={styles.callLangRow}>
              <Text style={styles.callFlag}>{fromLang.flag}</Text>
              <Ionicons name="swap-horizontal" size={14} color="rgba(255,255,255,0.5)" />
              <Text style={styles.callFlag}>{toLang.flag}</Text>
              <Text style={styles.callLangText}>· translating</Text>
            </View>
          </Animated.View>
        )}

        {mode === 'meeting' && (
          <Animated.View entering={FadeIn.duration(500)}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.participantRow}>
              {AVATARS.slice(0, 5).map((a, i) => (
                <Animated.View
                  key={i}
                  entering={FadeInDown.delay(i * 80).duration(400)}
                  style={[styles.participant, i === idx % 5 && styles.participantActive]}
                >
                  <Image source={{ uri: a }} style={styles.participantImg} />
                  {i === idx % 5 && <View style={styles.speakingDot} />}
                </Animated.View>
              ))}
              <View style={styles.participantMore}>
                <Text style={styles.participantMoreText}>+3</Text>
              </View>
            </ScrollView>
          </Animated.View>
        )}

        {mode === 'talk' && (
          <Animated.View entering={FadeInUp.delay(100).duration(500)} style={styles.talkStage}>
            <View style={styles.talkHost}>
              <View style={styles.hostAvatarWrap}>
                <PulseRing color="#FF3366" />
                <Image source={{ uri: AVATARS[5] }} style={styles.hostAvatar} />
              </View>
              <Text style={styles.hostLabel}>HOST · YOU</Text>
              <Text style={styles.hostName}>Alex Chen</Text>
            </View>
            <View style={styles.listenersRow}>
              {AVATARS.slice(0, 6).map((a, i) => (
                <Image key={i} source={{ uri: a }} style={[styles.listenerAvatar, { marginLeft: i === 0 ? 0 : -8 }]} />
              ))}
              <View style={styles.listenersMore}>
                <Ionicons name="people" size={10} color="#fff" />
                <Text style={styles.listenersText}>248</Text>
              </View>
            </View>
          </Animated.View>
        )}

        {/* Live caption stage */}
        <ScrollView contentContainerStyle={styles.stage} showsVerticalScrollIndicator={false}>
          <Animated.View
            key={`speaker-${idx}`}
            entering={FadeInDown.duration(400)}
            style={styles.speakerPill}
          >
            <Image source={{ uri: speakerAvatar }} style={styles.speakerAvatar} />
            <Text style={styles.speakerName}>{contact?.name || current.speaker}</Text>
            <View style={styles.speakerLang}>
              <Text style={styles.speakerLangFlag}>{fromLang.flag}</Text>
              <Text style={styles.speakerLangText}>{fromLang.native}</Text>
            </View>
          </Animated.View>

          <Animated.View key={`orig-${idx}`} entering={FadeIn.duration(350)} exiting={FadeOut.duration(200)}>
            <Text style={styles.originalLabel}>ORIGINAL · {fromLang.name.toUpperCase()}</Text>
            <Text style={styles.originalText}>{current.original}</Text>
          </Animated.View>

          <View style={styles.arrowWrap}>
            <View style={styles.arrowLine} />
            <View style={styles.arrowIcon}>
              <Ionicons name="arrow-down" size={14} color={theme.colors.brand} />
            </View>
            <View style={styles.arrowLine} />
          </View>

          <Animated.View key={`trans-${idx}`} entering={FadeInUp.duration(500).springify().damping(15)}>
            <Text style={styles.translatedLabel}>TRANSLATED · {toLang.name.toUpperCase()}</Text>
            <Text style={styles.translatedText}>{current.translated}</Text>
          </Animated.View>

          <View style={styles.confidenceRow}>
            <Text style={styles.confidenceLabel}>AI confidence</Text>
            <View style={styles.confidenceTrack}>
              <Animated.View style={[styles.confidenceFill, confBar]} />
            </View>
            <Text style={styles.confidenceValue}>97%</Text>
          </View>
        </ScrollView>

        {/* Language pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.langPills}>
          <Text style={styles.langPillsLabel}>TRANSLATE TO</Text>
          {LANGUAGES.map((l, i) => (
            <Animated.View key={l.code} entering={FadeInDown.delay(i * 30).duration(350)}>
              <PressableScale
                style={[styles.langPill, targetLang === l.code && styles.langPillActive]}
                onPress={() => setTargetLang(l.code)}
                haptic="light"
                testID={`live-lang-${l.code}`}
                pressScale={0.92}
              >
                <Text style={styles.langPillFlag}>{l.flag}</Text>
                <Text style={[styles.langPillText, targetLang === l.code && styles.langPillTextActive]}>{l.name}</Text>
              </PressableScale>
            </Animated.View>
          ))}
        </ScrollView>

        {/* Waveform + controls */}
        <Animated.View entering={SlideInDown.delay(200).duration(500)} style={styles.bottom}>
          <View style={styles.waveform}>
            {[16, 28, 42, 24, 56, 38, 62, 30, 50, 20, 40, 28, 18, 36, 52, 24, 40, 30, 44, 22].map((h, i) => (
              <Bar key={i} delay={i * 30} peak={h} />
            ))}
          </View>

          <View style={styles.controls}>
            <PressableScale
              style={styles.secondaryCtrl}
              testID="live-captions-btn"
              pressScale={0.9}
            >
              <Ionicons name="text" size={20} color="#fff" />
            </PressableScale>
            {mode !== 'talk' && (
              <PressableScale
                style={styles.secondaryCtrl}
                onPress={() => setVideoOn(!videoOn)}
                testID="live-video-btn"
                pressScale={0.9}
              >
                <Ionicons name={videoOn ? 'videocam' : 'videocam-off'} size={20} color="#fff" />
              </PressableScale>
            )}
            <PressableScale
              style={[styles.micBtn, muted && styles.micBtnMuted]}
              onPress={() => setMuted(!muted)}
              haptic="medium"
              testID="live-mic-btn"
              pressScale={0.92}
            >
              <Ionicons name={muted ? 'mic-off' : 'mic'} size={26} color="#fff" />
            </PressableScale>
            <PressableScale
              style={styles.endBtn}
              onPress={() => router.back()}
              haptic="heavy"
              testID="live-end-btn"
              pressScale={0.9}
            >
              <Ionicons name="close" size={22} color="#fff" />
            </PressableScale>
            <PressableScale
              style={styles.secondaryCtrl}
              testID="live-share-btn"
              pressScale={0.9}
            >
              <Ionicons name={mode === 'talk' ? 'heart-outline' : 'share-outline'} size={20} color="#fff" />
            </PressableScale>
          </View>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#09090B' },
  topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, gap: 12 },
  closeBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  topInfo: { flex: 1, alignItems: 'center' },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(255,51,102,0.18)', paddingVertical: 3, paddingHorizontal: 9, borderRadius: 999, marginBottom: 3 },
  liveDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: theme.colors.live },
  liveText: { color: theme.colors.live, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  meetingName: { color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: '600' },

  callStage: { alignItems: 'center', paddingVertical: 24, gap: 10 },
  callAvatarWrap: { width: 120, height: 120, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  callAvatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#fff' },
  callName: { color: '#fff', fontSize: 22, fontWeight: '800', letterSpacing: -0.5 },
  callLangRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  callFlag: { fontSize: 18 },
  callLangText: { color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: '600' },
  pulseRing: { borderWidth: 2, borderRadius: 100 },

  participantRow: { paddingHorizontal: 16, gap: 10, paddingVertical: 6 },
  participant: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: 'transparent', position: 'relative' },
  participantActive: { borderColor: theme.colors.success },
  participantImg: { width: '100%', height: '100%', borderRadius: 22 },
  speakingDot: { position: 'absolute', bottom: -2, right: -2, width: 12, height: 12, borderRadius: 6, backgroundColor: theme.colors.success, borderWidth: 2, borderColor: '#09090B' },
  participantMore: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  participantMoreText: { color: '#fff', fontSize: 12, fontWeight: '700' },

  talkStage: { alignItems: 'center', paddingVertical: 20, gap: 14 },
  talkHost: { alignItems: 'center' },
  hostAvatarWrap: { width: 100, height: 100, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  hostAvatar: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: '#FF3366' },
  hostLabel: { color: '#FF3366', fontSize: 9, fontWeight: '800', letterSpacing: 1.4 },
  hostName: { color: '#fff', fontSize: 16, fontWeight: '700', marginTop: 3 },
  listenersRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  listenerAvatar: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: '#09090B' },
  listenersMore: { flexDirection: 'row', alignItems: 'center', gap: 4, marginLeft: 6, backgroundColor: 'rgba(255,255,255,0.08)', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 999 },
  listenersText: { color: '#fff', fontSize: 10, fontWeight: '700' },

  stage: { paddingHorizontal: 28, paddingTop: 12, paddingBottom: 12, flexGrow: 1 },
  speakerPill: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.06)', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 999, marginBottom: 18 },
  speakerAvatar: { width: 22, height: 22, borderRadius: 11 },
  speakerName: { color: '#fff', fontSize: 12, fontWeight: '700' },
  speakerLang: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,255,255,0.08)', paddingVertical: 2, paddingHorizontal: 6, borderRadius: 999 },
  speakerLangFlag: { fontSize: 11 },
  speakerLangText: { color: 'rgba(255,255,255,0.85)', fontSize: 10, fontWeight: '600' },

  originalLabel: { color: theme.colors.textTertiary, fontSize: 10, fontWeight: '800', letterSpacing: 1.4, marginBottom: 8 },
  originalText: { color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 24, fontWeight: '500' },
  arrowWrap: { flexDirection: 'row', alignItems: 'center', marginVertical: 16, gap: 10 },
  arrowLine: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.1)' },
  arrowIcon: { width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(0,85,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  translatedLabel: { color: theme.colors.brand, fontSize: 10, fontWeight: '800', letterSpacing: 1.4, marginBottom: 8 },
  translatedText: { color: '#fff', fontSize: 26, lineHeight: 34, fontWeight: '700', letterSpacing: -0.5 },

  confidenceRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 18 },
  confidenceLabel: { color: theme.colors.textTertiary, fontSize: 10, fontWeight: '700', letterSpacing: 0.8 },
  confidenceTrack: { flex: 1, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.08)', overflow: 'hidden' },
  confidenceFill: { height: '100%', backgroundColor: theme.colors.brand, borderRadius: 2 },
  confidenceValue: { color: '#fff', fontSize: 11, fontWeight: '700' },

  langPills: { paddingHorizontal: 16, gap: 8, paddingVertical: 10, alignItems: 'center' },
  langPillsLabel: { color: theme.colors.textTertiary, fontSize: 9, fontWeight: '800', letterSpacing: 1.4, marginRight: 4 },
  langPill: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 7, paddingHorizontal: 12, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  langPillActive: { backgroundColor: theme.colors.brand, borderColor: theme.colors.brand },
  langPillFlag: { fontSize: 13 },
  langPillText: { color: 'rgba(255,255,255,0.85)', fontSize: 12, fontWeight: '600' },
  langPillTextActive: { color: '#fff' },

  bottom: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 4 },
  waveform: { height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, paddingHorizontal: 4 },
  bar: { width: 3, borderRadius: 2, backgroundColor: theme.colors.brand },

  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  secondaryCtrl: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  micBtn: { width: 68, height: 68, borderRadius: 34, backgroundColor: theme.colors.brand, alignItems: 'center', justifyContent: 'center' },
  micBtnMuted: { backgroundColor: 'rgba(255,255,255,0.1)' },
  endBtn: { width: 58, height: 48, borderRadius: 24, backgroundColor: theme.colors.live, alignItems: 'center', justifyContent: 'center' },
});
