import Ember from 'ember';

const { Service, inject: { service }, RSVP } = Ember;

export default Service.extend({
  session: service('session'),
  store: service(),
  load() {
    if (this.get('session.isAuthenticated')) {
      let userId = this.get('session.data.authenticated.id');
      return this.get('store').findRecord('user', userId).then(user => {
        this.set('user', user);
      });
    } else {
      return RSVP.resolve();
    }
  }
});