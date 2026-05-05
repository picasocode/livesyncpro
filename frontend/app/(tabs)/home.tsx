import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import PressableScale from '../../src/components/PressableScale';
import { theme } from '../../src/theme';
import { CONTACTS, ACTIVITY, AVATARS, getLang, getContact } from '../../src/mock';

const STATUS_COLORS: Record<string, string> = {
  online: '#10B981',
  away: '#F59E0B',
  offline: '#A1A1AA',
};

const TYPE_META: Record<string, { icon: any; color: string; label: string }> = {
  call: { icon: 'call', color: '#0055FF', label: 'Call' },
  meeting: { icon: 'people', color: '#10B981', label: 'Meeting' },
  talk: { icon: 'radio', color: '#FF3366', label: 'Talk' },
};

export default function Calls() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <Animated.View entering={FadeInDown.duration(500)} style={styles.header}>
          <View>
            <Text style={styles.greet}>Good morning,</Text>
            <Text style={styles.name}>Alex ✳︎</Text>
          </View>
          {/* PFP acts as settings button now */}
          <PressableScale 
            style={styles.profileBtn} 
            testID="calls-profile-btn"
            onPress={() => router.push('/settings' as any)}
          >
            <Image source={{ uri: AVATARS[5] }} style={styles.profileImg} />
            <View style={[styles.presenceDot, { backgroundColor: STATUS_COLORS.online }]} />
          </PressableScale>
        </Animated.View>

        {/* Favorite contacts */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Favorites</Text>
            <PressableScale testID="calls-favorites-all-btn" pressScale={0.97}>
              <Text style={styles.seeAll}>All contacts</Text>
            </PressableScale>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}
          >
            <PressableScale
              style={styles.addContact}
              onPress={() => router.push('/call/new')}
              testID="calls-contact-add"
            >
              <View style={styles.addCircle}>
                <Ionicons name="add" size={24} color={theme.colors.brand} />
              </View>
              <Text style={styles.contactName}>Add</Text>
            </PressableScale>
            {CONTACTS.map((c, i) => {
              const lang = getLang(c.lang);
              return (
                <Animated.View key={c.id} entering={FadeInRight.delay(150 + i * 60).duration(400)}>
                  <PressableScale
                    style={styles.contactItem}
                    onPress={() => router.push(`/live?mode=call&contact=${c.id}` as any)}
                    haptic="medium"
                    testID={`calls-contact-${c.id}`}
                  >
                    <View style={styles.contactAvatarWrap}>
                      <Image source={{ uri: c.avatar }} style={styles.contactAvatar} />
                      <View style={[styles.contactPresence, { backgroundColor: STATUS_COLORS[c.status] }]} />
                      <View style={styles.contactFlag}>
                        <Text style={{ fontSize: 10 }}>{lang.flag}</Text>
                      </View>
                    </View>
                    <Text style={styles.contactName} numberOfLines={1}>{c.name.split(' ')[0]}</Text>
                    <Text style={styles.contactSub} numberOfLines={1}>{c.location}</Text>
                  </PressableScale>
                </Animated.View>
              );
            })}
          </ScrollView>
        </Animated.View>

        {/* Recent activity */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent</Text>
            <PressableScale
              onPress={() => router.push('/(tabs)/history')}
              testID="calls-history-all-btn"
              pressScale={0.97}
            >
              <Text style={styles.seeAll}>See all</Text>
            </PressableScale>
          </View>

          {ACTIVITY.slice(0, 4).map((a, i) => {
            const meta = TYPE_META[a.type];
            const from = getLang(a.from);
            const to = getLang(a.to);
            const contact = getContact(a.contactId);
            return (
              <Animated.View key={a.id} entering={FadeInDown.delay(250 + i * 70).duration(400)}>
                <PressableScale
                  style={styles.activityRow}
                  onPress={() => router.push(a.type === 'call' ? `/live?mode=call&contact=${a.contactId || ''}` as any : `/transcript/${a.id}` as any)}
                  testID={`calls-activity-${a.id}`}
                  pressScale={0.98}
                >
                  <View style={styles.actIconWrap}>
                    {contact ? (
                      <Image source={{ uri: contact.avatar }} style={styles.actAvatar} />
                    ) : (
                      <View style={[styles.actIconBg, { backgroundColor: meta.color + '18' }]}>
                        <Ionicons name={meta.icon} size={18} color={meta.color} />
                      </View>
                    )}
                    <View style={[styles.actTypeDot, { backgroundColor: meta.color }]}>
                      <Ionicons name={meta.icon} size={9} color="#fff" />
                    </View>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.actTitle, a.missed && { color: theme.colors.error }]} numberOfLines={1}>
                      {a.direction === 'incoming' && !a.missed && '↓ '}
                      {a.direction === 'outgoing' && !a.missed && '↑ '}
                      {a.missed && '⚠︎ '}
                      {a.title}
                    </Text>
                    <View style={styles.actMeta}>
                      <Text style={styles.actSub}>{meta.label}</Text>
                      <View style={styles.actDot} />
                      <Text style={styles.actFlag}>{from.flag}</Text>
                      <Ionicons name="arrow-forward" size={10} color={theme.colors.textTertiary} />
                      <Text style={styles.actFlag}>{to.flag}</Text>
                      <View style={styles.actDot} />
                      <Text style={styles.actSub} numberOfLines={1}>{a.date.split('·')[0].trim()}</Text>
                    </View>
                  </View>
                  {a.type === 'call' ? (
                    <PressableScale
                      style={[styles.callBack, { backgroundColor: meta.color }]}
                      onPress={() => router.push(`/live?mode=call&contact=${a.contactId || ''}` as any)}
                      haptic="medium"
                      testID={`calls-callback-${a.id}`}
                    >
                      <Ionicons name="call" size={14} color="#fff" />
                    </PressableScale>
                  ) : (
                    <View style={styles.durationPill}>
                      <Text style={styles.durationText}>{a.duration}</Text>
                    </View>
                  )}
                </PressableScale>
              </Animated.View>
            );
          })}
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(500)}>
          <PressableScale
            style={styles.upgradeBanner}
            onPress={() => router.push('/pricing')}
            testID="calls-upgrade-banner"
            pressScale={0.98}
          >
            <View style={styles.upgradeIcon}>
              <Ionicons name="sparkles" size={18} color={theme.colors.brand} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.upgradeTitle}>Unlock Pro · unlimited calls</Text>
              <Text style={styles.upgradeSub}>Clone your voice in 9 languages</Text>
            </View>
            <Ionicons name="arrow-forward" size={18} color={theme.colors.brand} />
          </PressableScale>
        </Animated.View>
      </ScrollView>

      {/* FLOATING DIALER */}
      <TouchableOpacity 
        style={styles.fab} 
        activeOpacity={0.8}
        onPress={() => router.push('/call/new')}
      >
        <Ionicons name="keypad" size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.bg },
  content: { paddingBottom: 100 }, 
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 8, paddingBottom: 20 },
  greet: { fontSize: 14, color: theme.colors.textSecondary, fontWeight: '500' },
  name: { fontSize: 26, fontWeight: '800', color: theme.colors.ink, letterSpacing: -0.8, marginTop: 2 },
  profileBtn: { width: 44, height: 44, borderRadius: 22, position: 'relative' },
  profileImg: { width: '100%', height: '100%', borderRadius: 22 },
  presenceDot: { position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderRadius: 6, borderWidth: 2, borderColor: theme.colors.bg },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 12, marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: theme.colors.ink, letterSpacing: -0.4 },
  seeAll: { fontSize: 13, fontWeight: '700', color: theme.colors.brand },

  addContact: { alignItems: 'center', width: 64, gap: 4, paddingBottom: 24 },
  addCircle: { width: 56, height: 56, borderRadius: 28, backgroundColor: theme.colors.brandSoft, borderWidth: 2, borderColor: theme.colors.brand, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center' },
  contactItem: { alignItems: 'center', width: 70, gap: 4, paddingBottom: 24 },
  contactAvatarWrap: { position: 'relative', marginBottom: 4 },
  contactAvatar: { width: 56, height: 56, borderRadius: 28 },
  contactPresence: { position: 'absolute', bottom: 1, right: 1, width: 12, height: 12, borderRadius: 6, borderWidth: 2, borderColor: theme.colors.bg },
  contactFlag: { position: 'absolute', top: -3, right: -3, width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: theme.colors.bg },
  contactName: { fontSize: 12, fontWeight: '700', color: theme.colors.ink },
  contactSub: { fontSize: 10, color: theme.colors.textTertiary, fontWeight: '500' },

  activityRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginHorizontal: 20, marginBottom: 10, padding: 12, backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: theme.colors.border },
  actIconWrap: { position: 'relative' },
  actAvatar: { width: 44, height: 44, borderRadius: 22 },
  actIconBg: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  actTypeDot: { position: 'absolute', bottom: -2, right: -2, width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  actTitle: { fontSize: 14, fontWeight: '700', color: theme.colors.ink, marginBottom: 3 },
  actMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  actSub: { fontSize: 11, color: theme.colors.textSecondary, fontWeight: '500' },
  actFlag: { fontSize: 12 },
  actDot: { width: 2, height: 2, borderRadius: 1, backgroundColor: theme.colors.textTertiary },
  callBack: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  durationPill: { backgroundColor: theme.colors.bg, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6 },
  durationText: { fontSize: 11, fontWeight: '700', color: theme.colors.textSecondary },

  upgradeBanner: { marginHorizontal: 20, marginTop: 16, flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fff', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: theme.colors.border },
  upgradeIcon: { width: 40, height: 40, borderRadius: 10, backgroundColor: theme.colors.brandSoft, alignItems: 'center', justifyContent: 'center' },
  upgradeTitle: { color: theme.colors.ink, fontSize: 14, fontWeight: '800', marginBottom: 2 },
  upgradeSub: { color: theme.colors.textSecondary, fontSize: 11 },

  /* Floating Dialer */
  fab: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 16,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#000', 
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});