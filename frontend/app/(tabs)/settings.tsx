import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme } from '../../src/theme';
import { LANGUAGES, AVATARS, getLang } from '../../src/mock';

export default function Settings() {
  const router = useRouter();
  const [source, setSource] = useState('en');
  const [target, setTarget] = useState('es');
  const [autoDetect, setAutoDetect] = useState(true);
  const [voiceClone, setVoiceClone] = useState(false);
  const [captions, setCaptions] = useState(true);
  const [haptics, setHaptics] = useState(true);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        {/* Profile card */}
        <TouchableOpacity style={styles.profileCard} testID="settings-profile-card">
          <Image source={{ uri: AVATARS[5] }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.profileName}>Alex Chen</Text>
            <Text style={styles.profileEmail}>alex@acme.co</Text>
          </View>
          <View style={styles.planBadge}>
            <Ionicons name="sparkles" size={11} color={theme.colors.brand} />
            <Text style={styles.planText}>PRO</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.textTertiary} />
        </TouchableOpacity>

        {/* Languages */}
        <Text style={styles.sectionLabel}>LANGUAGES</Text>
        <View style={styles.group}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconBg, { backgroundColor: '#E6EFFF' }]}>
                <Ionicons name="mic" size={18} color={theme.colors.brand} />
              </View>
              <View>
                <Text style={styles.rowLabel}>My language</Text>
                <Text style={styles.rowValue}>{getLang(source).flag}  {getLang(source).native}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.colors.textTertiary} />
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconBg, { backgroundColor: '#E6EFFF' }]}>
                <Ionicons name="language" size={18} color={theme.colors.brand} />
              </View>
              <View>
                <Text style={styles.rowLabel}>Translate to</Text>
                <Text style={styles.rowValue}>{getLang(target).flag}  {getLang(target).native}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.colors.textTertiary} />
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconBg, { backgroundColor: '#E6EFFF' }]}>
                <Ionicons name="scan-outline" size={18} color={theme.colors.brand} />
              </View>
              <Text style={styles.rowLabel}>Auto-detect source</Text>
            </View>
            <Switch
              value={autoDetect}
              onValueChange={setAutoDetect}
              trackColor={{ false: '#E4E4E7', true: theme.colors.brand }}
              thumbColor="#fff"
              testID="settings-auto-detect-switch"
            />
          </View>
        </View>

        {/* Quick languages */}
        <Text style={styles.sectionLabel}>QUICK SWITCH</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.langRow}>
          {LANGUAGES.map((l) => (
            <TouchableOpacity
              key={l.code}
              style={[styles.langChip, target === l.code && styles.langChipActive]}
              onPress={() => setTarget(l.code)}
              testID={`settings-lang-${l.code}`}
            >
              <Text style={styles.langFlag}>{l.flag}</Text>
              <Text style={[styles.langChipText, target === l.code && styles.langChipTextActive]}>{l.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Voice */}
        <Text style={styles.sectionLabel}>VOICE</Text>
        <View style={styles.group}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconBg, { backgroundColor: '#FEF3C7' }]}>
                <Ionicons name="recording-outline" size={18} color={theme.colors.warning} />
              </View>
              <View>
                <Text style={styles.rowLabel}>Clone my voice</Text>
                <Text style={styles.rowSub}>Use your voice in every language</Text>
              </View>
            </View>
            <Switch
              value={voiceClone}
              onValueChange={setVoiceClone}
              trackColor={{ false: '#E4E4E7', true: theme.colors.brand }}
              thumbColor="#fff"
              testID="settings-voice-clone-switch"
            />
          </View>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.row} testID="settings-voice-accent-btn">
            <View style={styles.rowLeft}>
              <View style={[styles.iconBg, { backgroundColor: '#FEF3C7' }]}>
                <Ionicons name="musical-notes-outline" size={18} color={theme.colors.warning} />
              </View>
              <View>
                <Text style={styles.rowLabel}>Target accent</Text>
                <Text style={styles.rowSub}>Neutral · Castilian · Latin</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.colors.textTertiary} />
          </TouchableOpacity>
        </View>

        {/* Meeting */}
        <Text style={styles.sectionLabel}>IN MEETING</Text>
        <View style={styles.group}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconBg, { backgroundColor: '#D1FAE5' }]}>
                <Ionicons name="closed-captioning-outline" size={18} color={theme.colors.success} />
              </View>
              <Text style={styles.rowLabel}>Show live captions</Text>
            </View>
            <Switch
              value={captions}
              onValueChange={setCaptions}
              trackColor={{ false: '#E4E4E7', true: theme.colors.brand }}
              thumbColor="#fff"
              testID="settings-captions-switch"
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconBg, { backgroundColor: '#D1FAE5' }]}>
                <Ionicons name="phone-portrait-outline" size={18} color={theme.colors.success} />
              </View>
              <Text style={styles.rowLabel}>Haptic feedback</Text>
            </View>
            <Switch
              value={haptics}
              onValueChange={setHaptics}
              trackColor={{ false: '#E4E4E7', true: theme.colors.brand }}
              thumbColor="#fff"
              testID="settings-haptics-switch"
            />
          </View>
        </View>

        {/* Workspace */}
        <Text style={styles.sectionLabel}>WORKSPACE</Text>
        <View style={styles.group}>
          <TouchableOpacity style={styles.row} onPress={() => router.push('/team')} testID="settings-team-btn">
            <View style={styles.rowLeft}>
              <View style={[styles.iconBg, { backgroundColor: '#FEE2E2' }]}>
                <Ionicons name="people" size={18} color={theme.colors.error} />
              </View>
              <View>
                <Text style={styles.rowLabel}>Team & members</Text>
                <Text style={styles.rowSub}>5 members · 2 seats left</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.colors.textTertiary} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.row} onPress={() => router.push('/pricing')} testID="settings-billing-btn">
            <View style={styles.rowLeft}>
              <View style={[styles.iconBg, { backgroundColor: '#FEE2E2' }]}>
                <Ionicons name="card-outline" size={18} color={theme.colors.error} />
              </View>
              <View>
                <Text style={styles.rowLabel}>Plan & billing</Text>
                <Text style={styles.rowSub}>Pro · $19/mo</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.colors.textTertiary} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionLabel}>MORE</Text>
        <View style={styles.group}>
          {[
            { icon: 'lock-closed-outline', label: 'Privacy & security', test: 'privacy' },
            { icon: 'help-circle-outline', label: 'Help center', test: 'help' },
            { icon: 'chatbubble-outline', label: 'Send feedback', test: 'feedback' },
            { icon: 'log-out-outline', label: 'Sign out', test: 'signout', danger: true },
          ].map((r, i, arr) => (
            <View key={r.label}>
              <TouchableOpacity style={styles.row} testID={`settings-${r.test}-btn`}>
                <View style={styles.rowLeft}>
                  <View style={[styles.iconBg, { backgroundColor: theme.colors.bg }]}>
                    <Ionicons name={r.icon as any} size={18} color={r.danger ? theme.colors.error : theme.colors.ink} />
                  </View>
                  <Text style={[styles.rowLabel, r.danger && { color: theme.colors.error }]}>{r.label}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={theme.colors.textTertiary} />
              </TouchableOpacity>
              {i < arr.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        <Text style={styles.version}>LinguaLive · v1.0.0 · Made for global teams</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.bg },
  header: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 16 },
  title: { fontSize: 32, fontWeight: '800', color: theme.colors.ink, letterSpacing: -1 },

  profileCard: { marginHorizontal: 20, marginBottom: 24, backgroundColor: '#fff', borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 14, borderWidth: 1, borderColor: theme.colors.border },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  profileName: { fontSize: 16, fontWeight: '700', color: theme.colors.ink },
  profileEmail: { fontSize: 12, color: theme.colors.textSecondary, marginTop: 2 },
  planBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: theme.colors.brandSoft, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 999 },
  planText: { fontSize: 10, fontWeight: '800', color: theme.colors.brand, letterSpacing: 0.8 },

  sectionLabel: { fontSize: 11, fontWeight: '800', color: theme.colors.textTertiary, letterSpacing: 1.4, marginHorizontal: 20, marginBottom: 8, marginTop: 4 },
  group: { marginHorizontal: 20, backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: theme.colors.border, marginBottom: 24, overflow: 'hidden' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 14 },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  iconBg: { width: 34, height: 34, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  rowLabel: { fontSize: 14, fontWeight: '600', color: theme.colors.ink },
  rowValue: { fontSize: 12, color: theme.colors.textSecondary, marginTop: 2 },
  rowSub: { fontSize: 12, color: theme.colors.textSecondary, marginTop: 2 },
  divider: { height: 1, backgroundColor: theme.colors.border, marginLeft: 60 },

  langRow: { paddingHorizontal: 20, gap: 8, paddingBottom: 20 },
  langChip: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 10, paddingHorizontal: 14, borderRadius: 999, backgroundColor: '#fff', borderWidth: 1, borderColor: theme.colors.border },
  langChipActive: { backgroundColor: theme.colors.ink, borderColor: theme.colors.ink },
  langFlag: { fontSize: 15 },
  langChipText: { fontSize: 13, fontWeight: '600', color: theme.colors.ink },
  langChipTextActive: { color: '#fff' },

  version: { textAlign: 'center', fontSize: 11, color: theme.colors.textTertiary, marginTop: 12, fontWeight: '500' },
});
