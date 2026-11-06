import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from '@tanstack/react-router';
import CourseField from './CourseField';
import { courseResolver } from '../types';
import type { Course, Term } from '../types';

interface CourseFormProps {
  course: Course;
}

const CourseForm = ({ course }: CourseFormProps) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<Course>({
    defaultValues: course,
    mode: 'onChange',
    resolver: courseResolver,
  });

  // Saving isn't implemented yet; handleSubmit still prevents the page reload
  const onSubmit: SubmitHandler<Course> = () => {};

  const backSearch = { term: course.term as Term };

  return (
    <>
      {/* Same row position as the term selector on the course list page */}
      <div className="mt-3 flex min-h-9 items-center px-6">
        <Link
          to="/"
          search={backSearch}
          className="rounded-full text-sm font-medium text-gray-600 transition-colors hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          ← Back to courses
        </Link>
      </div>
      <div className="p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="max-w-xl rounded-xl border border-gray-200 bg-white shadow-sm"
        >
          <header className="border-b border-gray-100 px-6 pt-5 pb-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
              {course.term} · CS {course.number}
            </div>
            <h2 className="mt-1 text-xl font-semibold text-gray-900">Edit course</h2>
            <p className="mt-0.5 text-sm text-gray-500">{course.title}</p>
          </header>

          <div className="grid grid-cols-1 gap-x-4 gap-y-5 px-6 py-5 sm:grid-cols-2">
            <CourseField name="title" label="Title" errors={errors} register={register} className="sm:col-span-2" />
            <CourseField name="term" label="Term" placeholder="Fall" errors={errors} register={register} />
            <CourseField name="number" label="Number" placeholder="213-2" errors={errors} register={register} />
            <CourseField
              name="meets"
              label="Meeting times"
              placeholder="MWF 12:00-13:20"
              errors={errors}
              register={register}
              className="sm:col-span-2"
            />
          </div>

          <footer className="flex justify-end gap-2 rounded-b-xl border-t border-gray-100 bg-gray-50 px-6 py-3">
            <button
              type="button"
              onClick={() => navigate({ to: '/', search: backSearch })}
              className="cursor-pointer rounded-full border border-gray-300 bg-white px-5 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
            >
              Cancel
            </button>
          </footer>
        </form>
      </div>
    </>
  );
};

export default CourseForm;
