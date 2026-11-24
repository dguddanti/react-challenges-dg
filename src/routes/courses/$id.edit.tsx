import { Link, createFileRoute, redirect } from '@tanstack/react-router';
import CourseForm from '../../components/CourseForm';
import { useSchedule } from '../../contexts/ScheduleContext';
import { useProfile } from '../../utilities/profile';
import type { Term } from '../../types';

const EditCoursePage = () => {
  const { courses } = useSchedule();
  const [profile, profileLoading, profileError] = useProfile();
  const { id } = Route.useParams();
  const course = courses[id];
  const backTerm = (course?.term ?? 'Fall') as Term;

  if (profileError) return <p className="p-6 text-red-600">Error loading user profile: {profileError.message}</p>;
  if (profileLoading) return <p className="p-6 text-gray-500">Loading user profile...</p>;

  if (!profile.isAdmin) {
    return (
      <div className="p-6 text-gray-700">
        <p>Only administrators can edit courses.</p>
        <Link to="/" search={{ term: backTerm }} className="mt-2 inline-block text-indigo-600 hover:underline">
          Back to courses
        </Link>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-6 text-gray-700">
        <p>No course found with id "{id}".</p>
        <Link to="/" search={{ term: backTerm }} className="mt-2 inline-block text-indigo-600 hover:underline">
          Back to courses
        </Link>
      </div>
    );
  }

  return <CourseForm id={id} course={course} />;
};

export const Route = createFileRoute('/courses/$id/edit')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: EditCoursePage,
});