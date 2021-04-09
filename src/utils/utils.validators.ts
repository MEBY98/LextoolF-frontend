import { hasUpper, hasLower } from './utils';
import { FetchPolicy } from '@/graphql/apolloProvider';
import { User } from './../graphql/modules/user/user.model';
import { withAsync } from '@vuelidate/validators/src/utils/common.js';
import { debounceAsyncValidator } from './utilsdebounce.js';

const emailRegex = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;

export function isEmail(str) {
  if (!str) return null;
  return emailRegex.test(str);
}

export async function emailExists(email) {
  let exists = await User.exists(
    { email, active: true },
    FetchPolicy.network_only
  );
  return exists.data;
}

export function oneUpper(value) {
  return hasUpper(value);
}

export function oneLower(value) {
  return hasLower(value);
}

// func: emailExists
// mapReturnFunction: (exists) => return !exists

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

// export function debounceValidator(
//   func: Function,
//   mapReturnFunction: Function,
//   syncValidation: Function
// ) {
//   return withAsync(
//     debounceAsyncValidator(function (value, debounce) {
//       // console.log(value, 'value');

//       // let valid = syncValidation(value);
//       // if (!valid) {
//       //   return new Promise((resolve) => resolve(true));
//       // } else {
//       return debounce()
//         .then(() => func(value))
//         .then((result) => {
//           console.log(mapReturnFunction(result));

//           return mapReturnFunction(result);
//         });
//       // }
//     }, 500)
//   );
// }
