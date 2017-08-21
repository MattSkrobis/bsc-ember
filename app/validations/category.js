import { validatePresence } from 'ember-changeset-validations/validators';

export const categoryValidations = {
  name: [validatePresence(true)]
};
