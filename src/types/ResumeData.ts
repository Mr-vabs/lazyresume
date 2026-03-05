export interface SocialLink {
  id: string;
  label: string;
  url: string;
}

export interface PersonalInfo {
  name: string;
  phone: string;
  email: string;
  socials: SocialLink[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface Experience {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Project {
  id: string;
  name: string;
  technologies: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface SkillCategory {
  id: string;
  category: string;
  items: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: SkillCategory[];
  sectionOrder: string[];
}
