import { RuleObject } from 'ant-design-vue/lib/form/interface';
import ValidateString from '@/utils/MyValidators/stringValidator';

export default function UseUbicationRules() {
  const validateUbication = async (rule: RuleObject, value: string) => {
    return ValidateString(value);
  };
  const rules = {
    ubication: [
      {
        required: true,
        trigger: ['change', 'blur'],
        validator: validateUbication,
      },
    ],
  };
  return { rules };
}
