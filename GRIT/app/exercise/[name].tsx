import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, Image } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { workouts } from '../data/workouts';

export default function ExercisePage() {
  const { name } = useLocalSearchParams();
  const exercise = workouts.find((w) => w.id === name);

  if (!exercise) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="subtitle" style={styles.error}>
          Exercise not found!
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/ModernGym.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          {exercise.name}
        </ThemedText>

        <Video
          source={exercise.video}
          style={styles.video}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
        />

        <Text style={styles.bodyText}>Sets: {exercise.sets}</Text>
        <Text style={styles.bodyText}>Reps: {exercise.reps}</Text>
        <Text style={styles.bodyText}>Rest: {exercise.rest}</Text>
        <Text style={styles.bodyText}>{exercise.instructions}</Text>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 500,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  content: {
    padding: 20,
    gap: 12,
  },
  title: {
    fontFamily: Fonts.rounded,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  bodyText: {
    fontFamily: Fonts.rounded,
    fontSize: 16,
    color: '#fff',
    lineHeight: 22,
  },
  video: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: '#000',
    marginVertical: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 20,
    color: 'red',
  },
});
