import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

// Career AI guidance endpoint
app.post('/api/career-ai', async (req, res) => {
  try {
    const {
      question,
      careerTitle,
      hollandCode,
      hollandName,
      studentName,
      studentScores,
      conversationHistory,
    } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Sila masukkan soalan anda.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Friendly offline / backup answer generator if GEMINI_API_KEY is not configured
    if (!apiKey) {
      console.warn('GEMINI_API_KEY not configured. Providing structured counselor fallback.');
      const fallbackReply = generateCounselorFallback({
        question,
        careerTitle,
        hollandCode,
        hollandName,
        studentName,
      });
      return res.json({ reply: fallbackReply });
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `Anda adalah "Cikgu Kaunselor AI Kerjaya KPM" — Guru Bimbingan dan Kaunseling Kerjaya sekolah menengah di Malaysia yang berdedikasi, mesra, berwibawa dan pakar dalam Ujian Minat Kerjaya Sidek (Holland RIASEC).

Tugas utama anda adalah membimbing pelajar sekolah (Tingkatan 1 hingga 5 serta lepasan SPM) yang bertanya mengenai:
1. Kod Holland RIASEC (R - Realistik, I - Investigatif, A - Artistik, S - Sosial, E - Enterprising, K/C - Konvensional).
2. Perincian kerjaya (skop kerja, cabaran, suasana tempat kerja, kemahiran utama, dan kelebihan).
3. Pakej mata pelajaran elektif SPM (Tingkatan 4 & 5 seperti STEM Sains Tulen, STEM Sains Komputer/Teknikal, Sastera & Kemanusiaan, serta aliran TVET).
4. Laluan pengajian selepas SPM (Asasi, Matrikulasi KPM, Diploma Politeknik/UiTM, STPM, TVET) hingga ke Ijazah Sarjana Muda (Degree) di universiti tempatan (IPTA seperti UM, UTM, UKM, USM, UPM, UiTM, UTHM, UTeM, dsb.) dan IPTS.
5. Badan profesional dan pensijilan industri di Malaysia (cth: Lembaga Jurutera Malaysia/BEM, Majlis Perubatan Malaysia/MMC, Lembaga Arkitek Malaysia/LAM, Institut Akauntan Malaysia/MIA).
6. Panduan jika keputusan peperiksaan sederhana dan alternatif terbaik untuk berjaya.

Gaya bahasa & nada:
- Gunakan Bahasa Melayu yang mesra ("Cikgu", "Adik/Pelajar"), menyokong, penuh motivasi, dan berstruktur kemas.
- Gunakan poin bernombor atau 'bullet points' ringkas untuk memudahkan bacaan di skrin telefon/komputer.
- Berikan maklumat yang tepat dan selaras dengan sistem pendidikan Malaysia (KPM / UPU / KPT).`;

    let userPrompt = `Soalan Pelajar: "${question}"\n\n`;
    if (studentName) userPrompt += `Nama Pelajar: ${studentName}\n`;
    if (hollandCode || hollandName) {
      userPrompt += `Bidang Kod Holland: ${hollandCode || ''} - ${hollandName || ''}\n`;
    }
    if (careerTitle) {
      userPrompt += `Pekerjaan yang sedang dilihat/diminati: ${careerTitle}\n`;
    }
    if (studentScores) {
      userPrompt += `Skor Profil RIASEC Pelajar: ${JSON.stringify(studentScores)}\n`;
    }

    if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
      userPrompt += `\nSejarah perbualan sebelum ini:\n`;
      for (const msg of conversationHistory.slice(-4)) {
        userPrompt += `${msg.role === 'user' ? 'Pelajar' : 'Cikgu AI'}: ${msg.text}\n`;
      }
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || 'Maaf, Cikgu tidak dapat menjana respon buat masa ini. Sila cuba sebentar lagi!';
    return res.json({ reply: replyText });
  } catch (error: any) {
    console.error('Error in /api/career-ai:', error);

    // Provide friendly fallback if Gemini API throws or quotas exceeded
    const reqData = req.body || {};
    const fallback = generateCounselorFallback({
      question: reqData.question,
      careerTitle: reqData.careerTitle,
      hollandCode: reqData.hollandCode,
      hollandName: reqData.hollandName,
      studentName: reqData.studentName,
    });
    return res.json({
      reply: fallback,
      note: 'Jawapan disediakan daripada pangkalan bimbingan kaunselor kerjaya.',
    });
  }
});

// Helper intelligent counselor guidance generator for career queries
function generateCounselorFallback(data: {
  question?: string;
  careerTitle?: string;
  hollandCode?: string;
  hollandName?: string;
  studentName?: string;
}): string {
  const name = data.studentName || 'Pelajar';
  const career = data.careerTitle || 'bidang kerjaya ini';
  const code = (data.hollandCode || 'R').toUpperCase();
  const q = (data.question || '').toLowerCase();

  // Keyword-based personalized response matching
  if (q.includes('syarat') || q.includes('subjek') || q.includes('spm')) {
    let subjectRecommendations = 'Matematik, Bahasa Inggeris, dan mata pelajaran elektif yang berkaitan';
    if (code === 'R') {
      subjectRecommendations = 'Fizik, Matematik Tambahan, Kimia / Lukisan Kejuruteraan / Reka Bentuk & Teknologi / Sains Komputer';
    } else if (code === 'I') {
      subjectRecommendations = 'Biologi, Kimia, Fizik, Matematik Tambahan, atau Sains Komputer';
    } else if (code === 'A') {
      subjectRecommendations = 'Pendidikan Seni Visual (PSV), Reka Bentuk & Teknologi, Bahasa Inggeris, Multimedia / Kesusasteraan';
    } else if (code === 'S') {
      subjectRecommendations = 'Bahasa Melayu, Bahasa Inggeris, Sains, Pendidikan Islam / Moral, dan Sains Sosial';
    } else if (code === 'E') {
      subjectRecommendations = 'Prinsip Perakaunan, Perniagaan, Ekonomi, Matematik, dan Bahasa Inggeris Komunikasi';
    } else if (code === 'K' || code === 'C') {
      subjectRecommendations = 'Prinsip Perakaunan, Matematik, Perniagaan, Sains Komputer / Pengurusan Pejabat';
    }

    return `Salam **${name}**! Bagi membina masa depan kukuh ke arah kerjaya **${career}** (Kod Holland: **${code}**), berikut panduan subjek SPM:

📚 **Pakej Elektif SPM Disyorkan (Tingkatan 4–5):**
- **Subjek Utama:** ${subjectRecommendations}
- **Subjek Teras Wajib Lulus & Skor:** Bahasa Melayu (Wajib Kepujian), Sejarah (Wajib Lulus SPM), Bahasa Inggeris (Kredit penting untuk IPTA/IPTS), dan Matematik.

🎯 **Nasihat Cikgu:**
Sekiranya gred anda sederhana, jangan risau! Laluan TVET, Sijil Kemahiran Malaysia (SKM), atau Diploma Politeknik sentiasa terbuka luas dan menawarkan kelayakan setaraf ke universiti.`;
  }

  if (q.includes('pensijilan') || q.includes('sijil') || q.includes('badan') || q.includes('lesen')) {
    let certBody = 'Badan Profesional Berkaitan di Malaysia';
    if (career.toLowerCase().includes('jurutera') || code === 'R') {
      certBody = 'Board of Engineers Malaysia (BEM) / Institution of Engineers Malaysia (IEM)';
    } else if (career.toLowerCase().includes('doktor') || career.toLowerCase().includes('perubatan')) {
      certBody = 'Majlis Perubatan Malaysia (MMC - Malaysian Medical Council)';
    } else if (career.toLowerCase().includes('arkitek')) {
      certBody = 'Lembaga Arkitek Malaysia (LAM - Board of Architects Malaysia)';
    } else if (career.toLowerCase().includes('akaun') || code === 'C' || code === 'K') {
      certBody = 'Malaysian Institute of Accountants (MIA), ACCA, CIMA, atau CPA Australia';
    } else if (career.toLowerCase().includes('jururawat')) {
      certBody = 'Lembaga Jururawat Malaysia (LJM - Nursing Board Malaysia)';
    }

    return `Hai **${name}**! Untuk mencapai tahap profesional yang diiktiraf dalam **${career}**:

🏛️ **Badan Profesional Utama di Malaysia:**
- Diiktiraf oleh: **${certBody}**

📜 **Pensijilan & Lesen Industri Penting:**
- Pendaftaran rasmi dengan badan berkanun selepas menamatkan pengajian Ijazah Sarjana Muda yang diiktiraf MQA.
- Latihan praktikal / 'Housemanship' / 'Logbook' industri selama tempoh yang ditetapkan (contohnya 2–3 tahun pengalaman kerja diselia).
- Pensijilan industri antarabangsa tambahan (seperti AWS, CompTIA, Google, atau pensijilan teknikal khusus) amat bernilai tinggi dalam pasaran kerja global!`;
  }

  if (q.includes('asasi') || q.includes('matrik') || q.includes('diploma') || q.includes('degree') || q.includes('laluan')) {
    return `Hai **${name}**! Berikut adalah perbandingan laluan pengajian selepas SPM untuk menuju ke kerjaya **${career}**:

1. ⚡ **Asasi (Foundation - 1 Tahun):**
   - Ditawarkan oleh Universiti Awam (cth: UM, UiTM, UTM).
   - Laluan paling cepat untuk terus melangkah ke Ijazah Sarjana Muda (Degree) di universiti yang sama.

2. 🧪 **Matrikulasi KPM (1–2 Tahun):**
   - Yuran percuma dengan elaun sara hidup KPM.
   - Pilihan fleksibel untuk memohon pelbagai universiti awam (IPTA) menerusi portal UPUOnline.

3. 🛠️ **Diploma IPTA / Politeknik Premier (2.5–3 Tahun):**
   - Berorientasikan amali, praktikal, dan TVET berkemahiran tinggi.
   - Boleh terus bekerja selepas tamat atau menyambung terus ke Tahun 2 Degree dengan pemindahan kredit (Credit Transfer).

🎓 **Ijazah Sarjana Muda (Degree - 3–4 Tahun):**
- Diperlukan untuk kelayakan peringkat pengurusan, eksekutif, atau pengiktirafan badan profesional rasmi di Malaysia.`;
  }

  return `Hai **${name}**! Cikgu gembira melihat kesungguhan kamu meneroka kerjaya **${career}** dalam Kod Holland **${code}**.

💡 **Tiga Perkara Utama Perlu Diketahui:**
1. **Latihan Praktikal & Eksplorasi VR:**
   - Gunakan video POV 360° VR yang disediakan dalam aplikasi ini untuk merasai sendiri suasana kerja harian!
2. **Pilihan Laluan Pengajian Fleksibel:**
   - Selepas SPM, terdapat laluan Asasi, Matrikulasi KPM, Diploma Politeknik, mahupun TVET yang semuanya boleh membawa anda ke peringkat Ijazah Sarjana Muda.
3. **Peluang Pasaran Kerja:**
   - Bidang ini mempunyai kebolehpasaran yang stabil seiring dengan transformasi digital negara dan Dasar TVET Negara 2030.

Ada apa-apa soalan lain berkaitan subjek sekolah, universiti pilihan, atau tip temu duga yang ingin anda tanyakan kepada Cikgu?`;
}

// Development with Vite middleware or Production serving static dist
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, host: '0.0.0.0', port },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running at http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
