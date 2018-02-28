import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  model(params) {
    return this.store.findRecord('order', params.order_id);
  },
  afterModel(model) {
    return RSVP.hash(model.get('user'));
  }
});
