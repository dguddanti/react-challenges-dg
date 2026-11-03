import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import TermSelector from '../components/TermSelector';
import CourseList from '../components/CourseList';
import CoursePlan from '../components/CoursePlan';
import { TERMS } from '../types';
import type { Term } from '../types';

const isTerm = (value: unknown): value is Term => TERMS.includes(value as Term);

const CoursesPage = () => {
  const { courses } = useLoaderData({ from: '__root__' });
  const { term } = Route.useSearch();
  const navigate = Route.useNavigate();

  return (
    <>
      <div className="mt-3 flex items-center justify-between gap-4 px-6">
        <TermSelector selected={term} setSelected={t => navigate({ search: { term: t } })} />
        <CoursePlan courses={courses} />
      </div>
      <CourseList courses={courses} selectedTerm={term} />
    </>
  );
};

// The term lives in the URL so returning from an edit page lands on the same term
export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): { term: Term } => ({
    term: isTerm(search.term) ? search.term : 'Fall',
  }),
  component: CoursesPage,
});
