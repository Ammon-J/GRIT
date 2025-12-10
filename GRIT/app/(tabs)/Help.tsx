// HelpPage.tsx
import React from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native';




export default function HelpPage() {
  
  return (
    <ImageBackground
      source={require('@/assets/images/gym.jpg')} // Place your background image in the assets folder
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Help & Support</Text>
        
        <View style={styles.section}>
          <Text style={styles.heading}>Getting Started</Text>
          <Text style={styles.text}>
            Select a workout from the workout tab or choose discover to find new routines.
            We hope to add more features soon!
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>FAQs</Text>
          <Text style={styles.text}>
            • How do I reset my password?{"\n"}
            {"     "}We don't actually have any account database.{"\n\n"}
            • Where can I find settings?{"\n"}
            {"     "}We don't actually have any settings you can change.{"\n\n"}
            • How do I contact support?{"\n"}
            {"     "}We don't actually have any support team.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Contact Us</Text>
          <Text style={styles.text}>
            If you need further assistance, email us.
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    padding: 40,
    backgroundColor: 'rgba(0,0,0,0.8)', // semi-transparent overlay for readability
    justifyContent: 'center'

  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    padding:15,
    textAlign: 'center',
    color: '#FFF',
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: '#FFF',
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    color: '#FFF',
  },
});