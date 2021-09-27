import { extend, configure } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';

extend('positive', (value) => {
  return value >= 0;
});

extend('odd', (value) => {
  return value % 2 !== 0;
});

extend('min', {
  validate(value, args) {
    return value.length >= args.length;
  },
  params: ['length'],
});

extend('minmax', {
  validate(value, { min, max }) {
    return value.length >= min && value.length <= max;
  },
  params: ['min', 'max'],
  message: 'The {_field_} field must have at least {min} characters and {max} characters at most',
});

extend('one_of', (value, values) => {
  return values.includes(value);
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
