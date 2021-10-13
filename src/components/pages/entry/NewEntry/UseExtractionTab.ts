import { EntryToEdit } from '@/models/Entry';
import { Ref } from 'vue';
import { Ubication } from '@/models/Ubication';
import { store } from '@/store/store';

export default function UseExtractionTab(
  newEntry: Ref<EntryToEdit>,
  elementsUbications: Ref<string[]>,
  elementsClasificationsIndexs: Ref<number[]>
) {
  const changeElement = (update) => {
    if (!(update.element instanceof InputEvent)) {
      newEntry.value.elements[update.index].element = update.element;
    }
  };
  const addElement = (ubication: Ubication) => {
    newEntry.value.elements.push({
      element: '',
      clasification: store.clasifications[0].id,
      ubication: ubication.id,
      generalDescription: {
        conceptualDomain: store.NoDescribeDescriptor.id,
        structure: store.NoDescribeDescriptor.id,
        tipo: store.NoDescribeDescriptor.id,
      },
      contornoDefinition: [
        {
          definition: '',
          typeOfDefinition: store.NoDescribeDescriptor.id,
          argumentalSchema: store.NoDescribeDescriptor.id,
          relationship: [store.NoDescribeDescriptor.id],
          contorno: '',
          typeOfContorno: [store.NoDescribeDescriptor.id],
          positionOfContorno: [store.NoDescribeDescriptor.id],
          formatOfContorno: [store.NoDescribeDescriptor.id],
        },
      ],
      example: {
        anotation: '',
        formatOfExample: [store.NoDescribeDescriptor.id],
        functionOfExample: [store.NoDescribeDescriptor.id],
        typeOfExample: [store.NoDescribeDescriptor.id],
      },
      orderLemma: {
        criteriaOfLematization: [store.NoDescribeDescriptor.id],
        formalStructure: [store.NoDescribeDescriptor.id],
        formatOfVariant: [store.NoDescribeDescriptor.id],
        order: [store.NoDescribeDescriptor.id],
        tipographyOfVariant: [store.NoDescribeDescriptor.id],
        typeOfVariant: [store.NoDescribeDescriptor.id],
        ubicationOfContorno: store.NoDescribeDescriptor.id,
      },
      paradigmaticInfo: {
        formOfPresentation: [store.NoDescribeDescriptor.id],
        position: [store.NoDescribeDescriptor.id],
        typeOfRelationship: store.NoDescribeDescriptor.id,
      },
      useInformation: [
        {
          anotation: '',
          position: store.NoDescribeDescriptor.id,
          format: store.NoDescribeDescriptor.id,
          tipography: store.NoDescribeDescriptor.id,
        },
        {
          anotation: '',
          position: store.NoDescribeDescriptor.id,
          format: store.NoDescribeDescriptor.id,
          tipography: store.NoDescribeDescriptor.id,
        },
        {
          anotation: '',
          position: store.NoDescribeDescriptor.id,
          format: store.NoDescribeDescriptor.id,
          tipography: store.NoDescribeDescriptor.id,
        },
        {
          anotation: '',
          position: store.NoDescribeDescriptor.id,
          format: store.NoDescribeDescriptor.id,
          tipography: store.NoDescribeDescriptor.id,
        },
        {
          anotation: '',
          position: store.NoDescribeDescriptor.id,
          format: store.NoDescribeDescriptor.id,
          tipography: store.NoDescribeDescriptor.id,
        },
        {
          anotation: '',
          position: store.NoDescribeDescriptor.id,
          format: store.NoDescribeDescriptor.id,
          tipography: store.NoDescribeDescriptor.id,
        },
        {
          anotation: '',
          position: store.NoDescribeDescriptor.id,
          format: store.NoDescribeDescriptor.id,
          tipography: store.NoDescribeDescriptor.id,
        },
        {
          anotation: '',
          position: store.NoDescribeDescriptor.id,
          format: store.NoDescribeDescriptor.id,
          tipography: store.NoDescribeDescriptor.id,
        },
        {
          anotation: '',
          position: store.NoDescribeDescriptor.id,
          format: store.NoDescribeDescriptor.id,
          tipography: store.NoDescribeDescriptor.id,
        },
        {
          anotation: '',
          position: store.NoDescribeDescriptor.id,
          format: store.NoDescribeDescriptor.id,
          tipography: store.NoDescribeDescriptor.id,
        },
      ],
    });
    elementsUbications.value.push(ubication.ubication);
    elementsClasificationsIndexs.value.push(0);
  };
  const clasificateElement = (update) => {
    newEntry.value.elements[update.indexElement].clasification =
      store.clasifications[update.index].id;
    elementsClasificationsIndexs.value[update.indexElement] = update.index;
    console.log('indexs', elementsClasificationsIndexs.value);
  };
  const removeElement = (index) => {
    newEntry.value.elements.splice(index, 1);
    elementsUbications.value.splice(index, 1);
    elementsClasificationsIndexs.value.splice(index, 1);
  };
  return { changeElement, addElement, clasificateElement, removeElement };
}
