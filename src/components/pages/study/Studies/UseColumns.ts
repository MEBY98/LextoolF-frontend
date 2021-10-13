import { h } from 'vue';

export default function UseColumns() {
  const columns = [
    {
      title: 'Periodo',
      dataIndex: 'initYear',
      customRender: ({ record }) => {
        const result = record.initYear + '-' + record.finalYear;
        return h('span', { href: 'javascript:;' }, result);
      },
      width: 200,
      sorter: (a, b) => {
        return a.initYear - b.initYear;
      },
    },
    {
      title: 'Nombre del estudio',
      dataIndex: 'name',
      sorter: (a, b) => {
        return a.name.localeCompare(b.name);
      },
    },
    {
      title: 'Estado',
      dataIndex: 'state',
      sorter: (a, b) => {
        return a.name.localeCompare(b.name);
      },
    },
    {
      title: 'Operación',
      key: 'operation',
      width: 200,
      slots: { customRender: 'operation' },
    },
  ];
  return { columns };
}
