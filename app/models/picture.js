import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  product: belongsTo('product'),
  link: attr('string')
});