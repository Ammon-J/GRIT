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

import { useState } from 'react';

import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

function createEmbedUrl(vidId: string) {
  return `https://www.youtube.com/shorts/${vidId}?controls=1&autoplay=0`;
}

export default function ScrollVideos() {
  const [videoId, setVideoId] = useState("t34muYc261o");
  const [embedUrl, setEmbedUrl] = useState(`https://www.youtube.com/shorts/t34muYc261o?controls=1&autoplay=0`);

  // Helper to update both videoId and embedUrl on the JS thread
  const updateVideo = (id: string) => {
    setVideoId(id);
    setEmbedUrl(createEmbedUrl(id));
  };

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
      console.log('Swiped up');
      // runOnJS ensures we call JS-thread state setters from the worklet
      runOnJS(updateVideo)('3KtWQJuRSmI');
    });
    const flingDown = Gesture.Fling()
        .direction(Directions.DOWN)
        .onStart((e) => {
            console.log("Swiped down");
            // Use runOnJS to safely update React state from the gesture worklet
            runOnJS(updateVideo)('Ll0RattR1DE'); // Change when we make an API call
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