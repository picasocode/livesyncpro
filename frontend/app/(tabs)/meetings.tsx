import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { theme } from '../../src/theme';
import { AVATARS } from '../../src/mock';

const MOCK_MEETINGS = [
  {
    id: '1',
    title: 'STAND UP\nMEETING - WEEK 1',
    status: 'active',
    message: 'The meeting is started.\nPlease, join us!',
    date: '1 Nov 2023',
    time: '9:00 - 9:30 AM',
    attendees: 4,
    avatars: [AVATARS[0], AVATARS[1]],
  },
  {
    id: '2',
    title: 'DESIGN\nDISCUSSION',
    status: 'upcoming',
    message: 'The meeting will be availble in\n2 days.',
    date: '10 Nov 2023',
    time: '9:00 - 9:30 AM',
    attendees: 3,
    avatars: [AVATARS[2], AVATARS[3]],
  },
  {
    id: '3',
    title: 'FRONTEND DEV\nMEETING',
    status: 'upcoming',
    message: 'The meeting will be availble in\n2 days.',
    date: '13 Nov 2023',
    time: '9:00 - 9:30 AM',
    attendees: 7,
    avatars: [AVATARS[4], AVATARS[5]],
  },
];

export default function Meetings() {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <Animated.View entering={FadeInDown.duration(500)} style={styles.header}>
          <View style={styles.headerProfileRow}>
            <Image source={{ uri: AVATARS[5] }} style={styles.profileImg} />
            <View style={styles.headerTextWrap}>
              <Text style={styles.greet}>HELLO, ALEX</Text>
              <Text style={styles.subGreet}>See your meetings today!</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.settingsCircle}>
            <Ionicons name="settings-outline" size={20} color={theme.colors.ink} />
          </TouchableOpacity>
        </Animated.View>

        {/* Filters / Segmented Controls */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.toggleRow}>
          <TouchableOpacity style={styles.activePill}>
            <Text style={styles.activePillText}>List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inactivePill}>
            <Text style={styles.inactivePillText}>Calendar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addCircle}>
            <Ionicons name="add" size={20} color={theme.colors.ink} />
          </TouchableOpacity>
        </Animated.View>

        {/* Meeting Cards List */}
        <View style={styles.meetingsContainer}>
          {MOCK_MEETINGS.map((meeting, i) => {
            const isActive = meeting.status === 'active';
            
            return (
              <Animated.View key={meeting.id} entering={FadeInDown.delay(200 + i * 100).duration(500)}>
                <View style={[styles.meetingCard, isActive ? styles.cardActiveBg : styles.cardInactiveBg]}>
                  
                  <View style={styles.cardHeader}>
                    <Text style={[styles.cardTitle, isActive ? styles.textWhite : styles.textInk]}>
                      {meeting.title}
                    </Text>
                    
                    {/* Avatars Overlapping Stack */}
                    <View style={styles.avatarStackWrap}>
                      <View style={styles.avatarStack}>
                        {meeting.avatars.map((img, idx) => (
                          <Image 
                            key={idx} 
                            source={{ uri: img }} 
                            style={[
                              styles.stackImg, 
                              { marginLeft: idx > 0 ? -12 : 0, borderColor: isActive ? '#2644FE' : '#F3F4F6' }
                            ]} 
                          />
                        ))}
                        <View style={[styles.stackCountBadge, { borderColor: isActive ? '#2644FE' : '#F3F4F6' }]}>
                          <Text style={styles.stackCountText}>+{meeting.attendees}</Text>
                        </View>
                      </View>
                      <Ionicons 
                        name="chevron-forward" 
                        size={18} 
                        color={isActive ? '#fff' : theme.colors.ink} 
                        style={{ marginLeft: 6 }} 
                      />
                    </View>
                  </View>

                  <Text style={[styles.cardMessage, isActive ? styles.textHighlight : styles.textGrey]}>
                    {meeting.message}
                  </Text>

                  <View style={styles.cardFooter}>
                    <View style={[styles.datePill, isActive ? styles.datePillActive : styles.datePillInactive]}>
                      <Text style={[styles.dateText, isActive ? styles.textWhite : styles.textInk]}>
                        {meeting.date}    {meeting.time}
                      </Text>
                    </View>
                    
                    <TouchableOpacity style={[styles.playButton, isActive ? styles.playButtonDark : styles.playButtonDark]}>
                      <Ionicons name="play" size={18} color="#fff" style={{ marginLeft: 3 }} />
                    </TouchableOpacity>
                  </View>
                  
                </View>
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F8F9FB' },
  content: { paddingBottom: 32 },

  /* Header Section */
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 20 },
  headerProfileRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  profileImg: { width: 48, height: 48, borderRadius: 24 },
  headerTextWrap: { justifyContent: 'center' },
  greet: { fontSize: 16, fontWeight: '800', color: theme.colors.ink, letterSpacing: 0.5, marginBottom: 2 },
  subGreet: { fontSize: 14, color: theme.colors.textSecondary, fontWeight: '500' },
  settingsCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: theme.colors.border },

  /* Segmented Controls & Add */
  toggleRow: { flexDirection: 'row', paddingHorizontal: 20, gap: 10, marginBottom: 24 },
  activePill: { flex: 1, backgroundColor: theme.colors.ink, paddingVertical: 14, borderRadius: 999, alignItems: 'center' },
  activePillText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  inactivePill: { flex: 1, backgroundColor: '#fff', paddingVertical: 14, borderRadius: 999, alignItems: 'center', borderWidth: 1, borderColor: theme.colors.border },
  inactivePillText: { color: theme.colors.ink, fontSize: 14, fontWeight: '600' },
  addCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#EBECEF', alignItems: 'center', justifyContent: 'center' },

  /* Meetings List */
  meetingsContainer: { paddingHorizontal: 20, gap: 16 },
  meetingCard: { padding: 24, borderRadius: 32, width: '100%' },
  cardActiveBg: { backgroundColor: '#2644FE' },
  cardInactiveBg: { backgroundColor: '#fff' },
  
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  cardTitle: { fontSize: 18, fontWeight: '800', letterSpacing: -0.5, lineHeight: 24 },
  
  avatarStackWrap: { flexDirection: 'row', alignItems: 'center' },
  avatarStack: { flexDirection: 'row', alignItems: 'center' },
  stackImg: { width: 34, height: 34, borderRadius: 17, borderWidth: 2 },
  stackCountBadge: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#111', alignItems: 'center', justifyContent: 'center', borderWidth: 2, marginLeft: -12 },
  stackCountText: { color: '#fff', fontSize: 11, fontWeight: '700' },

  cardMessage: { fontSize: 13, fontWeight: '600', lineHeight: 20, marginBottom: 28 },
  textHighlight: { color: '#D4FF33' }, // Matches the screenshot's vibrant lime-yellow text
  textGrey: { color: theme.colors.textTertiary },
  textWhite: { color: '#fff' },
  textInk: { color: theme.colors.ink },

  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  datePill: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 999 },
  datePillActive: { backgroundColor: 'rgba(0,0,0,0.15)' },
  datePillInactive: { backgroundColor: '#F3F4F6' },
  dateText: { fontSize: 12, fontWeight: '700' },

  playButton: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  playButtonDark: { backgroundColor: theme.colors.ink },
});