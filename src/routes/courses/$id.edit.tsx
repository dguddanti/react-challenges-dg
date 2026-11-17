import { Link, createFileRoute, redirect } from '@tanstack/react-router';
import CourseForm from '../../components/CourseForm';
import { useSchedule } from '../../contexts/ScheduleContext';

const EditCoursePage = () => {
  const { courses } = useSchedule();
  const { id } = Route.useParams();
  const course = courses[id];

  if (!course) {
    return (
      <div className="p-6 text-gray-700">
        <p>No course found with id "{id}".</p>
        <Link to="/" search={{ term: 'Fall' }} className="mt-2 inline-block text-indigo-600 hover:underline">
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