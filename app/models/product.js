import DS from 'ember-data';

const { Model, attr,
  hasMany, belongsTo } = DS;

export default Model.extend({
  category: belongsTo('category'),
  pictures: hasMany('pictures'),
  name: attr('string'),
  description: attr('string'),
  sku: attr('number'),
  availability: attr('boolean'),
  price: attr('number'),
  currency: attr('string'),
  quantity: attr('number'),
  gender: attr('string'),
  material: attr('string'),
  color: attr('string')
});
