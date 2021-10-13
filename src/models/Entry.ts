import { Element, NewElement, ElementToEdit } from './Element';

export class Entry {
  id: string;
  letter: string;
  context: string[];
  elements: Element[];
}

export class NewEntry {
  letter: string;
  context: string[];
  elements: NewElement[];
}

export class EntryToEdit {
  id?: string;
  letter: string;
  context: string[];
  elements: ElementToEdit[];
}
