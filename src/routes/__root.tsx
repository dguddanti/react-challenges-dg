import { useEffect } from 'react';
import { Outlet, createRootRouteWithContext, useRouter } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import Banner from '../components/Banner';
import SelectionProvider from '../contexts/SelectionProvider';
import { ScheduleContext } from '../contexts/ScheduleContext';
import { addAuthStateListener, useDataQuery, type AuthState } from '../utilities/firebase';
import type { Schedule } from '../types';

interface RouterContext {
  auth: AuthState
}

const RootLayout = () => {
  const router = useRouter();

  // Re-run beforeLoad checks (e.g. kick a user off the edit page) when they sign in or out
  useEffect(() => addAuthStateListener(() => router.invalidate()), [router]);

  const [json, isLoading, error] = useDataQuery('/');

  if (error) return <p className="p-8 text-center text-red-600">Error loading course data: {error.message}</p>;
  if (isLoading) return <p className="p-8 text-center text-gray-500">Loading course data...</p>;
  if (!json) return <p className="p-8 text-center text-gray-500">No course data found</p>;

  const schedule = json as Schedule;

  return (
    <main className="min-h-screen bg-gray-50 pt-4">
      <Banner />
      <h1 className="px-6 text-3xl font-bold text-gray-900">{schedule.title}</h1>
      <ScheduleContext value={schedule}>
        {/* Lives above the routes so selections survive navigating to an edit page and back */}
        <SelectionProvider>
          <Outlet />
        </SelectionProvider>
      </ScheduleContext>
      <TanStackRouterDevtools />
    </main>
  );
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});