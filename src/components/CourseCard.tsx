interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => (
  <p>{course.term} CS {course.number}: {course.title}</p>
);

export default CourseCard;