import DS from 'ember-data';

const { Model, belongsTo, attr } = DS;

export default Model.extend({
  answer: belongsTo('answer'),
  user: belongsTo('user'),
  question: belongsTo('question'),
  questionDescription: attr('string', { onlyForRead: true }),
  answerDescription: attr('string', { onlyForRead: true })
});
