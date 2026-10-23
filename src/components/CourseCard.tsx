import { useSelection } from '../contexts/SelectionContext';
import type { Course } from '../types';

interface CourseCardProps {
  id: string;
  course: Course;
}

const CourseCard = ({ id, course }: CourseCardProps) => {
  const { selected, toggleSelected } = useSelection();
  const isSelected = selected.includes(id);

  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={() => toggleSelected(id)}
      className={`flex h-48 cursor-pointer flex-col rounded-xl border p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
        isSelected ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500' : 'border-gray-200 bg-white'
      }`}
    >
      <div className="flex w-full items-start justify-between text-xs font-semibold uppercase tracking-wide text-indigo-600">
        <span>{course.term} · CS {course.number}</span>
        {isSelected && <span aria-hidden="true">✓</span>}
      </div>
      <div className="mt-2 flex-grow text-base font-medium text-gray-800">
        {course.title}
      </div>
      <div className={`w-full border-t pt-2 text-sm text-gray-500 ${isSelected ? 'border-indigo-100' : 'border-gray-100'}`}>
        {course.meets}
      </div>
    </button>
  );
};

export default CourseCard;
