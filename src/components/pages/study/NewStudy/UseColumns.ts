import { h } from 'vue';

export default function UseColumns() {
  const columns = [
    {
      title: 'Siglas del Diccionario',
      dataIndex: 'siglas',
      width: 200,
    },
    {
      title: 'Siglas del autor(es)',
      dataIndex: 'author',
      width: 350,
      customRender: ({ text }) => {
        let result = [];
        text.forEach((element) => {
          result.push(element.siglas);
          result.push(', ');
        });
        return h('a', { href: 'javascript:;' }, result);
      },
    },
    {
      title: 'Año',
      dataIndex: 'annoOfPublication',
      width: 100,
    },
    {
      title: 'Operacion',
      dataIndex: 'operation',
      width: 150,
      slots: { customRender: 'operation' },
    },
  ];

  return {
    columns,
  };
}
