export default function UseFetchAttributeFromObject() {
  const fetchAttributeFromObject = (obj: any, prop: string) => {
    if (typeof obj === 'undefined') {
      return false;
    }
    const dotIndex = prop.indexOf('.');
    if (dotIndex > -1) {
      return fetchAttributeFromObject(
        obj[prop.substring(0, dotIndex)],
        prop.substr(dotIndex + 1)
      );
    }
    return obj[prop];
  };
  return { fetchAttributeFromObject };
}
