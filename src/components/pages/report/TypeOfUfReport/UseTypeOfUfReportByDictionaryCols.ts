export default function UseTypeOfUfReportByDictionaryCols() {
  const columns = [
    {
      title: 'Diccionario',
      dataIndex: 'dictionary.dictionaryInfo.siglas',
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
