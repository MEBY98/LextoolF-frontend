import { h } from 'vue';

export default function UseUbicationReportByUFCols() {
  const columns = [
    {
      title: 'Letra',
      dataIndex: 'letter',
    },
    {
      title: 'UF',
      customRender: ({ text }) => {
        console.log('text', text);
        return h('span', { innerHTML: text.UF });
      },
    },
  ];
  return { columns };
}
