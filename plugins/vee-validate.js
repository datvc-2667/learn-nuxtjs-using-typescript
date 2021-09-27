import VueI18n from 'vue-i18n';
import Vue from 'vue';
import * as VeeValidate from 'vee-validate';
import en from 'vee-validate/dist/locale/en.json';
import ar from 'vee-validate/dist/locale/ar.json';
import vi from 'vee-validate/dist/locale/vi.json';

const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: {
      validations: en,
    },
    ar: {
      validations: ar,
    },
    vi: {
      validations: vi,
    },
  },
});

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
