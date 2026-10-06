import CourseCard from './CourseCard';

interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

interface CourseListProps {
  courses: Record<string, Course>;
}

const CourseList = ({ courses }: CourseListProps) => (
  <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 p-4">
    {Object.entries(courses).map(([id, course]) => (
      <CourseCard key={id} course={course} />
    ))}
  </div>
);

export default CourseList;