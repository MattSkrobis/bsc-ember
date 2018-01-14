import DS from 'ember-data';

const { Model, attr, hasMany } = DS;

export default Model.extend({
  replies: hasMany('replies'),
  body: attr('string'),
  email: attr('string'),
  isUnanswered: attr('boolean')
});
