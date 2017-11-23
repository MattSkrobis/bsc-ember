import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  answer: belongsTo('question'),
  description: attr('string')
});
