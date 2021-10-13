export function getTooltipTitle(icon: string) {
  if (icon === 'NotDescribe') return 'No descrito';
  else if (icon === 'Describe') return 'Descrito';
  else return 'No aplica';
}
