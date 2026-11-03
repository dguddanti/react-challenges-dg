import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import SelectionProvider from '../contexts/SelectionProvider';
import { fetchSchedule } from '../utilities/fetch';

const RootLayout = () => {
  const schedule = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-gray-50 pt-4">
      <h1 className="px-6 text-3xl font-bold text-gray-900">{schedule.title}</h1>
      {/* Lives above the routes so selections survive navigating to an edit page and back */}
      <SelectionProvider>
        <Outlet />
      </SelectionProvider>
      <TanStackRouterDevtools />
    </main>
  );
};

export const Route = createRootRoute({
  loader: fetchSchedule,
  staleTime: Infinity,
  pendingComponent: () => <p className="p-8 text-center text-gray-500">Loading course data...</p>,
  errorComponent: ({ error }) => <p className="p-8 text-center text-red-600">Error loading course data: {`${error}`}</p>,
  component: RootLayout,
});
