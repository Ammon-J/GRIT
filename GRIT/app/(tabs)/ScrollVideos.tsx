import { View, Text, StyleSheet } from 'react-native';
import {
  Gesture,
  GestureDetector,
  Directions,
} from 'react-native-gesture-handler';
import { getNextVideoId } from './databaseInterface';
import { scheduleOnRN } from 'react-native-worklets';
import { WebView } from 'react-native-webview';

import { useState } from 'react';

import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

function createEmbedUrl(vidId: string) {
  return `https://www.youtube.com/shorts/${vidId}?controls=1&autoplay=0`;
}

export default function ScrollVideos() {
  // const webViewRef = useRef<any | null>(null);
  // const [embedUrl, setEmbedUrl] = useState(`https://www.youtube.com/shorts/t34muYc261o?controls=1&autoplay=0`);
  const [embedUrl, setEmbedUrl] = useState(`https://gritblob.blob.core.windows.net/videos/Barbell-Back-Squat.mp4`);

  // "https://<your-storage-account>.blob.core.windows.net/<container>/<video.mp4>?<sas-token>";

  // Helper to update the embed URL from the JS thread. Gesture handlers run as worklets
  // on the UI thread, so use runOnJS(updateEmbed)('vid') to call this safely.
  const updateEmbed = (direction: boolean) => {
    // Call API to get next video
    // This is terrible, what if they swipe left or right?
    // The answer is you call a different function.
    if (direction === false) {
      //setEmbedUrl(createEmbedUrl('3KtWQJuRSmI'));
      setEmbedUrl(createEmbedUrl(getNextVideoId(true)));
    }
    else {
      //setEmbedUrl(createEmbedUrl('Ll0RattR1DE'));
      setEmbedUrl(createEmbedUrl(getNextVideoId(false)));
    }
  };

  // const position = useSharedValue(0);
  const flingUp = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => {
      //position.value = withTiming(position.value - 100, { duration: 100 });
      console.log('Swiped up');
      // Call the JS-thread updater with the new video id
      scheduleOnRN(updateEmbed, false);
    });
    const flingDown = Gesture.Fling()
        .direction(Directions.DOWN)
        .onStart((e) => {
            console.log('Swiped down');
            scheduleOnRN(updateEmbed, true); // Change when we make an API call
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