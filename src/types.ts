import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseMeeting } from './utilities/conflicts';

// valid day codes, a space, then start-end with hours 0-23 and minutes 00-59
const TIME = '(?:[01]?\\d|2[0-3]):[0-5]\\d';
const MEETS = new RegExp(`^(?:M|Tu|W|Th|F|Sa|Su)+ ${TIME}-${TIME}$`);

// the regex checks the shape; the code checks no repeated days and start before end
const isValidMeets = (meets: string) => {
  if (meets === '') return true;
  if (!MEETS.test(meets)) return false;
  const { days, start, end } = parseMeeting(meets)!;
  return new Set(days).size === days.length && start < end;
};

const Course = z.object({
  title: z.string().trim().min(2, 'must be at least two characters'),
  term: z.enum(['Fall', 'Winter', 'Spring', 'Summer'], 'must be Fall, Winter, Spring, or Summer'),
  number: z.string().regex(/^\d+(-\d+)?$/, 'must be a number with an optional section, e.g., 213-2'),
  meets: z.string().refine(isValidMeets, 'must contain days and start-end, e.g., MWF 12:00-13:20')
});

export type Course = z.infer<typeof Course>;

export const courseResolver = zodResolver(Course);

export interface Schedule {
  title: string;
  courses: Record<string, Course>;
}

export const TERMS = ['Fall', 'Winter', 'Spring'] as const;
export type Term = (typeof TERMS)[number];