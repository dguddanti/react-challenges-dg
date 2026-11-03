import { Link } from '@tanstack/react-router';
import { useSelection } from '../contexts/SelectionContext';
import type { Course } from '../types';

interface CourseCardProps {
  id: string;
  course: Course;
  isConflicting: boolean;
}

const cardStyle = (isSelected: boolean, isConflicting: boolean) => {
  if (isSelected) return 'cursor-pointer border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500 hover:-translate-y-0.5 hover:shadow-md';
  if (isConflicting) return 'cursor-not-allowed border-gray-200 bg-gray-100 opacity-50';
  return 'cursor-pointer border-gray-200 bg-white hover:-translate-y-0.5 hover:shadow-md';
};

const CourseCard = ({ id, course, isConflicting }: CourseCardProps) => {
  const { selected, toggleSelected } = useSelection();
  const isSelected = selected.includes(id);

  return (
    // The toggle button's ::after stretches over the whole card so any click selects it,
    // while the Edit link sits above that layer (a link can't be nested inside a button)
    <div
      title={isConflicting ? 'Time conflict with a selected course' : undefined}
      className={`relative flex h-48 flex-col rounded-xl border p-4 text-left shadow-sm transition has-[button:focus-visible]:ring-2 has-[button:focus-visible]:ring-indigo-400 ${cardStyle(isSelected, isConflicting)}`}
    >
      <div className="flex w-full items-start justify-between text-xs font-semibold uppercase tracking-wide text-indigo-600">
        <span>{course.term} · CS {course.number}</span>
        {isSelected && <span aria-hidden="true">✓</span>}
        {isConflicting && (
          <span className="text-base leading-none text-red-600">
            <span aria-hidden="true">×</span>
            <span className="sr-only">Time conflict</span>
          </span>
        )}
      </div>
      <button
        type="button"
        aria-pressed={isSelected}
        disabled={isConflicting}
        onClick={() => toggleSelected(id)}
        className="mt-2 flex-grow text-left text-base font-medium text-gray-800 after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none enabled:cursor-pointer disabled:cursor-not-allowed"
      >
        {course.title}
      </button>
      <div className={`flex w-full items-center justify-between gap-2 border-t pt-2 text-sm text-gray-500 ${isSelected ? 'border-indigo-100' : 'border-gray-100'}`}>
        <span>{course.meets}</span>
        <Link
          to="/courses/$id/edit"
          params={{ id }}
          className="relative z-10 font-medium text-indigo-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
