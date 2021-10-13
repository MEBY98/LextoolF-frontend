import { Ref } from 'vue';
import { RuleObject } from 'ant-design-vue/lib/form/interface';
import { NewFraseologicStudy } from '@/models/FraseologicStudy';
import ValidateYear from '@/utils/MyValidators/yearValidator';
import ValidateString from '@/utils/MyValidators/stringValidator';

export default function UseStudyRules(newStudy: Ref<NewFraseologicStudy>) {
  const validateName = async (rule: RuleObject, value: string) => {
    return ValidateString(value);
  };
  const validateInitYear = async (rule: RuleObject, value: number) => {
    return ValidateYear(
      value,
      newStudy.value.finalYear,
      newStudy.value.initYear
    );
  };
  const validateFinalYear = async (rule: RuleObject, value: number) => {
    return ValidateYear(
      value,
      newStudy.value.finalYear,
      newStudy.value.initYear
    );
  };
  const validateDictionaries = async (rule: RuleObject, value: any) => {
    console.log('value', value);
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
    initYear: [
      {
        required: true,
        trigger: ['change', 'blur'],
        validator: validateInitYear,
      },
    ],

    finalYear: [
      {
        required: true,
        trigger: ['change', 'blur'],
        validator: validateFinalYear,
      },
    ],
    dictionaries: [
      {
        trigger: ['change, blur'],
        validator: validateDictionaries,
      },
    ],
  };
  return {
    rules,
    newStudy,
  };
}
