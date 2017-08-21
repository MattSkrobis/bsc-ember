import Ember from 'ember';

const { Controller, inject: { service } } = Ember;

export default Controller.extend({
  router: service(),
  actions: {
    toNew() {
      this.get('router').transitionTo('categories.new');
    }
  }
});

