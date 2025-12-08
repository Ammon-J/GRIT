import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Pressable, Text } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link, useFocusEffect } from 'expo-router';
import { quotes } from '../data/quotes';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomeScreen() {
  const [showMusicControl, setShowMusicControl] = useState(true); // This is just so we can hide this if you want
  const [quote, setQuote] = useState('');
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  const [recentExercises, setRecentExercises] = useState<any[]>([]);
  useFocusEffect(
    useCallback(() => {
      const fetchRecent = async () => {
      const stored = await AsyncStorage.getItem('recentExercises');
      setRecentExercises(stored ? JSON.parse(stored) : []);
    };
    fetchRecent();
  }, [])
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/dumbbells.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome To Grit</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">(Growth, Resilience, Intensity, and Transformation)</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">"{quote}"</ThemedText>
      </ThemedView>

      <View style={{ padding: 20}}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>Recently Visited</Text>
        {recentExercises.length === 0 && <Text>No recent exercises</Text>}
        {recentExercises.map((exercise, i) => (
          <Link key={i} href={`/exercise/${exercise.id}`} asChild>
            <Pressable style={styles.exerciseCard}>
              <Text style={styles.recentItemText}>{exercise.name}</Text>
            </Pressable>
          </Link>
        ))}
      </View>
      {showMusicControl ? (<View />) : (
        <View style={styles.musicControl}>

        </View>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 500,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  musicControl: {
    height: 50, // So, we can make this variable, or not
    width: 50,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  exerciseCard: {
    backgroundColor: '#1D3D47',
    borderRadius: 6,
    marginVertical: 4,
    padding: 6,
  },
  recentItemText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'sans-serif',
      web: 'sans-serif',
    }),
  }
});
