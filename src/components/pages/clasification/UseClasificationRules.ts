import { RuleObject } from 'ant-design-vue/lib/form/interface';
import ValidateString from '@/utils/MyValidators/stringValidator';

export default function UseClasificationRules() {
  const validateClasification = async (rule: RuleObject, value: string) => {
    return ValidateString(value);
  };
  const rules = {
    clasification: [
      {
        required: true,
        trigger: ['change', 'blur'],
        validator: validateClasification,
      },
    ],
  };
  return { rules };
}
