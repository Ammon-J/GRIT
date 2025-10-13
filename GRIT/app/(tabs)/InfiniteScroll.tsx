// InfiniteVideoScroll.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const { height, width } = Dimensions.get('window');

const colors = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFD93D'];

export default function InfiniteVideoScroll() {
  const [colorIndex, setColorIndex] = useState(0);
  const translateY = useSharedValue(0);

  // Function to call on left/right swipe
  const handleHorizontalSwipe = (direction: 'left' | 'right') => {
    console.log(`Swiped ${direction}!`);
    // You can replace this with navigation, API call, etc.
  };

  // Gesture for vertical swipes (color change)
  const verticalGesture = Gesture.Fling()
    .direction(1 | 2) // 1 = up, 2 = down
    .onEnd((e) => {
      setColorIndex((prev) => {
        if (e.direction === 1) {
          // Swipe up → next color
          return (prev + 1) % colors.length;
        } else if (e.direction === 2) {
          // Swipe down → previous color
          return (prev - 1 + colors.length) % colors.length;
        }
        return prev;
      });
    });

  // Gesture for horizontal swipes (function call)
  const horizontalGesture = Gesture.Fling()
    .direction(3 | 4) // 3 = left, 4 = right
    .onEnd((e) => {
      if (e.direction === 3) {
        handleHorizontalSwipe('left');
      } else if (e.direction === 4) {
        handleHorizontalSwipe('right');
      }
    });

  // Combine gestures
  const composed = Gesture.Simultaneous(verticalGesture, horizontalGesture);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(colors[colorIndex], { duration: 300 }),
    };
  });

  return (
    <GestureHandlerRootView>
    <GestureDetector gesture={composed}>
      <Animated.View style={[styles.container, animatedStyle]} />
    </GestureDetector>
    </GestureHandlerRootView>
  );
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
