import FormValidation from './validation/FormValidation.vue';
import tcInput from './validation/tc-input/tc-input.vue';
import tcInputNumber from './validation/tc-input-number/tc-input-number.vue';
import tcSelect from './validation/tc-select/tc-select.vue';
import tcAutocomplete from './validation/tc-autocomplete/tc-autocomplete.vue';
import VueFeather from './icons/feather.vue';
import Avatar from './Avatar.vue';
import Spinner from './loading/Spinner.vue';
import Transition from './global/Transition.vue';
import GInput from './global/GInput.vue';

export function registerSharedComponents(app) {
  app.component('VForm', FormValidation);
  app.component('AppTransition', Transition);
  app.component('VInput', tcInput);
  app.component('GInput', GInput);
  app.component('VInputNumber', tcInputNumber);
  app.component('VSelect', tcSelect);
  app.component('VAutocomplete', tcAutocomplete);
  app.component('Feather', VueFeather);
  app.component('Avatar', Avatar);
  app.component('Spinner', Spinner);
}
