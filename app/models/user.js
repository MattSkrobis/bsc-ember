import DS from 'ember-data';

const { Model, attr } = DS;

export default Model.extend({
  firstName: attr('string'),
  lastName: attr('string'),
  email: attr('string'),
  addressLine2: attr('string'),
  addressLine1: attr('string'),
  gender: attr('string'),
  password: attr('string'),
  passwordConfirmation: attr('string'),
  telephoneNumber: attr('string'),
  isAdmin: attr('boolean')
});
