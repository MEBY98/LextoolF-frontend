export default function UseColumns() {
  const columns = [
    {
      title: 'Ubicación',
      dataIndex: 'ubication',
    },
    {
      title: 'Operación',
      dataIndex: 'operation',
      slots: { customRender: 'operation' },
    },
  ];
  return { columns };
}
