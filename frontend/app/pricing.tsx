import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { theme } from '../src/theme';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: { m: 0, y: 0 },
    tagline: 'For casual calls',
    features: ['60 min / month', '3 languages', 'Mobile app only', 'Community support'],
    cta: 'Current plan',
    highlight: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: { m: 19, y: 15 },
    tagline: 'For global professionals',
    features: ['Unlimited minutes', 'All 9 languages', 'All plugins (Meet, Zoom, Teams, Slack)', 'Voice cloning', 'Export transcripts', 'Priority support'],
    cta: 'Upgrade to Pro',
    highlight: true,
  },
  {
    id: 'team',
    name: 'Business',
    price: { m: 49, y: 39 },
    tagline: 'For distributed teams',
    features: ['Everything in Pro', 'Up to 25 seats', 'SSO & SCIM', 'Admin analytics', 'Custom vocabulary', 'Dedicated CSM'],
    cta: 'Start free trial',
    highlight: false,
  },
];

export default function Pricing() {
  const router = useRouter();
  const [billing, setBilling] = useState<'m' | 'y'>('y');

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} testID="pricing-back-btn">
          <Ionicons name="close" size={22} color={theme.colors.ink} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Plans</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroBadge}>
            <Ionicons name="sparkles" size={11} color={theme.colors.brand} />
            <Text style={styles.heroBadgeText}>LIMITED · 20% OFF YEARLY</Text>
          </View>
          <Text style={styles.heroTitle}>Translate every{'\n'}meeting, everywhere.</Text>
          <Text style={styles.heroSub}>One subscription · mobile app + all plugins</Text>
        </View>

        {/* Billing toggle */}
        <View style={styles.toggle}>
          <TouchableOpacity
            style={[styles.toggleBtn, billing === 'm' && styles.toggleBtnActive]}
            onPress={() => setBilling('m')}
            testID="pricing-toggle-monthly"
          >
            <Text style={[styles.toggleText, billing === 'm' && styles.toggleTextActive]}>Monthly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, billing === 'y' && styles.toggleBtnActive]}
            onPress={() => setBilling('y')}
            testID="pricing-toggle-yearly"
          >
            <Text style={[styles.toggleText, billing === 'y' && styles.toggleTextActive]}>Yearly</Text>
            <View style={styles.saveTag}>
              <Text style={styles.saveTagText}>-20%</Text>
            </View>
          </TouchableOpacity>
        </View>

        {PLANS.map((p) => (
          <View
            key={p.id}
            style={[styles.card, p.highlight && styles.cardHighlight]}
            testID={`pricing-card-${p.id}`}
          >
            {p.highlight && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularText}>MOST POPULAR</Text>
              </View>
            )}
            <Text style={[styles.planName, p.highlight && { color: '#fff' }]}>{p.name}</Text>
            <Text style={[styles.planTag, p.highlight && { color: 'rgba(255,255,255,0.7)' }]}>{p.tagline}</Text>

            <View style={styles.priceRow}>
              <Text style={[styles.price, p.highlight && { color: '#fff' }]}>
                ${p.price[billing]}
              </Text>
              <Text style={[styles.priceUnit, p.highlight && { color: 'rgba(255,255,255,0.7)' }]}>
                /{billing === 'y' ? 'mo, billed yearly' : 'month'}
              </Text>
            </View>

            <View style={{ gap: 10, marginTop: 16, marginBottom: 20 }}>
              {p.features.map((f) => (
                <View key={f} style={styles.feat}>
                  <View style={[styles.check, p.highlight && { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
                    <Ionicons name="checkmark" size={12} color={p.highlight ? '#fff' : theme.colors.brand} />
                  </View>
                  <Text style={[styles.featText, p.highlight && { color: '#fff' }]}>{f}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.cta, p.highlight && styles.ctaHighlight, p.id === 'free' && styles.ctaDisabled]}
              testID={`pricing-cta-${p.id}`}
              disabled={p.id === 'free'}
            >
              <Text style={[styles.ctaText, p.highlight && { color: theme.colors.ink }, p.id === 'free' && { color: theme.colors.textSecondary }]}>
                {p.cta}
              </Text>
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.guarantee}>
          <Ionicons name="shield-checkmark" size={22} color={theme.colors.success} />
          <View style={{ flex: 1 }}>
            <Text style={styles.guaranteeTitle}>14-day money-back guarantee</Text>
            <Text style={styles.guaranteeSub}>Cancel anytime · no questions asked</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.bg },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 10, gap: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: theme.colors.border },
  headerTitle: { flex: 1, fontSize: 16, fontWeight: '700', color: theme.colors.ink, textAlign: 'center' },

  hero: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 20 },
  heroBadge: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: theme.colors.brandSoft, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 999, marginBottom: 14 },
  heroBadgeText: { color: theme.colors.brand, fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  heroTitle: { fontSize: 34, fontWeight: '800', color: theme.colors.ink, letterSpacing: -1.2, lineHeight: 40 },
  heroSub: { fontSize: 14, color: theme.colors.textSecondary, marginTop: 8 },

  toggle: { flexDirection: 'row', backgroundColor: '#fff', marginHorizontal: 20, borderRadius: 12, padding: 4, marginBottom: 20, borderWidth: 1, borderColor: theme.colors.border },
  toggleBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 6, borderRadius: 8 },
  toggleBtnActive: { backgroundColor: theme.colors.ink },
  toggleText: { fontSize: 13, fontWeight: '700', color: theme.colors.textSecondary },
  toggleTextActive: { color: '#fff' },
  saveTag: { backgroundColor: theme.colors.brand, paddingVertical: 2, paddingHorizontal: 6, borderRadius: 6 },
  saveTagText: { color: '#fff', fontSize: 9, fontWeight: '800' },

  card: { marginHorizontal: 20, marginBottom: 14, padding: 22, backgroundColor: '#fff', borderRadius: 20, borderWidth: 1, borderColor: theme.colors.border },
  cardHighlight: { backgroundColor: theme.colors.ink, borderColor: theme.colors.ink },
  popularBadge: { position: 'absolute', top: -1, right: 22, backgroundColor: theme.colors.brand, paddingVertical: 4, paddingHorizontal: 10, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 },
  popularText: { color: '#fff', fontSize: 9, fontWeight: '800', letterSpacing: 1 },

  planName: { fontSize: 22, fontWeight: '800', color: theme.colors.ink, letterSpacing: -0.5 },
  planTag: { fontSize: 12, color: theme.colors.textSecondary, marginTop: 2, marginBottom: 16 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6 },
  price: { fontSize: 42, fontWeight: '800', color: theme.colors.ink, letterSpacing: -1.5 },
  priceUnit: { fontSize: 12, color: theme.colors.textSecondary, fontWeight: '600' },

  feat: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  check: { width: 20, height: 20, borderRadius: 10, backgroundColor: theme.colors.brandSoft, alignItems: 'center', justifyContent: 'center' },
  featText: { fontSize: 13, color: theme.colors.ink, fontWeight: '500', flex: 1 },

  cta: { paddingVertical: 14, borderRadius: 12, alignItems: 'center', backgroundColor: theme.colors.brand },
  ctaHighlight: { backgroundColor: '#fff' },
  ctaDisabled: { backgroundColor: theme.colors.bg },
  ctaText: { color: '#fff', fontSize: 14, fontWeight: '800' },

  guarantee: { marginHorizontal: 20, marginTop: 10, padding: 16, backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: theme.colors.border, flexDirection: 'row', alignItems: 'center', gap: 12 },
  guaranteeTitle: { fontSize: 14, fontWeight: '700', color: theme.colors.ink },
  guaranteeSub: { fontSize: 12, color: theme.colors.textSecondary, marginTop: 2 },
});
