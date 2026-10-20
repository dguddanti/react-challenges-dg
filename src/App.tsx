import { useState } from 'react';
import { useJsonQuery } from './utilities/fetch';
import TermSelector from './components/TermSelector';
import CourseList from './components/CourseList';
import type { Schedule, Term } from './types';

const URL = 'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php';

const App = () => {
  const [selectedTerm, setSelectedTerm] = useState<Term>('Fall');
  const [json, isLoading, error] = useJsonQuery(URL);

  if (isLoading) return <p className="p-8 text-center text-gray-500">Loading course data...</p>;
  if (error) return <p className="p-8 text-center text-red-600">Error loading course data: {`${error}`}</p>;
  if (!json) return <h1 className="p-8 text-center text-xl">No course data found</h1>;

  const schedule = json as Schedule;

  return (
    <main className="min-h-screen bg-gray-50 pt-4">
      <h1 className="px-6 text-3xl font-bold text-gray-900">{schedule.title}</h1>
      <div className="mt-3 px-6">
        <TermSelector selected={selectedTerm} setSelected={setSelectedTerm} />
      </div>
      <CourseList courses={schedule.courses} selectedTerm={selectedTerm} />
    </main>
  );
};

export default App;
