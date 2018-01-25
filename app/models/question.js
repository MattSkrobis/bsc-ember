import DS from 'ember-data';

const { Model, attr, hasMany } = DS;

export default Model.extend({
  answers: hasMany('answers'),
  userAnswers: hasMany('userAnswers'),
  description: attr('string')
});
