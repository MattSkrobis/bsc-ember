import {
  validatePresence,
  validateLength
} from 'ember-changeset-validations/validators';

export const userValidations = {
  lastName: validatePresence(true),
  firstName: validatePresence(true),
  addressLine1: validatePresence(true),
  addressLine2: [validatePresence(true), validateLength({ max: 80 })],
  telephoneNumber: [validatePresence(true), validateLength({ min: 9, max: 15 })],
  gender: validatePresence(true)
};
