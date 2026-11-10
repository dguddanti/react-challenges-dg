import { createContext, use } from 'react';
import type { Schedule } from '../types';

export const ScheduleContext = createContext<Schedule | null>(null);

export const useSchedule = () => {
  const schedule = use(ScheduleContext);
  if (!schedule) throw new Error('useSchedule must be used within a ScheduleContext');
  return schedule;
};
