import Ember from 'ember';

const { Route, inject: { service }, computed, RSVP } = Ember;

export default Ember.Route.extend({
  shoppingCart: service(),
  
});
