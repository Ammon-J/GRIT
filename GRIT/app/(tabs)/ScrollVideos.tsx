import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import {
  Gesture,
  GestureDetector,
  Directions,
} from 'react-native-gesture-handler';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useState, useCallback } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { scheduleOnRN } from 'react-native-worklets';

import { workouts } from '../data/workouts';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Fonts } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

export default function ScrollVideos() {
  const [currentWorkout, setCurrentWorkout] = useState(workouts[0]);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const player = useVideoPlayer(currentWorkout.video, player => {
    player.loop = true;
    player.play();
  });

  const pickRandomWorkout = useCallback(() => { // If you feel like it, please make this go through a shuffled array instead of this so we don't repeat videos.
    const randomIndex = Math.floor(Math.random() * workouts.length);
    setCurrentWorkout(workouts[randomIndex]);
  }, []);

  const flingUp = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => {
      scheduleOnRN(pickRandomWorkout);
    });
  
  const flingDown = Gesture.Fling()
    .direction(Directions.DOWN)
    .onStart(() => {
      scheduleOnRN(pickRandomWorkout);
    });

  const composed = Gesture.Race(flingUp, flingDown);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <GestureDetector gesture={composed}>
          <View style={styles.contentContainer}>
            <VideoView
              player={player}
              style={styles.video}
            />

            <View style={styles.overlay}>
              <Link href={`/exercise/${currentWorkout.id}`} asChild>
                <TouchableOpacity
                  style={[styles.linkButton, { backgroundColor: colors.primary }]}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.linkText, { color: colors.textInverse }]}>
                    {currentWorkout.name}
                  </Text>
                  <IconSymbol name="arrow.up.right" size={20} color={colors.textInverse} />
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </GestureDetector>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: width,
    height: height * 0.8, // Take up most of the screen
  },
  overlay: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    width: '100%',
    maxWidth: 400,
  },
  linkText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Fonts.rounded,
    textDecorationLine: 'underline',
  },
});