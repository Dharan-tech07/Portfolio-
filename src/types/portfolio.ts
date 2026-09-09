export interface PersonalInfo {
  name: string;
  title: string;
  headline: string;
  subtitle: string;
  statusText: string;
  institution: string;
  affiliation: string;
  registerNo: string;
  degree: string;
  academicYears: string;
  location: string;
  linkedin: string;
  github: string;
  email: string;
  bio: string;
  aboutHighlights: {
    whoIAm: string;
    whatIBuild: string;
    whatIAmLearning: string;
    whatIWantToWorkOn: string;
  };
}

export interface DomainItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  technologies: string[];
  details: string;
}

export interface SkillItem {
  name: string;
  level: 'Strong Foundation' | 'Practical Exposure' | 'Working Knowledge' | 'Project Experience' | 'Currently Learning';
  category: string;
}

export interface SkillCategory {
  code: string;
  title: string;
  icon: string;
  skills: SkillItem[];
}

export interface ArchitectureStep {
  step: string;
  label: string;
  desc: string;
}

export interface ProjectItem {
  id: string;
  num: string;
  title: string;
  category: 'Embedded' | 'IoT' | 'Automation' | 'Simulation' | 'Software' | 'Web' | string;
  shortDesc: string;
  status: string;
  isLearning: boolean;
  problem: string;
  approach: string;
  implementation: string;
  result: string;
  architecture?: ArchitectureStep[];
  technologies: string[];
  challenges: string;
  futureScope: string;
  githubUrl?: string;
  demoUrl?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  refId: string;
  certType: 'image' | 'pdf';
  certPath: string;
  responsibilities: string[];
  technologies: string[];
  learned: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  authority: string;
  date: string;
  refId: string;
  scoreBadge: string;
  docPath: string;
  docType: 'image' | 'pdf';
  details: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  organizer: string;
  date: string;
  category: string;
  badge: string;
  docPath: string;
  docType: 'image' | 'pdf';
  pdfPath?: string;
  description: string;
}

export interface JourneyStage {
  stage: string;
  title: string;
  subtitle: string;
  desc: string;
}

export interface ExploringNode {
  id: string;
  num: string;
  title: string;
  desc: string;
  tag: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  domains: DomainItem[];
  /** Canonical skills list. `skills` is an alias pointing to the same array. */
  skillsCategories: SkillCategory[];
  /** Alias for skillsCategories — set after initialisation. */
  skills?: SkillCategory[];
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  journey: JourneyStage[];
  /** Canonical exploring list. `exploring` is an alias pointing to the same array. */
  currentlyExploring: ExploringNode[];
  /** Alias for currentlyExploring — set after initialisation. */
  exploring?: ExploringNode[];
}
