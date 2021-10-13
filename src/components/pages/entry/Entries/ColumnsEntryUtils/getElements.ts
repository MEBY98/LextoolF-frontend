import { Entry } from '@/models/Entry';

export function getElements(item: Entry, exclude?: string): string[] {
  const result: string[] = [];
  if (exclude) {
    for (let i = 0; i < item.elements.length; i++) {
      const e = item.elements[i];
      if (e.ubication.ubication !== exclude) {
        result.push(e.element);
      }
    }
  } else {
    item.elements.forEach((e) => {
      result.push(e.element);
    });
  }
  return result;
}
