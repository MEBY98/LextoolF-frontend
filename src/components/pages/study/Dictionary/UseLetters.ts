export default function UseLetters() {
  const letters = [
    { title: 'A', key: 'A' },
    { title: 'B', key: 'B' },
    { title: 'C', key: 'C' },
    { title: 'CH', key: 'CH' },
    { title: 'D', key: 'D' },
    { title: 'E', key: 'E' },
    { title: 'F', key: 'F' },
    { title: 'G', key: 'G' },
    { title: 'H', key: 'H' },
    { title: 'I', key: 'I' },
    { title: 'J', key: 'J' },
    { title: 'K', key: 'K' },
    { title: 'L', key: 'L' },
    { title: 'Ll', key: 'Ll' },
    { title: 'M', key: 'M' },
    { title: 'N', key: 'N' },
    { title: 'Ñ', key: 'Ñ' },
    { title: 'O', key: 'O' },
    { title: 'P', key: 'P' },
    { title: 'Q', key: 'Q' },
    { title: 'R', key: 'R' },
    { title: 'S', key: 'S' },
    { title: 'T', key: 'T' },
    { title: 'U', key: 'U' },
    { title: 'V', key: 'V' },
    { title: 'W', key: 'W' },
    { title: 'X', key: 'X' },
    { title: 'Y', key: 'Y' },
    { title: 'Z', key: 'Z' },
  ];
  const transferLocale = {
    itemUnit: '',
    itemsUnit: '',
    notFoundContent: 'No hay letras',
    searchPlaceholder: 'Buscar Letra',
  };
  const filterOptionLettersTransfer = (inputValue, option) => {
    return option.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
  };
  return { letters, transferLocale, filterOptionLettersTransfer };
}
