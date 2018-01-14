import {
  validatePresence
} from 'ember-changeset-validations/validators';

export const replyValidations = {
  body: validatePresence(true)
};
