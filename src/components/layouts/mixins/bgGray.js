import { classie } from './../../../utils/classie';

export default {
  beforeMount() {
    classie.toggle(document.getElementById('app'), 'bg-gray');
    classie.toggle(document.getElementById('body'), 'bg-gray');
  },
  beforeUnmount() {
    classie.toggle(document.getElementById('app'), 'bg-gray');
    classie.toggle(document.getElementById('body'), 'bg-gray');
  },
};
