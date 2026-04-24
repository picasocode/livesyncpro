import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme } from '../../src/theme';
import { MEETINGS, PLUGINS, getLang } from '../../src/mock';

const FILTERS = ['All', 'Today', 'This week', 'Meet', 'Zoom', 'Teams', 'Slack'];

export default function History() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = MEETINGS.filter((m) => {
    const q = query.toLowerCase();
    const matchesQ = !q || m.title.toLowerCase().includes(q) || m.translatedPreview.toLowerCase().includes(q);
    const matchesF =
      filter === 'All' ||
      (filter === 'Today' && m.date.startsWith('Today')) ||
      (['Meet', 'Zoom', 'Teams', 'Slack'].includes(filter) &&
        PLUGINS.find((p) => p.id === m.platform)?.name.includes(filter));
    return matchesQ && matchesF;
  });

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
        <Text style={styles.subtitle}>{MEETINGS.length} translated meetings · 4h 18m total</Text>
      </View>

      <View style={styles.searchWrap}>
        <Ionicons name="search" size={18} color={theme.colors.textTertiary} />
        <TextInput
          placeholder="Search transcripts"
          placeholderTextColor={theme.colors.textTertiary}
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          testID="history-search-input"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery('')} testID="history-clear-search">
            <Ionicons name="close-circle" size={18} color={theme.colors.textTertiary} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterChip, filter === f && styles.filterChipActive]}
            onPress={() => setFilter(f)}
            testID={`history-filter-${f.toLowerCase().replace(' ', '-')}`}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32, paddingTop: 8 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="search-outline" size={36} color={theme.colors.textTertiary} />
            <Text style={styles.emptyText}>No meetings match</Text>
          </View>
        }
        renderItem={({ item: m }) => {
          const from = getLang(m.from);
          const to = getLang(m.to);
          const plugin = PLUGINS.find((p) => p.id === m.platform)!;
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/transcript/${m.id}` as any)}
              activeOpacity={0.85}
              testID={`history-item-${m.id}`}
            >
              <View style={[styles.accent, { backgroundColor: plugin.color }]} />
              <View style={{ flex: 1 }}>
                <View style={styles.rowTop}>
                  <Text style={styles.cardTitle} numberOfLines={1}>{m.title}</Text>
                  <Text style={styles.cardDate}>{m.date.split('·')[0].trim()}</Text>
                </View>
                <View style={styles.langRow}>
                  <View style={styles.langBox}>
                    <Text style={styles.flag}>{from.flag}</Text>
                    <Text style={styles.langName}>{from.native}</Text>
                  </View>
                  <Ionicons name="arrow-forward" size={14} color={theme.colors.textTertiary} />
                  <View style={styles.langBox}>
                    <Text style={styles.flag}>{to.flag}</Text>
                    <Text style={styles.langName}>{to.native}</Text>
                  </View>
                </View>
                <Text style={styles.preview} numberOfLines={2}>"{m.translatedPreview}"</Text>
                <View style={styles.footRow}>
                  <View style={styles.metaTag}>
                    <Ionicons name="people-outline" size={12} color={theme.colors.textSecondary} />
                    <Text style={styles.metaText}>{m.participants}</Text>
                  </View>
                  <View style={styles.metaTag}>
                    <Ionicons name="time-outline" size={12} color={theme.colors.textSecondary} />
                    <Text style={styles.metaText}>{m.duration}</Text>
                  </View>
                  <View style={[styles.platformTag, { backgroundColor: plugin.color + '18' }]}>
                    <Text style={[styles.platformTagText, { color: plugin.color }]}>{plugin.name}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
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
  searchInput: { flex: 1, fontSize: 14, color: theme.colors.ink, paddingVertical: 2 },
  filterRow: { paddingHorizontal: 20, gap: 8, paddingBottom: 12 },
  filterChip: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 999, backgroundColor: '#fff', borderWidth: 1, borderColor: theme.colors.border },
  filterChipActive: { backgroundColor: theme.colors.ink, borderColor: theme.colors.ink },
  filterText: { fontSize: 12, fontWeight: '600', color: theme.colors.textSecondary },
  filterTextActive: { color: '#fff' },

  card: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border, overflow: 'hidden' },
  accent: { width: 4 },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingBottom: 6 },
  cardTitle: { flex: 1, fontSize: 15, fontWeight: '700', color: theme.colors.ink, marginRight: 8 },
  cardDate: { fontSize: 11, color: theme.colors.textTertiary, fontWeight: '600' },
  langRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, marginBottom: 8 },
  langBox: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  flag: { fontSize: 14 },
  langName: { fontSize: 12, color: theme.colors.ink, fontWeight: '600' },
  preview: { fontSize: 13, color: theme.colors.textSecondary, fontStyle: 'italic', paddingHorizontal: 16, marginBottom: 10, lineHeight: 18 },
  footRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingBottom: 14 },
  metaTag: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: theme.colors.bg, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6 },
  metaText: { fontSize: 11, color: theme.colors.textSecondary, fontWeight: '600' },
  platformTag: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6 },
  platformTagText: { fontSize: 11, fontWeight: '700' },
  empty: { alignItems: 'center', paddingTop: 60, gap: 12 },
  emptyText: { color: theme.colors.textSecondary, fontSize: 14 },
});
