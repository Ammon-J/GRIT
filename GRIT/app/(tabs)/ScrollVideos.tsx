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

import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

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

export default function ScrollVideos() {
  const [videoId, setVideoId] = useState("dQw4w9WgXcQ");

  const position = useSharedValue(0);
  const flingUp = Gesture.Fling()
    .direction(Directions.UP)
    .onStart((e) => {
      //position.value = withTiming(position.value - 100, { duration: 100 });
      console.log("Swiped up");
    });
    const flingDown = Gesture.Fling()
        .direction(Directions.DOWN)
        .onStart((e) => {
            console.log("Swiped down");
            setVideoId("newVideoId");
        });
    const composed = Gesture.Simultaneous(flingUp, flingDown)

  const urls: String[] = ["ckZlj2p8W9M","gpGUbcRwy3g","KKgpIukWJdM"];

  var whatever = 0;

  return (
    <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
            <GestureDetector gesture={composed}>
              <View collapsable={false} style={{ flex: 1 }}>
                <WebView source={{ uri: embedUrl }}  style={{ flex: 1 }}  allowsFullscreenVideo/>
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