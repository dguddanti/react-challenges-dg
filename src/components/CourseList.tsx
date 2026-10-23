import CourseCard from './CourseCard';
import type { Course, Term } from '../types';

interface CourseListProps {
  courses: Record<string, Course>;
  selectedTerm: Term;
}

const CourseList = ({ courses, selectedTerm }: CourseListProps) => {
  const selectedCourses = Object.entries(courses).filter(([, course]) => course.term === selectedTerm);

  return (
    <div className="grid w-full grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))] gap-5 p-6">
      {selectedCourses.map(([id, course]) => (
        <CourseCard key={id} id={id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;
