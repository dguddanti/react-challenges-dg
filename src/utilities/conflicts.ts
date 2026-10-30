import type { Course } from '../types';

export interface Meeting {
  days: string[];
  start: number;
  end: number;
}

const DAY_PATTERN = /M|Tu|W|Th|F|Sa|Su/g;
const MEETS_PATTERN = /^\s*([A-Za-z]+)\s+(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})\s*$/;

export const parseDays = (days: string): string[] => days.match(DAY_PATTERN) ?? [];

export const toMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export const parseMeeting = (meets: string): Meeting | null => {
  const match = MEETS_PATTERN.exec(meets);
  if (!match) return null;
  const [, days, start, end] = match;
  return { days: parseDays(days), start: toMinutes(start), end: toMinutes(end) };
};

export const daysOverlap = (a: string[], b: string[]): boolean => a.some(day => b.includes(day));

// Half-open intervals: a class ending at the minute another starts does not overlap.
export const timesOverlap = (a: Meeting, b: Meeting): boolean => a.start < b.end && b.start < a.end;

export const meetingsConflict = (a: Meeting, b: Meeting): boolean => (
  daysOverlap(a.days, b.days) && timesOverlap(a, b)
);

export const coursesConflict = (a: Course, b: Course): boolean => {
  if (a.term !== b.term) return false;
  const meetingA = parseMeeting(a.meets);
  const meetingB = parseMeeting(b.meets);
  return meetingA !== null && meetingB !== null && meetingsConflict(meetingA, meetingB);
};

export const conflictsWithAny = (course: Course, others: Course[]): boolean => (
  others.some(other => coursesConflict(course, other))
);
