/**
 * Superstar Football Academy - Firebase Firestore Integration
 * 
 * Supports both:
 * 1. Live Firebase Firestore (v10 SDK) when valid credentials are provided
 * 2. Intelligent local fallback storage when running with default placeholder credentials
 */

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp, 
  Firestore,
  Unsubscribe
} from 'firebase/firestore';
import { Footballer, PlayerStatus, FirebaseConnectionConfig } from './types';
import { SAMPLE_FOOTBALLERS } from './data/samplePlayers';

// ============================================================================
// FIREBASE CONFIGURATION VARIABLES (PLACEHOLDER)
// Replace these values with your Firebase Project credentials from Firebase Console:
// https://console.firebase.google.com -> Project Settings -> General -> Web Apps
// ============================================================================
export const DEFAULT_FIREBASE_CONFIG: FirebaseConnectionConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "superstar-football-academy.firebaseapp.com",
  projectId: "superstar-football-academy",
  storageBucket: "superstar-football-academy.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

const LOCAL_STORAGE_KEY_CONFIG = 'superstar_academy_firebase_config';
const LOCAL_STORAGE_KEY_PLAYERS = 'superstar_academy_footballers_db';

// Listeners for simulated real-time local storage
type ListenerCallback = (players: Footballer[]) => void;
const localSubscribers: Set<ListenerCallback> = new Set();

export function getStoredFirebaseConfig(): FirebaseConnectionConfig {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_CONFIG);
    if (raw) {
      return { ...DEFAULT_FIREBASE_CONFIG, ...JSON.parse(raw) };
    }
  } catch {
    // ignore
  }
  return DEFAULT_FIREBASE_CONFIG;
}

export function saveStoredFirebaseConfig(config: FirebaseConnectionConfig): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_CONFIG, JSON.stringify(config));
  } catch {
    // ignore
  }
}

export function isFirebaseConfigured(config: FirebaseConnectionConfig = getStoredFirebaseConfig()): boolean {
  if (!config.apiKey || config.apiKey.includes('YOUR_') || config.apiKey.length < 15) return false;
  if (!config.projectId || config.projectId.includes('YOUR_')) return false;
  return true;
}

// Global Firebase handles
let firebaseAppInstance: FirebaseApp | null = null;
let firestoreDbInstance: Firestore | null = null;
let isLiveFirestoreActive = false;

export function initializeFirebaseService(): { isLive: boolean; error?: string } {
  const config = getStoredFirebaseConfig();

  if (!isFirebaseConfigured(config)) {
    isLiveFirestoreActive = false;
    return { isLive: false };
  }

  try {
    if (!getApps().length) {
      firebaseAppInstance = initializeApp(config);
    } else {
      firebaseAppInstance = getApp();
    }
    firestoreDbInstance = getFirestore(firebaseAppInstance);
    isLiveFirestoreActive = true;
    return { isLive: true };
  } catch (err: any) {
    console.warn("Could not connect to Firebase Firestore with provided credentials, falling back to local storage:", err);
    isLiveFirestoreActive = false;
    return { isLive: false, error: err?.message || 'Failed to initialize Firebase' };
  }
}

// Initialize on module load
initializeFirebaseService();

// Local Storage Realtime Emulation
function getLocalFootballers(): Footballer[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_PLAYERS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // fallback
  }

  // Pre-seed default players if empty
  const seeded = SAMPLE_FOOTBALLERS.map((p, idx) => ({
    ...p,
    id: `apex-local-${Date.now()}-${idx + 1}`
  }));
  saveLocalFootballers(seeded);
  return seeded;
}

function saveLocalFootballers(players: Footballer[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_PLAYERS, JSON.stringify(players));
    // notify local real-time subscribers
    localSubscribers.forEach((cb) => cb([...players]));
  } catch (err) {
    console.error("Error writing to local footballers DB:", err);
  }
}

/**
 * Real-time subscription to the "footballers" collection
 */
export function subscribeToFootballers(callback: (players: Footballer[], isLive: boolean) => void): Unsubscribe {
  const currentConfig = getStoredFirebaseConfig();
  const shouldTryFirebase = isFirebaseConfigured(currentConfig);

  if (shouldTryFirebase && firestoreDbInstance) {
    try {
      const footballersCol = collection(firestoreDbInstance, 'footballers');
      const q = query(footballersCol, orderBy('createdAt', 'desc'));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const players: Footballer[] = snapshot.docs.map((d) => {
            const data = d.data();
            return {
              id: d.id,
              fullName: data.fullName || 'Unknown Player',
              dob: data.dob || '2006-01-01',
              age: data.age || calculateAge(data.dob),
              position: data.position || 'Midfielder',
              preferredFoot: data.preferredFoot || 'Right',
              height: Number(data.height) || 175,
              phone: data.phone || '',
              email: data.email || '',
              emergencyContactName: data.emergencyContactName || data.emergencyContact || 'Not specified',
              emergencyContactPhone: data.emergencyContactPhone || '',
              emergencyContactRelation: data.emergencyContactRelation || 'Contact',
              bio: data.bio || '',
              status: (data.status as PlayerStatus) || 'Pending Trial',
              createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : (data.createdAt || new Date().toISOString()),
              trialDate: data.trialDate,
              scoutNotes: data.scoutNotes,
              squadNumber: data.squadNumber,
              photoUrl: data.photoUrl || ''
            };
          });
          callback(players, true);
        },
        (error) => {
          console.warn("Firestore listener error, switching to local repository:", error);
          // Fall back to local storage
          const localData = getLocalFootballers();
          callback(localData, false);
        }
      );

      return unsubscribe;
    } catch (err) {
      console.warn("Failed creating Firestore query, using local fallback:", err);
    }
  }

  // Local storage real-time fallback
  const handler: ListenerCallback = (players) => {
    callback(players, false);
  };
  localSubscribers.add(handler);

  // Initial emit
  callback(getLocalFootballers(), false);

  return () => {
    localSubscribers.delete(handler);
  };
}

/**
 * Add a new Footballer document to the "footballers" collection
 */
export async function registerFootballer(data: Omit<Footballer, 'id' | 'createdAt' | 'status'> & { status?: PlayerStatus }): Promise<string> {
  const newPlayerStatus: PlayerStatus = data.status || 'Pending Trial';
  const age = data.age || calculateAge(data.dob);

  const payload = {
    ...data,
    age,
    status: newPlayerStatus,
    createdAt: new Date().toISOString(),
  };

  const config = getStoredFirebaseConfig();
  if (isFirebaseConfigured(config) && firestoreDbInstance) {
    try {
      const colRef = collection(firestoreDbInstance, 'footballers');
      const docRef = await addDoc(colRef, {
        ...payload,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (err) {
      console.warn("Failed writing to Firestore, persisting to local storage instead:", err);
    }
  }

  // Local storage write
  const id = `SFA-${Math.floor(100000 + Math.random() * 900000)}`;
  const localPlayer: Footballer = {
    ...payload,
    id,
    createdAt: new Date().toISOString()
  };

  const current = getLocalFootballers();
  const updated = [localPlayer, ...current];
  saveLocalFootballers(updated);
  return id;
}

/**
 * Update any footballer details including photoUrl, status, scoutNotes
 */
export async function updateFootballerDetails(id: string, updates: Partial<Footballer>): Promise<void> {
  const config = getStoredFirebaseConfig();
  if (isFirebaseConfigured(config) && firestoreDbInstance) {
    try {
      const docRef = doc(firestoreDbInstance, 'footballers', id);
      await updateDoc(docRef, updates as any);
      return;
    } catch (err) {
      console.warn("Failed updating Firestore doc, updating local storage:", err);
    }
  }

  // Local update
  const current = getLocalFootballers();
  const updated = current.map((p) => {
    if (p.id === id) {
      return {
        ...p,
        ...updates
      };
    }
    return p;
  });
  saveLocalFootballers(updated);
}

/**
 * Update a footballer's photo
 */
export async function updateFootballerPhoto(id: string, photoUrl: string): Promise<void> {
  return updateFootballerDetails(id, { photoUrl });
}

/**
 * Update a footballer's status ("Pending Trial", "Accepted", "Active Academy Member", "Declined")
 */
export async function updateFootballerStatus(id: string, newStatus: PlayerStatus, scoutNotes?: string): Promise<void> {
  const updates: Partial<Footballer> = { status: newStatus };
  if (scoutNotes !== undefined) {
    updates.scoutNotes = scoutNotes;
  }
  return updateFootballerDetails(id, updates);
}

/**
 * Delete a footballer record
 */
export async function deleteFootballer(id: string): Promise<void> {
  const config = getStoredFirebaseConfig();
  if (isFirebaseConfigured(config) && firestoreDbInstance) {
    try {
      const docRef = doc(firestoreDbInstance, 'footballers', id);
      await deleteDoc(docRef);
      return;
    } catch (err) {
      console.warn("Failed deleting Firestore doc, updating local storage:", err);
    }
  }

  // Local delete
  const current = getLocalFootballers();
  const updated = current.filter((p) => p.id !== id);
  saveLocalFootballers(updated);
}

/**
 * Reset / Seed realistic sample players
 */
export function resetSampleFootballers(): Footballer[] {
  const seeded = SAMPLE_FOOTBALLERS.map((p, idx) => ({
    ...p,
    id: `SFA-${104200 + idx}`
  }));
  saveLocalFootballers(seeded);
  return seeded;
}

export function calculateAge(dobString: string): number {
  if (!dobString) return 17;
  const birth = new Date(dobString);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return isNaN(age) || age < 5 ? 17 : age;
}
