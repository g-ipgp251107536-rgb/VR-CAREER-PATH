import { StudentProfile } from '../types';
import {
  saveStudentToFirebase,
  deleteStudentFromFirebase,
  clearAllStudentsFromFirebase,
} from '../lib/firebase';

const CURRENT_STUDENT_KEY = 'vr_kerjaya_current_student';
const ALL_STUDENTS_KEY = 'vr_kerjaya_all_students';

export function generateUniquePairingCode(studentId?: string): string {
  // Generate a distinct 6-character alphanumeric pairing code based on time and random digits
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Avoid easily confused characters like O, 0, I, 1
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const suffix = Math.floor(10 + Math.random() * 90);
  return `VR-${code}-${suffix}`;
}

export function getCurrentStudent(): StudentProfile | null {
  try {
    const raw = localStorage.getItem(CURRENT_STUDENT_KEY);
    if (!raw) return null;
    const std: StudentProfile = JSON.parse(raw);
    
    // If student was an old demo record, clear it to ensure fresh start
    if (std.id?.startsWith('std-demo-') || !std.name?.trim()) {
      return null;
    }

    if (!std.pairingCode) {
      std.pairingCode = generateUniquePairingCode(std.id);
      localStorage.setItem(CURRENT_STUDENT_KEY, JSON.stringify(std));
    }
    return std;
  } catch {
    return null;
  }
}

export function saveCurrentStudent(student: StudentProfile): void {
  try {
    localStorage.setItem(CURRENT_STUDENT_KEY, JSON.stringify(student));
    // Only add to all students list if student has a valid name filled in
    if (student.name && student.name.trim()) {
      const all = getAllStudentRecords();
      const existingIndex = all.findIndex((s) => s.id === student.id);
      if (existingIndex >= 0) {
        all[existingIndex] = student;
      } else {
        all.unshift(student);
      }
      localStorage.setItem(ALL_STUDENTS_KEY, JSON.stringify(all));

      // Asynchronously sync to Firebase Realtime Database
      saveStudentToFirebase(student).catch((err) => {
        console.warn('Firebase save warning:', err);
      });
    }
  } catch (err) {
    console.error('Failed to save student profile', err);
  }
}

export function getAllStudentRecords(): StudentProfile[] {
  try {
    const raw = localStorage.getItem(ALL_STUDENTS_KEY);
    if (!raw) {
      localStorage.setItem(ALL_STUDENTS_KEY, JSON.stringify([]));
      return [];
    }
    const parsed: StudentProfile[] = JSON.parse(raw);
    // Filter out any leftover demo records
    const cleanList = Array.isArray(parsed)
      ? parsed.filter((s) => s && !s.id?.startsWith('std-demo-') && s.name && s.name.trim())
      : [];
    
    if (cleanList.length !== parsed.length) {
      localStorage.setItem(ALL_STUDENTS_KEY, JSON.stringify(cleanList));
    }
    return cleanList;
  } catch {
    return [];
  }
}

export function clearAllStudentRecords(): StudentProfile[] {
  try {
    localStorage.setItem(ALL_STUDENTS_KEY, JSON.stringify([]));
    localStorage.removeItem(CURRENT_STUDENT_KEY);
    clearAllStudentsFromFirebase().catch((err) => {
      console.warn('Firebase clear warning:', err);
    });
  } catch (err) {
    console.error('Failed to clear student records', err);
  }
  return [];
}

export function deleteStudentRecord(studentId: string): StudentProfile[] {
  try {
    const all = getAllStudentRecords().filter((s) => s.id !== studentId);
    localStorage.setItem(ALL_STUDENTS_KEY, JSON.stringify(all));
    
    // If current student was deleted, clear it
    const current = getCurrentStudent();
    if (current && current.id === studentId) {
      localStorage.removeItem(CURRENT_STUDENT_KEY);
    }

    deleteStudentFromFirebase(studentId).catch((err) => {
      console.warn('Firebase delete warning:', err);
    });

    return all;
  } catch (err) {
    console.error('Failed to delete student record', err);
    return getAllStudentRecords();
  }
}

export function exportStudentsToCSV(students: StudentProfile[]): string {
  const headers = ['ID Pelajar', 'Nama', 'Sekolah', 'Kelas', 'Tarikh Selesai', 'Kod Holland', 'Dominan', 'Skor R', 'Skor I', 'Skor A', 'Skor S', 'Skor E', 'Skor K', 'VR Disambung', 'Mod VR', 'Kerjaya Diterokai'];
  const rows = students.map((s) => [
    s.id,
    `"${(s.name || '').replace(/"/g, '""')}"`,
    `"${(s.school || '').replace(/"/g, '""')}"`,
    `"${(s.classGrade || '-').replace(/"/g, '""')}"`,
    s.completedAt || '-',
    s.hollandCode || '-',
    s.dominantCategory || '-',
    s.scores?.R ?? 0,
    s.scores?.I ?? 0,
    s.scores?.A ?? 0,
    s.scores?.S ?? 0,
    s.scores?.E ?? 0,
    s.scores?.K ?? 0,
    s.vrConnected ? 'Ya' : 'Tidak',
    s.vrModeUsed || 'panoramic',
    `"${(s.exploredCareers || []).join(', ')}"`,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}

