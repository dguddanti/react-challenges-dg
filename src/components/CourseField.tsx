import type { Course } from '../types';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

interface CourseFieldProps {
  name: keyof Course;
  label: string;
  errors: FieldErrors<Course>;
  register: UseFormRegister<Course>;
  placeholder?: string;
  className?: string;
}

const CourseField = ({ name, label, errors, register, placeholder, className = '' }: CourseFieldProps) => {
  const error = errors[name];
  const errorId = `${name}-error`;

  return (
    <label className={`block ${className}`}>
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</span>
      <input
        type="text"
        {...register(name)}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`mt-1.5 w-full rounded-lg border px-3 py-2 text-base text-gray-900 shadow-sm transition placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-300'
            : 'border-gray-200 bg-white hover:border-gray-300 focus:border-indigo-500 focus:ring-indigo-400'
        }`}
      />
      {error && (
        <span id={errorId} className="mt-1 block text-sm text-red-600">
          {label} {error.message}
        </span>
      )}
    </label>
  );
};

export default CourseField;
