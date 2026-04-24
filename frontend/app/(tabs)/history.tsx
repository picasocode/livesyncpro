import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import PressableScale from '../../src/components/PressableScale';
import { theme } from '../../src/theme';
import { ACTIVITY, PLUGINS, getLang, getContact } from '../../src/mock';

const FILTERS = [
  { id: 'all', label: 'All', icon: 'apps' },
  { id: 'call', label: 'Calls', icon: 'call' },
  { id: 'meeting', label: 'Meetings', icon: 'people' },
  { id: 'talk', label: 'Talks', icon: 'radio' },
];

const TYPE_META: Record<string, { icon: any; color: string; label: string }> = {
  call: { icon: 'call', color: '#0055FF', label: 'Call' },
  meeting: { icon: 'people', color: '#10B981', label: 'Meeting' },
  talk: { icon: 'radio', color: '#FF3366', label: 'Talk' },
};

export default function History() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = ACTIVITY.filter((a) => {
    const q = query.toLowerCase();
    const matchQ = !q || a.title.toLowerCase().includes(q) || (a.translatedPreview || '').toLowerCase().includes(q);
    const matchF = filter === 'all' || a.type === filter;
    return matchQ && matchF;
  });

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
        <Text style={styles.title}>History</Text>
        <Text style={styles.subtitle}>{ACTIVITY.length} items · translated across 6 languages</Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(80).duration(450)} style={styles.searchWrap}>
        <Ionicons name="search" size={18} color={theme.colors.textTertiary} />
        <TextInput
          placeholder="Search calls, meetings, talks"
          placeholderTextColor={theme.colors.textTertiary}
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          testID="history-search-input"
        />
        {query.length > 0 && (
          <PressableScale onPress={() => setQuery('')} testID="history-clear-search" pressScale={0.85}>
            <Ionicons name="close-circle" size={18} color={theme.colors.textTertiary} />
          </PressableScale>
        )}
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(140).duration(450)}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <PressableScale
                key={f.id}
                style={[styles.filterChip, active && styles.filterChipActive]}
                onPress={() => setFilter(f.id)}
                testID={`history-filter-${f.id}`}
                pressScale={0.94}
              >
                <Ionicons name={f.icon as any} size={12} color={active ? '#fff' : theme.colors.textSecondary} />
                <Text style={[styles.filterText, active && styles.filterTextActive]}>{f.label}</Text>
              </PressableScale>
            );
          })}
        </ScrollView>
      </Animated.View>

      <FlatList
        data={filtered}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32, paddingTop: 8 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="archive-outline" size={36} color={theme.colors.textTertiary} />
            <Text style={styles.emptyText}>No items match</Text>
          </View>
        }
        renderItem={({ item: a, index }) => {
          const meta = TYPE_META[a.type];
          const from = getLang(a.from);
          const to = getLang(a.to);
          const contact = getContact(a.contactId);
          const plugin = a.platform ? PLUGINS.find((p) => p.id === a.platform) : null;
          return (
            <Animated.View entering={FadeInDown.delay(180 + index * 60).duration(400)}>
              <PressableScale
                style={styles.card}
                onPress={() =>
                  a.type === 'call'
                    ? router.push(`/live?mode=call&contact=${a.contactId || ''}` as any)
                    : router.push(`/transcript/${a.id}` as any)
                }
                testID={`history-item-${a.id}`}
                pressScale={0.98}
              >
                <View style={[styles.accent, { backgroundColor: meta.color }]} />
                <View style={{ flex: 1, padding: 14 }}>
                  <View style={styles.topRow}>
                    <View style={styles.typeTag}>
                      <Ionicons name={meta.icon} size={11} color={meta.color} />
                      <Text style={[styles.typeTagText, { color: meta.color }]}>{meta.label.toUpperCase()}</Text>
                    </View>
                    <Text style={styles.cardDate}>{a.date}</Text>
                  </View>

                  <View style={styles.mainRow}>
                    {contact && <Image source={{ uri: contact.avatar }} style={styles.avatar} />}
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.cardTitle, a.missed && { color: theme.colors.error }]} numberOfLines={1}>
                        {a.missed && '⚠︎ '}{a.title}
                      </Text>
                      <Text style={styles.cardSubtitle}>{a.subtitle}</Text>
                    </View>
                  </View>

                  <View style={styles.langRow}>
                    <View style={styles.langBox}>
                      <Text style={styles.flag}>{from.flag}</Text>
                      <Text style={styles.langName}>{from.native}</Text>
                    </View>
                    <Ionicons name="arrow-forward" size={12} color={theme.colors.textTertiary} />
                    <View style={styles.langBox}>
                      <Text style={styles.flag}>{to.flag}</Text>
                      <Text style={styles.langName}>{to.native}</Text>
                    </View>
                  </View>

                  {a.translatedPreview && (
                    <Text style={styles.preview} numberOfLines={2}>"{a.translatedPreview}"</Text>
                  )}

                  <View style={styles.footRow}>
                    <View style={styles.metaTag}>
                      <Ionicons name="time-outline" size={11} color={theme.colors.textSecondary} />
                      <Text style={styles.metaText}>{a.duration}</Text>
                    </View>
                    <View style={styles.metaTag}>
                      <Ionicons name="people-outline" size={11} color={theme.colors.textSecondary} />
                      <Text style={styles.metaText}>{a.participants}</Text>
                    </View>
                    {plugin && (
                      <View style={[styles.platformTag, { backgroundColor: plugin.color + '18' }]}>
                        <Text style={[styles.platformTagText, { color: plugin.color }]}>{plugin.name}</Text>
                      </View>
                    )}
                    {a.type === 'call' && (
                      <View style={[styles.platformTag, { backgroundColor: meta.color + '18' }]}>
                        <Text style={[styles.platformTagText, { color: meta.color }]}>
                          {a.direction === 'incoming' ? 'Incoming' : 'Outgoing'}
                        </Text>
                      </View>
                    )}
                  </View>
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
  header: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 12 },
  title: { fontSize: 32, fontWeight: '800', color: theme.colors.ink, letterSpacing: -1 },
  subtitle: { fontSize: 13, color: theme.colors.textSecondary, marginTop: 4 },
  searchWrap: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 20, backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1, borderColor: theme.colors.border, marginBottom: 12 },
  searchInput: { flex: 1, fontSize: 14, color: theme.colors.ink, paddingVertical: 2, outlineWidth: 0 } as any,
  filterRow: { paddingHorizontal: 20, gap: 8, paddingBottom: 12 },
  filterChip: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 8, paddingHorizontal: 14, borderRadius: 999, backgroundColor: '#fff', borderWidth: 1, borderColor: theme.colors.border },
  filterChipActive: { backgroundColor: theme.colors.ink, borderColor: theme.colors.ink },
  filterText: { fontSize: 12, fontWeight: '700', color: theme.colors.textSecondary },
  filterTextActive: { color: '#fff' },

  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border, overflow: 'hidden' },
  accent: { width: 4 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  typeTag: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: theme.colors.bg, paddingVertical: 3, paddingHorizontal: 8, borderRadius: 6 },
  typeTagText: { fontSize: 9, fontWeight: '800', letterSpacing: 0.8 },
  cardDate: { fontSize: 11, color: theme.colors.textTertiary, fontWeight: '600' },

  mainRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  avatar: { width: 36, height: 36, borderRadius: 18 },
  cardTitle: { fontSize: 14, fontWeight: '700', color: theme.colors.ink },
  cardSubtitle: { fontSize: 11, color: theme.colors.textSecondary, marginTop: 2 },

  langRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  langBox: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  flag: { fontSize: 13 },
  langName: { fontSize: 11, color: theme.colors.ink, fontWeight: '600' },
  preview: { fontSize: 12, color: theme.colors.textSecondary, fontStyle: 'italic', marginBottom: 10, lineHeight: 17 },

  footRow: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  metaTag: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: theme.colors.bg, paddingVertical: 3, paddingHorizontal: 7, borderRadius: 6 },
  metaText: { fontSize: 10, color: theme.colors.textSecondary, fontWeight: '600' },
  platformTag: { paddingVertical: 3, paddingHorizontal: 8, borderRadius: 6 },
  platformTagText: { fontSize: 10, fontWeight: '700' },
  empty: { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyText: { color: theme.colors.textSecondary, fontSize: 14 },
});
