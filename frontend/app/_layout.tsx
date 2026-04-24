import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="live" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="transcript/[id]" />
        <Stack.Screen name="plugin/[id]" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="call/new" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="team" />
        <Stack.Screen name="pricing" options={{ animation: 'slide_from_bottom' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
