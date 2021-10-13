import { h } from 'vue';
import { Entry } from '@/models/Entry';
import TooltipIcon from '../../../shared/TooltipIcon.vue';
import {
  validateUseInformation,
  validateOrderLemma,
  validateGeneralDescription,
  validateContornoDefinition,
  validateExample,
  validateParadigmaticInfo,
} from './ColumnsEntryUtils/ValidateColumnsEntries';
import { getLemma } from './ColumnsEntryUtils/getLemma';
import { getStyleIcon } from './ColumnsEntryUtils/getStyleIcon';
import { getTooltipTitle } from './ColumnsEntryUtils/getTooltipTitle';

export default function UseColumns() {
  const filters = [
    { text: 'No aplica', value: 'NoApply' },
    { text: 'No Descrito', value: 'NotDescribe' },
    { text: 'Descrito', value: 'Describe' },
  ];
  const columns = [
    {
      title: 'Lema',
      dataIndex: 'elements',
      customRender: ({ text }) => {
        const lemma = getLemma(text);
        return h('span', { innerHTML: lemma });
      },
      sorter: (a, b) => {
        const lemmaA = getLemma(a.elements);
        const lemmaB = getLemma(b.elements);
        return lemmaA.localeCompare(lemmaB);
      },
      width: 100,
    },
    {
      title: 'Descripción general',
      dataIndex: 'elements',
      key: 'GN',
      customRender: ({ text }) => {
        const icon = validateGeneralDescription(text);
        console.log('icon', icon);
        return h(TooltipIcon, {
          icon: icon,
          styleIcon: getStyleIcon(icon),
          title: getTooltipTitle(icon),
        });
      },
      filterMultiple: true,
      filters: filters,
      onFilter: (value: string, record: Entry) => {
        return validateGeneralDescription(record.elements) === value;
      },
    },
    {
      title: 'Ordenación y lematización',
      dataIndex: 'elements',
      key: 'OL',
      customRender: ({ text }) => {
        const icon = validateOrderLemma(text);
        return h(TooltipIcon, {
          icon: icon,
          styleIcon: getStyleIcon(icon),
          title: getTooltipTitle(icon),
        });
      },
      filterMultiple: true,
      filters: filters,
      onFilter: (value: string, record: Entry) => {
        return validateOrderLemma(record.elements) === value;
      },
    },
    {
      title: 'Información de uso',
      dataIndex: 'elements',
      key: 'UI',
      customRender: ({ text }) => {
        const icon = validateUseInformation(text);
        return h(TooltipIcon, {
          icon: icon,
          styleIcon: getStyleIcon(icon),
          title: getTooltipTitle(icon),
        });
      },
      filterMultiple: true,
      filters: filters,
      onFilter: (value: string, record: Entry) => {
        return validateUseInformation(record.elements) === value;
      },
    },
    {
      title: 'Definición de la UF',
      dataIndex: 'elements',
      key: 'CD',
      customRender: ({ text }) => {
        const icon = validateContornoDefinition(text);
        return h(TooltipIcon, {
          icon: icon,
          styleIcon: getStyleIcon(icon),
          title: getTooltipTitle(icon),
        });
      },
      filterMultiple: true,
      filters: filters,
      onFilter: (value: string, record: Entry) => {
        return validateContornoDefinition(record.elements) === value;
      },
    },
    {
      title: 'Ejemplificación de la UF',
      dataIndex: 'elements',
      key: 'Ex',
      customRender: ({ text }) => {
        const icon = validateExample(text);
        return h(TooltipIcon, {
          icon: icon,
          styleIcon: getStyleIcon(icon),
          title: getTooltipTitle(icon),
        });
      },
      filterMultiple: true,
      filters: filters,
      onFilter: (value: string, record: Entry) => {
        return validateExample(record.elements) === value;
      },
    },
    {
      title: 'Información paradigmática',
      dataIndex: 'elements',
      key: 'IP',
      customRender: ({ text }) => {
        const icon = validateParadigmaticInfo(text);
        return h(TooltipIcon, {
          icon: icon,
          styleIcon: getStyleIcon(icon),
          title: getTooltipTitle(icon),
        });
      },
      filterMultiple: true,
      filters: filters,
      onFilter: (value: string, record: Entry) => {
        return validateParadigmaticInfo(record.elements) === value;
      },
    },
    {
      title: 'Operación',
      key: 'operation',
      width: 100,
      slots: { customRender: 'operation' },
    },
  ];

  return { columns };
}
