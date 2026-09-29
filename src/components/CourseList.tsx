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
  <div>
    {Object.entries(courses).map(([id, course]) => (
      <CourseCard key={id} course={course} />
    ))}
  </div>
);

export default CourseList;