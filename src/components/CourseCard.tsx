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
  <div className="flex flex-col h-48 p-4 border border-gray-300 rounded-lg">
    <div className="font-bold text-base">
      {course.term} CS {course.number}
    </div>
    <div className="flex-grow text-sm text-gray-600 mt-2">
      {course.title}
    </div>
    <div className="border-t border-gray-200 pt-2 text-sm text-gray-500">
      {course.meets}
    </div>
  </div>
);

export default CourseCard;