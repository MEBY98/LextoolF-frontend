import { Element } from '@/models/Element';

export function getLemma(elements: Element[]): string {
  let found = false;
  let result = '';
  for (let i = 0; i < elements.length && !found; i++) {
    const e = elements[i];
    if (e.ubication.ubication === 'lema') {
      result = e.element;
      found = true;
    }
  }
  if (found) {
    return result;
  } else {
    return elements[0].element;
  }
}
