// Interacting with user storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// make some aliases to the string keys 
const K = {
  currentUser: 'auth.currentUser',
  users: 'auth.users',
  profiles: 'auth.profiles',
} as const;

// define a userprofile type 
export type UserProfile = {
  username: string;
  joinedAt: string; // ISO date string
  displayName?: string;
  notes?: string;

};

// Username and password map, plaintext
type Users = Record<string, { password: string }>; 


// JSON helpers for serializing strings and whatnot
async function readJSON<T>(key: string, fallback: T): Promise<T> {
  const v = await AsyncStorage.getItem(key);
  if (!v) return fallback;
  try {
    return JSON.parse(v) as T;
  } catch {
    return fallback;
  }
}

async function writeJSON(key: string, value: any) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}


// read the current user session if it exists 
export async function getCurrentUser(): Promise<string | null> {
  return (await AsyncStorage.getItem(K.currentUser)) ?? null;
}

// main sign in bit, if a profile exists get it, if not make a new one 
export async function signIn(username: string, password: string): Promise<void> {
  const users = await readJSON<Users>(K.users, {});
  const profiles = await readJSON<Record<string, UserProfile>>(K.profiles, {});

  // Accept any credentials; "create or update" user record
  users[username] = { password };

  // Ensure a basic profile exists, if not make a new one
  if (!profiles[username]) {
    profiles[username] = {
      username,
      joinedAt: new Date().toISOString(),
    };
  }
  // save everything
  await AsyncStorage.multiSet([
    [K.users, JSON.stringify(users)],
    [K.profiles, JSON.stringify(profiles)],
    [K.currentUser, username],
  ]);
}

// or sign in as guest, make random creds
export async function signInAsGuest(): Promise<string> {
  const username = `guest-${Math.random().toString(36).slice(2, 8)}`;
  await signIn(username, 'guest');
  return username;
}

// option to sign out when we implement that 
export async function signOut(): Promise<void> {
  await AsyncStorage.removeItem(K.currentUser);
}

// read or create profile for the active user
export async function getProfile(username?: string): Promise<UserProfile | null> {
  const u = username ?? (await getCurrentUser());
  if (!u) return null;
  const profiles = await readJSON<Record<string, UserProfile>>(K.profiles, {});

  if (!profiles[u]) {
    profiles[u] = { username: u, joinedAt: new Date().toISOString() };
    await writeJSON(K.profiles, profiles);
  }

  return profiles[u];
}

// save a profile/update it for changes
export async function saveProfile(profile: UserProfile): Promise<void> {
  const profiles = await readJSON<Record<string, UserProfile>>(K.profiles, {});
  profiles[profile.username] = profile;
  await writeJSON(K.profiles, profiles);
}