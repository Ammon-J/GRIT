import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

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
<ThemedText> A full-body training split that targets all major muscle groups — push days focus on chest, shoulders, and triceps, pull days hit the back and biceps, and leg days build strength in the lower body. (4 days on and 3 days off) </ThemedText>

<ThemedText>{' '}</ThemedText> 

<ThemedText type="defaultSemiBold">Arnold Split:{' '}</ThemedText>
<ThemedText> A classic six-day routine popularized by Arnold Schwarzenegger, targeting each muscle group twice a week with focused push-pull and upper-lower variations for maximum growth and symmetry. </ThemedText>

<ThemedText>{' '}</ThemedText>

<ThemedText type="defaultSemiBold">Arnold Split:{' '}</ThemedText>
<ThemedText> A classic six-day routine popularized by Arnold Schwarzenegger, targeting each muscle group twice a week with focused push-pull and upper-lower variations for maximum growth and symmetry. </ThemedText>    
        
        <ExternalLink href="https://www.muscleandstrength.com/workout-routines">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, and web support">
        <ThemedText>
          You can open this project on Android, iOS, and the web. To open the web version, press{' '}
          <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
        </ThemedText>
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
      <Collapsible title="Light and dark mode components">
        <ThemedText>
          This template has light and dark mode support. The{' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
          what the user&apos;s current color scheme is, and so you can adjust UI colors accordingly.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <ThemedText>
          This template includes an example of an animated component. The{' '}
          <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
          the powerful{' '}
          <ThemedText type="defaultSemiBold" style={{ fontFamily: Fonts.mono }}>
            react-native-reanimated
          </ThemedText>{' '}
          library to create a waving hand animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
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
