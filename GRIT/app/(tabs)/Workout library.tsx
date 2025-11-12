import React from 'react';
import { Image } from 'expo-image';
import { View, Text, StyleSheet } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';

// ✅ Import JSON directly
import workgroupsData from '../../database/workgroups.json';

export default function TabTwoScreen() {
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
          <View key={group.id} style={styles.workoutGroup}>
            <ThemedText type="subtitle">{group.name}</ThemedText>
            <ThemedText>Level: {group.level}</ThemedText>
            <ThemedText>Focus: {group.focus.join(', ')}</ThemedText>

            {group.exercises.map((exercise, i) => (
              <View key={i} style={styles.exerciseCard}>
                <Text style={styles.exerciseText}>
                  {exercise.name} — {exercise.sets} sets of {exercise.reps} (rest {exercise.rest})
                </Text>
              </View>
            ))}
          </View>
        ))}
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

      <Collapsible title="Images">
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
    </ParallaxScrollView>
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
    backgroundColor: '#A1CEDC',
    borderRadius: 10,
    padding: 10,
  },
  exerciseCard: {
    backgroundColor: '#A1CEDC',
    borderRadius: 6,
    marginVertical: 4,
    padding: 6,
  },
  exerciseText: {
    color: '#fff',
  },
});
