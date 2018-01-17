import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  model() {
    return this.store.findAll('order');
  },
  afterModel(model) {
    return RSVP.all(model.getEach('user'));
  }
});
