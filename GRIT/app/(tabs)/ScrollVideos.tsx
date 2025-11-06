import { View, Text, StyleSheet } from 'react-native';
import {
  Gesture,
  GestureDetector,
  Directions,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { WebView } from 'react-native-webview';

import { useState } from 'react';

import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

let videoId = "t34muYc261o";

const YouTubeEmbed = () => {
  const embedUrl = `https://www.youtube.com/shorts/${videoId}?controls=1&autoplay=0`;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: embedUrl }}
        style={styles.webview}
        allowsFullscreenVideo={false}
        scrollEnabled={false}
        pointerEvents="none"
      />
    </View>
  );
};

function updateVideoId(x: String)
{
  videoId = "3KtWQJuRSmI";
}

export default function ScrollVideos() {
  // const [videoId, setVideoId] = useState("t34muYc261o");

  // const position = useSharedValue(0);
  const flingUp = Gesture.Fling()
    .direction(Directions.UP)
    .onStart((e) => {
      //position.value = withTiming(position.value - 100, { duration: 100 });
      console.log("Swiped up");
      updateVideoId("3KtWQJuRSmI");
    });
    const flingDown = Gesture.Fling()
        .direction(Directions.DOWN)
        .onStart((e) => {
            console.log("Swiped down");
            updateVideoId("Ll0RattR1DE"); // Change when we make an API call
        });
    const composed = Gesture.Simultaneous(flingUp, flingDown)

  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
            <GestureDetector gesture={composed}>
              <View collapsable={false} style={{ flex: 1 }}>
                <YouTubeEmbed/>
              </View>
            </GestureDetector>
        </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  webview: {
    flex: 1,
  },
});