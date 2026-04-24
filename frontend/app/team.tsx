import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme } from '../src/theme';
import { TEAM, getLang } from '../src/mock';

export default function Team() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} testID="team-back-btn">
          <Ionicons name="chevron-back" size={22} color={theme.colors.ink} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Team</Text>
        <TouchableOpacity style={[styles.backBtn, styles.inviteBtn]} testID="team-invite-btn">
          <Ionicons name="person-add" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {/* Workspace card */}
        <View style={styles.wsCard}>
          <View style={styles.wsLogo}>
            <Text style={styles.wsLogoText}>A</Text>
          </View>
          <Text style={styles.wsName}>Acme Global</Text>
          <Text style={styles.wsDomain}>acme.lingualive.app</Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statNum}>5</Text>
              <Text style={styles.statLabel}>Members</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNum}>12h</Text>
              <Text style={styles.statLabel}>This month</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNum}>6</Text>
              <Text style={styles.statLabel}>Languages</Text>
            </View>
          </View>
        </View>

        {/* Usage */}
        <View style={styles.usageCard}>
          <View style={styles.usageRow}>
            <Text style={styles.usageTitle}>Pro seats</Text>
            <Text style={styles.usageValue}>5 of 7 used</Text>
          </View>
          <View style={styles.usageBar}>
            <View style={[styles.usageFill, { width: '71%' }]} />
          </View>
          <TouchableOpacity style={styles.usageCta} onPress={() => router.push('/pricing')} testID="team-add-seats-btn">
            <Text style={styles.usageCtaText}>Add seats</Text>
            <Ionicons name="arrow-forward" size={14} color={theme.colors.brand} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionLabel}>MEMBERS · {TEAM.length}</Text>
        <View style={styles.list}>
          {TEAM.map((m, i) => {
            const lang = getLang(m.lang);
            return (
              <View key={m.id}>
                <TouchableOpacity style={styles.memberRow} testID={`team-member-${m.id}`}>
                  <Image source={{ uri: m.avatar }} style={styles.memberAvatar} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.memberName}>{m.name}</Text>
                    <Text style={styles.memberEmail}>{m.email}</Text>
                  </View>
                  <View style={styles.memberLang}>
                    <Text style={styles.memberFlag}>{lang.flag}</Text>
                  </View>
                  <View style={[styles.roleBadge, m.role === 'Admin' && styles.roleAdmin]}>
                    <Text style={[styles.roleText, m.role === 'Admin' && { color: theme.colors.brand }]}>{m.role}</Text>
                  </View>
                </TouchableOpacity>
                {i < TEAM.length - 1 && <View style={styles.divider} />}
              </View>
            );
          })}
        </View>

        <TouchableOpacity style={styles.inviteBig} testID="team-invite-big-btn">
          <Ionicons name="link-outline" size={18} color={theme.colors.ink} />
          <View style={{ flex: 1 }}>
            <Text style={styles.inviteBigTitle}>Invite link</Text>
            <Text style={styles.inviteBigSub}>lingualive.app/join/acme-x8k2</Text>
          </View>
          <View style={styles.copyBtn}>
            <Ionicons name="copy-outline" size={16} color="#fff" />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.bg },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, gap: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: theme.colors.border },
  inviteBtn: { backgroundColor: theme.colors.ink, borderColor: theme.colors.ink },
  headerTitle: { flex: 1, fontSize: 16, fontWeight: '700', color: theme.colors.ink, textAlign: 'center' },

  wsCard: { margin: 20, padding: 24, backgroundColor: theme.colors.ink, borderRadius: 20, alignItems: 'center' },
  wsLogo: { width: 56, height: 56, borderRadius: 14, backgroundColor: theme.colors.brand, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  wsLogoText: { color: '#fff', fontSize: 26, fontWeight: '800' },
  wsName: { color: '#fff', fontSize: 22, fontWeight: '800', letterSpacing: -0.5 },
  wsDomain: { color: theme.colors.textTertiary, fontSize: 12, marginTop: 2, marginBottom: 20 },
  statsRow: { flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch', paddingTop: 16, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)' },
  stat: { flex: 1, alignItems: 'center' },
  statNum: { color: '#fff', fontSize: 20, fontWeight: '800' },
  statLabel: { color: theme.colors.textTertiary, fontSize: 10, fontWeight: '700', letterSpacing: 0.8, marginTop: 3 },
  statDivider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.1)' },

  usageCard: { marginHorizontal: 20, marginBottom: 24, padding: 18, backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: theme.colors.border },
  usageRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  usageTitle: { fontSize: 14, fontWeight: '700', color: theme.colors.ink },
  usageValue: { fontSize: 12, color: theme.colors.textSecondary, fontWeight: '600' },
  usageBar: { height: 6, backgroundColor: theme.colors.bg, borderRadius: 3, overflow: 'hidden', marginBottom: 12 },
  usageFill: { height: '100%', backgroundColor: theme.colors.brand, borderRadius: 3 },
  usageCta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  usageCtaText: { fontSize: 12, fontWeight: '700', color: theme.colors.brand },

  sectionLabel: { fontSize: 11, fontWeight: '800', color: theme.colors.textTertiary, letterSpacing: 1.4, marginHorizontal: 20, marginBottom: 8 },
  list: { marginHorizontal: 20, backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: theme.colors.border, overflow: 'hidden', marginBottom: 20 },
  memberRow: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  memberAvatar: { width: 40, height: 40, borderRadius: 20 },
  memberName: { fontSize: 14, fontWeight: '700', color: theme.colors.ink },
  memberEmail: { fontSize: 12, color: theme.colors.textSecondary, marginTop: 2 },
  memberLang: { width: 26, height: 26, borderRadius: 13, backgroundColor: theme.colors.bg, alignItems: 'center', justifyContent: 'center' },
  memberFlag: { fontSize: 13 },
  roleBadge: { paddingVertical: 4, paddingHorizontal: 9, borderRadius: 999, backgroundColor: theme.colors.bg },
  roleAdmin: { backgroundColor: theme.colors.brandSoft },
  roleText: { fontSize: 10, fontWeight: '800', color: theme.colors.textSecondary, letterSpacing: 0.5 },
  divider: { height: 1, backgroundColor: theme.colors.border, marginLeft: 66 },

  inviteBig: { flexDirection: 'row', alignItems: 'center', gap: 12, marginHorizontal: 20, padding: 16, backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: theme.colors.border },
  inviteBigTitle: { fontSize: 13, fontWeight: '700', color: theme.colors.ink, marginBottom: 2 },
  inviteBigSub: { fontSize: 12, color: theme.colors.textSecondary },
  copyBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: theme.colors.ink, alignItems: 'center', justifyContent: 'center' },
});
