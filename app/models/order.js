import DS from 'ember-data';

const { Model, attr, belongsTo, hasMany } = DS;

export default Model.extend({
  user: belongsTo('user'),
  orderLines: hasMany('orderLines'),
  status: attr('string'),
  createdAt: attr('date'),
  total: attr('number'),
  transactionNumber: attr('string'),
  discount: attr('number'),
  priceAfterDiscount: attr('number'),
  courier: attr('string'),
  paymentMethod: attr('string')
});
