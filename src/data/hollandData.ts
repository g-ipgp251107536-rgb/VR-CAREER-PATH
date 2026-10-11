import { HollandCategoryInfo, HollandCodeType } from '../types';

export const HOLLAND_CATEGORIES: Record<HollandCodeType, HollandCategoryInfo> = {
  R: {
    code: 'R',
    name: 'Realistik',
    nameEn: 'Realistic',
    color: '#FF4B4B',
    accentBg: '#FFE5E5',
    tagline: 'Praktikal, Mekanikal, Suka Aktiviti Fizikal & Objek Nyata',
    description:
      'Individu berkategori Realistik mempunyai kemahiran mekanikal, atletik, dan gemar bekerja menggunakan alatan tangan, mesin, peralatan teknikal, tumbuhan, serta haiwan. Mereka lebih suka menyelesaikan masalah konkrit di dunia nyata berbanding teori abstrak dan menikmati persekitaran kerja luar (outdoor) atau bengkel industri.',
    personalityTraits: [
      'Praktikal, lasak dan berterus-terang',
      'Suka membaiki, membina atau mengubahsuai peralatan mekanikal/elektrikal',
      'Cenderung bekerja secara fizikal dengan tangan dan jentera',
      'Mengutamakan hasil kerja yang dapat dilihat dan disentuh',
    ],
    workEnvironment:
      'Loji industri, tapak pembinaan moden, bengkel robotik & automotif, stesen janakuasa elektrik, hangar penerbangan, makmal kejuruteraan.',
    skillsFavored: [
      'Kemahiran alatan kejuruteraan & kimpalan',
      'Lukisan teknikal & pemodelan CAD/CAM',
      'Penyelenggaraan sistem elektrik & mekanik',
      'Operasi jentera berat & robotik industri',
    ],
    careers: [
      {
        id: 'engineer-mechanical',
        name: 'Jurutera Mekanikal & Automasi (Engineer)',
        nameEn: 'Mechanical & Automation Engineer',
        category: 'R',
        salaryRangeMYR: 'RM 4,500 - RM 14,000 / bulan',
        demandRating: 'Sangat Tinggi',
        description:
          'Merekabentuk, menganalisis, dan menyelia sistem mekanikal, turbin tenaga, talian robotik pembuatan, dan sistem automasi kilang pintar di Malaysia.',
        educationPath: 'SPM (Fizik, Kimia, Add Maths) ➔ Matrikulasi/Asasi Sains/Diploma Kejuruteraan ➔ Ijazah Sarjana Muda Kejuruteraan Mekanikal (B.Eng)',
        keySkills: ['SolidWorks / AutoCAD', 'Termodinamik', 'Sistem Robotik PLC', 'Penyelenggaraan Jentera Industri'],
        topEmployersMY: ['Petronas Carigali', 'Tenaga Nasional Berhad (TNB)', 'Intel Penang', 'Gamuda Engineering', 'Dyson Malaysia'],
        vrScene: {
          title: 'Simulasi VR 360°: Tapak Loji Kejuruteraan & Barisan Robotik Pintar',
          environmentName: 'Smart Engineering Plant & Robotics Line',
          ambientSoundType: 'industrial',
          panoramicImageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=80',
          youtube360Id: 'u4i_70J2HqQ', // 360 VR Engineering tour
          fallbackColor: '#1a202c',
          hotspots: [
            { id: 'h1', title: 'Lengan Robotik Automasi 6-Pakisi', description: 'Memprogram robot kimpalan berketepatan mikron untuk industri semikonduktor & automotif.', x: 30, y: 45 },
            { id: 'h2', title: 'Panel Kawalan SCADA & PLC', description: 'Memantau tekanan hidraulik, kelajuan motor dan suhu turbin secara masa-nyata.', x: 65, y: 40 },
            { id: 'h3', title: 'Stesen Ujian Keselamatan & Kualiti (QC)', description: 'Memastikan pematuhan piawaian SIRIM dan keselamatan pekerja di tapak kerja.', x: 80, y: 60 }
          ]
        }
      },
      {
        id: 'automotive-specialist',
        name: 'Pakar Kejuruteraan Automotif & EV',
        nameEn: 'EV & Automotive Engineer',
        category: 'R',
        salaryRangeMYR: 'RM 3,800 - RM 9,500 / bulan',
        demandRating: 'Sangat Tinggi',
        description:
          'Menguruskan diagnosis sistem kenderaan elektrik (EV), pek bateri voltan tinggi, sensor pemanduan autonomi, dan penalaan enjin berprestasi tinggi.',
        educationPath: 'SPM ➔ Sijil Kemahiran Malaysia (SKM Tahap 3/4) / Diploma Kejuruteraan Automotif ➔ Ijazah Kejuruteraan Automotif',
        keySkills: ['Sistem Bateri EV', 'Diagnostik OBD-II Berkomputer', 'Sistem Pemanduan Autonomi', 'Mekatronik'],
        topEmployersMY: ['Proton R&D Centre Shah Alam', 'Perodua Manufacturing', 'Tesla Malaysia', 'Sime Darby Motors'],
        vrScene: {
          title: 'Simulasi VR 360°: Pusat R&D Kenderaan Elektrik (EV Test Bay)',
          environmentName: 'EV Battery & Powertrain Testing Center',
          ambientSoundType: 'industrial',
          panoramicImageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=2000&q=80',
          youtube360Id: '2b9txcAt4e0',
          fallbackColor: '#0f172a',
          hotspots: [
            { id: 'h1', title: 'Pek Bateri Voltan Tinggi 400V', description: 'Sistem pengurusan terma cecair dan sel litium-ion kenderaan hijau.', x: 40, y: 55 },
            { id: 'h2', title: 'Konsol Telemetri & Dyno Test', description: 'Mengukur tork, kuasa kuda dan kecekapan regeneratif brek.', x: 70, y: 45 }
          ]
        }
      },
      {
        id: 'civil-infrastructure',
        name: 'Jurutera Awam & Geoteknik',
        nameEn: 'Civil & Structural Engineer',
        category: 'R',
        salaryRangeMYR: 'RM 4,200 - RM 13,000 / bulan',
        demandRating: 'Tinggi',
        description:
          'Merekabentuk lebuh raya bertingkat, terowong MRT bawah tanah, empangan hidroelektrik, dan menara ikonik seperti Merdeka 118 dan TRX.',
        educationPath: 'SPM ➔ Asasi Sains Kejuruteraan ➔ Ijazah Sarjana Muda Kejuruteraan Awam (B.Eng Civil)',
        keySkills: ['BIM (Building Information Modeling)', 'Analisis Struktur ETABS', 'Geoteknik', 'Pengurusan Tapak'],
        topEmployersMY: ['Gamuda Berhad', 'IJM Corporation', 'MRT Corp', 'WCT Holdings', 'JKR Malaysia'],
        vrScene: {
          title: 'Simulasi VR 360°: Tapak Pembinaan Terowong & Jambatan Bertingkat',
          environmentName: 'Mega Structural Construction Site',
          ambientSoundType: 'industrial',
          panoramicImageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=2000&q=80',
          youtube360Id: 'xS-Kj5e08s0',
          fallbackColor: '#262626',
          hotspots: [
            { id: 'h1', title: 'Laser Total Station Theodolite', description: 'Pengukuran ketepatan sifar milimeter sudut geodetik tanah.', x: 25, y: 50 },
            { id: 'h2', title: 'Kren Menara Kren Berat', description: 'Logistik pengangkatan galang konkrit pra-tegasan rentang 40 meter.', x: 75, y: 30 }
          ]
        }
      }
    ]
  },
  I: {
    code: 'I',
    name: 'Investigatif',
    nameEn: 'Investigative',
    color: '#00E5FF',
    accentBg: '#E0FAFF',
    tagline: 'Penyelidik, Analitikal, Menilai & Menyelesaikan Misteri Sains',
    description:
      'Individu Investigatif gemar mengkaji, menyelidik, menganalisis data, dan mencari penyelesaian saintifik terhadap masalah rumit. Mereka didorong oleh rasa ingin tahu intelektual yang mendalam, suka membaca bahan ilmiah, melakukan uji kaji makmal, dan berfikir secara logik.',
    personalityTraits: [
      'Intelek, ingin tahu dan analitikal',
      'Gemar menyelesaikan teka-teki saintifik dan masalah matematik sukar',
      'Suka bekerja dengan idea, konsep dan data mendalam',
      'Berdikari dan menghargai ketepatan fakta empirikal',
    ],
    workEnvironment:
      'Makmal bioperubatan, pusat penyelidikan mikrobiologi, pusat analitik kecerdasan buatan (AI Lab), balai cerap angkasa, pusat geologi Petronas.',
    skillsFavored: [
      'Metodologi penyelidikan saintifik & eksperimen',
      'Analisis data statistik & Python / R',
      'Pengendalian spektrometer, mikroskop elektron & kromatografi',
      'Pemikiran kritis & reka bentuk hipotesis',
    ],
    careers: [
      {
        id: 'biomedical-scientist',
        name: 'Saintis Bioperubatan & Penyelidik Makmal',
        nameEn: 'Biomedical & Vaccine Researcher',
        category: 'I',
        salaryRangeMYR: 'RM 4,000 - RM 11,500 / bulan',
        demandRating: 'Sangat Tinggi',
        description:
          'Menjalankan penyelidikan vaksin, mutasi virus, terapi sel stem, dan ujian klinikal ubat-ubatan di institut penyelidikan kesihatan Malaysia.',
        educationPath: 'SPM (Biologi, Kimia, Fizik) ➔ Asasi Sains ➔ Ijazah Sains Bioperubatan / Bioteknologi ➔ Sarjana / Ph.D',
        keySkills: ['Teknik PCR & DNA Sequencing', 'Kultur Sel', 'Bioinformatik', 'Protokol Keselamatan Makmal Biosafety Level 3'],
        topEmployersMY: ['Institut Penyelidikan Perubatan (IMR)', 'Duopharma Biotech', 'Pharmaniaga', 'Inno Biologics'],
        vrScene: {
          title: 'Simulasi VR 360°: Makmal Penyelidikan Vaksin & Genomik Moden',
          environmentName: 'Advanced Genomics & Biosafety Lab',
          ambientSoundType: 'lab',
          panoramicImageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=80',
          youtube360Id: 'u4i_70J2HqQ',
          fallbackColor: '#0a192f',
          hotspots: [
            { id: 'h1', title: 'Mikroskop Elektron Fluoresens', description: 'Memvisualisasikan struktur membran sel dan protein spike virus pada resolusi nano.', x: 35, y: 45 },
            { id: 'h2', title: 'Kebuk Aliran Laminar Bio-Hazard', description: 'Persekitaran steril sifar pencemaran untuk pengendalian sampel kultur tisu.', x: 70, y: 50 }
          ]
        }
      },
      {
        id: 'ai-data-scientist',
        name: 'Saintis Data & Jurutera AI (Machine Learning)',
        nameEn: 'AI & Data Scientist',
        category: 'I',
        salaryRangeMYR: 'RM 5,500 - RM 18,000 / bulan',
        demandRating: 'Sangat Tinggi',
        description:
          'Membina model algoritma AI generatif, menganalisis corak perkhidmatan digital jutaan pengguna, dan mencipta model ramalan perniagaan canggih.',
        educationPath: 'SPM ➔ Matrikulasi Sains Komputer / Sains Fizikal ➔ Ijazah Sains Data / Kecerdasan Buatan / Sains Komputer',
        keySkills: ['Python, PyTorch, TensorFlow', 'Deep Learning & NLP', 'Algoritma Statistik', 'Cloud Computing (GCP/AWS)'],
        topEmployersMY: ['Grab Malaysia', 'Axiata Digital Labs', 'Shopee Regional HQ', 'Bank Negara Malaysia Innovation Hub'],
        vrScene: {
          title: 'Simulasi VR 360°: Bilik Operasi Data & Makmal Superkomputer AI',
          environmentName: 'AI Innovation Supercomputing Hub',
          ambientSoundType: 'office',
          panoramicImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2000&q=80',
          youtube360Id: 'm4V8N3X6zC0',
          fallbackColor: '#030712',
          hotspots: [
            { id: 'h1', title: 'Dinding Visualisasi Graf Masa Nyata', description: 'Menjejak inferens model LLM dan latensi pemprosesan tensor.', x: 45, y: 40 },
            { id: 'h2', title: 'Kluster Pelayan GPU Pengkomputeran Padat', description: 'Rak pelayan penyejukan cecair untuk melatih model parameter berbilion.', x: 80, y: 50 }
          ]
        }
      }
    ]
  },
  A: {
    code: 'A',
    name: 'Artistik',
    nameEn: 'Artistic',
    color: '#FFE600',
    accentBg: '#FFFBD4',
    tagline: 'Kreatif, Ekspresif, Inovatif & Berimaginasi Tinggi',
    description:
      'Individu berkategori Artistik menghargai kebebasan berkarya, keaslian idea, ekspresi diri, dan estetika visual atau pendengaran. Mereka tidak suka rutin kerja yang tegar dan lebih gemar suasana dinamik yang membolehkan mereka mencipta seni, muzik, rekaan visual, atau penceritaan multimedia.',
    personalityTraits: [
      'Ekspresif, imaginatif dan intuitif',
      'Sensitif terhadap keindahan seni visual, muzik dan bahasa',
      'Mementingkan inovasi dan berfikir di luar kotak standard',
      'Menolak persekitaran yang terlalu berstruktur atau mekanikal',
    ],
    workEnvironment:
      'Studio animasi 3D, agensi penjenamaan antarabangsa, studio seni bina moden, rumah penerbitan filem/muzik, bengkel fabrikasi kreatif.',
    skillsFavored: [
      'Reka bentuk visual & pemodelan 3D (Blender, Maya)',
      'Pengarahan seni, komposisi warna & tipografi',
      'Penceritaan multimedia (Storyboarding, Sound Design)',
      'Pembangunan konsep reka bentuk spatial',
    ],
    careers: [
      {
        id: '3d-animator-game-artist',
        name: 'Artis 3D & Animator Industri Kreatif',
        nameEn: '3D Animator & Game VFX Artist',
        category: 'A',
        salaryRangeMYR: 'RM 3,600 - RM 12,000 / bulan',
        demandRating: 'Sangat Tinggi',
        description:
          'Mencipta watak animasi bertaraf antarabangsa, kesan visual (VFX) blockbuster, dan persekitaran interaktif permainan video.',
        educationPath: 'SPM ➔ Asasi Seni Kreatif / Diploma Reka Bentuk Multimedia ➔ Ijazah Animasi 3D & Seni Permainan Komputer',
        keySkills: ['Blender / Autodesk Maya', 'Rigging & Kinematik', 'Unreal Engine 5', 'Pencahayaan Sinematik'],
        topEmployersMY: ['Les\' Copaque Production (Upin & Ipin)', 'Animonsta Studios (BoBoiBoy)', 'Lemon Sky Studios', 'Virtuos KL'],
        vrScene: {
          title: 'Simulasi VR 360°: Studio Animasi 3D & Bilik Motion Capture',
          environmentName: '3D Motion Capture & Creative Animation Studio',
          ambientSoundType: 'studio',
          panoramicImageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=2000&q=80',
          youtube360Id: 'u4i_70J2HqQ',
          fallbackColor: '#18181b',
          hotspots: [
            { id: 'h1', title: 'Pentas Sut Motion Capture (MoCap)', description: 'Kamera optikal inframerah merekodkan pergerakan pelakon secara 3D ke rig digital.', x: 30, y: 50 },
            { id: 'h2', title: 'Tablet Skrin Grafik Wacom Cintiq 32"', description: 'Mewarna tekstur watak beresolusi 8K dengan kepekaan tekanan stylus tinggi.', x: 70, y: 45 }
          ]
        }
      },
      {
        id: 'architect-spatial',
        name: 'Arkitek Bangunan & Pereka Spatial',
        nameEn: 'Architect & Spatial Designer',
        category: 'A',
        salaryRangeMYR: 'RM 4,500 - RM 15,000 / bulan',
        demandRating: 'Tinggi',
        description:
          'Menggabungkan keindahan estetika dan kejuruteraan struktur untuk mereka bentuk kediaman mesra alam, muzium ikonik dan ruang komersial kontemporari.',
        educationPath: 'SPM ➔ Matrikulasi / Asasi Seni Bina ➔ Ijazah Sarjana Muda Seni Bina (LAM Bahagian I & II) ➔ Peperiksaan Profesional LAM III',
        keySkills: ['Revit / Rhino 3D', 'Reka Bentuk Biofilik Lestari', 'Teori Estetika Ruang', 'Penyelarasan Kontraktor'],
        topEmployersMY: ['GDP Architects', 'Hijjas Kasturi Associates', 'Veritas Design Group', 'RSP Architects KL'],
        vrScene: {
          title: 'Simulasi VR 360°: Studio Seni Bina & Galeri Prototaip Skala',
          environmentName: 'Modern Architectural Studio & Design Deck',
          ambientSoundType: 'studio',
          panoramicImageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80',
          youtube360Id: 'xS-Kj5e08s0',
          fallbackColor: '#1c1917',
          hotspots: [
            { id: 'h1', title: 'Meja Pemodelan Skala Fizikal & Cetakan 3D', description: 'Kajian laluan angin, pencahayaan matahari semula jadi dan orientasi bangunan.', x: 35, y: 55 },
            { id: 'h2', title: 'Dinding Suasana Reka Bentuk (Material Moodboard)', description: 'Sampel konkrit terdedah, kayu cengal lestari, dan kaca penebat pintar.', x: 75, y: 40 }
          ]
        }
      }
    ]
  },
  S: {
    code: 'S',
    name: 'Sosial',
    nameEn: 'Social',
    color: '#A3FF2E',
    accentBg: '#F0FFD9',
    tagline: 'Penyayang, Suka Membimbing, Mendidik & Berkhidmat',
    description:
      'Individu berkategori Sosial berminat mendalam untuk membantu, membimbing, melatih, merawat, dan mengembangkan potensi orang lain. Mereka memiliki empati yang tinggi, kemahiran komunikasi interpersonal yang cemerlang, dan mendapati kepuasan terbesar apabila melihat orang lain berjaya atau pulih.',
    personalityTraits: [
      'Mesra, empati, penyabar dan bertimbang rasa',
      'Suka berinteraksi dan memahami perasaan orang lain',
      'Cenderung mendidik, memberi kaunseling atau khidmat sukarela',
      'Mahir mendengar secara aktif dan membina hubungan erat',
    ],
    workEnvironment:
      'Sekolah, universiti, hospital, klinik psikologi, pusat pemulihan komuniti, badan bukan kerajaan (NGO), agensi bantuan kemanusiaan.',
    skillsFavored: [
      'Kaunseling individu & fasilitasi kelompok',
      'Pedagogi pengajaran inovatif & teknologi pendidikan',
      'Penjagaan klinikal pesakit & pertolongan cemas',
      'Pengurusan krisis emosi & pengantaraan konflik',
    ],
    careers: [
      {
        id: 'medical-officer-doctor',
        name: 'Pegawai Perubatan (Doktor Pakar)',
        nameEn: 'Medical Doctor / Surgeon',
        category: 'S',
        salaryRangeMYR: 'RM 5,500 - RM 22,000 / bulan',
        demandRating: 'Sangat Tinggi',
        description:
          'Mendiagnosis penyakit, merawat pesakit, menjalankan pembedahan, dan memberikan harapan kesembuhan di hospital-hospital utama Malaysia.',
        educationPath: 'SPM (Biologi, Kimia, Fizik, Matematik Tambahan Straight A) ➔ Asasi Sains Perubatan ➔ Ijazah MBBS / MD (5 Tahun) ➔ Latihan Housemanship',
        keySkills: ['Diagnosis Klinikal', 'Empati Pesakit', 'Tindakan Kecemasan Resusitasi', 'Pembedahan Laparoskopik'],
        topEmployersMY: ['Hospital Kuala Lumpur (HKL)', 'Pusat Perubatan Universiti Malaya (PPUM)', 'KPJ Healthcare', 'Gleneagles Hospital'],
        vrScene: {
          title: 'Simulasi VR 360°: Dewan Bedah Pintar & Wad Pemulihan Hospital',
          environmentName: 'Smart Hospital Operating Theatre & Recovery Wing',
          ambientSoundType: 'medical',
          panoramicImageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2000&q=80',
          youtube360Id: 'u4i_70J2HqQ',
          fallbackColor: '#042f2e',
          hotspots: [
            { id: 'h1', title: 'Lampu Pembedahan LED Bayang Sifar & Monitor Tanda Hayat', description: 'Menjejak degupan jantung, saturasi oksigen SpO2 dan tekanan darah arterial.', x: 40, y: 40 },
            { id: 'h2', title: 'Konsol Bedah Robotik Da Vinci', description: 'Kawalan tele-pembedahan invasif minimum dengan pembesaran 3D HD 10x.', x: 75, y: 55 }
          ]
        }
      },
      {
        id: 'counselor-educator',
        name: 'Guru Bimbingan & Kaunselor Berdaftar',
        nameEn: 'School Counselor & Registered Psychologist',
        category: 'S',
        salaryRangeMYR: 'RM 3,500 - RM 9,000 / bulan',
        demandRating: 'Tinggi',
        description:
          'Membantu murid sekolah meneroka bakat diri, mengurus stres pembelajaran, merancang kerjaya masa hadapan dan membina ketahanan mental.',
        educationPath: 'SPM ➔ Asasi Pendidikan / Diploma Kaunseling ➔ Ijazah Bimbingan & Kaunseling (Lembaga Kaunselor Malaysia)',
        keySkills: ['Kemahiran Mendengar Aktif', 'Terapi Tingkah Laku Kognitif (CBT)', 'Psikometri Kerjaya', 'Fasilitasi Kelompok'],
        topEmployersMY: ['Kementerian Pendidikan Malaysia (KPM)', 'Institusi Pengajian Tinggi Swasta', 'Pusat Kaunseling Swasta', 'Agensi Antidadah Kebangsaan (AADK)'],
        vrScene: {
          title: 'Simulasi VR 360°: Bilik Terapi Kaunseling & Studio Pembelajaran Interaktif',
          environmentName: 'Counseling Sanctuary & Future Learning Studio',
          ambientSoundType: 'office',
          panoramicImageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=2000&q=80',
          youtube360Id: 'm4V8N3X6zC0',
          fallbackColor: '#1e293b',
          hotspots: [
            { id: 'h1', title: 'Ruang Terapi Ekspresif & Pasir Sensori', description: 'Membantu pelajar mengekspresikan emosi dalam zon selamat dan bebas penghakiman.', x: 30, y: 50 },
            { id: 'h2', title: 'Papan Pemuka Bimbingan Kerjaya Digital', description: 'Inventori Sidek, Holland Code, dan matriks padanan kursus UPU online.', x: 70, y: 45 }
          ]
        }
      }
    ]
  },
  E: {
    code: 'E',
    name: 'Enterprising',
    nameEn: 'Enterprising',
    color: '#FF9100',
    accentBg: '#FFF3E0',
    tagline: 'Kepimpinan, Pengaruh, Berani Mengambil Risiko & Keusahawanan',
    description:
      'Individu Enterprising berorientasikan matlamat besar, suka memimpin, memujuk, mempengaruhi orang lain dan mengurus organisasi perniagaan. Mereka bertenaga tinggi, berkeyakinan diri, berani mengambil risiko pelaburan yang diperhitungkan, dan mahir melihat peluang keuntungan pasaran.',
    personalityTraits: [
      'Petah berucap, yakin diri dan karismatik',
      'Suka memimpin pasukan dan menggerakkan projek besar',
      'Bermatlamat tinggi dan bermotivasi terhadap pencapaian',
      'Mahir dalam rundingan perniagaan dan jaringan strategik',
    ],
    workEnvironment:
      'Bilik mesyuarat korporat tingkat eksekutif KLCC/TRX, pentas persembahan pelabur (startup incubator), firma guaman korporat, agensi pengiklanan mega.',
    skillsFavored: [
      'Rundingan kontrak & pitching pelaburan',
      'Strategi pertumbuhan perniagaan (Business Scaling)',
      'Pengurusan kepimpinan pasukan rentas fungsi',
      'Analisis peluang pasaran modal & pemasaran digital',
    ],
    careers: [
      {
        id: 'tech-entrepreneur-ceo',
        name: 'Pengasas Syarikat Pemula (Tech Founder & CEO)',
        nameEn: 'Startup Founder & Managing Director',
        category: 'E',
        salaryRangeMYR: 'RM 6,000 - RM 35,000+ / bulan',
        demandRating: 'Sangat Tinggi',
        description:
          'Membina produk digital bernilai tinggi, memimpin hala tuju syarikat, mengumpulkan dana modal teroka (VC) dan menguasai pasaran Asia Tenggara.',
        educationPath: 'SPM ➔ Asasi Pengurusan Perniagaan / Sains Komputer ➔ Ijazah Pengurusan / Keusahawanan / Kejuruteraan Perisian',
        keySkills: ['Visi Strategik', 'Pitching Pelabur Angel / VC', 'Pengurusan Ekuiti & Kewangan', 'Perekrutan Bakat Terbaik'],
        topEmployersMY: ['Aerodyne Group Malaysia', 'Carsome', 'Fave Malaysia', 'Cradle Fund', 'Skim Usahawan Belia Teraju'],
        vrScene: {
          title: 'Simulasi VR 360°: Bilik Mesyuarat Lembaga Pengarah Menara TRX',
          environmentName: 'TRX Tower Executive Boardroom & Pitch Deck',
          ambientSoundType: 'corporate',
          panoramicImageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=2000&q=80',
          youtube360Id: 'u4i_70J2HqQ',
          fallbackColor: '#172554',
          hotspots: [
            { id: 'h1', title: 'Skrin Paparan KPI & Penembusan Pasaran ASEAN', description: 'Pertumbuhan bulanan pengguna aktif (MAU) dan margin keuntungan kasar.', x: 45, y: 35 },
            { id: 'h2', title: 'Meja Rundingan M&A dan Pembiayaan Siri B', description: 'Perjanjian term sheet pembiayaan ventura bersama pelabur antarabangsa.', x: 70, y: 55 }
          ]
        }
      },
      {
        id: 'corporate-lawyer',
        name: 'Peguam Korporat & Penasihat Undang-Undang',
        nameEn: 'Corporate Lawyer & Legal Counsel',
        category: 'E',
        salaryRangeMYR: 'RM 5,000 - RM 20,000 / bulan',
        demandRating: 'Tinggi',
        description:
          'Mengendalikan penggabungan syarikat, semakan kontrak bilion ringgit, perlindungan harta intelek, dan perbicaraan mahkamah dagang.',
        educationPath: 'SPM ➔ Asasi Undang-Undang / STPM ➔ Ijazah Sarjana Muda Undang-Undang (LL.B) ➔ Sijil Amalan Guaman (CLP) ➔ Chambering 9 Bulan',
        keySkills: ['Penghujahan Mahkamah', 'Semakan Kontrak Komersial', 'Pematuhan Suruhanjaya Sekuriti', 'Ketelitian Analitikal'],
        topEmployersMY: ['Shearn Delamore & Co.', 'Skrine', 'Zaid Ibrahim & Co.', 'Jabatan Peguam Negara Malaysia'],
        vrScene: {
          title: 'Simulasi VR 360°: Mahkamah Tinggi Dagang & Perpustakaan Guaman',
          environmentName: 'High Court Chamber & Legal Archives',
          ambientSoundType: 'corporate',
          panoramicImageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=2000&q=80',
          youtube360Id: 'm4V8N3X6zC0',
          fallbackColor: '#1e1b4b',
          hotspots: [
            { id: 'h1', title: 'Podium Penghujahan Peguam Kanan', description: 'Membentangkan preseden perundangan di hadapan Hakim Mahkamah Rayuan.', x: 35, y: 50 },
            { id: 'h2', title: 'Koleksi Warta Perundangan & Statut Persekutuan', description: 'Rujukan Akta Syarikat 2016, Akta Kontrak 1950, dan Perlembagaan Persekutuan.', x: 80, y: 45 }
          ]
        }
      }
    ]
  },
  K: {
    code: 'K',
    name: 'Konvensional',
    nameEn: 'Conventional',
    color: '#B388FF',
    accentBg: '#F5EFFF',
    tagline: 'Sistematik, Teratur, Ketepatan Angka & Pengurusan Rekod',
    description:
      'Individu berkategori Konvensional sangat cemerlang dalam menguruskan data, dokumen, nombor, carta perakaunan, dan rekod secara terperinci. Mereka menyukai kejelasan peraturan, ketepatan fakta, sistem yang tersusun rapi, dan mematuhi prosedur operasi standard (SOP) dengan penuh dedikasi.',
    personalityTraits: [
      'Sistematik, berdisiplin tinggi dan sangat teliti',
      'Mahir mengira, mengurus fail dan menyemak ketepatan angka',
      'Menghormati peraturan, ketetapan piawaian dan integriti rekod',
      'Boleh diharap dan bekerja secara efisien dalam sistem terancang',
    ],
    workEnvironment:
      'Firma audit Big Four, Bursa Malaysia, bank perdagangan pusat, jabatan akaun perbendaharaan negara, unit arkib data kerajaan.',
    skillsFavored: [
      'Piawaian Pelaporan Kewangan (MFRS / IFRS)',
      'Sistem ERP (SAP, Oracle Financials, SQL Accounting)',
      'Audit forensik kewangan & pengurusan cukai LHDN',
      'Pengurusan pangkalan data & pematuhan keselamatan data',
    ],
    careers: [
      {
        id: 'chartered-accountant-auditor',
        name: 'Akauntan Bertauliah & Juruaudit Forensik',
        nameEn: 'Chartered Accountant & Audit Senior',
        category: 'K',
        salaryRangeMYR: 'RM 4,200 - RM 16,000 / bulan',
        demandRating: 'Sangat Tinggi',
        description:
          'Menyemak penyata kewangan korporat, mengesan ketirisan perakaunan, mematuhi cukai LHDN, dan memastikan tadbir urus kewangan telus.',
        educationPath: 'SPM (Prinsip Perakaunan / Matematik Tambahan) ➔ Program Profesional ACCA / CAT / Ijazah Perakaunan ➔ Ahli Institut Akauntan Malaysia (MIA)',
        keySkills: ['Audit MFRS', 'Analisis Penyata Imbangan', 'Sistem SAP ERP', 'Percukaian Korporat LHDN'],
        topEmployersMY: ['PwC Malaysia', 'Ernst & Young (EY)', 'KPMG Malaysia', 'Deloitte Malaysia', 'Jabatan Audit Negara'],
        vrScene: {
          title: 'Simulasi VR 360°: Firma Audit Big 4 & Pusat Operasi Kewangan',
          environmentName: 'Big Four Audit Headquarters & Financial Operations',
          ambientSoundType: 'office',
          panoramicImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80',
          youtube360Id: 'u4i_70J2HqQ',
          fallbackColor: '#1e1b4b',
          hotspots: [
            { id: 'h1', title: 'Stesen Kerja Audit Pelbagai Skrin', description: 'Menjalankan persampelan lejar am dan pengesahan bank automatik.', x: 30, y: 50 },
            { id: 'h2', title: 'Bilik Arkib Dokumen Sulit & Kriptografi', description: 'Penyimpanan rekod transaksi kewangan dengan penyulitan gred keselamatan tinggi.', x: 75, y: 40 }
          ]
        }
      },
      {
        id: 'investment-banker-bursa',
        name: 'Penganalisis Perbankan Pelaburan & Bursa Malaysia',
        nameEn: 'Investment Banking Analyst',
        category: 'K',
        salaryRangeMYR: 'RM 5,200 - RM 19,000 / bulan',
        demandRating: 'Tinggi',
        description:
          'Menilai terbitan saham IPO, memodelkan aliran tunai diskaun (DCF) syarikat senaraian awam, dan mengurus portfolio pelaburan dana KWSP/PNB.',
        educationPath: 'SPM ➔ Asasi Kewangan / Diploma Perbankan ➔ Ijazah Kewangan / Perbankan Pelaburan ➔ Kelayakan CFA (Chartered Financial Analyst)',
        keySkills: ['Pemodelan Kewangan Excel Lanjutan', 'Analisis Saham & Sukuk', 'Valuasi Syarikat DCF', 'Garis Panduan SC'],
        topEmployersMY: ['Maybank Investment Bank', 'CIMB Group', 'Bursa Malaysia', 'Khazanah Nasional', 'KWSP (EPF)'],
        vrScene: {
          title: 'Simulasi VR 360°: Bilik Dagangan Saham Bursa Malaysia & Skrin Bloomberg',
          environmentName: 'Trading Floor & Bloomberg Financial Terminal Room',
          ambientSoundType: 'corporate',
          panoramicImageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=2000&q=80',
          youtube360Id: 'm4V8N3X6zC0',
          fallbackColor: '#09090b',
          hotspots: [
            { id: 'h1', title: 'Terminal Bloomberg Berkelajuan Tinggi', description: 'Suapan data harga komoditi minyak mentah, sawit, dan kadar pertukaran mata wang asing USD/MYR.', x: 40, y: 45 },
            { id: 'h2', title: 'Carta Candlestick Pasaran Hadapan FBM KLCI', description: 'Analisis kecairan pasaran dan volume dagangan institusi.', x: 80, y: 35 }
          ]
        }
      }
    ]
  }
};
