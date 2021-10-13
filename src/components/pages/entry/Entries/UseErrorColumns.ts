export default function UseErrorColumns() {
  const errorColumns = [
    {
      title: 'Hoja',
      dataIndex: 'sheet',
    },
    {
      title: 'Columna',
      dataIndex: 'element',
    },
    {
      title: 'Fila del error',
      dataIndex: 'position',
    },
    {
      title: 'Tipo de error',
      dataIndex: 'typeOfError',
    },
  ];

  return { errorColumns };
}
