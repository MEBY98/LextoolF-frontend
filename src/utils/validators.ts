import { withParams } from 'vuelidate/lib';

// export const equal = (equalTo) =>
//   withParams({ type: 'sameAs', eq: equalTo }, function (value, parentVm) {
//     console.log(value, 'value');
//     console.log(equalTo, 'equalTo');
//     console.log(parentVm, 'parentVm');

//     return value === ref(equalTo, null, parentVm);
//   });

export const equal = (value, vm) => {
  console.log(value, 'value');

  return false;
};
// vm.other.nested.field.contains(value)

// function otherFieldContainsMe (value) {
//   return this.other.nested.field.contains(value)
// }
