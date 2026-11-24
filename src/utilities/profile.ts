import type { User } from 'firebase/auth';
import { useAuthState, useDataQuery } from './firebase';

export interface Profile {
  user: User | null;
  isAdmin: boolean;
}

// Always queries the database, using the dummy id "guest" when no one is signed in,
// so the hooks are called the same way on every render (Rules of Hooks).
export const useProfile = (): [Profile, boolean, Error | undefined] => {
  const { user, isInitialLoading } = useAuthState();
  const [isAdmin, isLoading, error] = useDataQuery(`/admins/${user?.uid || 'guest'}`);
  return [{ user, isAdmin: isAdmin === true }, isInitialLoading || isLoading, error];
};