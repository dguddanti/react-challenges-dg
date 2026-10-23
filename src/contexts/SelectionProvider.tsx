import { useState } from 'react';
import type { ReactNode } from 'react';
import { SelectionContext } from './SelectionContext';

const toggleList = <T,>(x: T, lst: T[]): T[] => (
  lst.includes(x) ? lst.filter(y => y !== x) : [...lst, x]
);

const SelectionProvider = ({ children }: { children: ReactNode }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelected = (id: string) => {
    setSelected(ids => toggleList(id, ids));
  };

  return (
    <SelectionContext value={{ selected, toggleSelected }}>
      {children}
    </SelectionContext>
  );
};

export default SelectionProvider;
