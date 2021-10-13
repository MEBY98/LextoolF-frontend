import { RuleObject } from 'ant-design-vue/lib/form/interface';
import { store } from '@/store/store';
import { DictionaryInfoStore } from '@/store/modules/dictionaryInfo';
import { ref } from 'vue';

const EMPTY_DICTIONARY = 'Por favor seleccione el diccionario';
const DICTIONARY_OUT_OF_PERIOD = 'Diccionario fuera del periodo';
const EMPTY_LETTERS = 'Por favor seleccione las letras';

export function validateDictionaryYearByID(
  id: string,
  initYear: number,
  finalYear: number
): boolean {
  let found = false;
  let validYear = false;
  for (
    let i = 0;
    i < (store.dictionariesInfo as DictionaryInfoStore[]).length && !found;
    i++
  ) {
    const sdi = (store.dictionariesInfo as DictionaryInfoStore[])[i];
    if (sdi.id === id) {
      found = true;
      if (
        sdi.annoOfPublication >= initYear &&
        sdi.annoOfPublication <= finalYear
      ) {
        validYear = true;
      }
    }
  }
  return validYear;
}
export function validateDictionaryYear(
  year: number,
  initYear: number,
  finalYear: number
): boolean {
  let outOfPeriod = false;
  if (year < initYear || year > finalYear) {
    outOfPeriod = true;
  }
  return outOfPeriod;
}

export default function UseDictionaryRules(initYear: any, finalYear: any) {
  const validateDictionary = async (rule: RuleObject, value: string) => {
    if (!value) {
      return Promise.reject(EMPTY_DICTIONARY);
    }
    if (!validateDictionaryYearByID(value, initYear, finalYear)) {
      return Promise.reject(DICTIONARY_OUT_OF_PERIOD);
    }
    return Promise.resolve();
  };
  const validateLetters = async (rule: RuleObject, value: string[]) => {
    if (value.length === 0) {
      return Promise.reject(EMPTY_LETTERS);
    }
    return Promise.resolve();
  };
  const rules = ref({
    dictionaryInfo: [
      {
        required: true,
        trigger: ['change', 'blur'],
        validator: validateDictionary,
      },
    ],
    letters: [
      {
        required: true,
        trigger: ['change', 'blur'],
        validator: validateLetters,
      },
    ],
  });
  return { rules };
}
