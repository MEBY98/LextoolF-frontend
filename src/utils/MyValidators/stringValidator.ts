const EMPTY_STRING = 'No puede ser vacio';
const MAX_LENGTH = 'Tamaño máximo';
const MIN_LENGTH = 'Tamaño mínimo';
const ONLY_LETTERS = 'Solo letras';

export default async function validateString(
  value: string,
  onlyLetters?: boolean,
  maxLength?: number,
  minLength?: number
) {
  if (!value) {
    return Promise.reject(EMPTY_STRING);
  }
  if (onlyLetters) {
    if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(value)) {
      return Promise.reject(`${ONLY_LETTERS}`);
    }
    return Promise.resolve();
  }
  if (maxLength != undefined && minLength != undefined) {
    if (value.length > maxLength) {
      return Promise.reject(`${MAX_LENGTH} ${maxLength} caracteres`);
    }
    if (value.length < minLength) {
      return Promise.reject(`${MIN_LENGTH} ${minLength} caracteres`);
    }
    return Promise.resolve();
  }
  if (maxLength != undefined) {
    if (value.length > maxLength) {
      return Promise.reject(`${MAX_LENGTH} ${maxLength} caracteres`);
    }
    return Promise.resolve();
  }
  if (minLength != undefined) {
    if (value.length < minLength) {
      return Promise.reject(`${MIN_LENGTH} ${minLength} caracteres`);
    }
    return Promise.resolve();
  }
}
