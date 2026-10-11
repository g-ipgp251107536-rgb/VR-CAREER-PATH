export type HollandCodeType = 'R' | 'I' | 'A' | 'S' | 'E' | 'K';

export interface Question {
  id: number;
  text: string;
  category: HollandCodeType;
  categoryName: string;
}

export interface CareerItem {
  id: string;
  name: string;
  nameEn: string;
  category: HollandCodeType;
  salaryRangeMYR: string;
  demandRating: 'Sangat Tinggi' | 'Tinggi' | 'Sederhana';
  description: string;
  educationPath: string;
  keySkills: string[];
  topEmployersMY: string[];
  vrScene: {
    title: string;
    environmentName: string;
    ambientSoundType: 'industrial' | 'lab' | 'studio' | 'medical' | 'office' | 'corporate';
    panoramicImageUrl: string;
    youtube360Id: string;
    videoUrl?: string;
    hasVideo?: boolean;
    fallbackColor: string;
    hotspots: Array<{
      id: string;
      title: string;
      description: string;
      x: number; // percentage on spherical canvas
      y: number;
    }>;
  };
}

export interface HollandCategoryInfo {
  code: HollandCodeType;
  name: string;
  nameEn: string;
  color: string;
  accentBg: string;
  tagline: string;
  personalityTraits: string[];
  workEnvironment: string;
  skillsFavored: string[];
  description: string;
  careers: CareerItem[];
}

export interface StudentProfile {
  id: string;
  name: string;
  school: string;
  classGrade?: string;
  completedAt?: string;
  scores: Record<HollandCodeType, number>;
  hollandCode: string; // e.g. "RIA"
  dominantCategory: HollandCodeType;
  exploredCareers: string[];
  vrConnected: boolean;
  vrModeUsed: 'split-screen' | 'panoramic';
  pairingCode?: string;
  pairedDeviceName?: string;
  pairedAt?: string;
}

export interface RoadmapStep {
  stepNumber: number;
  stageTitle: string;
  stageSubtitle: string;
  targetYears: string;
  academicSubjects: {
    recommendedStream?: string;
    coreSubjects: string[];
    focusElectives: string[];
    examMilestone: string;
  };
  extracurriculars: {
    uniformBodies: string[];
    clubsAndSocieties: string[];
    sportsAndRecreation: string[];
    competitionsAndMilestones: string[];
  };
  proTip: string;
}

export interface HollandRoadmap {
  category: HollandCodeType;
  title: string;
  summary: string;
  recommendedSPMStream: string;
  postSpmPathways: string[];
  steps: RoadmapStep[];
}

export type ActiveTab = 'login' | 'test' | 'results' | 'vr' | 'admin';
