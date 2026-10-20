export interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

export interface Schedule {
  title: string;
  courses: Record<string, Course>;
}

export const TERMS = ['Fall', 'Winter', 'Spring'] as const;
export type Term = (typeof TERMS)[number];
