import { RuleObject } from 'ant-design-vue/lib/form/interface';
import ValidateString from '@/utils/MyValidators/stringValidator';

export default function UseAuthorRules() {
  const validateName = async (rule: RuleObject, value: string) => {
    return ValidateString(value, true);
  };
  const validateSiglas = async (rule: RuleObject, value: string) => {
    return ValidateString(value, true);
  };
  const rules = {
    name: [
      {
        required: true,
        trigger: ['change', 'blur'],
        validator: validateName,
      },
    ],
    siglas: [
      {
        required: true,
        trigger: ['change', 'blur'],
        validator: validateSiglas,
      },
    ],
  };
  return { rules };
}
