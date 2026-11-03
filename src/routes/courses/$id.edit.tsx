import { Link, createFileRoute, useLoaderData } from '@tanstack/react-router';
import CourseForm from '../../components/CourseForm';

const EditCoursePage = () => {
  const { courses } = useLoaderData({ from: '__root__' });
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

  return <CourseForm course={course} />;
};

export const Route = createFileRoute('/courses/$id/edit')({
  component: EditCoursePage,
});
