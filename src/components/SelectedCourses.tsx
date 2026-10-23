import { useSelection } from '../contexts/SelectionContext';
import type { Course } from '../types';

interface SelectedCoursesProps {
  courses: Record<string, Course>;
}

const SelectedCourses = ({ courses }: SelectedCoursesProps) => {
  const { selected, toggleSelected } = useSelection();

  return (
    <section className="mx-6 mt-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold text-gray-900">Selected courses</h2>
        <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
          {selected.length}
        </span>
      </div>
      {selected.length === 0
        ? (
          <p className="mt-3 rounded-xl border-2 border-dashed border-gray-200 px-4 py-5 text-center text-sm text-gray-400">
            Click a course card below to add it here
          </p>
        )
        : (
          <ul className="mt-3 flex max-h-32 flex-wrap gap-2 overflow-auto">
            {selected.map(id => (
              <li
                key={`selected-${id}`}
                className="flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 py-1 pl-3 pr-1 text-sm text-gray-800"
              >
                <span className="font-semibold text-indigo-600">{courses[id].term} CS {courses[id].number}</span>
                <span className="max-w-56 truncate">{courses[id].title}</span>
                <button
                  type="button"
                  aria-label={`Remove CS ${courses[id].number}`}
                  onClick={() => toggleSelected(id)}
                  className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-indigo-400 transition-colors hover:bg-indigo-200 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
    </section>
  );
};

export default SelectedCourses;
