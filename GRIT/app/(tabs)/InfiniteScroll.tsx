// InfiniteVideoScroll.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { GestureHandlerRootView, Gesture, GestureDetector, Directions } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring
} from 'react-native-reanimated';

const { height, width } = Dimensions.get('window');

const colors = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFD93D'];

export default function Vid() {
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0});

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateX: offset.value.x },
        { scale: withSpring(isPressed.value ? 1.2 : 1) },
      ],
      backgroundColor: isPressed.value ? 'yellow' : 'blue',
    };
  });

  const start = useSharedValue({ x: 0, y: 0});
  const gesture = Gesture.Pan()
  .onBegin(() => {
    isPressed.value = true;
  })
  .onUpdate((e) => {
    offset.value = {
      x: e.translationX + start.value.x,
      y: e.translationY + start.value.y,
    }
  })
  .onEnd(() => {
    start.value = {
      x: offset.value.x,
      y: offset.value.y,
    }
  })
  .onFinalize(() => {
    isPressed.value = false;
  })


  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, animatedStyles]} />
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
