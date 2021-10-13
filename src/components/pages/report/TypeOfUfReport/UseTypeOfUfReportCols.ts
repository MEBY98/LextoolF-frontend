export default function UseTypeOfUfReportColumns() {
  const columns = [
    {
      title: 'Tipo de UF',
      dataIndex: 'descriptor.description',
    },
    {
      title: 'Cantidad',
      dataIndex: 'quanty',
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
