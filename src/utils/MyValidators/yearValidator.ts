const EMPTY_YEAR = 'Por favor inserte el año';
const ANNO_GREATER_THAN_ZERO = 'El año debe ser mayor que cero';
const ANNO_MUST_BE_INTERGER = 'Escriba solo números';
const GREATER_THAN = 'Debe ser mayor que';
const LOWER_THAN = 'Debe ser menor que';

export default async function validateYear(
  value: number,
  max?: number,
  min?: number
) {
  if (!value) {
    return Promise.reject(EMPTY_YEAR);
  }
  if (value <= 0) {
    return Promise.reject(ANNO_GREATER_THAN_ZERO);
  }
  if (!Number.isInteger(value)) {
    return Promise.reject(ANNO_MUST_BE_INTERGER);
  } else {
    if (value > new Date().getFullYear()) {
      return Promise.reject(`${LOWER_THAN} el año actual`);
    }
    if (max != undefined && min != undefined) {
      if (value > max) {
        return Promise.reject(`${LOWER_THAN} ${max}`);
      }
      if (value < min) {
        return Promise.reject(`${GREATER_THAN} ${min}`);
      }
      return Promise.resolve();
    }
    if (max != undefined) {
      if (value > max) {
        return Promise.reject(`${LOWER_THAN} ${max}`);
      }
      return Promise.resolve();
    }
    if (min != undefined) {
      if (value < min) {
        return Promise.reject(`${GREATER_THAN} ${min}`);
      }
      return Promise.resolve();
    }
  }
}
