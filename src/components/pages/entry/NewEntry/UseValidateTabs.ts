import { computed, Ref } from 'vue';
import { store } from '@/store/store';
import { EntryToEdit } from '@/models/Entry';

export default function UseValidateTabs(
  elementsClasificationsIndexs: Ref<number[]>,
  elementsUbications: Ref<string[]>,
  entry: Ref<EntryToEdit>
) {
  const hasUF = computed(() => {
    let result = false;
    for (
      let i = 0;
      i < elementsClasificationsIndexs.value.length && !result;
      i++
    ) {
      const index = elementsClasificationsIndexs.value[i];
      if (store.clasifications[index].clasification === 'UF') result = true;
    }
    return result;
  });
  const hasLemmaSublemmaUF = computed(() => {
    let result = false;
    for (let i = 0; i < entry.value.elements.length && !result; i++) {
      if (
        (elementsUbications.value[i] === 'lema' ||
          elementsUbications.value[i] === 'sublema') &&
        store.clasifications[elementsClasificationsIndexs.value[i]]
          .clasification === 'UF'
      ) {
        result = true;
      }
    }
    return result;
  });
  const hasAntSinUF = computed(() => {
    let result = false;
    for (let i = 0; i < entry.value.elements.length && !result; i++) {
      if (
        (elementsUbications.value[i] === 'antónimo' ||
          elementsUbications.value[i] === 'sinónimo') &&
        store.clasifications[elementsClasificationsIndexs.value[i]]
          .clasification === 'UF'
      ) {
        result = true;
      }
    }
    return result;
  });
  const hasLemma: Ref<boolean> = computed(() => {
    let result = false;
    for (let i = 0; i < entry.value.elements.length && !result; i++) {
      if (elementsUbications.value[i] === 'lema') {
        result = true;
      }
    }
    return result;
  });

  return {
    hasLemma,
    hasAntSinUF,
    hasLemmaSublemmaUF,
    hasUF,
  };
}
