import Ember from 'ember';

const { Controller, inject: { service } } = Ember;

export default Controller.extend({
  session: service('session'),
  actions: {
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
