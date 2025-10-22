import { Image } from 'expo-image';
import { View, Text, Platform, StyleSheet } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
              <Image
                source={require("@/assets/images/ModernGym.png")}
                style={styles.reactLogo}
              />
        }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Workout Library
        </ThemedText>
      </ThemedView>
      <ThemedText>Welcome to your Ultimate Resource for Mastering Skills and Reaching Your Goals.</ThemedText>
      <Collapsible title="Workout Routines">
        <ThemedText type="defaultSemiBold">Upper & Lower:{' '}</ThemedText>
        <ThemedText>A balanced mix of upper and lower body workouts designed to build strength, improve endurance, and enhance overall fitness. (4 days on and 3 days off)</ThemedText>

<ThemedText>{' '}</ThemedText> 

        <ThemedText type="defaultSemiBold">Push,Pull, and Legs:{' '}</ThemedText>
<ThemedText> A full-body training split that targets all major muscle groups — push days focus on chest, shoulders, and triceps, pull days hit the back and biceps, and leg days build strength in the lower body. </ThemedText>
<ThemedText type="defaultSemiBold">
    (4 days on and 3 days off)
  </ThemedText>
<ThemedText>{' '}</ThemedText> 

<ThemedText type="defaultSemiBold">Arnold Split:{' '}</ThemedText>
<ThemedText type="default">
  A classic 5-day split that focuses on each body group individually. Good for gaining strength or mass.{" "}
  <ThemedText type="defaultSemiBold">
    (Leg day, Chest day, Arm day, Shoulder day, Back Day)
  </ThemedText>
</ThemedText>
<ExternalLink href="https://chatgpt.com/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
<ThemedText>{' '}</ThemedText>

      </Collapsible>
      <Collapsible title="Guidelines">
  <ThemedText>
    Each workout will vary between 45 minutes to 90 minutes.
  </ThemedText>
  <View style={{ marginTop: 8, paddingLeft: 16 }}>
    <Text>• Warm up before starting</Text>
    <Text>• Rest 60–90 seconds between sets</Text>
    <Text>• Focus on form over weight</Text>
    <Text>• Stay hydrated throughout</Text>
  </View>
</Collapsible>
      <Collapsible title="Images">
        <ThemedText>
          For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
          different screen densities
        </ThemedText>
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
  headerImage: {
    color: '#364156',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
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
});
