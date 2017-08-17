import DS from 'ember-data';

const { Model, attr, hasMany } = DS;

export default Model.extend({
  products: hasMany('product'),
  visible: attr('boolean'),
  name: attr('string')
});
