import { validatePresence } from 'ember-changeset-validations/validators';

export const productValidations = {
  url: [validatePresence(true)]
};