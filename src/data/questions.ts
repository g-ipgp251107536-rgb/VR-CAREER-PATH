import { Question, HollandCodeType } from '../types';

export const SIDEK_QUESTIONS: Question[] = [
  // REALISTIK (1 - 10)
  { id: 1, text: 'Membaiki alat-alat elektrik', category: 'R', categoryName: 'Realistik' },
  { id: 2, text: 'Membaiki alat-alat mekanik', category: 'R', categoryName: 'Realistik' },
  { id: 3, text: 'Membuat benda-benda daripada kayu', category: 'R', categoryName: 'Realistik' },
  { id: 4, text: 'Memandu trak atau traktor', category: 'R', categoryName: 'Realistik' },
  { id: 5, text: 'Mengikuti kursus Lukisan Mekanik', category: 'R', categoryName: 'Realistik' },
  { id: 6, text: 'Menggunakan alat-alat kerja logam dan mesin', category: 'R', categoryName: 'Realistik' },
  { id: 7, text: 'Mengubahsuai enjin kereta atau motosikal', category: 'R', categoryName: 'Realistik' },
  { id: 8, text: 'Mengikuti kursus Seni Perusahaan', category: 'R', categoryName: 'Realistik' },
  { id: 9, text: 'Mengikuti kursus Kerja Kayu', category: 'R', categoryName: 'Realistik' },
  { id: 10, text: 'Mengikut kursus Automekanik', category: 'R', categoryName: 'Realistik' },

  // INVESTIGATIF (11 - 20)
  { id: 11, text: 'Membaca buku atau majalah sains', category: 'I', categoryName: 'Investigatif' },
  { id: 12, text: 'Bekerja dalam makmal', category: 'I', categoryName: 'Investigatif' },
  { id: 13, text: 'Membuat kerja projek sains', category: 'I', categoryName: 'Investigatif' },
  { id: 14, text: 'Mereka cipta model roket', category: 'I', categoryName: 'Investigatif' },
  { id: 15, text: 'Bekerja menggunakan alat-alat kimia', category: 'I', categoryName: 'Investigatif' },
  { id: 16, text: 'Membaca subjek-subjek tertentu yang khusus', category: 'I', categoryName: 'Investigatif' },
  { id: 17, text: 'Mengikuti kursus Fizik', category: 'I', categoryName: 'Investigatif' },
  { id: 18, text: 'Mengikuti kursus Kimia', category: 'I', categoryName: 'Investigatif' },
  { id: 19, text: 'Mengikuti kursus Geometri', category: 'I', categoryName: 'Investigatif' },
  { id: 20, text: 'Mengikuti kursus biologi', category: 'I', categoryName: 'Investigatif' },

  // ARTISTIK (21 - 30)
  { id: 21, text: 'Melakar, melukis atau mewarna', category: 'A', categoryName: 'Artistik' },
  { id: 22, text: 'Menonton lakonan/drama', category: 'A', categoryName: 'Artistik' },
  { id: 23, text: 'Mereka bentuk perabot atau bangunan', category: 'A', categoryName: 'Artistik' },
  { id: 24, text: 'Bermain alat muzik dalam kumpulan muzik atau orkestra', category: 'A', categoryName: 'Artistik' },
  { id: 25, text: 'Berlatih menggunakan alat muzik', category: 'A', categoryName: 'Artistik' },
  { id: 26, text: 'Menghadiri pertunjukan pentas atau muzik', category: 'A', categoryName: 'Artistik' },
  { id: 27, text: 'Mencipta potret atau foto', category: 'A', categoryName: 'Artistik' },
  { id: 28, text: 'Membaca buku-buku lakonan', category: 'A', categoryName: 'Artistik' },
  { id: 29, text: 'Membaca atau menulis sajak', category: 'A', categoryName: 'Artistik' },
  { id: 30, text: 'Mengikuti kursus seni lukis', category: 'A', categoryName: 'Artistik' },

  // SOSIAL (31 - 40)
  { id: 31, text: 'Menulis surat pada kawan', category: 'S', categoryName: 'Sosial' },
  { id: 32, text: 'Menghadiri perjumpaan-perjumpaan agama', category: 'S', categoryName: 'Sosial' },
  { id: 33, text: 'Menganggotai kelab sosial', category: 'S', categoryName: 'Sosial' },
  { id: 34, text: 'Menolong orang yang mempunyai masalah peribadi', category: 'S', categoryName: 'Sosial' },
  { id: 35, text: 'Mengajar kanak-kanak', category: 'S', categoryName: 'Sosial' },
  { id: 36, text: 'Menghadiri majlis parti', category: 'S', categoryName: 'Sosial' },
  { id: 37, text: 'Menari', category: 'S', categoryName: 'Sosial' },
  { id: 38, text: 'Menghadiri mesyuarat atau persidangan', category: 'S', categoryName: 'Sosial' },
  { id: 39, text: 'Menghadiri temasya sukan', category: 'S', categoryName: 'Sosial' },
  { id: 40, text: 'Memulakan persahabatan', category: 'S', categoryName: 'Sosial' },

  // ENTERPRISING (41 - 50)
  { id: 41, text: 'Mempengaruhi orang lain', category: 'E', categoryName: 'Enterprising' },
  { id: 42, text: 'Berbincang mengenai politik', category: 'E', categoryName: 'Enterprising' },
  { id: 43, text: 'Menguruskan perniagaan sendiri', category: 'E', categoryName: 'Enterprising' },
  { id: 44, text: 'Menghadiri persidangan', category: 'E', categoryName: 'Enterprising' },
  { id: 45, text: 'Memberi ceramah', category: 'E', categoryName: 'Enterprising' },
  { id: 46, text: 'Menjadi pemimpin sebarang kumpulan', category: 'E', categoryName: 'Enterprising' },
  { id: 47, text: 'Menyeliakan kerja-kerja orang lain', category: 'E', categoryName: 'Enterprising' },
  { id: 48, text: 'Menemui orang-orang penting', category: 'E', categoryName: 'Enterprising' },
  { id: 49, text: 'Mengetuai kumpulan dalam mencapai sesuatu matlamat', category: 'E', categoryName: 'Enterprising' },
  { id: 50, text: 'Mengambil bahagian dalam kempen politik', category: 'E', categoryName: 'Enterprising' },

  // KONVENSIONAL (51 - 60)
  { id: 51, text: 'Menaip bahan-bahan bertulis atau surat-surat', category: 'K', categoryName: 'Konvensional' },
  { id: 52, text: 'Mengira angka-angka dalam urusan perniagaan atau menyimpan kira-kira', category: 'K', categoryName: 'Konvensional' },
  { id: 53, text: 'Menggunakan mesin perniagaan', category: 'K', categoryName: 'Konvensional' },
  { id: 54, text: 'Menyimpan rekod-rekod perbelanjaan perniagaan', category: 'K', categoryName: 'Konvensional' },
  { id: 55, text: 'Mengikuti kursus menaip', category: 'K', categoryName: 'Konvensional' },
  { id: 56, text: 'Mengikuti kursus perniagaan', category: 'K', categoryName: 'Konvensional' },
  { id: 57, text: 'Mengikuti kursus Simpan-Kira', category: 'K', categoryName: 'Konvensional' },
  { id: 58, text: 'Mengikuti kursus Matematik Perdagangan', category: 'K', categoryName: 'Konvensional' },
  { id: 59, text: 'Menyimpan surat, laporan, dan rekod dalam fail', category: 'K', categoryName: 'Konvensional' },
  { id: 60, text: 'Menulis surat-surat perniagaan', category: 'K', categoryName: 'Konvensional' },
];

export const CATEGORY_INFO_META: Record<HollandCodeType, { label: string; range: string; color: string; bg: string }> = {
  R: { label: 'Realistik', range: '1 - 10', color: '#FF5252', bg: '#FFEBEB' },
  I: { label: 'Investigatif', range: '11 - 20', color: '#00E5FF', bg: '#E6FCFF' },
  A: { label: 'Artistik', range: '21 - 30', color: '#FFE600', bg: '#FFFDE0' },
  S: { label: 'Sosial', range: '31 - 40', color: '#A3FF2E', bg: '#F2FFE0' },
  E: { label: 'Enterprising', range: '41 - 50', color: '#FF9100', bg: '#FFF2E0' },
  K: { label: 'Konvensional', range: '51 - 60', color: '#B388FF', bg: '#F3ECFF' },
};
