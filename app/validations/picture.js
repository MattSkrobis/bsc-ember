import { validatePresence } from 'ember-changeset-validations/validators';

export const pictureValidations = {
  url: [validatePresence(true)]
};