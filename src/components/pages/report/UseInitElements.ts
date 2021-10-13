import { Ref } from 'vue';
import { Dictionary as DictionaryModel } from '@/graphql/modules/dictionary/model';
import { DictionaryEntriesDescriptorsAsString } from '@/models/Dictionary';
import { Element } from '@/models/Element';
import { store } from '@/store/store';
export default function UseInitElements(
  dictionaries: Ref<DictionaryEntriesDescriptorsAsString[]>,
  elements: Ref<Element[]>
) {
  const initElement = async () => {
    store.layout.isLoading = true;
    store.layout.loadingTip = 'Cargando elementos';
    const { data } = await DictionaryModel.getAllDictionaries();
    dictionaries.value = data.getAllDictionaries;
    for (let indexD = 0; indexD < dictionaries.value.length; indexD++) {
      const d = dictionaries.value[indexD];
      for (let indexE = 0; indexE < d.entries.length; indexE++) {
        const e = d.entries[indexE];
        for (
          let indexElement = 0;
          indexElement < e.elements.length;
          indexElement++
        ) {
          const element = e.elements[indexElement];
          if (element.clasification.clasification === 'UF') {
            elements.value.push(element);
          }
        }
      }
    }
    store.layout.isLoading = false;
    store.layout.loadingTip = '';
  };
  return { initElement };
}
