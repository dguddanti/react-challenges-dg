import CourseCard from './CourseCard';
import { useSelection } from '../contexts/SelectionContext';
import { conflictsWithAny } from '../utilities/conflicts';
import type { Course, Term } from '../types';

interface CourseListProps {
  courses: Record<string, Course>;
  selectedTerm: Term;
}

const CourseList = ({ courses, selectedTerm }: CourseListProps) => {
  const { selected } = useSelection();
  const termCourses = Object.entries(courses).filter(([, course]) => course.term === selectedTerm);
  const selectedCourses = selected.map(id => courses[id]);

  return (
    <div className="grid w-full grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))] gap-5 p-6">
      {termCourses.map(([id, course]) => (
        <CourseCard
          key={id}
          id={id}
          course={course}
          isConflicting={!selected.includes(id) && conflictsWithAny(course, selectedCourses)}
        />
      ))}
    </div>
  );
};

export default CourseList;
