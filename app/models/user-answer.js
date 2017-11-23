import DS from 'ember-data';

const { Model, belongsTo } = DS;

export default Model.extend({
  answer: belongsTo('answer'),
  user: belongsTo('user'),
  question: belongsTo('question')
});
