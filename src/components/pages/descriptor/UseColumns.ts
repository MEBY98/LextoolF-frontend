export default function UseColumns() {
  const columns = [
    {
      title: 'Descripción',
      dataIndex: 'description',
      width: 200,
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
