import {
  validatePresence,
  validateFormat
} from 'ember-changeset-validations/validators';

export const messageValidations = {
  email: [validatePresence(true), validateFormat({ type: 'email' })],
  body: validatePresence(true)
};
