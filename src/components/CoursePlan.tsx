import { useState } from 'react';
import Modal from './Modal';
import { useSelection } from '../contexts/SelectionContext';
import type { Course } from '../types';

interface CoursePlanProps {
  courses: Record<string, Course>;
}

const CoursePlan = ({ courses }: CoursePlanProps) => {
  const { selected } = useSelection();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="cursor-pointer rounded-full bg-indigo-600 px-5 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2"
      >
        Course plan
      </button>
      <Modal title="Course plan" isOpen={isOpen} close={() => setIsOpen(false)}>
        {selected.length === 0
          ? (
            <p className="rounded-xl border-2 border-dashed border-gray-200 px-4 py-5 text-center text-sm text-gray-500">
              No courses selected yet. Close this window and click a course card to add it to your plan.
            </p>
          )
          : (
            <ul className="divide-y divide-gray-100">
              {selected.map(id => (
                <li key={`plan-${id}`} className="py-3">
                  <div className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                    {courses[id].term} · CS {courses[id].number}
                  </div>
                  <div className="mt-0.5 font-medium text-gray-800">{courses[id].title}</div>
                  <div className="text-sm text-gray-500">{courses[id].meets}</div>
                </li>
              ))}
            </ul>
          )}
      </Modal>
    </>
  );
};

export default CoursePlan;
