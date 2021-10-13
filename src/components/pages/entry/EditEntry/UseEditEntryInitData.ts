import { Ref } from 'vue';
import { store } from '@/store/store';
import { EntryToEdit } from '@/models/Entry';
import { Entry as EntryModel } from '@/graphql/modules/entry/model';
import { Image } from '../NewEntry/Image.interface';

export default function UseEditEntryInitData(
  id: string,
  selectedEntryCopy: Ref<EntryToEdit>,
  elementsUbicationsCopy: Ref<string[]>,
  elementsClasificationsIndexsCopy: Ref<number[]>,
  images: Ref<Image[]>
) {
  const editEntryInitData = async () => {
    console.log('id', id);
    const selectedEntryCopyData = await EntryModel.getEntryByID(id);
    selectedEntryCopy.value = selectedEntryCopyData.data.getEntryByID;
    const elementsUbicationsCopyData = await EntryModel.getEntryUbicationsByID(
      id
    );
    elementsUbicationsCopy.value =
      elementsUbicationsCopyData.data.getEntryUbicationsByID;
    selectedEntryCopy.value.elements.forEach((element) => {
      let found = false;
      for (
        let scIndex = 0;
        scIndex < store.clasifications.length && !found;
        scIndex++
      ) {
        const sC = store.clasifications[scIndex];
        if (sC.id.toString() === element.clasification.toString()) {
          elementsClasificationsIndexsCopy.value.push(scIndex);
          found = true;
        }
      }
    });
    selectedEntryCopy.value.context.forEach((c) => {
      images.value.push({ file: null, base64: null, context: c });
    });
  };

  return {
    editEntryInitData,
  };
}
