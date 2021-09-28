import Vue from 'vue';
import * as VeeValidate from 'vee-validate';

const config = {
  aria: true,
  classNames: {},
  classes: false,
  delay: 0,
  dictionary: null,
  errorBagName: 'errors', // change if property conflicts
  events: 'input|blur|change',
  fieldsBagName: 'fields',
  // i18n: null, // the vue-i18n plugin instance
  i18nRootKey: 'validations', // the nested key under which the validation messages will be located
  inject: true,
  locale: 'en',
  validity: false,
  useConstraintAttrs: true,
  defaultMessage: (field, values) => {
    values._field_ = i18n.t(`fields.${field}`);
    return i18n.t(`validations.messages.${values._rule_}`, values);
  },
};

Vue.use(VeeValidate, config);
