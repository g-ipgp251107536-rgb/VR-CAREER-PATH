import { HollandCodeType, HollandRoadmap } from '../types';

export const HOLLAND_ROADMAPS: Record<HollandCodeType, HollandRoadmap> = {
  R: {
    category: 'R',
    title: 'Pelan Laluan Akademik & Kokurikulum Kerjaya Realistik (R)',
    summary:
      'Pelajar dengan profil Realistik memiliki kekuatan semula jadi dalam manipulasi alatan fizikal, reka cipta mekanikal, penyelesaian masalah secara praktikal dan operasi teknologi terapan.',
    recommendedSPMStream: 'STEM Kejuruteraan & Sains Tulen / TVET Vokasional Teknikal',
    postSpmPathways: [
      'Matrikulasi Jurusan Kejuruteraan (KPM)',
      'Asasi Sains Kejuruteraan IPTA (UM, UTM, UKM, USM)',
      'Diploma Kejuruteraan Mekanikal / Mekatronik / Awam / Elektrik (Politeknik Premier / MTUN)',
      'Sijil Kemahiran Malaysia (SKM Tahap 3 & 4 / DKM) di ADTEC / IKM / CIAST',
    ],
    steps: [
      {
        stepNumber: 1,
        stageTitle: 'Peringkat Menengah Rendah',
        stageSubtitle: 'Asas Teknikal, Disiplin Fizikal & Penerokaan Alatan',
        targetYears: 'Tingkatan 1-3 (UASA & PBD)',
        academicSubjects: {
          recommendedStream: 'Teras Menengah Rendah dengan pengukuhan STEM',
          coreSubjects: ['Reka Bentuk & Teknologi (RBT)', 'Sains', 'Matematik', 'Bahasa Melayu', 'Bahasa Inggeris'],
          focusElectives: ['Asas Sains Komputer (ASK) jika ditawarkan', 'Projek Amali RBT (Mekanikal, Elektrik & Elektronik)'],
          examMilestone: 'Kecemerlangan PBD Tahap Penguasaan TP5/TP6 dalam RBT, Sains & Matematik untuk melayakkan diri ke Aliran STEM / Teknikal.',
        },
        extracurriculars: {
          uniformBodies: ['Kadet Remaja Sekolah (KRS)', 'Kadet Polis', 'Pengakap Sekolah', 'Kadet Bomba & Penyelamat'],
          clubsAndSocieties: ['Kelab Robotik & STEM', 'Kelab Reka Cipta & Inovasi', 'Kelab Komputer', 'Kelab Pertanian / Kitar Semula'],
          sportsAndRecreation: ['Olahraga', 'Bola Sepak / Futsal', 'Merentas Desa', 'Memanah / Silat'],
          competitionsAndMilestones: [
            'Pertandingan Reka Cipta & Inovasi Sekolah',
            'Pertandingan Robotik Kebangsaan (NRC) Peringkat Daerah/Negeri',
            'Karnival STEM Peringkat Pejabat Pendidikan Daerah (PPD)',
          ],
        },
        proTip:
          'Bina minat dengan membongkar dan memasang kit elektronik mudah (seperti Arduino/Micro:bit) dan latih kemahiran menggunakan alatan bengkel dengan selamat.',
      },
      {
        stepNumber: 2,
        stageTitle: 'Peringkat Menengah Atas & SPM',
        stageSubtitle: 'Pengkhususan Aliran STEM Kejuruteraan & Kemahiran Teknikal',
        targetYears: 'Tingkatan 4-5 (Peperiksaan SPM)',
        academicSubjects: {
          recommendedStream: 'Pakej STEM Kejuruteraan / Sains Tulen Teknikal / Aliran TVET Vokasional',
          coreSubjects: ['Matematik Tambahan', 'Fizik', 'Kimia', 'Matematik', 'Bahasa Inggeris'],
          focusElectives: [
            'Grafik Komunikasi Teknikal (GKT)',
            'Lukisan Kejuruteraan',
            'Asas Kelestarian / Sains Komputer',
            'Pengajian Kejuruteraan Mekanikal / Awam / Elektrik (di SM Teknik)',
          ],
          examMilestone: 'Mencapai sekurang-kurangnya Gred B+ dalam Fizik, Matematik & Matematik Tambahan untuk kemasukan program ijazah kejuruteraan.',
        },
        extracurriculars: {
          uniformBodies: ['Kadet Remaja Sekolah (KRS) - Jawatan Sarjan/Pegawai Waran', 'Kadet Bomba', 'Pengakap Raja'],
          clubsAndSocieties: [
            'Presiden / AJK Kelab Robotik & Kejuruteraan',
            'Kelab Inovasi & Rekacipta Sains',
            'Bengkel Kemahiran Teknikal Belia',
          ],
          sportsAndRecreation: ['Rugbi / Bola Sepak', 'Ekspedisi Mendaki / Pandu Arah', 'Badminton'],
          competitionsAndMilestones: [
            'Pertandingan F1 in Schools Malaysia',
            'Karnival STEM Kebangsaan (Kategori Drone & Robotik)',
            'WorldSkills Malaysia Belia (Kategori Pra-Kelayakan Kemahiran)',
          ],
        },
        proTip:
          'Fahami konsep fizikal di sebalik teori buku teks melalui simulasi VR dan latihan makmal. Mahirkan perisian lukisan CAD asas seperti Tinkercad atau Fusion 360.',
      },
      {
        stepNumber: 3,
        stageTitle: 'Peringkat Pra-Universiti / Lepasan SPM',
        stageSubtitle: 'Asas Kejuruteraan Gunaan, Diploma Politeknik & Matrikulasi',
        targetYears: 'Umur 18-20 Tahun (Pra-U / Diploma)',
        academicSubjects: {
          recommendedStream: 'Program Asasi Kejuruteraan / Matrikulasi Teknikal / Diploma MTUN & Politeknik',
          coreSubjects: ['Engineering Mathematics', 'Applied Mechanics', 'Circuit Theory', 'Thermodynamics'],
          focusElectives: ['Computer Aided Design (SolidWorks)', 'Programmable Logic Controller (PLC)', 'Workshop Technology'],
          examMilestone: 'PNGK 3.50+ dalam Matrikulasi/Asasi atau HPNM 3.30+ dalam Diploma untuk laluan terus ke Ijazah Kejuruteraan BEM.',
        },
        extracurriculars: {
          uniformBodies: ['Kor SUKSIS IPTA', 'Askar Wataniah', 'Kelab Kelana Pengakap'],
          clubsAndSocieties: ['Persatuan Mahasiswa Kejuruteraan', 'IEEE Student Branch', 'Kelab Automotif & Motorsport IPT'],
          sportsAndRecreation: ['Sukan Antara Kolej (SUKOL)', 'Bouldering / Rock Climbing', 'Kayaking'],
          competitionsAndMilestones: [
            'Pertandingan Shell Eco-marathon Asia',
            'Robocon Malaysia',
            'Inovasi Penyelidikan & Pameran Reka Cipta (ITEX / MTE)',
          ],
        },
        proTip:
          'Dapatkan pendedahan amali bengkel sebenar dan jangan sekadar hafal teori matematik. Kemahiran mengendalikan jentera CNC dan alat ujian memberikan kelebihan temuduga biasiswa.',
      },
      {
        stepNumber: 4,
        stageTitle: 'Peringkat Ijazah Sarjana Muda & Pasaran Kerja',
        stageSubtitle: 'Pentauliahan Jurutera BEM, Pelesenan MBOT & Penempatan Industri',
        targetYears: 'Umur 21-24 Tahun & Permulaan Kerjaya',
        academicSubjects: {
          recommendedStream: 'Ijazah Sarjana Muda Kejuruteraan (B.Eng Hons) / Sarjana Muda Teknologi Kejuruteraan (B.Eng Tech)',
          coreSubjects: ['Industrial Control Systems', 'Renewable Energy Systems', 'Project Management for Engineers'],
          focusElectives: ['Artificial Intelligence in Manufacturing', 'Industrial Internet of Things (IIoT)', 'Autonomous Vehicles'],
          examMilestone: 'Lulus Ijazah Akreditasi Engineering Accreditation Council (EAC) & Pendaftaran Graduate Engineer BEM.',
        },
        extracurriculars: {
          uniformBodies: ['Pegawai Kadet Simpanan (PALAPES) Darat / Udara'],
          clubsAndSocieties: ['Institution of Engineers Malaysia (IEM Young Engineers Section)', 'Engineers Without Borders'],
          sportsAndRecreation: ['Sukan Korporat', 'Maraton & Triathlon'],
          competitionsAndMilestones: [
            'Latihan Industri (Internship) 6 Bulan di Petronas / Intel / Dyson / Gamuda',
            'Projek Tahun Akhir (FYP) Berorientasikan Masalah Industri Sebenar',
            'Pendaftaran MBOT sebagai Teknologis Berkelayakan (Ts. / Tc.)',
          ],
        },
        proTip:
          'Daftar dengan Lembaga Jurutera Malaysia (BEM) sebaik tamat pengajian. Sasarkan pensijilan profesional (Professional Engineer - Ir.) dalam tempoh 3-5 tahun bekerja.',
      },
    ],
  },
  I: {
    category: 'I',
    title: 'Pelan Laluan Akademik & Kokurikulum Kerjaya Investigatif (I)',
    summary:
      'Pelajar dengan profil Investigatif mempunyai dorongan intelek yang tinggi untuk menyelidik fenomena sains, menganalisis data empirikal, dan menyelesaikan masalah yang memerlukan logik mendalam.',
    recommendedSPMStream: 'Pakej Sains Tulen (Fizik, Kimia, Biologi) & Matematik Tambahan / Sains Komputer Data',
    postSpmPathways: [
      'Matrikulasi KPM Jurusan Sains Hayat atau Sains Fizikal',
      'Asasi Sains Perubatan / Asasi Sains Hayat / Asasi Sains Komputer (IPTA)',
      'Sijil Tinggi Persekolahan Malaysia (STPM) Aliran Sains',
      'Cambridge A-Levels / International Baccalaureate (Laluan Biasiswa Luar Negara)',
    ],
    steps: [
      {
        stepNumber: 1,
        stageTitle: 'Peringkat Menengah Rendah',
        stageSubtitle: 'Membina Asas Sains, Pemikiran Kritikal & Logik Algoritma',
        targetYears: 'Tingkatan 1-3 (UASA & PBD)',
        academicSubjects: {
          recommendedStream: 'Teras Menengah Rendah dengan fokus Kaedah Saintifik',
          coreSubjects: ['Sains', 'Matematik', 'Bahasa Inggeris', 'Bahasa Melayu', 'Geografi'],
          focusElectives: ['Asas Sains Komputer (ASK)', 'Program Celik Data & Logik'],
          examMilestone: 'Mencapai Tahap Penguasaan TP6 dalam Sains dan Matematik bagi memastikan kelayakan ke Aliran Sains Tulen.',
        },
        extracurriculars: {
          uniformBodies: ['Bulan Sabit Merah Malaysia (BSMM)', 'St. John Ambulans Malaysia (SJAM)', 'Kadet Remaja Sekolah'],
          clubsAndSocieties: ['Kelab Sains & Matematik', 'Kelab Astronomi & Falak', 'Kelab Pengaturcaraan & AI', 'Kelab Inovasi Saintis Muda'],
          sportsAndRecreation: ['Catur', 'Scrabble', 'Memanah', 'Renang'],
          competitionsAndMilestones: [
            'Kangaroo Math Competition Malaysia',
            'Bebras Computational Thinking Challenge',
            'Karnival Saintis Muda Peringkat Daerah (PPD)',
          ],
        },
        proTip:
          'Amalkan membaca artikel penyelidikan sains popular seperti National Geographic atau majalah Dewan Kosmik. Tulis jurnal pemerhatian mikro untuk setiap eksperimen sains.',
      },
      {
        stepNumber: 2,
        stageTitle: 'Peringkat Menengah Atas & SPM',
        stageSubtitle: 'Kecemerlangan Pakej Sains Tulen & Analisis Data Eksperimen',
        targetYears: 'Tingkatan 4-5 (Peperiksaan SPM)',
        academicSubjects: {
          recommendedStream: 'Pakej Sains Tulen Lengkap / STEM Sains Komputer & Data',
          coreSubjects: ['Biologi', 'Kimia', 'Fizik', 'Matematik Tambahan', 'Bahasa Inggeris (CEFR)'],
          focusElectives: ['Sains Komputer', 'Bahasa Antarabangsa (Jepun/Jerman/Mandarin)'],
          examMilestone: 'Sasaran Minimum Gred A dalam Kimia, Biologi/Fizik, dan Matematik Tambahan untuk persediaan biasiswa perubatan, bioteknologi atau sains data.',
        },
        extracurriculars: {
          uniformBodies: ['St. John Ambulans (Pegawai Pertolongan Cemas)', 'Bulan Sabit Merah Malaysia (Ketua Pertolongan Cemas)'],
          clubsAndSocieties: [
            'Pengerusi Kelab Sains & Matematik',
            'Kelab Debat Bahasa Inggeris & Saintifik',
            'Kelab Coding & Algoritma Python',
          ],
          sportsAndRecreation: ['Catur Kejohanan MSSD', 'Badminton', 'Lari Berpagar'],
          competitionsAndMilestones: [
            'Olimpiad Matematik Kebangsaan (OMK)',
            'Malaysian Biology / Chemistry Olympiad',
            'National Science Challenge (Akademi Sains Malaysia)',
          ],
        },
        proTip:
          'Kuasai teknik hipotesis saintifik dan manipulasi pemboleh ubah dalam Kertas 3 SPM. Mula pelajari bahasa pengaturcaraan Python untuk pemprosesan data sains.',
      },
      {
        stepNumber: 3,
        stageTitle: 'Peringkat Pra-Universiti / Lepasan SPM',
        stageSubtitle: 'Asas Penyelidikan Makmal & Matematik Tulen Lanjutan',
        targetYears: 'Umur 18-20 Tahun (Matrikulasi / Asasi / STPM)',
        academicSubjects: {
          recommendedStream: 'Asasi Sains Hayat / Fizikal IPTA, Matrikulasi KPM Jurusan Sains, atau STPM Aliran Sains',
          coreSubjects: ['Organic Chemistry', 'Molecular Biology & Genetics', 'Calculus & Statistics', 'Biophysics'],
          focusElectives: ['Bioinformatics', 'Data Analytics Tools (R/Python)', 'Scientific Research Methodology'],
          examMilestone: 'Mencapai Purata Nilai Gred Kumulatif (PNGK) 3.80-4.00 untuk kemasukan ke fakulti perubatan, bioteknologi atau sains komputer berdaya saing.',
        },
        extracurriculars: {
          uniformBodies: ['Kor Siswa Polis', 'Kadet Pertahanan Awam IPT'],
          clubsAndSocieties: ['Medical / Biomedical Science Student Society', 'Artificial Intelligence Research Club', 'Science Journalism Club'],
          sportsAndRecreation: ['Catur IPTA (MASUM)', 'Tenis', 'Kayuh Basikal'],
          competitionsAndMilestones: [
            'Pertandingan Kertas Penyelidikan Saintifik Mahasiswa',
            'Hackathon Sains Data & AI Kebangsaan',
            'Penerbitan Artikel Ilmiah Pertama di Peringkat Varsiti',
          ],
        },
        proTip:
          'Dekati pensyarah dan mohon untuk menjadi pembantu penyelidik (Research Assistant) semasa cuti semester untuk memahami protokol makmal penyelidikan peringkat universiti.',
      },
      {
        stepNumber: 4,
        stageTitle: 'Peringkat Ijazah Sarjana Muda & Laluan Penyelidik',
        stageSubtitle: 'Kesarjanaan, Penulisan Tesis, Pelesenan MMC / IKM & Kerjaya R&D',
        targetYears: 'Umur 21-25 Tahun & Penyelidikan Lanjutan',
        academicSubjects: {
          recommendedStream: 'Ijazah Sarjana Muda Sains (Kepujian) / Perubatan (MBBS) / Sains Komputer Kepintaran Buatan',
          coreSubjects: ['Clinical Epidemiology', 'Genomics & Proteomics', 'Machine Learning Models', 'Scientific Thesis'],
          focusElectives: ['Pharmacovigilance', 'Bioethics & Law', 'Deep Neural Networks'],
          examMilestone: 'Ijazah Kelas Pertama (First Class Honours) & Pendaftaran dengan Institut Kimia Malaysia (ChM.) atau Majlis Perubatan Malaysia (MMC).',
        },
        extracurriculars: {
          uniformBodies: ['Pegawai Kesihatan Sukarela / Bulan Sabit Merah Universiti'],
          clubsAndSocieties: ['Akademi Sains Malaysia (Young Scientists Network)', 'Malaysian Society for Biochemistry & Molecular Biology'],
          sportsAndRecreation: ['Sukan Rekreasi Minda', 'Yoga & Meditasi Fokus'],
          competitionsAndMilestones: [
            'Latihan Penyelidikan di Institut Penyelidikan Perubatan (IMR) / MIMOS / MARDI',
            'Penyertaan Persidangan Saintifik Antarabangsa',
            'Laluan Fast-Track Pengajian Sarjana & Kedoktoran (Ph.D) / Biasiswa Yang di-Pertuan Agong',
          ],
        },
        proTip:
          'Fokus kepada penerbitan jurnal berindeks (Scopus/WOS). Bidang sains hayat dan sains data di Malaysia kini menawarkan geran inovasi bernilai tinggi.',
      },
    ],
  },
  A: {
    category: 'A',
    title: 'Pelan Laluan Akademik & Kokurikulum Kerjaya Artistik (A)',
    summary:
      'Pelajar dengan profil Artistik mempunyai bakat ekspresi visual, imaginasi konsep yang subur, kepekaan estetika, serta keupayaan mencipta naratif kreatif dan reka bentuk visual.',
    recommendedSPMStream: 'Pakej Kemanusiaan Seni Visual & Media Kreatif / Seni Bina & Reka Bentuk',
    postSpmPathways: [
      'Diploma Seni Reka Grafik & Media Digital (UiTM / Politeknik / MQA Approved)',
      'Asasi Seni Kreatif & Warisan (ASWARA / Fakulti Seni Gunaan UNIMAS)',
      'Asasi Reka Bentuk / Senibina (Architecture Foundation) di UIAM / UTM / Taylor’s',
      'Diploma Animasi 3D & Kesan Khas Visual (MMU / The One Academy / UPSI)',
    ],
    steps: [
      {
        stepNumber: 1,
        stageTitle: 'Peringkat Menengah Rendah',
        stageSubtitle: 'Eksplorasi Media Visual, Penceritaan & Asas Teori Seni',
        targetYears: 'Tingkatan 1-3 (UASA & PBD)',
        academicSubjects: {
          recommendedStream: 'Teras Menengah Rendah dengan tumpuan Kesenian & Bahasa',
          coreSubjects: ['Pendidikan Seni Visual (PSV)', 'Pendidikan Muzik / RBT', 'Bahasa Melayu', 'Bahasa Inggeris'],
          focusElectives: ['Asas Seni Digital & Ilustrasi', 'Kesusasteraan Awal'],
          examMilestone: 'Gred A / TP6 dalam Pendidikan Seni Visual dan pengumpulan portfolio lakaran peribadi sekurang-kurangnya 20 karya visual.',
        },
        extracurriculars: {
          uniformBodies: ['Pasukan Pancaragam Sekolah (Brass Band)', 'Pengakap Seni', 'Pandu Puteri'],
          clubsAndSocieties: [
            'Kelab Seni Visual & Kraf',
            'Kelab Fotografi & Videografi Sekolah',
            'Kelab Teater & Drama Komedi',
            'Sidang Redaksi Majalah Sekolah (Pereka Grafik & Jurugambar)',
          ],
          sportsAndRecreation: ['Gimnastik Berirama', 'Tarian Tradisional / Kebudayaan', 'Senamrobik'],
          competitionsAndMilestones: [
            'Pertandingan Melukis Poster Sempena Bulan Kemerdekaan',
            'Pertandingan Komik Strip Murid Sekolah Kebangsaan',
            'Festival Kesenian Murid Prasekolah & Sekolah Rendah/Menengah (FESKUM)',
          ],
        },
        proTip:
          'Bina akaun portfolio digital (seperti Behance atau ArtStation) dari awal. Kumpul lukisan anatomi, kajian warna, dan lakaran perspektif.',
      },
      {
        stepNumber: 2,
        stageTitle: 'Peringkat Menengah Atas & SPM',
        stageSubtitle: 'Pengukuhan Portfolio Seni Visual, Lukisan Teknikal & Media Digital',
        targetYears: 'Tingkatan 4-5 (Peperiksaan SPM)',
        academicSubjects: {
          recommendedStream: 'Pakej Seni Reka & Kemanusiaan / Pakej Seni Bina & GKT',
          coreSubjects: ['Pendidikan Seni Visual (PSV)', 'Bahasa Melayu', 'Bahasa Inggeris', 'Sejarah', 'Matematik'],
          focusElectives: [
            'Grafik Komunikasi Teknikal (GKT) - Sangat disyorkan untuk Seni Bina',
            'Kesusasteraan Melayu Komunikatif / Literature in English',
            'Reka Cipta',
          ],
          examMilestone: 'Mencapai Gred A+ dalam Kertas SPM PSV (Kertas 1 Teori & Kertas 2 Seni Halus/Reka Bentuk serta Kertas 3 Kerja Kursus Portfolio).',
        },
        extracurriculars: {
          uniformBodies: ['Pasukan Kawad Berirama / Pancaragam Sekolah (Ketua Seksyen)'],
          clubsAndSocieties: [
            'Ketua Pereka Grafik Sidang Redaksi Majalah Sekolah',
            'Pengerusi Kelab Seni & Teater',
            'Kelab Produksi Media Digital & Vlog Sekolah',
          ],
          sportsAndRecreation: ['Silat Seni', 'Tarian Kontemporari', 'Ping Pong'],
          competitionsAndMilestones: [
            'Pertandingan Filem Pendek & Animasi Remaja FINAS / KPM',
            'Pameran Seni Visual Bakat Muda SeMalaysia',
            'Sayembara Deklamasi Puisi & Teater Kemerdekaan',
          ],
        },
        proTip:
          'Pelajari perisian industri standard seperti Adobe Illustrator, Photoshop, Blender 3D, atau Procreate di samping mengekalkan kemahiran melukis secara manual.',
      },
      {
        stepNumber: 3,
        stageTitle: 'Peringkat Pra-Universiti / Diploma Seni',
        stageSubtitle: 'Pembangunan Identiti Artistik, Tipografi & Reka Bentuk UI/UX',
        targetYears: 'Umur 18-20 Tahun (Diploma Seni / Asasi Kreatif)',
        academicSubjects: {
          recommendedStream: 'Diploma Reka Bentuk Grafik / Asasi Seni Kreatif ASWARA / Asasi Alam Bina (Architecture)',
          coreSubjects: ['Visual Design Principles', 'Typography & Layout', 'Digital Illustration', 'History of Art & Culture'],
          focusElectives: ['UI/UX Interface Design', '3D Modeling & Texturing', 'Brand Identity Systems'],
          examMilestone: 'Lulus penilaian pameran akhir tahun (Degree Showcase) dan mencapai Purata HPNM 3.30+.',
        },
        extracurriculars: {
          uniformBodies: ['Kelab Kembara Seni', 'Kelab Teater Varsiti'],
          clubsAndSocieties: ['Persatuan Mahasiswa Seni Reka (SMSR UiTM)', 'Creative Hub Collective', 'Kelab Animasi & Komik'],
          sportsAndRecreation: ['Frisbee', 'Badminton', 'Yoga'],
          competitionsAndMilestones: [
            'Kancil Awards (Student Category for Advertising)',
            'Penyertaan Comic Fiesta Malaysia / AniManGaki',
            'Pameran Terbuka Balai Seni Negara (National Art Gallery)',
          ],
        },
        proTip:
          'Ketahui perbezaan antara ekspresi seni tulen dan penyelesaian masalah reka bentuk komersial. Klien korporat membayar pereka yang mampu menyelesaikan masalah komunikasi jenama.',
      },
      {
        stepNumber: 4,
        stageTitle: 'Peringkat Ijazah Sarjana Muda & Pasaran Industri Kreatif',
        stageSubtitle: 'Penguasaan Industri Multimedia, Pengarah Kreatif & Pelesenan LAM',
        targetYears: 'Umur 21-24 Tahun & Industri Kreatif',
        academicSubjects: {
          recommendedStream: 'Ijazah Sarjana Muda Seni Reka Grafik / Seni Bina (B.Arch) / Reka Bentuk Permainan (Game Art) / Perfileman',
          coreSubjects: ['Design Thinking & Innovation', 'Creative Direction', 'Intellectual Property in Arts', 'Capstone Graduation Project'],
          focusElectives: ['Virtual Reality Experience Design', 'Motion Graphics for Film', 'Packaging Sustainability'],
          examMilestone: 'Penganugerahan Ijazah & Portfolio Showreel Bertaraf Industri Antarabangsa.',
        },
        extracurriculars: {
          uniformBodies: ['Sukarelawan Festival Seni Antarabangsa'],
          clubsAndSocieties: ['Pertubuhan Akitek Malaysia (PAM - Bahagian Pelajar)', 'Malaysia Digital Economy Corporation (MDEC Creators)'],
          sportsAndRecreation: ['Pilates', 'Aktiviti Seni Rekreasi Luar'],
          competitionsAndMilestones: [
            'Internship di Agensi Pengiklanan Terkemuka (cth: Ogilvy, Leo Burnett, Monsta Studios, Les Copaque)',
            'Pencalonan Anugerah Festival Filem Pelajar Malaysia',
            'Pendaftaran LAM Bahagian I / II (untuk calon Seni Bina)',
          ],
        },
        proTip:
          'Fahami hak cipta ciptaan seni dan tanda dagang (MyIPO). Industri kreatif Malaysia kini disokong kuat oleh dana MDEC dan geran pembangunan animasi serantau.',
      },
    ],
  },
  S: {
    category: 'S',
    title: 'Pelan Laluan Akademik & Kokurikulum Kerjaya Sosial (S)',
    summary:
      'Pelajar dengan profil Sosial memiliki empati mendalam, kemahiran interpersonal yang tinggi, kecenderungan membimbing, mengajar, menyembuhkan, dan memperkasa komuniti.',
    recommendedSPMStream: 'Pakej Kemanusiaan & Sains Sosial / Sains Kesihatan & Pendidikan',
    postSpmPathways: [
      'Ijazah Sarjana Muda Perguruan (PISMP) di Institut Pendidikan Guru (IPG)',
      'Tingkatan 6 (STPM Aliran Sains Sosial / Kemanusiaan)',
      'Diploma Kejururawatan / Fisioterapi (Kolej Sains Kesihatan KKM / IPTA)',
      'Asasi Pengajian Islam & Sains Kemanusiaan (UIAM / UM / USIM)',
      'Diploma Pendidikan Awal Kanak-Kanak / Kerja Sosial (UPSI / UUM)',
    ],
    steps: [
      {
        stepNumber: 1,
        stageTitle: 'Peringkat Menengah Rendah',
        stageSubtitle: 'Asas Kepimpinan Sahsiah, Komunikasi Terbuka & Kerja Berpasukan',
        targetYears: 'Tingkatan 1-3 (UASA & PBD)',
        academicSubjects: {
          recommendedStream: 'Teras Menengah Rendah berfokuskan Bahasa & Kemasyarakatan',
          coreSubjects: ['Bahasa Melayu', 'Bahasa Inggeris', 'Pendidikan Moral / Pendidikan Islam', 'Geografi', 'Sejarah'],
          focusElectives: ['Pendidikan Kesihatan & Reproduktif', 'Asas Khidmat Komuniti'],
          examMilestone: 'Pencapaian markah cemerlang dalam Bahasa Melayu dan Bahasa Inggeris lisan serta rekod sahsiah terpuji (SSDM sifar salah laku).',
        },
        extracurriculars: {
          uniformBodies: ['Bulan Sabit Merah Malaysia (BSMM)', 'Pandu Puteri Malaysia', 'St. John Ambulans', 'Pengakap Kanak-Kanak/Muda'],
          clubsAndSocieties: [
            'Pembimbing Rakan Sebaya (PRS - PRS Bongsu)',
            'Kelab Bimbingan & Kaunseling',
            'Kelab Rukun Negara & Perpaduan',
            'Kelab Pencegahan Jenayah',
          ],
          sportsAndRecreation: ['Bola Jaring', 'Badminton', 'Bola Tampar', 'Senam Sihat Sekolah'],
          competitionsAndMilestones: [
            'Pertandingan Pengucapan Awam / Syarahan Perpaduan',
            'Kem Pemantapan PRS Peringkat Daerah',
            'Anugerah Tokoh Sahsiah Murid Sekolah',
          ],
        },
        proTip:
          'Sertai badan Pembimbing Rakan Sebaya (PRS) seawal Tingkatan 1. Kemahiran mendengar secara aktif dan empati membina keyakinan diri yang amat tinggi.',
      },
      {
        stepNumber: 2,
        stageTitle: 'Peringkat Menengah Atas & SPM',
        stageSubtitle: 'Pengukuhan Kepimpinan, Pengurusan Komuniti & Prestasi SPM',
        targetYears: 'Tingkatan 4-5 (Peperiksaan SPM)',
        academicSubjects: {
          recommendedStream: 'Pakej Kemanusiaan & Sains Kesihatan / Pakej Pendidikan Sains Tulen',
          coreSubjects: ['Bahasa Melayu', 'Bahasa Inggeris', 'Sejarah', 'Matematik', 'Sains / Biologi'],
          focusElectives: [
            'Tasawwur Islam / Pendidikan Moral',
            'Kesusasteraan Melayu Komunikatif',
            'Sains Rumah Tangga (SRT)',
            'Ekonomi / Geografi',
          ],
          examMilestone: 'Mencapai sekurang-kurangnya 5 kepujian (Gred C ke atas) termasuk Bahasa Melayu dan Sejarah, dengan Gred A dalam Bahasa untuk kemasukan IPG.',
        },
        extracurriculars: {
          uniformBodies: ['Ketua Platun Pandu Puteri / BSMM', 'Pengerusi St. John Ambulans Sekolah'],
          clubsAndSocieties: [
            'Ketua Pembimbing Rakan Sebaya (PRS Kebangsaan)',
            'Lembaga Pengawas Sekolah (Biro Kebajikan Pelajar)',
            'Kelab Khidmat Masyarakat (Interact Club)',
          ],
          sportsAndRecreation: ['Kapten Pasukan Bola Jaring', 'Senamrobik Komuniti', 'Olahraga'],
          competitionsAndMilestones: [
            'Kem Duta Sahsiah Murid Peringkat Negeri',
            'Ujian Kelayakan Calon Guru (e-UKCG) Kementerian Pendidikan Malaysia',
            'Program Khidmat Bakti Rumah Kebajikan & Orang Tua Tempatan',
          ],
        },
        proTip:
          'Latih kemahiran bertutur di hadapan khalayak ramai. Simpan rekod sijil penglibatan kokurikulum untuk markah merit PAJSK yang tinggi.',
      },
      {
        stepNumber: 3,
        stageTitle: 'Peringkat Pra-Universiti / Latihan Perguruan / Diploma',
        stageSubtitle: 'Pedagogi Asas, Teori Psikologi Manusia & Praktikum Komuniti',
        targetYears: 'Umur 18-20 Tahun (IPG / STPM / Diploma Kesihatan)',
        academicSubjects: {
          recommendedStream: 'Program Ijazah Sarjana Muda Perguruan (PISMP) IPG / Diploma Kejururawatan KKM / STPM',
          coreSubjects: ['Developmental Psychology', 'Sociology of Education', 'Communication for Healthcare Professionals'],
          focusElectives: ['Counseling Theories', 'Community Health Nursing', 'Special Needs Education (Pendidikan Khas)'],
          examMilestone: 'Lulus Praktikum Mengajar / Latihan Klinikal Hospital dan lulus Ujian Kelayakan Guru KPM.',
        },
        extracurriculars: {
          uniformBodies: ['Kadet Koreksional IPT', 'KRS Siswa IPG'],
          clubsAndSocieties: ['Persatuan Guru Pelatih (JPP IPG)', 'Kelab Sukarelawan Belia KPT', 'Kelab Kaunseling Rakan Mahasiswa'],
          sportsAndRecreation: ['Sukan Guru (KAGUM)', 'Zumba Komuniti', 'Sukaneka Tradisional'],
          competitionsAndMilestones: [
            'Pertandingan Inovasi Pedagogi Pembelajaran Abad Ke-21 (PAK21)',
            'Misi Bantuan Kemanusiaan Mangsa Banjir Nasional',
            'Konvensyen PRS Kebangsaan',
          ],
        },
        proTip:
          'Kemahiran mengendalikan murid berkeperluan khas (MBK) dan empati psikologi klinikal kini menjadi salah satu bidang paling dicari di sekolah dan hospital.',
      },
      {
        stepNumber: 4,
        stageTitle: 'Peringkat Ijazah Sarjana Muda & Kerjaya Khidmat Sosial',
        stageSubtitle: 'Pentauliahan Pendidik, Jururawat Berdaftar LJM & Kaunselor Berdaftar',
        targetYears: 'Umur 21-24 Tahun & Penempatan Perkhidmatan Awam / NGO',
        academicSubjects: {
          recommendedStream: 'Ijazah Sarjana Muda Pendidikan (ISMP) / Ijazah Psikologi / Ijazah Kaunseling / Kejururawatan',
          coreSubjects: ['Professional Ethics in Counseling', 'Psychological Assessment & Diagnostic', 'Educational Leadership'],
          focusElectives: ['Child & Adolescent Mental Health', 'Organizational Psychology', 'Disaster Relief Management'],
          examMilestone: 'Lembaga Kaunselor Malaysia (LKM) Perakuan Amalan / Pendaftaran Lembaga Jururawat Malaysia (LJM).',
        },
        extracurriculars: {
          uniformBodies: ['Pegawai Sukarelawan JPAM / Angkatan Pertahanan Awam'],
          clubsAndSocieties: ['Persatuan Kaunseling Malaysia (PERKAMA International)', 'MERCY Malaysia Volunteers'],
          sportsAndRecreation: ['Larian Amal (Charity Run)', 'Aktiviti Rekreasi Komuniti'],
          competitionsAndMilestones: [
            'Penempatan Perkhidmatan Awam Suruhanjaya Perkhidmatan Pendidikan (SPP)',
            'Pengiktirafan Kaunselor Berdaftar (KB, PA)',
            'Penganjuran Kempen Kesihatan Mental Sekolah / Komuniti',
          ],
        },
        proTip:
          'Jaga kesihatan emosi sendiri (elakkan "burnout") dengan mengamalkan "self-care". Profesional dalam bidang sosial amat dihargai kerana nilai kemanusiaan mereka.',
      },
    ],
  },
  E: {
    category: 'E',
    title: 'Pelan Laluan Akademik & Kokurikulum Kerjaya Berdaya Usaha (E)',
    summary:
      'Pelajar dengan profil Berdaya Usaha (Enterprising) mempunyai karisma memimpin, kemahiran meyakinkan orang lain, visi perniagaan yang tajam, dan keberanian mengambil risiko strategik.',
    recommendedSPMStream: 'Pakej Perniagaan, Ekonomi & Perakaunan / Sains Sosial Kepimpinan',
    postSpmPathways: [
      'Matrikulasi KPM Jurusan Perakaunan / Perniagaan',
      'Diploma Pengurusan Perniagaan / Pemasaran Digital (UiTM / Politeknik Premier)',
      'Asasi Pengurusan & Undang-undang (Asasi Undang-undang UiTM KPT / Asasi UUM)',
      'Tingkatan 6 (STPM Aliran Ekonomi / Pengajian Perniagaan)',
      'Ijazah Undang-undang (LL.B) / Pentadbiran Korporat',
    ],
    steps: [
      {
        stepNumber: 1,
        stageTitle: 'Peringkat Menengah Rendah',
        stageSubtitle: 'Asas Celik Wang, Retorik Pidato & Inisiatif Berniaga Awal',
        targetYears: 'Tingkatan 1-3 (UASA & PBD)',
        academicSubjects: {
          recommendedStream: 'Teras Menengah Rendah berteraskan Bahasa & Asas Perniagaan',
          coreSubjects: ['Matematik', 'Bahasa Melayu', 'Bahasa Inggeris', 'Reka Bentuk & Teknologi (Modul Perniagaan)'],
          focusElectives: ['Literasi Kewangan Belia', 'Asas Kemahiran Komunikasi'],
          examMilestone: 'Penguasaan cemerlang dalam Bahasa Melayu, Bahasa Inggeris dan Matematik untuk sokongan aliran perniagaan.',
        },
        extracurriculars: {
          uniformBodies: ['Kadet Polis Diraja Malaysia', 'Pengakap Sekolah (Ketua Patrol)', 'Kadet Remaja Sekolah'],
          clubsAndSocieties: [
            'Lembaga Pengawas Sekolah (Biro Disiplin / Acara Rasmi)',
            'Kelab Pengguna & Keusahawanan',
            'Kelab Debat & Pidato Sekolah',
            'Koperasi Sekolah (Pembantu Jualan Koperasi)',
          ],
          sportsAndRecreation: ['Futsal / Bola Sepak', 'Bola Keranjang', 'Skuasy', 'Sepak Takraw'],
          competitionsAndMilestones: [
            'Pertandingan Pidato Diraja Antara Sekolah',
            'Hari Keusahawanan / Hari Kantin Sekolah (Mengurus Gerai Jualan Sendiri)',
            'Cabaran Cabutan Bertuah Koperasi Sekolah Berdaya Saing',
          ],
        },
        proTip:
          'Ambil inisiatif mengendalikan gerai jualan semasa Hari Kantin atau Sukan Sekolah. Belajar cara mengira modal, keuntungan bersih, dan teknik tawar-menawar.',
      },
      {
        stepNumber: 2,
        stageTitle: 'Peringkat Menengah Atas & SPM',
        stageSubtitle: 'Penguasaan Ekonomi, Prinsip Akaun & Kepimpinan Lembaga Pengawas',
        targetYears: 'Tingkatan 4-5 (Peperiksaan SPM)',
        academicSubjects: {
          recommendedStream: 'Pakej Perniagaan & Ekonomi / Aliran Kemanusiaan Korporat',
          coreSubjects: ['Perniagaan', 'Ekonomi', 'Prinsip Perakaunan', 'Matematik', 'Bahasa Inggeris'],
          focusElectives: ['Matematik Tambahan (Pilihan strategik untuk kewangan kuantitatif)', 'Bahasa Antarabangsa Ketiga'],
          examMilestone: 'Gred A dalam Perniagaan, Ekonomi dan Bahasa Inggeris untuk melayakkan diri ke program asasi undang-undang atau perniagaan.',
        },
        extracurriculars: {
          uniformBodies: ['Pegawai Waran Kadet Polis', 'Ketua Platun Kawad KRS'],
          clubsAndSocieties: [
            'Ketua Pengawas Sekolah (Head Prefect)',
            'Pengerusi Kelab Usahawan Muda (Program Young Enterprise - YES)',
            'Kapten Pasukan Debat Bahasa Melayu / Bahasa Inggeris',
          ],
          sportsAndRecreation: ['Kapten Pasukan Bola Sepak / Futsal MSSD', 'Golf Remaja / Tenis', 'Berenang'],
          competitionsAndMilestones: [
            'Program Usahawan Muda (Young Enterprise Malaysia) Peringkat Negeri',
            'Pertandingan Debat Ala Parlimen Sekolah Menengah Kebangsaan',
            'Cabaran Celik Niaga SSM (Suruhanjaya Syarikat Malaysia)',
          ],
        },
        proTip:
          'Kuasai seni pengucapan awam tanpa teks. Keyakinan berhujah di hadapan penonton adalah aset terbesar seorang pemimpin korporat masa hadapan.',
      },
      {
        stepNumber: 3,
        stageTitle: 'Peringkat Pra-Universiti / Matrikulasi Perakaunan / Asasi Law',
        stageSubtitle: 'Strategi Pasaran, Analisis Risiko Kewangan & Kontrak Komersial',
        targetYears: 'Umur 18-20 Tahun (Matrikulasi / Diploma / Asasi Undang-undang)',
        academicSubjects: {
          recommendedStream: 'Matrikulasi Perakaunan KPM / Asasi Undang-Undang UiTM / Diploma Pentadbiran Perniagaan',
          coreSubjects: ['Commercial Law', 'Marketing Management', 'Financial Accounting', 'Organizational Behaviour'],
          focusElectives: ['Digital Marketing & Social Commerce', 'Business Negotiations', 'Economics for Managers'],
          examMilestone: 'PNGK 3.50+ dan penglibatan aktif dalam Majlis Perwakilan Pelajar (MPP).',
        },
        extracurriculars: {
          uniformBodies: ['Kor SUKSIS Polis IPTA', 'Kelab Debat Siswa Varsiti'],
          clubsAndSocieties: ['Majlis Perwakilan Pelajar (MPP)', 'AIESEC Student Chapter', 'Kelab Siswa Niaga Varsiti'],
          sportsAndRecreation: ['Sukan Korporat Varsiti', 'Tenis', 'Golf'],
          competitionsAndMilestones: [
            'Maybank GO Ahead Challenge / HSBC Case Competition',
            'Pertandingan Debat Perdana Antara Universiti',
            'Mendirikan Startup Digital Pertama Berdaftar dengan SSM',
          ],
        },
        proTip:
          'Mulakan perniagaan e-dagang kecil-kecilan (Shopee/TikTok Shop) atau agensi perkhidmatan pemasaran digital untuk memahami realiti pasaran sebenar.',
      },
      {
        stepNumber: 4,
        stageTitle: 'Peringkat Ijazah Sarjana Muda & Eksekutif Korporat',
        stageSubtitle: 'Pentauliahan Ijazah Perniagaan / Undang-undang & Rangkaian Pemimpin',
        targetYears: 'Umur 21-24 Tahun & Eksekutif Perniagaan',
        academicSubjects: {
          recommendedStream: 'Ijazah Sarjana Muda Pentadbiran Perniagaan (BBA) / Undang-undang (LL.B) / Pengurusan Kewangan Antarabangsa',
          coreSubjects: ['Strategic Corporate Management', 'Mergers & Acquisitions', 'Venture Capital & Investment'],
          focusElectives: ['FinTech Ecosystems', 'Corporate Governance & Ethics', 'International Trade Policy'],
          examMilestone: 'Ijazah Kelas Pertama & Tamat Latihan Dewan Undangan (Pupillage / CLP) atau Sijil Eksekutif Pengurusan.',
        },
        extracurriculars: {
          uniformBodies: ['Pegawai Kadet Simpanan Tentera / Polis'],
          clubsAndSocieties: ['Dewan Perniagaan Melayu / Cina / India Malaysia Muda', 'Rotary / Toastmasters International Club'],
          sportsAndRecreation: ['Golf Korporat', 'Maraton Bandaraya'],
          competitionsAndMilestones: [
            'Program Pengurusan Pelatih Siswazah (Management Trainee) di Maybank / CIMB / Khazanah Nasional / P&G',
            'Pembentangan Pelaburan kepada Pelabur Venture Capital (VC)',
            'Penganugerahan Usahawan Belia Harapan Negeri',
          ],
        },
        proTip:
          'Bina jaringan networking profesional di platform LinkedIn. Kebanyakan peluang kepimpinan dan tawaran pelaburan datang daripada kekuatan hubungan profesional anda.',
      },
    ],
  },
  K: {
    category: 'K',
    title: 'Pelan Laluan Akademik & Kokurikulum Kerjaya Konvensional (K)',
    summary:
      'Pelajar dengan profil Konvensional cemerlang dalam struktur yang tersusun rapi, ketepatan angka, pengurusan data terperinci, pematuhan prosedur piawaian (SOP) dan integriti akauntabiliti.',
    recommendedSPMStream: 'Pakej Prinsip Perakaunan, Ekonomi, Sains Komputer & Statistik',
    postSpmPathways: [
      'Program Profesional Perakaunan CAT-ACCA (Yayasan Peneraju / Kolej Matrikulasi)',
      'Matrikulasi Jurusan Perakaunan KPM',
      'Diploma Perakaunan / Diploma Pengurusan Maklumat (UiTM / Politeknik Premier)',
      'Tingkatan 6 (STPM Aliran Perakaunan & Matematik M)',
      'Asasi Pengkomputeran & Pengurusan Data (IPTA)',
    ],
    steps: [
      {
        stepNumber: 1,
        stageTitle: 'Peringkat Menengah Rendah',
        stageSubtitle: 'Asas Ketelitian Pengiraan, Pengurusan Data & Disiplin Rekod',
        targetYears: 'Tingkatan 1-3 (UASA & PBD)',
        academicSubjects: {
          recommendedStream: 'Teras Menengah Rendah berfokuskan Matematik & Sains Komputer',
          coreSubjects: ['Matematik', 'Asas Sains Komputer (ASK)', 'Bahasa Melayu', 'Bahasa Inggeris', 'Sejarah'],
          focusElectives: ['RBT (Pengurusan Rekod & Inventori)', 'Kemahiran Microsoft Excel Asas'],
          examMilestone: 'Gred A / TP6 dalam Matematik dan Asas Sains Komputer untuk membuktikan ketepatan logik angka.',
        },
        extracurriculars: {
          uniformBodies: ['Kadet Pertahanan Awam (KASPA)', 'Kadet Bomba & Penyelamat', 'Pengakap Sekolah'],
          clubsAndSocieties: [
            'Lembaga Pengawas Pusat Sumber (Pengawas Perpustakaan Sekolah)',
            'Kelab Koperasi Sekolah (Juru Audit Stok & Buku Tunai)',
            'Kelab Komputer & Analisis Data',
            'Kelab Filateli / Statistik',
          ],
          sportsAndRecreation: ['Catur', 'Memanah', 'Dart Kejohanan', 'Bowling Padang / Tenpin Bowling'],
          competitionsAndMilestones: [
            'Kuiz Celik Wang Kebangsaan anjuran Bank Negara Malaysia (BNM)',
            'Pertandingan Pengurusan Pusat Sumber Sekolah Cemerlang',
            'Karnival Celik Perakaunan Peringkat Zon',
          ],
        },
        proTip:
          'Latih diri menguruskan buku log perbelanjaan harian atau inventori buku perpustakaan. Ketepatan sifar ralat dalam mengira baki wang adalah asas akauntan bertaraf dunia.',
      },
      {
        stepNumber: 2,
        stageTitle: 'Peringkat Menengah Atas & SPM',
        stageSubtitle: 'Penguasaan Imbangan Duga, Prinsip Akaun & Automasi Spreadsheet',
        targetYears: 'Tingkatan 4-5 (Peperiksaan SPM)',
        academicSubjects: {
          recommendedStream: 'Pakej Perakaunan Profesional & Sains Komputer',
          coreSubjects: ['Prinsip Perakaunan', 'Ekonomi', 'Matematik', 'Matematik Tambahan', 'Bahasa Inggeris'],
          focusElectives: ['Sains Komputer (Pengaturcaraan pangkalan data SQL)', 'Perniagaan'],
          examMilestone: 'Mencapai Gred A+ dalam Prinsip Perakaunan SPM dan Gred A dalam Matematik untuk melayakkan diri ke program Biasiswa CAT-ACCA Yayasan Peneraju / JPA.',
        },
        extracurriculars: {
          uniformBodies: ['Sarjan Kadet Pertahanan Awam', 'Pegawai Disiplin Pengakap'],
          clubsAndSocieties: [
            'Ketua Pengawas Pusat Sumber Sekolah (Head Librarian)',
            'Bendahari Agung Koperasi Sekolah / PIBG Murid',
            'Kelab Perakaunan & Kewangan Belia',
          ],
          sportsAndRecreation: ['Tenpin Bowling', 'Catur MSSD', 'Ping Pong'],
          competitionsAndMilestones: [
            'Pertandingan Perakaunan Kebangsaan (National Accounting Quiz Challenge)',
            'Cabaran Bijak Wang anjuran PNB / Bank Negara Malaysia',
            'Audit Pematuhan Sistem Fail & Koperasi Sekolah Cemerlang',
          ],
        },
        proTip:
          'Kuasai jalan kira sistem catatan bergu (debit & kredit) dan formula spreadsheet Excel (VLOOKUP, SUMIFS, Pivot Table). Kemahiran Excel menjadikan anda calon rebutan firma audit.',
      },
      {
        stepNumber: 3,
        stageTitle: 'Peringkat Pra-Universiti / Program Profesional ACCA / Diploma',
        stageSubtitle: 'Piawaian Pelaporan Kewangan Antarabangsa (IFRS) & Pengauditan',
        targetYears: 'Umur 18-20 Tahun (ACCA / Matrikulasi / Diploma)',
        academicSubjects: {
          recommendedStream: 'Program Certified Accounting Technician (CAT) ➔ ACCA / Diploma Perakaunan UiTM / Politeknik',
          coreSubjects: ['Financial Accounting & Reporting (MFRS)', 'Management Accounting', 'Taxation Malaysia', 'Audit & Assurance'],
          focusElectives: ['Data Analytics for Accountants (Power BI)', 'Corporate & Business Law', 'Financial Forensics'],
          examMilestone: 'Lulus Kertas Asas ACCA (Applied Knowledge & Applied Skills) atau tamat Diploma dengan HPNM 3.60+.',
        },
        extracurriculars: {
          uniformBodies: ['Kor Sukarelawan Polis Siswa (SUKSIS)', 'KASPA Universiti'],
          clubsAndSocieties: ['Accounting Students Association (ASA)', 'Kelab Catur Universiti', 'Audit Internal Majlis Mahasiswa'],
          sportsAndRecreation: ['Tenpin Bowling Varsiti (MASUM)', 'Memanah Tradisional', 'Joging'],
          competitionsAndMilestones: [
            'PwC Trust Challenge / Deloitte Tax Challenge Malaysia',
            'EY Young Tax Professional of the Year',
            'KPMG Ideation Challenge',
          ],
        },
        proTip:
          'Sertai pertandingan percukaian kebangsaan seperti Deloitte Tax Challenge. Pendedahan kes cukai syarikat sebenar memberi nilai tambah yang sangat tinggi dalam resume.',
      },
      {
        stepNumber: 4,
        stageTitle: 'Peringkat Ijazah Sarjana Muda & Akauntan Bertauliah (CA)',
        stageSubtitle: 'Pentauliahan Institut Akauntan Malaysia (MIA), Juruaudit Bertauliah & Big 4',
        targetYears: 'Umur 21-24 Tahun & Firma Audit / Perbankan',
        academicSubjects: {
          recommendedStream: 'Ijazah Sarjana Muda Perakaunan (B.Acc) Diiktiraf Jadual 1 Akta Akauntan / ACCA Strategic Professional / MICPA-CAANZ',
          coreSubjects: ['Strategic Business Leader (SBL)', 'Advanced Audit & Assurance', 'Advanced Taxation', 'Corporate Governance & Ethics'],
          focusElectives: ['Cloud Accounting Systems (SAP / Xero)', 'Forensic Accounting & Anti-Money Laundering', 'Cybersecurity Compliance'],
          examMilestone: 'Tamat peperiksaan profesional penuh ACCA/MICPA dan pendaftaran sebagai Ahli Institut Akauntan Malaysia (Chartered Accountant - CA).',
        },
        extracurriculars: {
          uniformBodies: ['Pegawai Integriti Sukarela'],
          clubsAndSocieties: ['Malaysian Institute of Accountants (MIA - Young Professionals)', 'Institute of Internal Auditors Malaysia (IIAM)'],
          sportsAndRecreation: ['Sukan Korporat Perbankan', 'Renang Rekreasi'],
          competitionsAndMilestones: [
            'Latihan Industri di Firma Big 4 (PwC, EY, KPMG, Deloitte) atau Bank Negara Malaysia',
            'Pengiktirafan Chartered Accountant (CA) selepas 3 tahun pengalaman audit',
            'Pelantikan sebagai Juruaudit Bertauliah / Pegawai Kawalan Risiko Bank',
          ],
        },
        proTip:
          'Integriti adalah mata wang utama kerjaya konvensional. Pastikan setiap rekod kewangan dan laporan audit sentiasa telus, tepat, dan mematuhi undang-undang perlembagaan negara.',
      },
    ],
  },
};
