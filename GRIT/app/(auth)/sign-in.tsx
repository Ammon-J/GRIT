import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { signIn, signInAsGuest } from '@/lib/auth-store';
import { useRouter } from 'expo-router';
import { VideoView, useVideoPlayer } from 'expo-video';
import * as React from 'react';
import { Button, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';


// here begins the sign in screen, this is component state and router logic 
export default function SignInScreen() {
  const router = useRouter();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  // busy helps us with disabling buttons 
  const [busy, setBusy] = React.useState(false);

  // set up our background video
  const player = useVideoPlayer(
    require('@/assets/videos/bg.mp4'),
    (p) => {
      p.loop = true;
      p.muted = true;
      p.play();
    }
  );
  // handle sign in by 
  const handleSignIn = async () => {
    if (!username || !password) return; // super basic guard
    setBusy(true);
    try {
      // call our storage functions to verify everything, if it checks out let the user in 
      await signIn(username.trim(), password);
      router.replace('/');
    } finally {
      setBusy(false);
    }
  };

  // handle a guest sign in 
  const handleGuest = async () => {
    setBusy(true);
    try {
      await signInAsGuest();
      router.replace('/');
    } finally {
      setBusy(false);
    }
  };
  // this is layout structure 
  return (
    <View style={styles.root}>
      {/* Full‑screen looping background video */}
      <VideoView style={StyleSheet.absoluteFill} player={player} contentFit="cover" />
      {/* dark overlay to keep inputs readable */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.35)' }]} />

      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        style={styles.center}
      >
        <ThemedView style={styles.card}> {/* header stuff*/}
          <ThemedText type="title" style={styles.title}>Welcome to Grit 💪</ThemedText>
          {/* username and password text fields */}
          <TextInput
            placeholder="Username"
            placeholderTextColor={"#FFF"}
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={"#FFF"}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <Button title={busy ? 'Please wait…' : 'Sign in'} onPress={handleSignIn} disabled={busy} />

          <Pressable onPress={handleGuest} style={styles.guestLink} disabled={busy}>
            <ThemedText type="link">Continue as guest</ThemedText>
          </Pressable>
        </ThemedView>
      </KeyboardAvoidingView>
    </View>
  );
}
// define all the styles of the components
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: 'black' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  card: {
    width: '100%',
    maxWidth: 420,
    gap: 12,
    backgroundColor: 'rgba(27, 27, 27, 0.7)',
    borderRadius: 16,
    padding: 16,
  },
  title: { textAlign: 'center', marginBottom: 4, color: '#fff' },
  input: {
    color: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'rgba(27, 27, 27, 0.0)',
  },
  guestLink: { alignSelf: 'center', paddingVertical: 8 },
});