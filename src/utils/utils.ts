export const pluralize = (str: string) => {
  return str.endsWith('s') ? str : str + 's';
};

export const trim = (str: string) => {
  return str?.trim();
};

export const trimOne = (object: object, path: string) => {
  if (object[path]) {
    object[path] = object[path].trim();
  }
  return object;
};

export const trimM = (object: object, paths: string[]) => {
  paths.forEach((path) => {
    if (object[path]) {
      object[path] = object[path].trim();
    }
  });
  return object;
};

export const trimAll = (object: object) => {
  const keys = Object.keys(object);
  keys.forEach((key) => (object[key] = object[key].trim()));
  return object;
};

export const removeAccents = (str: string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const clone = (objectToClone) => Object.assign({}, objectToClone);

export function pickClass<
  T extends { new (...args: any[]): any; prototype: any }
>(
  ctor: T
): <TKeys extends keyof InstanceType<T>>(
  ...keys: TKeys[]
) => ReplaceInstanceType<T, Pick<InstanceType<T>, TKeys>> &
  { [P in keyof Omit<T, 'prototype'>]: T[P] } {
  return function (keys: string | symbol | number) {
    return ctor as any;
  };
}

type ArgumentTypes<T> = T extends new (...args: infer U) => any ? U : never;
type ReplaceInstanceType<T, TNewInstance> = T extends new (
  ...args: any[]
) => any
  ? new (...a: ArgumentTypes<T>) => TNewInstance
  : never;

export function validateLetters(e) {
  let key = window.event ? e.which : e.keyCode;
  if (
    (key > 64 && key < 91) || //letras mayusculas
    (key > 96 && key < 123) || //letras minusculas
    key == 45 || //retroceso
    key == 32 || //espacio
    key == 241 || //ñ
    key == 209 || //Ñ
    key == 225 || //á
    key == 233 || //é
    key == 237 || //í
    key == 243 || //ó
    key == 250 || //ú
    key == 193 || //Á
    key == 201 || //É
    key == 205 || //Í
    key == 211 || //Ó
    key == 218 //Ú
  ) {
    return true;
  }

  e.preventDefault();
  return false;
}

export function validateNumbers(e) {
  let key = window.event ? e.which : e.keyCode;
  if (key < 48 || key > 57) {
    e.preventDefault();
    return false;
  }
  return true;
}

export function hasUpper(str: string) {
  if (!str || !str.length) {
    return false;
  }
  let valid = false;

  for (let i = 0; i < str.length && !valid; i++) {
    if (/^[A-ZÑÁÉÍÓÚ]*$/.test(str[i])) {
      valid = true;
    }
  }
  return valid;
}

export function hasLower(str: string) {
  if (!str || !str.length) {
    return false;
  }
  let valid = false;

  for (let i = 0; i < str.length && !valid; i++) {
    if (/^[a-zñáéíóú]*$/.test(str[i])) {
      valid = true;
    }
  }
  return valid;
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
