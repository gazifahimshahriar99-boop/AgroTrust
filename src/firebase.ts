import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as fbSignOut } from 'firebase/auth';
import firebaseConfig from './firebase-applet-config.json';

const isDummy = !firebaseConfig.apiKey || firebaseConfig.apiKey.includes('dummy') || firebaseConfig.apiKey === '';

let app: any = null;
let auth: any = null;
let googleProvider: any = null;

if (!isDummy) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
  } catch (error) {
    console.error("Firebase Auth initialization failed:", error);
  }
}

export { auth, googleProvider, isDummy };

export interface GoogleUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}

/**
 * Initiates the Google Sign-In experience.
 * Uses real Firebase Authentication with Google Sign-In when configured with a valid api key.
 * Falls back to high-fidelity mock Google Pop-up Authenticator in simulation mode.
 */
export async function signInWithGoogle(): Promise<GoogleUser> {
  if (!isDummy && auth && googleProvider) {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      return {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || 'Verified User',
        photoURL: user.photoURL || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(user.displayName || 'user')}`
      };
    } catch (error) {
      console.error("Firebase Popup Sign-In failed or blocked: ", error);
      throw error;
    }
  } else {
    // Simulation / sandbox mode fallback
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          uid: 'google_mock_user_101',
          email: 'gazifahimshahriar99@gmail.com',
          displayName: 'Gazi Fahim Shahriar',
          photoURL: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Fahim'
        });
      }, 1200);
    });
  }
}

export async function signOutUser(): Promise<void> {
  if (!isDummy && auth) {
    try {
      await fbSignOut(auth);
    } catch (err) {
      console.error("Firebase sign out failed", err);
    }
  }
}
