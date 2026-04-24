import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { theme } from '../../src/theme';
import { MEETINGS, LIVE_TRANSCRIPT, AVATARS, PLUGINS, getLang } from '../../src/mock';

export default function TranscriptDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const meeting = MEETINGS.find((m) => m.id === id) || MEETINGS[0];
  const plugin = PLUGINS.find((p) => p.id === meeting.platform)!;
  const from = getLang(meeting.from);
  const to = getLang(meeting.to);
  const [mode, setMode] = useState<'both' | 'translated'>('both');

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} testID="transcript-back-btn">
          <Ionicons name="chevron-back" size={22} color={theme.colors.ink} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>Transcript</Text>
        <TouchableOpacity style={styles.backBtn} testID="transcript-share-btn">
          <Ionicons name="share-outline" size={20} color={theme.colors.ink} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {/* Summary card */}
        <View style={styles.summary}>
          <View style={[styles.platformBadge, { backgroundColor: plugin.color + '18' }]}>
            <View style={[styles.platformDot, { backgroundColor: plugin.color }]} />
            <Text style={[styles.platformText, { color: plugin.color }]}>{plugin.name}</Text>
          </View>
          <Text style={styles.title}>{meeting.title}</Text>
          <Text style={styles.dateLine}>{meeting.date} · {meeting.duration}</Text>

          <View style={styles.langCard}>
            <View style={styles.langBox}>
              <Text style={styles.bigFlag}>{from.flag}</Text>
              <Text style={styles.langTitle}>{from.native}</Text>
              <Text style={styles.langSub}>Source</Text>
            </View>
            <View style={styles.langArrow}>
              <Ionicons name="arrow-forward" size={18} color={theme.colors.textTertiary} />
            </View>
            <View style={styles.langBox}>
              <Text style={styles.bigFlag}>{to.flag}</Text>
              <Text style={styles.langTitle}>{to.native}</Text>
              <Text style={styles.langSub}>Translated</Text>
            </View>
          </View>

          {/* Player */}
          <View style={styles.player}>
            <TouchableOpacity style={styles.playBtn} testID="transcript-play-btn">
              <Ionicons name="play" size={18} color="#fff" />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <View style={styles.progress}>
                <View style={styles.progressFill} />
              </View>
              <View style={styles.timeRow}>
                <Text style={styles.timeText}>04:12</Text>
                <Text style={styles.timeText}>{meeting.duration}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.speedBtn} testID="transcript-speed-btn">
              <Text style={styles.speedText}>1x</Text>
            </TouchableOpacity>
          </View>

          {/* Mode toggle */}
          <View style={styles.toggle}>
            <TouchableOpacity
              style={[styles.toggleBtn, mode === 'both' && styles.toggleBtnActive]}
              onPress={() => setMode('both')}
              testID="transcript-mode-both"
            >
              <Text style={[styles.toggleText, mode === 'both' && styles.toggleTextActive]}>Bilingual</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleBtn, mode === 'translated' && styles.toggleBtnActive]}
              onPress={() => setMode('translated')}
              testID="transcript-mode-translated"
            >
              <Text style={[styles.toggleText, mode === 'translated' && styles.toggleTextActive]}>Translated only</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Transcript blocks */}
        <View style={{ paddingHorizontal: 20, gap: 16 }}>
          {LIVE_TRANSCRIPT.map((b, i) => {
            const spk = getLang(b.lang);
            return (
              <View key={i} style={styles.block} testID={`transcript-block-${i}`}>
                <View style={styles.blockHeader}>
                  <Image source={{ uri: AVATARS[i % AVATARS.length] }} style={styles.blockAvatar} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.blockSpeaker}>{b.speaker}</Text>
                    <Text style={styles.blockTime}>{b.t} · {spk.flag} {spk.native}</Text>
                  </View>
                  <TouchableOpacity style={styles.blockPlay} testID={`transcript-block-play-${i}`}>
                    <Ionicons name="play" size={14} color={theme.colors.ink} />
                  </TouchableOpacity>
                </View>
                {mode === 'both' && <Text style={styles.blockOriginal}>{b.original}</Text>}
                <Text style={styles.blockTranslated}>{b.translated}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom action */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomBtnSec} testID="transcript-download-btn">
          <Ionicons name="download-outline" size={18} color={theme.colors.ink} />
          <Text style={styles.bottomBtnSecText}>Export</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBtnPri} testID="transcript-summary-btn">
          <Ionicons name="sparkles" size={16} color="#fff" />
          <Text style={styles.bottomBtnPriText}>AI Summary</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.bg },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, gap: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: theme.colors.border },
  headerTitle: { flex: 1, fontSize: 16, fontWeight: '700', color: theme.colors.ink, textAlign: 'center' },

  summary: { margin: 20, padding: 20, backgroundColor: '#fff', borderRadius: 20, borderWidth: 1, borderColor: theme.colors.border },
  platformBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 999, marginBottom: 12 },
  platformDot: { width: 6, height: 6, borderRadius: 3 },
  platformText: { fontSize: 11, fontWeight: '700' },
  title: { fontSize: 22, fontWeight: '800', color: theme.colors.ink, letterSpacing: -0.6, marginBottom: 4 },
  dateLine: { fontSize: 13, color: theme.colors.textSecondary, marginBottom: 18 },

  langCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.bg, borderRadius: 14, padding: 14, marginBottom: 16 },
  langBox: { flex: 1, alignItems: 'center' },
  bigFlag: { fontSize: 28, marginBottom: 4 },
  langTitle: { fontSize: 14, fontWeight: '700', color: theme.colors.ink },
  langSub: { fontSize: 10, color: theme.colors.textTertiary, fontWeight: '600', letterSpacing: 0.8, marginTop: 2 },
  langArrow: { paddingHorizontal: 10 },

  player: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: theme.colors.bg, borderRadius: 14, padding: 12, marginBottom: 16 },
  playBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: theme.colors.ink, alignItems: 'center', justifyContent: 'center' },
  progress: { height: 4, backgroundColor: theme.colors.border, borderRadius: 2, overflow: 'hidden' },
  progressFill: { width: '38%', height: '100%', backgroundColor: theme.colors.brand },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  timeText: { fontSize: 11, color: theme.colors.textSecondary, fontWeight: '600' },
  speedBtn: { width: 42, height: 42, borderRadius: 10, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: theme.colors.border },
  speedText: { fontSize: 12, fontWeight: '800', color: theme.colors.ink },

  toggle: { flexDirection: 'row', backgroundColor: theme.colors.bg, borderRadius: 10, padding: 4 },
  toggleBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  toggleBtnActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  toggleText: { fontSize: 13, fontWeight: '600', color: theme.colors.textSecondary },
  toggleTextActive: { color: theme.colors.ink },

  block: { backgroundColor: '#fff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: theme.colors.border },
  blockHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  blockAvatar: { width: 32, height: 32, borderRadius: 16 },
  blockSpeaker: { fontSize: 13, fontWeight: '700', color: theme.colors.ink },
  blockTime: { fontSize: 11, color: theme.colors.textTertiary, marginTop: 1 },
  blockPlay: { width: 30, height: 30, borderRadius: 15, backgroundColor: theme.colors.bg, alignItems: 'center', justifyContent: 'center' },
  blockOriginal: { fontSize: 13, color: theme.colors.textSecondary, fontStyle: 'italic', lineHeight: 19, marginBottom: 6 },
  blockTranslated: { fontSize: 15, color: theme.colors.ink, fontWeight: '500', lineHeight: 22 },

  bottomBar: { position: 'absolute', bottom: 20, left: 20, right: 20, flexDirection: 'row', gap: 10 },
  bottomBtnSec: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: '#fff', paddingVertical: 14, borderRadius: 12, borderWidth: 1, borderColor: theme.colors.border },
  bottomBtnSecText: { fontSize: 14, fontWeight: '700', color: theme.colors.ink },
  bottomBtnPri: { flex: 1.4, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: theme.colors.brand, paddingVertical: 14, borderRadius: 12 },
  bottomBtnPriText: { fontSize: 14, fontWeight: '700', color: '#fff' },
});
