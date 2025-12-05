import React from 'react';
import { Image } from 'expo-image';
import { View, Text, StyleSheet } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';

import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { workouts } from '../data/workouts';

// ✅ Import JSON directly
import workgroupsData from '../../database/workgroups.json';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require("@/assets/images/ModernGym.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>
          Workout Library
        </ThemedText>
      </ThemedView>

      <ThemedText>
        Welcome to your Ultimate Resource for Mastering Skills and Reaching Your Goals.
      </ThemedText>

      <Collapsible title="Workout Routines">
        {workgroupsData.workgroups.map((group) => (
          <View key={group.id} style={[styles.workoutGroup, { backgroundColor: colors.primary }]}>
            <ThemedText type="subtitle" style={{ color: colors.textInverse }}>{group.name}</ThemedText>
            <ThemedText style={{ color: colors.textInverse }}>Level: {group.level}</ThemedText>
            <ThemedText style={{ color: colors.textInverse }}>Focus: {group.focus.join(', ')}</ThemedText>

            {/* {group.exercises.map((exercise, i) => (
              <View key={i} style={styles.exerciseCard}>
                <Text style={styles.exerciseText}>
                  {exercise.name} — {exercise.sets} sets of {exercise.reps} (rest {exercise.rest})
                </Text>
              </View>
            ))} */}

            {group.exercises.map((exercise, i) => {
              const slug = exercise.name.toLowerCase().replace(/\s+/g, "-");

              return (
                <Link key={i} href={`/exercise/${slug}`} asChild>
                  <Pressable style={styles.exerciseCard}>
                    <Text style={styles.exerciseText}>
                      {exercise.name} — {exercise.sets} sets of {exercise.reps} (rest {exercise.rest})
                    </Text>
                  </Pressable>
                </Link>
              );
            })}


          </View>
        ))}
      </Collapsible>



      <Collapsible title="All Exercises">
        <View style={styles.listContainer}>
          {workouts.map((workout) => (
            <Link key={workout.id} href={`/exercise/${workout.id}`} asChild>
              <Pressable
                style={({ pressed }) => [
                  styles.exerciseButton,
                  { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 }
                ]}
              >
                <Text style={[styles.exerciseButtonText, { color: colors.textInverse }]}>
                  {workout.name}
                </Text>
                <IconSymbol name="arrow.up.right" size={20} color={colors.textInverse} />
              </Pressable>
            </Link>
          ))}
        </View>
      </Collapsible>

      <Collapsible title="Guidelines">
        <ThemedText>Each workout will vary between 45 minutes to 90 minutes.</ThemedText>
        <View style={{ marginTop: 8, paddingLeft: 16 }}>
          <Text>• Warm up before starting</Text>
          <Text>• Rest 60–90 seconds between sets</Text>
          <Text>• Focus on form over weight</Text>
          <Text>• Stay hydrated throughout</Text>
        </View>
      </Collapsible>
    </ParallaxScrollView >
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 500,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  workoutGroup: {
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
  },
  exerciseCard: {
    // backgroundColor: '#A1CEDC', // Removed old color
    borderRadius: 6,
    marginVertical: 4,
    padding: 6,
  },
  exerciseText: {
    color: '#fff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  listContainer: {
    gap: 12,
    marginTop: 8,
  },
  exerciseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align items to the start
    gap: 4, // Reduced space between text and icon
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  exerciseButtonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Fonts.rounded,
    textDecorationLine: 'underline', // Underline text
  },
});
