// InfiniteVideoScroll.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { GestureHandlerRootView, Gesture, Directions } from 'react-native-gesture-handler';
import GestureDetector, { GesturePath, Cursor } from "react-native-gesture-detector";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring
} from 'react-native-reanimated';
import { WebView } from 'react-native-webview';

const YouTubeEmbed = ({ videoId }: { videoId: string }) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}?controls=1&autoplay=0`;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: embedUrl }}
        style={styles.webview}
        allowsFullscreenVideo
      />
    </View>
  );
};
const { height, width } = Dimensions.get('window');

const colors = ['#FF6B6B', '#6BCB77', '#4D96FF', '#FFD93D'];

const gestures = {
  "Left": [
    {x: 0, y: 0},
    {x: -10, y: 0}
  ],
  "Right": [
    {x: 0, y: 0},
    {x: 10, y: 0}
  ],
  "Up": [
    {x: 0, y: 0},
    {x: 0, y: -10}
  ],
  "Down": [
    {x: 0, y: 0},
    {x: 0, y: 10}
  ]
}

function Speak()
{
  console.log("No");
}

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

  const MultipleScreen = () => {
  const [progress, setProgress] = useState(null);
  const [gesture, setGesture] = useState(null);

  return (
    <GestureDetector onGestureFinish={gesture => Speak()}
            gestures={gestures}>
              {({}) => (
    <YouTubeEmbed videoId="ckZlj2p8W9M" />
    )}
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
}