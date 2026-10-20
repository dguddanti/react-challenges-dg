import type { Course } from '../types';

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => (
  <div className="flex h-48 flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
    <div className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
      {course.term} · CS {course.number}
    </div>
    <div className="mt-2 flex-grow text-base font-medium text-gray-800">
      {course.title}
    </div>
    <div className="border-t border-gray-100 pt-2 text-sm text-gray-500">
      {course.meets}
    </div>
  </div>
);

export default CourseCard;
