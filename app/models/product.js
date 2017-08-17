import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  category: belongsTo('category'),
  name: attr('string'),
  description: attr('string'),
  sku: attr('number'),
  availability: attr('boolean'),
  price: attr('number'),
  currency: attr('string'),
  quantity: attr('number')
});