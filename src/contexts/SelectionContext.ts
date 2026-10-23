import { createContext, use } from 'react';

export interface Selection {
  selected: string[];
  toggleSelected: (id: string) => void;
}

export const SelectionContext = createContext<Selection | null>(null);

export const useSelection = () => {
  const selection = use(SelectionContext);
  if (!selection) throw new Error('useSelection must be used within a SelectionProvider');
  return selection;
};
