import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { ReactNode } from 'react';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  onPress?: () => void;
  style?: any;
  children: ReactNode;
  testID?: string;
  haptic?: 'light' | 'medium' | 'heavy' | 'none';
  disabled?: boolean;
  pressScale?: number;
};

export default function PressableScale({
  onPress,
  style,
  children,
  testID,
  haptic = 'light',
  disabled,
  pressScale = 0.95,
}: Props) {
  const scale = useSharedValue(1);
  const aStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <AnimatedPressable
      testID={testID}
      disabled={disabled}
      onPressIn={() => {
        scale.value = withSpring(pressScale, { damping: 18, stiffness: 320 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 15, stiffness: 300 });
      }}
      onPress={() => {
        if (haptic === 'heavy') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});
        else if (haptic === 'medium') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
        else if (haptic === 'light') Haptics.selectionAsync().catch(() => {});
        onPress?.();
      }}
      style={[aStyle, style]}
    >
      {children}
    </AnimatedPressable>
  );
}
