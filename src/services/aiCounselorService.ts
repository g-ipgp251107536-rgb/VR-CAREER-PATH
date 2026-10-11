import { StudentProfile, HollandCodeType } from '../types';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface AskCounselorParams {
  question: string;
  careerTitle?: string;
  hollandCode?: HollandCodeType | string;
  hollandName?: string;
  student?: StudentProfile | null;
  conversationHistory?: ChatMessage[];
}

export async function askCareerAICounselor(params: AskCounselorParams): Promise<string> {
  const { question, careerTitle, hollandCode, hollandName, student, conversationHistory } = params;

  try {
    const response = await fetch('/api/career-ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        careerTitle,
        hollandCode,
        hollandName,
        studentName: student?.name,
        studentScores: student?.scores,
        conversationHistory: conversationHistory?.map((msg) => ({
          role: msg.role,
          text: msg.text,
        })),
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.message || `Ralat pelayan (${response.status})`);
    }

    const data = await response.json();
    return data.reply || 'Maaf, jawapan tidak dapat dijana. Sila cuba lagi.';
  } catch (error: any) {
    console.warn('Network error reaching /api/career-ai, using local counselor response:', error);
    return getLocalCounselorResponse(question, careerTitle, hollandCode);
  }
}

function getLocalCounselorResponse(
  question: string,
  careerTitle?: string,
  hollandCode?: string
): string {
  const job = careerTitle || 'bidang kerjaya ini';
  const qLower = question.toLowerCase();

  if (qLower.includes('subjek') || qLower.includes('spm')) {
    return `Bagi persediaan ke arah **${job}**, di peringkat Menengah Atas (Tingkatan 4 & 5), anda digalakkan:
- Memberi keutamaan kepada subjek teras: Bahasa Melayu, Bahasa Inggeris, Matematik dan Sejarah.
- Mengambil pakej elektif yang bersesuaian dengan kod minat **${hollandCode || 'anda'}** (contoh: STEM Sains Tulen, STEM Komputer, atau Sastera/Kemanusiaan).
- Sentiasa merujuk guru kaunselor sekolah untuk penetapan pakej mata pelajaran yang tepat.`;
  }

  if (qLower.includes('asasi') || qLower.includes('matrik') || qLower.includes('diploma')) {
    return `Perbezaan laluan pengajian lepasan SPM untuk **${job}**:
1. **Asasi (Foundation - 1 tahun):** Laluan pantas terus ke Degree di universiti yang sama.
2. **Matrikulasi KPM (1-2 tahun):** Pilihan kos rendah dan diiktiraf untuk kemasukan semua IPTA melalui UPU.
3. **Diploma (2.5 - 3 tahun):** Menekankan kemahiran praktikal dan amali. Boleh terus bekerja atau menyambung ke Degree tahun kedua.`;
  }

  return `Hai! Bagi mendalami laluan kerjaya **${job}** dalam Kod **${hollandCode || 'Holland'}**:
- Anda boleh tonton simulasi VR POV dalam aplikasi ini untuk melihat suasana sebenar.
- Rujuk portal rasmi UPUOnline dan laman web universiti tempatan seperti UM, UTM, UiTM dan IPTA lain untuk syarat kelayakan terkini.
- Teruskan berusaha dan jangan ragu untuk bertanya lagi sekiranya anda perlukan bimbingan lanjut!`;
}
