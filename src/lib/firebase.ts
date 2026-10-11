import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  set,
  get,
  onValue,
  remove,
  Database,
  Unsubscribe,
} from 'firebase/database';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';
import { StudentProfile } from '../types';

export const firebaseConfig = {
  apiKey: "AIzaSyAEeXk6xlEAkEGeLGmSTKbHTEH0sjAWYg0",
  authDomain: "vr-kerjaya-database.firebaseapp.com",
  databaseURL: "https://vr-kerjaya-database-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vr-kerjaya-database",
  storageBucket: "vr-kerjaya-database.firebasestorage.app",
  messagingSenderId: "414058030088",
  appId: "1:414058030088:web:6802532d21889d12a05dbd",
  measurementId: "G-0S596WELL6"
};

// Initialize Firebase app singleton
export const firebaseApp: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Realtime Database
export const rtdb: Database = getDatabase(firebaseApp);

// Initialize Analytics conditionally (only supported in browser window environments)
export let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(firebaseApp);
      }
    })
    .catch((err) => {
      console.warn('Firebase Analytics not supported in this environment:', err);
    });
}

/**
 * Save or update student profile in Firebase Realtime Database
 * Path: /students/{studentId}
 */
export async function saveStudentToFirebase(student: StudentProfile): Promise<boolean> {
  if (!student || !student.id || !student.name?.trim()) return false;
  try {
    const studentRef = ref(rtdb, `students/${student.id}`);
    await set(studentRef, {
      ...student,
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.warn('Gagal menyimpan ke Firebase Realtime Database:', error);
    return false;
  }
}

/**
 * Delete a specific student record from Firebase Realtime Database
 */
export async function deleteStudentFromFirebase(studentId: string): Promise<boolean> {
  if (!studentId) return false;
  try {
    const studentRef = ref(rtdb, `students/${studentId}`);
    await remove(studentRef);
    return true;
  } catch (error) {
    console.warn('Gagal memadam dari Firebase Realtime Database:', error);
    return false;
  }
}

/**
 * Clear all students from Firebase Realtime Database
 */
export async function clearAllStudentsFromFirebase(): Promise<boolean> {
  try {
    const studentsRef = ref(rtdb, 'students');
    await remove(studentsRef);
    return true;
  } catch (error) {
    console.warn('Gagal mengosongkan Firebase Realtime Database:', error);
    return false;
  }
}

/**
 * Fetch all students once from Firebase Realtime Database
 */
export async function fetchStudentsFromFirebase(): Promise<StudentProfile[]> {
  try {
    const studentsRef = ref(rtdb, 'students');
    const snapshot = await get(studentsRef);
    if (!snapshot.exists()) return [];

    const val = snapshot.val();
    const list: StudentProfile[] = Object.values(val);
    return list.filter((s) => s && s.name && s.name.trim());
  } catch (error) {
    console.warn('Gagal memuat turun data dari Firebase:', error);
    return [];
  }
}

/**
 * Subscribe to real-time updates for all student records
 */
export function subscribeToFirebaseStudents(
  onData: (students: StudentProfile[]) => void,
  onError?: (err: Error) => void
): Unsubscribe {
  const studentsRef = ref(rtdb, 'students');
  return onValue(
    studentsRef,
    (snapshot) => {
      if (!snapshot.exists()) {
        onData([]);
        return;
      }
      const val = snapshot.val();
      const list: StudentProfile[] = Object.values(val);
      const cleanList = list.filter((s) => s && s.name && s.name.trim());
      // Sort newest completed first
      cleanList.sort((a, b) => (b.completedAt || '').localeCompare(a.completedAt || ''));
      onData(cleanList);
    },
    (err) => {
      console.warn('Ralat mendengar perubahan Firebase Realtime Database:', err);
      if (onError) onError(err);
    }
  );
}
