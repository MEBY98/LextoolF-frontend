export const EMAIL_VALID = 'El correo electrónico no es válido';
export const EMAIL_REQUIRED = 'El correo electrónico es requerido';
export const EMAIL_EXISTS =
  'Ese correo electrónico ya está registrado. Intente con otro';

export const USERNAME_REQUIRED = 'El nombre de usuario es requerido';
export const USERNAME_EXISTS = 'Ese nombre de usuario ya está registrado';

export const PASSWORD_LENGTH = (maxLength) =>
  `La contraseña debe tener al menos ${maxLength} caracteres`;
export const PASSWORD_REQUIRED = 'La contraseña no puede estar vacía';
export const PASSWORDS_EQUALS = 'Las contraseñas no coinciden';

export const PASSWORD_ONE_UPPER =
  'La contraseña debe tener al menos una mayúscula';
export const PASSWORD_ONE_LOWER =
  'La contraseña debe tener al menos una minúscula';

export const VALUE_REQUIRED = 'Este campo es requerido';
export const VALUE_INTEGER = 'Este campo debe ser un número';

export const ONE_UPPER = 'Este campo es debe tener al menos una mayúscula';
export const ONE_LOWER = 'Este campo debe tener al menos una minúscula';

export const MAX_LENGTH = (maxLength) =>
  `Este campo no puede tener más de ${maxLength} caracteres`;
export const MIN_LENGTH = (minLength) =>
  `Este campo no puede tener menos de ${minLength} caracteres`;
export const LENGTH = (length) => `Este campo debe tener ${length} caracteres`;
export const MIN_VALUE = (value) => `El valor mínimo es ${value}`;

export const TextMap = {
  required: VALUE_REQUIRED,
  integer: VALUE_INTEGER,
  sameAsPassword: PASSWORDS_EQUALS,
  passwordOneUpper: PASSWORD_ONE_UPPER,
  passwordOneLower: PASSWORD_ONE_LOWER,
  oneUpper: ONE_UPPER,
  oneLower: ONE_LOWER,
};

export const getTextValidation = (validator, params) => {
  if (validator == 'maxLength') {
    return MAX_LENGTH(params.max);
  } else if (validator == 'minLength') {
    return MIN_LENGTH(params.length);
  } else if (validator == 'email') {
    return EMAIL_VALID;
  } else if (validator == 'minValue') {
    return MIN_VALUE(params.min);
  }
  return TextMap[validator]
    ? TextMap[validator]
    : 'Ingrese un valor válido para este campo';
};
