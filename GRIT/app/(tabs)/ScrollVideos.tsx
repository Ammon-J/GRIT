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
  runOnJS,
} from 'react-native-reanimated';
import { WebView } from 'react-native-webview';

import { scheduleOnRN } from 'react-native-worklets';

import { useRef, useState } from 'react';

import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

function createEmbedUrl(vidId: string) {
  return `https://www.youtube.com/shorts/${vidId}?controls=1&autoplay=0`;
}

export default function ScrollVideos() {
  // const webViewRef = useRef<any | null>(null);
  // const [videoId, setVideoId] = useState("t34muYc261o");
  const [embedUrl, setEmbedUrl] = useState(`https://www.youtube.com/shorts/t34muYc261o?controls=1&autoplay=0`);

  const YouTubeEmbed = () => {

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

  // const position = useSharedValue(0);
  const flingUp = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => {
      //position.value = withTiming(position.value - 100, { duration: 100 });
      console.log("Swiped up");
      setVideoId("3KtWQJuRSmI"); // ScheduleOnRN did not fix the crash
      setEmbedUrl(createEmbedUrl(videoId));
    });
    const flingDown = Gesture.Fling()
        .direction(Directions.DOWN)
        .onStart((e) => {
            console.log("Swiped down");
            setVideoId("Ll0RattR1DE"); // Change when we make an API call
            setEmbedUrl(createEmbedUrl(videoId));
        });
    const composed = Gesture.Simultaneous(flingUp, flingDown)

  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
            <GestureDetector gesture={composed}>
              <View collapsable={false} style={{ flex: 1 }}>
                <WebView
                  // ref={webViewRef}
                  key={embedUrl}
                  source={{ uri: embedUrl }}
                  style={styles.webview}
                  allowsFullscreenVideo={false}
                  scrollEnabled={false}
                  pointerEvents="none"
                />
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