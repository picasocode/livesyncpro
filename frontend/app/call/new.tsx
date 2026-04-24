import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import PressableScale from '../../src/components/PressableScale';
import { theme } from '../../src/theme';
import { CONTACTS, LANGUAGES, getLang } from '../../src/mock';

const STATUS_COLORS: Record<string, string> = {
  online: '#10B981',
  away: '#F59E0B',
  offline: '#A1A1AA',
};

export default function NewCall() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [myLang, setMyLang] = useState('en');

  const filtered = CONTACTS.filter(
    (c) => !query || c.name.toLowerCase().includes(query.toLowerCase()) || c.location.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
        <PressableScale style={styles.backBtn} onPress={() => router.back()} testID="newcall-back-btn">
          <Ionicons name="close" size={22} color={theme.colors.ink} />
        </PressableScale>
        <Text style={styles.headerTitle}>New call</Text>
        <View style={styles.backBtn} />
      </Animated.View>

      {/* My language selector */}
      <Animated.View entering={FadeInDown.delay(80).duration(450)} style={styles.myLangRow}>
        <Text style={styles.myLangLabel}>YOU SPEAK</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.myLangList}>
          {LANGUAGES.map((l) => (
            <PressableScale
              key={l.code}
              style={[styles.myLangChip, myLang === l.code && styles.myLangChipActive]}
              onPress={() => setMyLang(l.code)}
              testID={`newcall-mylang-${l.code}`}
              pressScale={0.94}
            >
              <Text style={styles.myLangFlag}>{l.flag}</Text>
              <Text style={[styles.myLangChipText, myLang === l.code && { color: '#fff' }]}>{l.name}</Text>
            </PressableScale>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Search */}
      <Animated.View entering={FadeInDown.delay(140).duration(450)} style={styles.searchWrap}>
        <Ionicons name="search" size={18} color={theme.colors.textTertiary} />
        <TextInput
          placeholder="Search contacts or dial a number"
          placeholderTextColor={theme.colors.textTertiary}
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          testID="newcall-search-input"
        />
      </Animated.View>

      {/* Dial pad quick row */}
      <Animated.View entering={FadeInDown.delay(200).duration(450)}>
        <View style={styles.quickCallRow}>
          <PressableScale
            style={[styles.quickCall, { backgroundColor: theme.colors.brand }]}
            onPress={() => router.push('/live?mode=call' as any)}
            haptic="medium"
            testID="newcall-voice-btn"
          >
            <Ionicons name="call" size={20} color="#fff" />
            <Text style={styles.quickCallText}>Voice call</Text>
          </PressableScale>
          <PressableScale
            style={[styles.quickCall, { backgroundColor: theme.colors.ink }]}
            onPress={() => router.push('/live?mode=call' as any)}
            haptic="medium"
            testID="newcall-video-btn"
          >
            <Ionicons name="videocam" size={20} color="#fff" />
            <Text style={styles.quickCallText}>Video call</Text>
          </PressableScale>
        </View>
      </Animated.View>

      <Text style={styles.sectionLabel}>CONTACTS · {filtered.length}</Text>

      <FlatList
        data={filtered}
        keyExtractor={(c) => c.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="people-outline" size={36} color={theme.colors.textTertiary} />
            <Text style={styles.emptyText}>No contacts match</Text>
          </View>
        }
        renderItem={({ item, index }) => {
          const lang = getLang(item.lang);
          return (
            <Animated.View entering={FadeInDown.delay(260 + index * 50).duration(400)}>
              <PressableScale
                style={styles.contactRow}
                onPress={() => router.push(`/live?mode=call&contact=${item.id}` as any)}
                haptic="medium"
                testID={`newcall-contact-${item.id}`}
                pressScale={0.98}
              >
                <View style={styles.contactAvatarWrap}>
                  <Image source={{ uri: item.avatar }} style={styles.contactAvatar} />
                  <View style={[styles.presence, { backgroundColor: STATUS_COLORS[item.status] }]} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.contactName}>{item.name}</Text>
                  <View style={styles.contactMeta}>
                    <Text style={styles.contactFlag}>{lang.flag}</Text>
                    <Text style={styles.contactMetaText}>{lang.native}</Text>
                    <View style={styles.dot} />
                    <Text style={styles.contactMetaText}>{item.location}</Text>
                  </View>
                </View>
                <View style={styles.contactActions}>
                  <PressableScale
                    style={styles.actionBtn}
                    onPress={() => router.push(`/live?mode=call&contact=${item.id}` as any)}
                    haptic="medium"
                    testID={`newcall-call-${item.id}`}
                    pressScale={0.88}
                  >
                    <Ionicons name="call" size={15} color={theme.colors.brand} />
                  </PressableScale>
                  <PressableScale
                    style={[styles.actionBtn, { backgroundColor: theme.colors.ink }]}
                    onPress={() => router.push(`/live?mode=call&contact=${item.id}` as any)}
                    haptic="medium"
                    testID={`newcall-video-contact-${item.id}`}
                    pressScale={0.88}
                  >
                    <Ionicons name="videocam" size={15} color="#fff" />
                  </PressableScale>
                </View>
              </PressableScale>
            </Animated.View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.bg },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, gap: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: theme.colors.border },
  headerTitle: { flex: 1, fontSize: 16, fontWeight: '700', color: theme.colors.ink, textAlign: 'center' },

  myLangRow: { marginBottom: 14 },
  myLangLabel: { fontSize: 10, fontWeight: '800', color: theme.colors.textTertiary, letterSpacing: 1.4, paddingHorizontal: 20, marginBottom: 8 },
  myLangList: { paddingHorizontal: 20, gap: 6 },
  myLangChip: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999, backgroundColor: '#fff', borderWidth: 1, borderColor: theme.colors.border },
  myLangChipActive: { backgroundColor: theme.colors.ink, borderColor: theme.colors.ink },
  myLangFlag: { fontSize: 13 },
  myLangChipText: { fontSize: 12, fontWeight: '700', color: theme.colors.ink },

  searchWrap: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 20, backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 11, borderWidth: 1, borderColor: theme.colors.border, marginBottom: 14 },
  searchInput: { flex: 1, fontSize: 14, color: theme.colors.ink, paddingVertical: 2, outlineWidth: 0 } as any,

  quickCallRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginBottom: 24 },
  quickCall: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: 14 },
  quickCallText: { color: '#fff', fontSize: 13, fontWeight: '800' },

  sectionLabel: { fontSize: 11, fontWeight: '800', color: theme.colors.textTertiary, letterSpacing: 1.4, paddingHorizontal: 20, marginBottom: 10 },

  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fff', padding: 12, borderRadius: 14, borderWidth: 1, borderColor: theme.colors.border },
  contactAvatarWrap: { position: 'relative' },
  contactAvatar: { width: 46, height: 46, borderRadius: 23 },
  presence: { position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderRadius: 6, borderWidth: 2, borderColor: '#fff' },
  contactName: { fontSize: 14, fontWeight: '700', color: theme.colors.ink, marginBottom: 3 },
  contactMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  contactFlag: { fontSize: 12 },
  contactMetaText: { fontSize: 11, color: theme.colors.textSecondary, fontWeight: '500' },
  dot: { width: 2, height: 2, borderRadius: 1, backgroundColor: theme.colors.textTertiary },
  contactActions: { flexDirection: 'row', gap: 6 },
  actionBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: theme.colors.brandSoft, alignItems: 'center', justifyContent: 'center' },

  empty: { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyText: { color: theme.colors.textSecondary, fontSize: 14 },
});
