import { useJsonQuery } from './utilities/fetch';
import CourseList from './components/CourseList';

interface Course {
  term: string;
  number: string; 
  meets: string;
  title: string;
}

interface Schedule {
  title: string;
  courses: Record<string, Course>;
}

const URL = 'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php';

const App = () => {
  const [json, isLoading, error] = useJsonQuery(URL);

  if (isLoading) return <p>Loading course data...</p>;
  if (error) return <p>Error loading course data: {`${error}`}</p>;
  if (!json) return <h1>No course data found</h1>;

  const schedule = json as Schedule;

  return (
    <main>
      <h1>{schedule.title}</h1>
      <CourseList courses={schedule.courses} />
    </main>
  )
}
export default App;
