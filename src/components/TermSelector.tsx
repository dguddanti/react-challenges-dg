import RadioControl from './RadioControl';
import { TERMS } from '../types';
import type { Term } from '../types';

interface TermSelectorProps {
  selected: Term;
  setSelected: (term: Term) => void;
}

const TermSelector = ({ selected, setSelected }: TermSelectorProps) => (
  <RadioControl name="term" options={TERMS} selected={selected} setSelected={setSelected} />
);

export default TermSelector;
