import type { Schedule } from '../types';

const URL = 'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php';

export const fetchSchedule = async (): Promise<Schedule> => {
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }
  return response.json();
};
