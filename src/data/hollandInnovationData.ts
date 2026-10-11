import { HollandCodeType, CareerItem } from '../types';

export interface HollandInnovationData {
  code: HollandCodeType;
  codeLetter: string;
  emoji: string;
  name: string;
  fieldTitle: string;
  maksudBidang: string;
  ciriCiri: string[];
  suka: string;
  themeColor: string;
  accentBg: string;
  pekerjaanList: Array<{
    title: string;
    hasVR: boolean;
    hasVideo?: boolean;
    videoUrl?: string;
    careerData: CareerItem;
  }>;
  perkaraDipelajari: string[];
  menengahAtas: {
    title: string;
    subjects: string[];
  };
  lepasanSpm: {
    asasiMatrikulasi: string[];
    diploma: string[];
  };
  contohUniversiti: string[];
  degree: string[];
}

function createCareerItem(
  id: string,
  name: string,
  nameEn: string,
  category: HollandCodeType,
  videoUrl?: string,
  panoramicImageUrl?: string,
  description?: string
): CareerItem {
  return {
    id,
    name,
    nameEn,
    category,
    salaryRangeMYR: '',
    demandRating: 'Sangat Tinggi',
    description: description || `Simulasi eksplorasi kerjaya ${name} dalam bidang kod Holland ${category}.`,
    educationPath: '',
    keySkills: [],
    topEmployersMY: [],
    vrScene: {
      title: `Simulasi VR: ${name}`,
      environmentName: `${name} Virtual Environment`,
      ambientSoundType: 'office',
      panoramicImageUrl:
        panoramicImageUrl ||
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=80',
      youtube360Id: 'u4i_70J2HqQ',
      videoUrl: videoUrl,
      hasVideo: Boolean(videoUrl),
      fallbackColor: '#121316',
      hotspots: [
        {
          id: 'h1',
          title: `Zon Kerja ${name}`,
          description: `Persekitaran tugasan sebenar bagi ${name}.`,
          x: 50,
          y: 50,
        },
      ],
    },
  };
}

export const HOLLAND_INNOVATION_DATA: Record<HollandCodeType, HollandInnovationData> = {
  R: {
    code: 'R',
    codeLetter: 'R – REALISTIC',
    emoji: '🔧',
    name: 'Realistik (Realistic)',
    fieldTitle: 'Bidang Teknikal, Kejuruteraan dan Kemahiran',
    maksudBidang:
      'Bidang Realistic sesuai untuk individu yang suka melakukan sesuatu secara praktikal, menggunakan peralatan, mesin, teknologi dan bahan fizikal. Mereka biasanya lebih berminat untuk belajar melalui amali dan pengalaman sebenar berbanding pembelajaran teori semata-mata.',
    ciriCiri: [
      'Praktikal, lasak dan mengutamakan hasil kerja fizikal yang konkrit',
      'Mahir mengendalikan peralatan teknikal, jentera mekanikal dan mesin',
      'Lebih gemar belajar melalui amali dan uji kaji terus di bengkel atau tapak kerja',
      'Berorientasikan penyelesaian masalah teknikal di dunia nyata',
    ],
    suka: 'mesin, membina, membaiki, mencuba, kerja amali dan teknologi.',
    themeColor: '#FF4B4B',
    accentBg: '#FFE5E5',
    pekerjaanList: [
      {
        title: 'Jurutera eletrik',
        hasVR: true,
        hasVideo: true,
        videoUrl: 'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730524/463.0-510.0.mp4',
        careerData: createCareerItem(
          'r-jurutera-elektrik',
          'Jurutera Elektrik',
          'Electrical Engineer',
          'R',
          'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730524/463.0-510.0.mp4',
          'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=80',
          'Merekabentuk, menguji dan menyelia sistem penjanaan dan bekalan elektrik voltan tinggi serta litar kuasa industri.'
        ),
      },
      {
        title: 'Juruteknik',
        hasVR: true,
        hasVideo: false,
        careerData: createCareerItem(
          'r-juruteknik',
          'Juruteknik Penyelenggaraan',
          'Maintenance Technician',
          'R',
          undefined,
          'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=2000&q=80',
          'Menyelenggara dan membaiki peralatan mekanikal, elektrikal serta mesin automasi di loji atau kilang.'
        ),
      },
      {
        title: 'Pegawai teknikal',
        hasVR: true,
        hasVideo: true,
        videoUrl: 'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730566/a_day_in_a_life_as_an_electrician_ETO_onboard_-_POV__379s-448s.mp4',
        careerData: createCareerItem(
          'r-pegawai-teknikal',
          'Pegawai Operasi Teknikal',
          'Technical Operations Officer',
          'R',
          'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730566/a_day_in_a_life_as_an_electrician_ETO_onboard_-_POV__379s-448s.mp4',
          'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=2000&q=80',
          'Menyelia operasi sistem teknikal, pendawaian elektrik onboard, dan infrastruktur fasiliti kejuruteraan.'
        ),
      },
      {
        title: 'Jurutera automotif',
        hasVR: true,
        hasVideo: true,
        videoUrl: 'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730594/quick_little_POV_of_a_19_y_o_honda_lube_tech_400_470.mp4',
        careerData: createCareerItem(
          'r-jurutera-automotif',
          'Jurutera Automotif',
          'Automotive Engineer',
          'R',
          'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730594/quick_little_POV_of_a_19_y_o_honda_lube_tech_400_470.mp4',
          'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=2000&q=80',
          'Merekabentuk, menguji transmisi kenderaan, sistem suspensi dan teknologi mobiliti automotif moden.'
        ),
      },
      {
        title: 'Jurutera mechanical',
        hasVR: true,
        hasVideo: true,
        videoUrl: 'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730549/POV_Building_an_Engine_No_Cuts_Just_Work_-_Gai_parts_720p_h264.mp4',
        careerData: createCareerItem(
          'r-jurutera-mekanikal',
          'Jurutera Mekanikal',
          'Mechanical Engineer',
          'R',
          'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730549/POV_Building_an_Engine_No_Cuts_Just_Work_-_Gai_parts_720p_h264.mp4',
          'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=80',
          'Membina enjin, sistem mekanikal berketepatan tinggi dan teknologi jentera kuasa perindustrian.'
        ),
      },
    ],
    perkaraDipelajari: [
      'Mesin dan sistem mekanikal',
      'Elektrik dan elektronik',
      'Automotif',
      'Pembinaan',
      'Robotik',
      'Mekatronik',
      'Penyelenggaraan',
      'Teknologi pembuatan',
      'Sistem komputer dan perkakasan',
    ],
    menengahAtas: {
      title: 'Subjek Tingkatan 4–5 yang sesuai',
      subjects: [
        'Fizik',
        'Matematik Tambahan',
        'Matematik',
        'Sains Komputer',
        'Reka Bentuk dan Teknologi',
        'Mata pelajaran TVET yang ditawarkan sekolah',
      ],
    },
    lepasanSpm: {
      asasiMatrikulasi: ['Asasi Sains', 'Asasi Kejuruteraan', 'Matrikulasi Sains'],
      diploma: [
        'Diploma Kejuruteraan Mekanikal',
        'Diploma Kejuruteraan Elektrik',
        'Diploma Kejuruteraan Awam',
        'Diploma Mekatronik',
        'Diploma Automotif',
      ],
    },
    contohUniversiti: ['UTM', 'UM', 'UTHM', 'UTeM', 'UiTM'],
    degree: [
      'Kejuruteraan Mekanikal',
      'Kejuruteraan Elektrik',
      'Kejuruteraan Awam',
      'Kejuruteraan Mekatronik',
      'Kejuruteraan Elektronik',
      'Kejuruteraan Pembuatan',
    ],
  },

  I: {
    code: 'I',
    codeLetter: 'I – INVESTIGATIVE',
    emoji: '🔬',
    name: 'Investigatif (Investigative)',
    fieldTitle: 'Bidang Sains, Perubatan, Teknologi dan Penyelidikan',
    maksudBidang:
      'Investigative sesuai untuk individu yang suka berfikir, menyiasat, menganalisis dan mencari penyelesaian kepada sesuatu masalah. Individu dalam bidang ini biasanya banyak menggunakan logik, data, eksperimen dan penyelidikan.',
    ciriCiri: [
      'Suka berfikir secara mendalam, analitikal dan berorientasikan data',
      'Gemar menyelesaikan teka-teki saintifik, masalah logik dan teka-teki kompleks',
      'Menghargai ketepatan fakta, metodologi kajian dan bukti empirikal',
      'Selesa bekerja secara berdikari dengan konsentrasi tinggi',
    ],
    suka: 'eksperimen, matematik, menyelesaikan masalah, membuat kajian dan mencari sebab sesuatu berlaku.',
    themeColor: '#00E5FF',
    accentBg: '#E0FAFF',
    pekerjaanList: [
      {
        title: 'Doktor',
        hasVR: true,
        hasVideo: true,
        videoUrl: 'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730540/Cardiac_Arrest_Experience_-_Patient_point_of_view_in_advanced_life_support___code_blue_68_115.mp4',
        careerData: createCareerItem(
          'i-doktor',
          'Doktor Perubatan',
          'Medical Doctor',
          'I',
          'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730540/Cardiac_Arrest_Experience_-_Patient_point_of_view_in_advanced_life_support___code_blue_68_115.mp4',
          'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=2000&q=80',
          'Mendiagnosis penyakit, merawat pesakit dan menguruskan kes kecemasan perubatan di hospital.'
        ),
      },
      {
        title: 'Ahli farmasi',
        hasVR: true,
        hasVideo: true,
        videoUrl: 'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730551/POV__A_Day_in_a_Middle_Eastern_Pharmacy_Calm_Realistic_509_543.mp4',
        careerData: createCareerItem(
          'i-ahli-farmasi',
          'Ahli Farmasi',
          'Pharmacist',
          'I',
          'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730551/POV__A_Day_in_a_Middle_Eastern_Pharmacy_Calm_Realistic_509_543.mp4',
          'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=2000&q=80',
          'Merumus, menguji dan mendispen ubat-ubatan serta memberi nasihat farmakoterapi kepada pesakit.'
        ),
      },
      {
        title: 'Pegawai penyelidik',
        hasVR: true,
        hasVideo: true,
        videoUrl: 'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730567/VLOG__My_Life_in_the_Laboratory-_Virus_Vaccine_Research_153_194.mp4',
        careerData: createCareerItem(
          'i-pegawai-penyelidik',
          'Pegawai Penyelidik',
          'Research Officer',
          'I',
          'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730567/VLOG__My_Life_in_the_Laboratory-_Virus_Vaccine_Research_153_194.mp4',
          'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=2000&q=80',
          'Menjalankan penyelidikan makmal mikrobiologi, kajian vaksin dan analisis data bioteknologi.'
        ),
      },
      {
        title: 'Data Analyst',
        hasVR: true,
        hasVideo: false,
        careerData: createCareerItem(
          'i-data-analyst',
          'Data Analyst',
          'Data Analyst',
          'I',
          undefined,
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80',
          'Menganalisis set data besar untuk menemui pola, cerapan dan membantu proses membuat keputusan.'
        ),
      },
      {
        title: 'Juru x ray',
        hasVR: true,
        hasVideo: true,
        videoUrl: 'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730545/Going_for_an_MRI_Scan_from_a_patient_s_perspective_28_55.mp4',
        careerData: createCareerItem(
          'i-juru-x-ray',
          'Juru X-Ray / Juru Radiografi',
          'Radiographer',
          'I',
          'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730545/Going_for_an_MRI_Scan_from_a_patient_s_perspective_28_55.mp4',
          'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=2000&q=80',
          'Mengendalikan mesin pengimejan diagnostik perubatan seperti X-ray, imbasan CT dan MRI.'
        ),
      },
      {
        title: 'Pegawai makmal',
        hasVR: true,
        hasVideo: true,
        videoUrl: 'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730542/Behind_the_scenes__What_happens_to_a_blood_sample__100_171.mp4',
        careerData: createCareerItem(
          'i-pegawai-makmal',
          'Pegawai Makmal Sains',
          'Medical Laboratory Scientist',
          'I',
          'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730542/Behind_the_scenes__What_happens_to_a_blood_sample__100_171.mp4',
          'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=2000&q=80',
          'Menguji sampel darah, tisu dan patogen makmal untuk pengesanan penyakit secara saintifik.'
        ),
      },
      {
        title: 'Jurutera',
        hasVR: true,
        hasVideo: false,
        careerData: createCareerItem(
          'i-jurutera',
          'Jurutera Penyelidikan',
          'Research Engineer',
          'I',
          undefined,
          'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80',
          'Merekabentuk model pengiraan saintifik, eksperimen fizik dan inovasi teknologi terkini.'
        ),
      },
      {
        title: 'Jururawat',
        hasVR: true,
        hasVideo: true,
        videoUrl: 'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730539/A_Day_in_the_Life_of_a_Scrub_Nurse_16_54.mp4',
        careerData: createCareerItem(
          'i-jururawat',
          'Jururawat Klinikal',
          'Clinical Nurse',
          'I',
          'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730539/A_Day_in_the_Life_of_a_Scrub_Nurse_16_54.mp4',
          'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=2000&q=80',
          'Melaksanakan penjagaan klinikal pesakit, membantu pembedahan dan memantau tanda-tanda vital perubatan.'
        ),
      },
    ],
    perkaraDipelajari: [
      'Biologi',
      'Kimia',
      'Fizik',
      'Matematik',
      'Sains komputer',
      'Data',
      'Teknologi',
      'Penyelidikan',
      'Kesihatan dan perubatan',
    ],
    menengahAtas: {
      title: 'Subjek Tingkatan 4–5',
      subjects: ['Biologi', 'Kimia', 'Fizik', 'Matematik Tambahan', 'Sains Komputer'],
    },
    lepasanSpm: {
      asasiMatrikulasi: ['Asasi Sains', 'Asasi Perubatan', 'Asasi Kejuruteraan', 'Matrikulasi Sains'],
      diploma: [
        'Diploma Sains',
        'Diploma Teknologi Maklumat',
        'Diploma Sains Komputer',
        'Diploma Kesihatan',
      ],
    },
    contohUniversiti: ['UM', 'USM', 'UKM', 'UPM', 'UTM'],
    degree: [
      'Perubatan',
      'Farmasi',
      'Sains Biologi',
      'Kimia',
      'Fizik',
      'Sains Komputer',
      'Sains Data',
      'Kejuruteraan',
      'Bioteknologi',
    ],
  },

  A: {
    code: 'A',
    codeLetter: 'A – ARTISTIC',
    emoji: '🎨',
    name: 'Artistik (Artistic)',
    fieldTitle: 'Bidang Seni, Kreativiti, Reka Bentuk dan Media',
    maksudBidang:
      'Artistic sesuai untuk individu yang suka mencipta, menghasilkan idea baharu dan mengekspresikan diri melalui seni atau media. Mereka biasanya mempunyai imaginasi dan kreativiti yang tinggi.',
    ciriCiri: [
      'Imaginatif, berfikiran di luar kotak dan mempunyai naluri seni yang tinggi',
      'Suka kebebasan berkarya tanpa terikat dengan peraturan yang terlalu tegar',
      'Ekspresif dalam menyampaikan emosi dan konsep melalui karya visual atau bunyi',
      'Peka terhadap estetika, warna, tipografi, reka letak dan komposisi',
    ],
    suka: 'melukis, mereka bentuk, mengambil gambar, membuat video, menulis, menghasilkan kandungan dan mencipta sesuatu.',
    themeColor: '#FFE600',
    accentBg: '#FFFBD4',
    pekerjaanList: [
      {
        title: 'Graphic Designer',
        hasVR: true,
        hasVideo: true,
        videoUrl: 'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730556/Full_Day_in_a_Life_of_a_Graphic_Designer_-_First_Person_View_-_Working_from_Home_145_193.mp4',
        careerData: createCareerItem(
          'a-graphic-designer',
          'Graphic Designer',
          'Graphic Designer',
          'A',
          'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730556/Full_Day_in_a_Life_of_a_Graphic_Designer_-_First_Person_View_-_Working_from_Home_145_193.mp4',
          'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=2000&q=80',
          'Mencipta identiti visual, ilustrasi digital dan rekaan grafik kreatif untuk penjenamaan.'
        ),
      },
      {
        title: 'Animator',
        hasVR: true,
        hasVideo: false,
        careerData: createCareerItem(
          'a-animator',
          'Animator 3D & 2D',
          '3D & 2D Animator',
          'A',
          undefined,
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2000&q=80',
          'Menghasilkan animasi pergerakan watak untuk filem, siri televisyen dan permainan digital.'
        ),
      },
      {
        title: 'Photographer',
        hasVR: true,
        hasVideo: true,
        videoUrl: 'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730563/First_Person_POV_Street_Photography__65_121.mp4',
        careerData: createCareerItem(
          'a-photographer',
          'Jurugambar Profesional',
          'Professional Photographer',
          'A',
          'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730563/First_Person_POV_Street_Photography__65_121.mp4',
          'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=2000&q=80',
          'Merakam visual artistik, fotografi jalanan, potret dan komposisi pencahayaan estetik.'
        ),
      },
      {
        title: 'Video Editor',
        hasVR: true,
        hasVideo: false,
        careerData: createCareerItem(
          'a-video-editor',
          'Penyunting Video',
          'Video Editor',
          'A',
          undefined,
          'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=2000&q=80',
          'Menyunting rakaman video, rekaan audio, pewarnaan visual dan menghasilkan montaj sinematik.'
        ),
      },
      {
        title: 'Art Director',
        hasVR: true,
        hasVideo: false,
        careerData: createCareerItem(
          'a-art-director',
          'Pengarah Seni',
          'Art Director',
          'A',
          undefined,
          'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=2000&q=80',
          'Menentukan hala tuju gaya seni visual dan konsep kreatif bagi kempen media dan filem.'
        ),
      },
      {
        title: 'UI/UX Designer',
        hasVR: true,
        hasVideo: false,
        careerData: createCareerItem(
          'a-uiux-designer',
          'UI/UX Designer',
          'UI/UX Designer',
          'A',
          undefined,
          'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=2000&q=80',
          'Mereka bentuk pengalaman pengguna dan antaramuka visual aplikasi pintar yang intuitif.'
        ),
      },
      {
        title: 'Arkitek',
        hasVR: true,
        hasVideo: true,
        videoUrl: 'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730543/Basic_Rules_of_PERSPECTIVE_DRAWING_in_Architecture_Free_Downloadable_Guide_127_162.mp4',
        careerData: createCareerItem(
          'a-arkitek',
          'Arkitek Seni Bina',
          'Architect',
          'A',
          'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730543/Basic_Rules_of_PERSPECTIVE_DRAWING_in_Architecture_Free_Downloadable_Guide_127_162.mp4',
          'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=80',
          'Merekabentuk struktur bangunan, lukisan perspektif seni bina dan susun atur ruang bandar.'
        ),
      },
    ],
    perkaraDipelajari: [
      'Seni visual',
      'Reka bentuk',
      'Grafik',
      'Animasi',
      'Fotografi',
      'Video',
      'Filem',
      'Multimedia',
      'Muzik',
      'Penulisan',
      'Komunikasi',
    ],
    menengahAtas: {
      title: 'Subjek Tingkatan 4–5',
      subjects: [
        'Pendidikan Seni Visual',
        'Bahasa Melayu',
        'Bahasa Inggeris',
        'Kesusasteraan',
        'Reka Bentuk dan Teknologi',
        'Multimedia',
        'Sains sosial',
      ],
    },
    lepasanSpm: {
      asasiMatrikulasi: [
        'Asasi Seni Bina',
        'Asasi Seni Kreatif',
        'Asasi Komunikasi & Media',
        'Asasi Seni Reka & Warisan',
      ],
      diploma: [
        'Diploma Seni Bina',
        'Diploma Seni',
        'Diploma Reka Bentuk',
        'Diploma Grafik',
        'Diploma Multimedia',
        'Diploma Animasi',
        'Diploma Komunikasi',
      ],
    },
    contohUniversiti: [
      'UiTM (Seni Bina, Seni dan reka bentuk, Grafik, Fotografi, Industrial Design)',
      'UTM (Seni Bina, Industrial Design)',
      'UM (Seni Bina)',
      'USM (Seni Bina)',
      'IIUM (Seni Bina)',
    ],
    degree: [
      'Seni Bina (Architecture)',
      'Graphic Design',
      'Industrial Design',
      'Multimedia',
      'Animation',
      'Creative Arts',
      'Communication',
      'Film and Broadcasting',
    ],
  },

  S: {
    code: 'S',
    codeLetter: 'S – SOCIAL',
    emoji: '👩‍🏫',
    name: 'Sosial (Social)',
    fieldTitle: 'Bidang Pendidikan, Kaunseling, Psikologi dan Kebajikan',
    maksudBidang:
      'Social sesuai untuk individu yang suka berinteraksi, membantu, mengajar, membimbing dan bekerjasama dengan orang lain. Bidang ini sangat berkaitan dengan manusia dan pembangunan individu.',
    ciriCiri: [
      'Empati tinggi, penyabar dan prihatin terhadap kebajikan insan lain',
      'Cekap berkomunikasi secara lisan dan membina hubungan interpersonal yang positif',
      'Mendapat kepuasan mendalam apabila melihat orang lain berkembang dan berjaya',
      'Lebih selesa bekerja dalam kumpulan komuniti berbanding dengan mesin atau alatan sejuk',
    ],
    suka: 'bercakap dengan orang, mendengar masalah, mengajar, membantu rakan dan bekerja dalam kumpulan.',
    themeColor: '#10B981',
    accentBg: '#D1FAE5',
    pekerjaanList: [
      {
        title: 'Guru',
        hasVR: true,
        hasVideo: true,
        videoUrl: 'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730522/360-degree_video_classroom_demo_0_68.mp4',
        careerData: createCareerItem(
          's-guru',
          'Guru / Pendidik',
          'Teacher / Educator',
          'S',
          'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730522/360-degree_video_classroom_demo_0_68.mp4',
          'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=2000&q=80',
          'Mengajar, mendidik dan membimbing murid di dalam bilik darjah interaktif serta memupuk sahsiah.'
        ),
      },
      {
        title: 'Kaunselor',
        hasVR: true,
        hasVideo: true,
        videoUrl: 'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730555/What_a_Psychology_Session_Looks_Like__132_177.mp4',
        careerData: createCareerItem(
          's-kaunselor',
          'Kaunselor Berdaftar',
          'Registered Counselor',
          'S',
          'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730555/What_a_Psychology_Session_Looks_Like__132_177.mp4',
          'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=2000&q=80',
          'Menjalankan sesi bimbingan psikologi, mendengar masalah klien dan membantu kesejahteraan mental.'
        ),
      },
      {
        title: 'Pensyarah',
        hasVR: true,
        hasVideo: true,
        videoUrl: 'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730557/Virtual_Reality_VR_Public_Speaking_Practice_Stage__Audience_of_100_176_224.mp4',
        careerData: createCareerItem(
          's-pensyarah',
          'Pensyarah Universiti',
          'University Lecturer',
          'S',
          'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730557/Virtual_Reality_VR_Public_Speaking_Practice_Stage__Audience_of_100_176_224.mp4',
          'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=2000&q=80',
          'Menyampaikan kuliah akademik, membimbing penyelidikan mahasiswa dan pengucapan awam.'
        ),
      },
      {
        title: 'Jururawat',
        hasVR: true,
        hasVideo: true,
        videoUrl: 'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730539/A_Day_in_the_Life_of_a_Scrub_Nurse_16_54.mp4',
        careerData: createCareerItem(
          's-jururawat',
          'Jururawat Kesihatan Awam',
          'Healthcare Nurse',
          'S',
          'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730539/A_Day_in_the_Life_of_a_Scrub_Nurse_16_54.mp4',
          'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=2000&q=80',
          'Memberikan sokongan emosi dan penjagaan kesihatan yang berdedikasi kepada pesakit dan keluarga.'
        ),
      },
      {
        title: 'Pegawai kebajikan',
        hasVR: true,
        hasVideo: false,
        careerData: createCareerItem(
          's-pegawai-kebajikan',
          'Pegawai Kebajikan Masyarakat',
          'Social Welfare Officer',
          'S',
          undefined,
          'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=2000&q=80',
          'Membantu golongan memerlukan, menguruskan bantuan sosial dan program komuniti.'
        ),
      },
      {
        title: 'Pegawai pendidikan',
        hasVR: true,
        hasVideo: false,
        careerData: createCareerItem(
          's-pegawai-pendidikan',
          'Pegawai Perkhidmatan Pendidikan',
          'Education Services Officer',
          'S',
          undefined,
          'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=80',
          'Menyelaras dasar kurikulum, pemantauan sekolah dan pembangunan guru.'
        ),
      },
    ],
    perkaraDipelajari: [
      'Psikologi',
      'Pendidikan',
      'Kaunseling',
      'Perkembangan manusia',
      'Komunikasi',
      'Sosiologi',
      'Kerja sosial',
      'Bimbingan dan kaunseling',
      'Pembangunan masyarakat',
    ],
    menengahAtas: {
      title: 'Subjek Tingkatan 4–5',
      subjects: [
        'Bahasa Melayu',
        'Bahasa Inggeris',
        'Sejarah',
        'Pendidikan Islam/Moral',
        'Geografi',
        'Ekonomi',
        'Sastera',
        'Sains sosial',
      ],
    },
    lepasanSpm: {
      asasiMatrikulasi: ['Asasi Sains Sosial', 'Asasi Sains Kemanusiaan'],
      diploma: [
        'Diploma Pendidikan',
        'Diploma Kaunseling',
        'Diploma Pengajian Sosial',
        'Diploma Psikologi',
      ],
    },
    contohUniversiti: [
      'UPSI (Pendidikan, Kaunseling)',
      'UM (Pendidikan, Psikologi, Sains Sosial)',
      'UKM (Pendidikan, Psikologi, Sains Sosial)',
    ],
    degree: [
      'Pendidikan',
      'Kaunseling',
      'Psikologi',
      'Kerja Sosial',
      'Sains Sosial',
      'Pendidikan Khas',
    ],
  },

  E: {
    code: 'E',
    codeLetter: 'E – ENTERPRISING',
    emoji: '💼',
    name: 'Enterprising',
    fieldTitle: 'Bidang Perniagaan, Pengurusan, Kepimpinan dan Keusahawanan',
    maksudBidang:
      'Enterprising sesuai untuk individu yang suka memimpin, mengurus, berkomunikasi, membuat keputusan dan menjalankan perniagaan. Individu dalam bidang ini biasanya yakin berkomunikasi dan selesa mengambil tanggungjawab.',
    ciriCiri: [
      'Yakin berucap di hadapan khalayak, karismatik dan petah berhujah',
      'Bakat kepimpinan semula jadi dan berorientasikan hasil keuntungan komersial',
      'Berani mengambil risiko yang dikira (calculated risks) demi kejayaan matlamat',
      'Cekap mempengaruhi pandangan orang lain dan berunding perjanjian',
    ],
    suka: 'berniaga, bercakap di hadapan orang, memimpin kumpulan, merancang aktiviti dan membuat keputusan.',
    themeColor: '#FB923C',
    accentBg: '#FFEDD5',
    pekerjaanList: [
      {
        title: 'Usahawan',
        hasVR: true,
        hasVideo: false,
        careerData: createCareerItem(
          'e-usahawan',
          'Usahawan',
          'Entrepreneur',
          'E',
          undefined,
          'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2000&q=80',
          'Membina dan menguruskan perniagaan baharu, merangka strategi pasaran dan menerajui inovasi.'
        ),
      },
      {
        title: 'Pegawai pemasaran',
        hasVR: true,
        hasVideo: false,
        careerData: createCareerItem(
          'e-pegawai-pemasaran',
          'Pegawai Pemasaran',
          'Marketing Officer',
          'E',
          undefined,
          'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=2000&q=80',
          'Merancang kempen promosi, penyelidikan pasaran pengguna dan strategi penjenamaan jenama.'
        ),
      },
      {
        title: 'Pegawai jualan',
        hasVR: true,
        hasVideo: false,
        careerData: createCareerItem(
          'e-pegawai-jualan',
          'Pegawai Jualan',
          'Sales Executive',
          'E',
          undefined,
          'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=2000&q=80',
          'Berunding dengan klien, membentangkan cadangan komersial dan mencapai sasaran jualan syarikat.'
        ),
      },
      {
        title: 'Pegawai sumber manusia',
        hasVR: true,
        hasVideo: false,
        careerData: createCareerItem(
          'e-pegawai-sumber-manusia',
          'Pegawai Sumber Manusia',
          'HR Officer',
          'E',
          undefined,
          'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=2000&q=80',
          'Mengurus bakat pekerja, sesi temu duga, kebajikan staf dan pembangunan latihan korporat.'
        ),
      },
      {
        title: 'Business Development',
        hasVR: true,
        hasVideo: false,
        careerData: createCareerItem(
          'e-business-dev',
          'Eksekutif Business Development',
          'Business Development Executive',
          'E',
          undefined,
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80',
          'Mencari peluang kerjasama strategik, meluaskan perkongsian niaga dan pertumbuhan pendapatan syarikat.'
        ),
      },
      {
        title: 'Pengurus operasi',
        hasVR: true,
        hasVideo: true,
        videoUrl: 'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730543/Day_in_the_Life_-_Amazon_Operations_Manager_20_60.mp4',
        careerData: createCareerItem(
          'e-pengurus-operasi',
          'Pengurus Operasi',
          'Operations Manager',
          'E',
          'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730543/Day_in_the_Life_-_Amazon_Operations_Manager_20_60.mp4',
          'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80',
          'Menyelia logistik pusat pengedaran, kecekapan rantaian bekalan dan kepimpinan pasukan operasi.'
        ),
      },
      {
        title: 'Eksekutif perniagaan',
        hasVR: true,
        hasVideo: false,
        careerData: createCareerItem(
          'e-eksekutif-perniagaan',
          'Eksekutif Perniagaan',
          'Business Executive',
          'E',
          undefined,
          'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80',
          'Mengurus operasi harian syarikat, membuat keputusan strategik dan berhubung dengan rakan niaga.'
        ),
      },
    ],
    perkaraDipelajari: [
      'Perniagaan',
      'Pengurusan',
      'Pemasaran',
      'Keusahawanan',
      'Sumber manusia',
      'Ekonomi',
      'Pengurusan kewangan',
      'Kepimpinan',
      'Strategi perniagaan',
    ],
    menengahAtas: {
      title: 'Subjek Tingkatan 4–5',
      subjects: [
        'Perniagaan',
        'Ekonomi',
        'Prinsip Perakaunan',
        'Matematik',
        'Bahasa Melayu',
        'Bahasa Inggeris',
      ],
    },
    lepasanSpm: {
      asasiMatrikulasi: ['Matrikulasi Perakaunan', 'Asasi Pengurusan Perniagaan'],
      diploma: [
        'Diploma Perniagaan',
        'Diploma Pengurusan',
        'Diploma Pemasaran',
        'Diploma Keusahawanan',
        'Diploma Sumber Manusia',
      ],
    },
    contohUniversiti: ['UUM', 'UM', 'UKM', 'UTM', 'UiTM'],
    degree: [
      'Business Administration',
      'Management',
      'Marketing',
      'Entrepreneurship',
      'Human Resource Management',
      'Economics',
      'International Business',
    ],
  },

  K: {
    code: 'K',
    codeLetter: 'C – CONVENTIONAL',
    emoji: '📊',
    name: 'Konvensional (Conventional)',
    fieldTitle: 'Bidang Perakaunan, Kewangan, Pentadbiran dan Data',
    maksudBidang:
      'Conventional sesuai untuk individu yang suka kerja yang tersusun, teratur, menggunakan nombor, data, rekod dan prosedur. Mereka biasanya teliti dan suka memastikan sesuatu maklumat disusun dengan betul.',
    ciriCiri: [
      'Sangat teliti, berdisiplin tinggi dan mementingkan ketepatan sifar ralat',
      'Cekap mengurus data berangka, rekod kewangan dan fail mengikut piawaian piawai',
      'Selesa bekerja dalam persekitaran yang tersusun dengan garis panduan SOP yang jelas',
      'Boleh diharap dalam menjaga kerahsiaan rekod dokumen dan pematuhan audit',
    ],
    suka: 'nombor, membuat pengiraan, menyusun fail, menggunakan komputer, mengurus data dan melakukan kerja secara sistematik.',
    themeColor: '#00E5FF',
    accentBg: '#E0FAFF',
    pekerjaanList: [
      {
        title: 'Akauntan',
        hasVR: true,
        hasVideo: true,
        videoUrl: 'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730545/ACCOUNTANT_WORK_DAY_IN_MY_LIFE__8AM-5PM_IN_OFFICE_224_267.mp4',
        careerData: createCareerItem(
          'k-akauntan',
          'Akauntan Bertauliah',
          'Accountant',
          'K',
          'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730545/ACCOUNTANT_WORK_DAY_IN_MY_LIFE__8AM-5PM_IN_OFFICE_224_267.mp4',
          'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=2000&q=80',
          'Menyediakan penyata kewangan, mengurus lejar perakaunan dan memastikan ketepatan rekod baki.'
        ),
      },
      {
        title: 'Juruaudit',
        hasVR: true,
        hasVideo: false,
        careerData: createCareerItem(
          'k-juruaudit',
          'Juruaudit Kewangan',
          'Financial Auditor',
          'K',
          undefined,
          'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=2000&q=80',
          'Menyemak pematuhan undang-undang kewangan, menilai risiko perakaunan dan prosedur kawalan dalaman.'
        ),
      },
      {
        title: 'Pegawai bank',
        hasVR: true,
        hasVideo: false,
        careerData: createCareerItem(
          'k-pegawai-bank',
          'Pegawai Perbankan',
          'Bank Officer',
          'K',
          undefined,
          'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=2000&q=80',
          'Memproses transaksi kewangan, permohonan pinjaman dan menguruskan akaun simpanan pelanggan.'
        ),
      },
      {
        title: 'Pegawai pentadbiran',
        hasVR: true,
        hasVideo: true,
        videoUrl: 'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730600/RTI_Office_GoPro_58_93.mp4',
        careerData: createCareerItem(
          'k-pegawai-pentadbiran',
          'Pegawai Pentadbiran',
          'Administrative Officer',
          'K',
          'https://res.cloudinary.com/q8hazvhn/video/upload/v1791730600/RTI_Office_GoPro_58_93.mp4',
          'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=2000&q=80',
          'Menguruskan operasi pejabat, pemfailan dokumen rasmi, koordinasi jadual dan pentadbiran am.'
        ),
      },
      {
        title: 'Eksekutif akaun',
        hasVR: true,
        hasVideo: false,
        careerData: createCareerItem(
          'k-eksekutif-akaun',
          'Eksekutif Akaun',
          'Accounts Executive',
          'K',
          undefined,
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2000&q=80',
          'Memasukkan rekod invois, memadankan lejar belum bayar/terima dan rekod urus niaga syarikat.'
        ),
      },
      {
        title: 'Pegawai cukai',
        hasVR: true,
        hasVideo: false,
        careerData: createCareerItem(
          'k-pegawai-cukai',
          'Pegawai Percukaian',
          'Tax Officer',
          'K',
          undefined,
          'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=2000&q=80',
          'Menilai pengiraan taksiran cukai pendapatan syarikat dan individu mengikut statut LHDN.'
        ),
      },
      {
        title: 'Financial Analyst',
        hasVR: true,
        hasVideo: false,
        careerData: createCareerItem(
          'k-financial-analyst',
          'Penganalisis Kewangan',
          'Financial Analyst',
          'K',
          undefined,
          'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=2000&q=80',
          'Membina model unjuran kewangan, menilai prestasi pelaburan dan trend pasaran modal.'
        ),
      },
    ],
    perkaraDipelajari: [
      'Perakaunan',
      'Kewangan',
      'Matematik',
      'Perbankan',
      'Audit',
      'Pengurusan rekod',
      'Pentadbiran',
      'Data',
      'Sistem maklumat',
    ],
    menengahAtas: {
      title: 'Subjek Tingkatan 4–5',
      subjects: [
        'Prinsip Perakaunan',
        'Matematik',
        'Ekonomi',
        'Perniagaan',
        'Matematik Tambahan',
      ],
    },
    lepasanSpm: {
      asasiMatrikulasi: ['Matrikulasi Perakaunan', 'Asasi Perakaunan & Kewangan'],
      diploma: [
        'Diploma Perakaunan',
        'Diploma Kewangan',
        'Diploma Perbankan',
        'Diploma Pengurusan',
        'Diploma Pentadbiran',
      ],
    },
    contohUniversiti: ['UiTM', 'UM', 'UUM', 'UTM', 'UKM'],
    degree: [
      'Accounting',
      'Finance',
      'Banking',
      'Economics',
      'Business Administration',
      'Financial Management',
    ],
  },
};
