import { extend, configure } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';

extend('minmax', {
  validate(value, { min, max }) {
    return value.length >= min && value.length <= max;
  },
  params: ['min', 'max'],
  message: 'The {_field_} field must have at least {min} characters and {max} characters at most',
});

for (const [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation,
  });
}

extend('required', {
  ...rules.required,
  message: 'This field is required',
});

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
    dirty: ['is-dirty', 'is-dirty'], // multiple classes per flag!
    // ...
  },
});
