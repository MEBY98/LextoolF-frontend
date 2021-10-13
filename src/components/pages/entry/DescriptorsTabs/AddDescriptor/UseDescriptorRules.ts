import { RuleObject } from 'ant-design-vue/lib/form/interface';
import ValidateString from '@/utils/MyValidators/stringValidator';

export default function UseDescriptorRules() {
  const validateDescription = async (rule: RuleObject, value: string) => {
    return ValidateString(value);
  };
  const rules = {
    description: [
      {
        required: true,
        trigger: ['change', 'blur'],
        validator: validateDescription,
      },
    ],
  };
  return { rules };
}
