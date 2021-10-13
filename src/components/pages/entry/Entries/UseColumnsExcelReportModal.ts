import { h } from 'vue';
import { getLemma } from './ColumnsEntryUtils/getLemma';
import { getElements } from './ColumnsEntryUtils/getElements';

export default function UseColumns() {
  const columns = [
    {
      title: 'Lema',
      dataIndex: 'elements',
      key: 'Lemma',
      customRender: ({ text }) => {
        const lemma = getLemma(text);
        return h('span', { innerHTML: lemma });
      },
      sorter: (a, b) => {
        const lemmaA = getLemma(a.elements);
        const lemmaB = getLemma(b.elements);
        return lemmaA.localeCompare(lemmaB);
      },
      width: 200,
    },
    {
      title: 'Elementos cargados',
      key: 'E',
      customRender: ({ text }) => {
        const elements = getElements(text, 'lema');
        return h('span', { innerHTML: elements });
      },
    },
    {
      title: 'Operación',
      key: 'operation',
      width: 150,
      slots: { customRender: 'operation' },
    },
  ];

  return { columns };
}
