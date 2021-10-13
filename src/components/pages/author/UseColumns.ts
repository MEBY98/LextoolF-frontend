export default function UseColumns() {
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
    },
    {
      title: 'Siglas',
      dataIndex: 'siglas',
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
