import { useForm } from 'react-hook-form';
import { useNavigate } from '@tanstack/react-router';
import type { Course, Term } from '../types';

interface CourseFormProps {
  course: Course;
}

type CourseFormValues = Pick<Course, 'title' | 'meets'>;

const inputStyle = 'mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400';

const CourseForm = ({ course }: CourseFormProps) => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<CourseFormValues>({
    defaultValues: { title: course.title, meets: course.meets },
  });

  // Saving isn't implemented yet; handleSubmit still prevents the page reload
  const onSubmit = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-6 mt-4 max-w-lg rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900">Edit CS {course.number}</h2>
      <label className="mt-4 block text-sm font-medium text-gray-700">
        Title
        <input type="text" {...register('title')} className={inputStyle} />
      </label>
      <label className="mt-4 block text-sm font-medium text-gray-700">
        Meeting times
        <input type="text" {...register('meets')} className={inputStyle} />
      </label>
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => navigate({ to: '/', search: { term: course.term as Term } })}
          className="cursor-pointer rounded-full border border-gray-300 bg-white px-5 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CourseForm;
