import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import {
  Gesture,
  GestureDetector,
  Directions,
} from 'react-native-gesture-handler';
import { Video, ResizeMode } from 'expo-av';
import { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import { runOnJS } from 'react-native-reanimated';

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
  const router = useRouter();

  const pickRandomWorkout = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * workouts.length);
    setCurrentWorkout(workouts[randomIndex]);
  }, []);

  // Initial load
  useEffect(() => {
    pickRandomWorkout();
  }, [pickRandomWorkout]);

  const onSwipeUp = () => {
    pickRandomWorkout();
  };

  const flingUp = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => {
      runOnJS(onSwipeUp)();
    });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <GestureDetector gesture={flingUp}>
          <View style={styles.contentContainer}>
            <Video
              source={currentWorkout.video}
              style={styles.video}
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay
              isLooping
              isMuted={false}
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