import { h } from 'vue';

export default function UseColumns() {
  const columns = [
    {
      title: 'Nombre del diccionario',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: 'Siglas del diccionario',
      dataIndex: 'siglas',
      width: 150,
    },
    {
      title: 'Autores',
      dataIndex: 'author',
      width: 350,
      customRender: ({ text }) => {
        const result = [];
        text.forEach((element) => {
          result.push(element.name);
          result.push(', ');
        });
        return h('span', { href: 'javascript:;' }, result);
      },
    },
    {
      title: 'Año',
      dataIndex: 'annoOfPublication',
      width: 100,
    },
    {
      title: 'Operación',
      dataIndex: 'operation',
      width: 150,
      slots: { customRender: 'operation' },
    },
  ];
  return { columns };
}
