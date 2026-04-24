import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform, View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useEffect } from 'react';
import { theme } from '../../src/theme';

function TabIcon({ name, focused, color }: { name: any; focused: boolean; color: string }) {
  const scale = useSharedValue(1);
  useEffect(() => {
    scale.value = withSpring(focused ? 1.12 : 1, { damping: 12, stiffness: 260 });
  }, [focused, scale]);
  const aStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <Animated.View style={[aStyle, styles.iconWrap]}>
      <Ionicons name={name} size={22} color={color} />
      {focused && <View style={styles.activeDot} />}
    </Animated.View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.ink,
        tabBarInactiveTintColor: theme.colors.textTertiary,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700', marginTop: 2 },
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Calls',
          tabBarIcon: ({ color, focused }) => (
            <View testID="tab-calls-icon"><TabIcon name={focused ? 'call' : 'call-outline'} focused={focused} color={color} /></View>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, focused }) => (
            <View testID="tab-history-icon"><TabIcon name={focused ? 'time' : 'time-outline'} focused={focused} color={color} /></View>
          ),
        }}
      />
      <Tabs.Screen
        name="plugins"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, focused }) => (
            <View testID="tab-discover-icon"><TabIcon name={focused ? 'sparkles' : 'sparkles-outline'} focused={focused} color={color} /></View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <View testID="tab-settings-icon"><TabIcon name={focused ? 'settings' : 'settings-outline'} focused={focused} color={color} /></View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: { alignItems: 'center', justifyContent: 'center' },
  activeDot: { position: 'absolute', bottom: -6, width: 4, height: 4, borderRadius: 2, backgroundColor: theme.colors.brand },
});
