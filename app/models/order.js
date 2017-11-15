import DS from 'ember-data';

const { Model, attr, belongsTo, hasMany } = DS;

export default Model.extend({
  user: belongsTo('user'),
  orderLines: hasMany('orderLines'),
  status: attr('string'),
  createdAt: attr('date')
});
