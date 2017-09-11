import Ember from 'ember';
import ENV from 'bsc-ember/config/environment';

const { Controller, inject: { service }, $  } = Ember;

export default Controller.extend({
  session: service('session'),
  currentUser: service('current-user'),
  actions: {
    invalidateSession() {
      this.get('session').invalidate(this.get('session.data.authenticated.token'));
    }
  }
});
