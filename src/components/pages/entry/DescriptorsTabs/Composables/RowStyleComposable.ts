export default function useRowStyle() {
  const isPair = (number) => {
    return !(number % 2);
  };
  const rowStyle = {
    background: '#e9ecef',
  };
  return {
    isPair,
    rowStyle,
  };
}
