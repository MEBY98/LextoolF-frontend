export default function UseColumns() {
  const columns = [
    {
      title: 'Clasificación',
      dataIndex: 'clasification',
    },
    {
      title: 'Operación',
      dataIndex: 'operation',
      slots: { customRender: 'operation' },
    },
  ];
  return { columns };
}
