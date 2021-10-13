import { Element } from '@/models/Element';
import { store } from '@/store/store';

export function validateDescriptors(
  descriptors: any,
  value: string,
  props: string[]
) {
  let result = false;
  for (let propIndex = 0; propIndex < props.length; propIndex++) {
    const prop = props[propIndex];
    if (prop === 'anotation' || prop === 'contorno' || prop === 'definition') {
      if (descriptors[prop] !== '') {
        result = true;
      }
    } else {
      if (descriptors[prop] instanceof Array) {
        if (!descriptors[prop].includes(value)) {
          result = true;
        }
      } else {
        if (descriptors[prop] !== value) {
          result = true;
        }
      }
    }
  }
  return result;
}

export function validateGeneralDescription(elements: Element[]) {
  let result = 'NotDescribe';
  const props = ['conceptualDomain', 'structure', 'tipo'];
  const notApply = store.NoApplyDescriptor.id;
  const notDescribe = store.NoDescribeDescriptor.id;
  for (let i = 0; i < elements.length && result !== 'Describe'; i++) {
    const e = elements[i];
    if (validateDescriptors(e.generalDescription, notDescribe, props)) {
      if (validateDescriptors(e.generalDescription, notApply, props)) {
        console.log('notDescribe', notDescribe);
        console.log('notApply', notApply);
        console.log('e.generalDescription', e.generalDescription);
        result = 'Describe';
      } else {
        result = 'NoApply';
      }
    }
  }
  return result;
}
export function validateOrderLemma(elements: Element[]) {
  let result = 'NotDescribe';
  const props = [
    'criteriaOfLematization',
    'formalStructure',
    'formatOfVariant',
    'order',
    'tipographyOfVariant',
    'typeOfVariant',
    'ubicationOfContorno',
  ];
  const notApply = store.NoApplyDescriptor.id;
  const notDescribe = store.NoDescribeDescriptor.id;
  for (let i = 0; i < elements.length && result !== 'Describe'; i++) {
    const e = elements[i];
    if (validateDescriptors(e.orderLemma, notDescribe, props)) {
      if (validateDescriptors(e.orderLemma, notApply, props)) {
        result = 'Describe';
      } else {
        result = 'NoApply';
      }
    }
  }
  return result;
}
export function validateUseInformation(elements: Element[]) {
  let result = 'NotDescribe';
  const props = ['anotation', 'position', 'format', 'tipography'];
  const notApply = store.NoApplyDescriptor.id;
  const notDescribe = store.NoDescribeDescriptor.id;
  for (let i = 0; i < elements.length && result !== 'Describe'; i++) {
    const e = elements[i];
    for (let UIindex = 0; UIindex < e.useInformation.length; UIindex++) {
      const UI = e.useInformation[UIindex];
      if (validateDescriptors(UI, notDescribe, props)) {
        if (validateDescriptors(UI, notApply, props)) {
          result = 'Describe';
        } else {
          result = 'NoApply';
        }
      }
    }
  }
  return result;
}
export function validateContornoDefinition(elements: Element[]) {
  let result = 'NotDescribe';
  const props = [
    'definition',
    'typeOfDefinition',
    'argumentalSchema',
    'relationship',
    'contorno',
    'typeOfContorno',
    'positionOfContorno',
    'formatOfContorno',
  ];
  const notApply = store.NoApplyDescriptor.id;
  const notDescribe = store.NoDescribeDescriptor.id;
  for (let i = 0; i < elements.length && result !== 'Describe'; i++) {
    const e = elements[i];
    for (let indexCD = 0; indexCD < e.contornoDefinition.length; indexCD++) {
      const CD = e.contornoDefinition[indexCD];
      if (validateDescriptors(CD, notDescribe, props)) {
        if (validateDescriptors(CD, notApply, props)) {
          result = 'Describe';
        } else {
          result = 'NoApply';
        }
      }
    }
  }
  return result;
}
export function validateExample(elements: Element[]) {
  let result = 'NotDescribe';
  const props = [
    'anotation',
    'typeOfExample',
    'formatOfExample',
    'functionOfExample',
  ];
  const notApply = store.NoApplyDescriptor.id;
  const notDescribe = store.NoDescribeDescriptor.id;
  for (let i = 0; i < elements.length && result !== 'Describe'; i++) {
    const e = elements[i];
    if (validateDescriptors(e.example, notDescribe, props)) {
      if (validateDescriptors(e.example, notApply, props)) {
        result = 'Describe';
      } else {
        result = 'NoApply';
      }
    }
  }
  return result;
}
export function validateParadigmaticInfo(elements: Element[]) {
  let result = 'NotDescribe';
  const props = ['typeOfRelationship', 'formOfPresentation', 'position'];
  const notApply = store.NoApplyDescriptor.id;
  const notDescribe = store.NoDescribeDescriptor.id;
  for (let i = 0; i < elements.length && result !== 'Describe'; i++) {
    const e = elements[i];
    if (validateDescriptors(e.paradigmaticInfo, notDescribe, props)) {
      if (validateDescriptors(e.paradigmaticInfo, notApply, props)) {
        result = 'Describe';
      } else {
        result = 'NoApply';
      }
    }
  }
  return result;
}
