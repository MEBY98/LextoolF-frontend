import { RuleObject } from 'ant-design-vue/lib/form/interface';
import ValidateYear from '@/utils/MyValidators/yearValidator';
import ValidateString from '@/utils/MyValidators/stringValidator';
const EMPTY_AUTHORS = 'Por favor seleccione el autor(es)';

export default function UseDictionaryInfoRules() {
  const validateName = async (rule: RuleObject, value: string) => {
    return ValidateString(value);
  };
  const validateSiglas = async (rule: RuleObject, value: string) => {
    return ValidateString(value);
  };
  const validateAnnoOfPublication = async (rule: RuleObject, value: number) => {
    return ValidateYear(value);
  };
  const validateReference = async (rule: RuleObject, value: string) => {
    return ValidateString(value);
  };
  const validateAuthor = async (rule: RuleObject, value: string[]) => {
    if (value.length === 0) {
      return Promise.reject(EMPTY_AUTHORS);
    }
    return Promise.resolve();
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
    annoOfPublication: [
      {
        required: true,
        trigger: ['change', 'blur'],
        validator: validateAnnoOfPublication,
      },
    ],
    reference: [
      {
        required: true,
        trigger: ['change', 'blur'],
        validator: validateReference,
      },
    ],
    author: [
      {
        required: true,
        trigger: ['change', 'blur'],
        validator: validateAuthor,
      },
    ],
  };
  return {
    rules,
  };
}
