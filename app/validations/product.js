import {
  validatePresence,
  validateLength,
  validateNumber
} from 'ember-changeset-validations/validators';

export const productValidations =  {
  name: [validatePresence(true), validateLength({ min: 3 })],
  description: validateLength({ max: 255 }),
  sku: validateNumber({ integer: true })
};