// import { useAudioPlayer } from 'expo-audio';

// const audioSource = require('@/assets/audio/Phon.mp3');

import React from 'react';
import { View, Button, Platform, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import { Image } from 'expo-image';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  const navigation = useNavigation();
  const player = useAudioPlayer(audioSource);

  player.play();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={require("@/assets/images/ModernGym.png")}
          style={styles.reactLogo}
        />
      }
    >
      {/* Title */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.titleText}>
          Workout Hub
        </ThemedText>
      </ThemedView>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Workout Library"
            onPress={() => navigation.navigate("Workout library" as never)}
            color="#fbfbfdff"
          />
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            title="Infinte Scroll"
            onPress={() => navigation.navigate("InfiniteScroll" as never)}
            color="#fcfefdff"
          />
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  titleContainer: {
    padding: 16,
    alignItems: "center",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: Fonts.rounded,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    gap: 20,
    
  },
  buttonWrapper: {
    width: "70%",
    borderWidth: 2, // thickness of the border
    borderColor: '#f7f6f8ff', // border color
    borderRadius: 8, // rounded corners
    overflow: 'hidden',
    backgroundColor:'#4425f5ff'
  },

  reactLogo: {
    height: 178,
    width: 500,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
