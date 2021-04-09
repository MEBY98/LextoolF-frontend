import { FocusDirective } from './focus';
import { AsyncValidation } from './v-async';

export function registerSharedDirectives(app) {
  app.directive('focus', FocusDirective);
  // app.directive('async', AsyncValidation);
}
