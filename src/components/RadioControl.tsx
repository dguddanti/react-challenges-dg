interface RadioControlProps<T extends string> {
  name: string;
  options: readonly T[];
  selected: T;
  setSelected: (option: T) => void;
}

const RadioControl = <T extends string>({ name, options, selected, setSelected }: RadioControlProps<T>) => (
  <div className="inline-flex gap-1 rounded-full bg-gray-100 p-1" role="radiogroup">
    {options.map(option => (
      <div key={option}>
        <input
          type="radio"
          name={name}
          id={`${name}-${option}`}
          value={option}
          className="peer sr-only"
          checked={option === selected}
          onChange={() => setSelected(option)}
        />
        <label
          htmlFor={`${name}-${option}`}
          className="block cursor-pointer rounded-full px-5 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 peer-checked:bg-white peer-checked:text-indigo-600 peer-checked:shadow peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-400"
        >
          {option}
        </label>
      </div>
    ))}
  </div>
);

export default RadioControl;
