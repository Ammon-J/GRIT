import { useLocalSearchParams, Link } from 'expo-router';
import { StyleSheet, View, ScrollView, Image } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// For now, mock data — later, this could come from a JSON file or backend
const exerciseLibrary = {
  'bench-press': {
    title: 'Bench Press',
    instructions:
      'Lie on a flat bench with your feet firmly on the ground. Grip the barbell slightly wider than shoulder width. Lower the bar to your chest, then press it back up until your arms are fully extended.',
    sets: 4,
    reps: 8,
    rest: 90,
    videoUrl: null, // placeholder for future video
  },
  'pull-ups': {
    title: 'Pull-Ups',
    instructions:
      'Grab the pull-up bar with your palms facing away from you. Pull yourself up until your chin is above the bar, then lower back down slowly.',
    sets: 3,
    reps: 10,
    rest: 60,
    videoUrl: null,
  },
};

export default function ExercisePage() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const exercise = exerciseLibrary[name as keyof typeof exerciseLibrary];

  if (!exercise) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">Exercise not found</ThemedText>
        <Link href="/(tabs)/explore">
          <ThemedText type="link">Back to Library</ThemedText>
        </Link>
      </ThemedView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">{exercise.title}</ThemedText>

        {/* Placeholder for form video */}
        <View style={styles.videoPlaceholder}>
          <ThemedText type="defaultSemiBold">[Video Coming Soon]</ThemedText>
        </View>

        <ThemedText type="subtitle">Instructions</ThemedText>
        <ThemedText style={styles.instructions}>{exercise.instructions}</ThemedText>

        <ThemedText type="subtitle">Workout Details</ThemedText>
        <ThemedText>Sets: {exercise.sets}</ThemedText>
        <ThemedText>Reps: {exercise.reps}</ThemedText>
        <ThemedText>Rest: {exercise.rest} sec</ThemedText>

        <Link href="/(tabs)/explore" style={styles.backLink}>
          <ThemedText type="link">← Back to Exercise Library</ThemedText>
        </Link>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
  },
  container: {
    gap: 16,
  },
  videoPlaceholder: {
    height: 200,
    backgroundColor: '#ccc',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions: {
    lineHeight: 22,
  },
  backLink: {
    marginTop: 24,
  },
});
