import Ember from 'ember';

const { Controller, inject: { service } } = Ember;

export default Controller.extend({
  currentUser: service(),
  session: service(),
  actions: {
    invalidateSession() {
      this.get('session').invalidate(this.get('session.data.authenticated.token'));
    }
  }
});
