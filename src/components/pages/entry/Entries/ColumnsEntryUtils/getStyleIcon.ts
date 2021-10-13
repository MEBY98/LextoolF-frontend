import { getColor } from './getColor';

export function getStyleIcon(icon: string) {
  return {
    fontSize: '25px',
    color: getColor(icon),
    marginBottom: '5px',
    marginLeft: '10px',
  };
}
