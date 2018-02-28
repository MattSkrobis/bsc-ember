import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  message: belongsTo('message'),
  body: attr('string'),
  email: attr('string')
});
