import React from "react";
import { Image } from "expo-image";
import { StyleSheet, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native"; // ✅ <-- ADD THIS LINE
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";

export default function TabTwoScreen() {
  const navigation = useNavigation();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={require("@/assets/images/ModernGym.png")}
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.titleText}>
          Workout Library
        </ThemedText>
        <ThemedText>
          Welcome to your Ultimate Resource for Mastering Skills and Reaching
          Your Goals.
        </ThemedText>
      </ThemedView>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            title="Workout Library"
            onPress={() => navigation.navigate("Workout library" as never)} // ✅ navigation works now
            color="#1E40AF"
          />
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            title="Random Workouts"
            onPress={() => navigation.navigate("Random Workouts" as never)}
            color="#15803D"
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
  },
});
