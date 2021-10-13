import { Entry } from '@/models/Entry';

export default function UseGetEntriesByLetter() {
  const getEntriesByLetter = (allEntries: Entry[], letter: string) => {
    return allEntries.filter((entry) => entry.letter === letter);
  };
  return { getEntriesByLetter };
}
