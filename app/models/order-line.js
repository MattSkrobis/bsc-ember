import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  product: belongsTo('product'),
  order: belongsTo('order'),
  count: attr('number'),
  size: attr('string')
});
