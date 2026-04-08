export type SkillCategory =
  | 'Languages'
  | 'Backend'
  | 'Data'
  | 'Cloud'
  | 'DevEx'
  | 'Observability'
  | 'Security';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  years: number;
  relatedProjectIds: string[];
}

