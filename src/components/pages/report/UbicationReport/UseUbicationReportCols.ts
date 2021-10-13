export default function UseUbicationReportCols() {
  const columns = [
    {
      title: 'Ubicación',
      dataIndex: 'ubication.ubication',
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
