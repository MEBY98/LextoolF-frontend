import { OcurrenceRecordStore } from './ocurrenceRecord';

export class EntryAStore {
  lemma: String;
  letter: String;
  context: String;
  UF: String;
  source: String;
  selected: Boolean;
  documentation: [OcurrenceRecordStore];
}
