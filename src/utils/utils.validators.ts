import { hasUpper, hasLower } from './utils';
import { FetchPolicy } from '@/graphql/apolloProvider';
import { withAsync } from '@vuelidate/validators/src/utils/common.js';
import { debounceAsyncValidator } from './utilsdebounce.js';

const emailRegex = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;

export function isEmail(str) {
  if (!str) return null;
  return emailRegex.test(str);
}

export function oneUpper(value) {
  return hasUpper(value);
}

export function oneLower(value) {
  return hasLower(value);
}

/**
 * @param func The function to be executed
 * @param mapReturnFunction The function to map the request result
 * @param syncValidation The function to make syncronous validations, before send request,
 * and only make the request when the input is valid
 */
export function debounceValidator(
  func: Function,
  mapReturnFunction: Function,
  syncValidation: Function
) {
  return withAsync(
    debounceAsyncValidator(async function (value, debounce) {
      if (!syncValidation(value)) {
        return new Promise((resolve) => resolve(false));
      } else {
        await debounce();
        let result = await func(value);
        return mapReturnFunction(result);
      }
    }, 500)
  );
}
