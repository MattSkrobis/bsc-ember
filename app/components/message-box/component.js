import Ember from 'ember';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  router: service(),
  store: service(),
  actions: {
    save() {
      this.get('model')
        .save()
        .then(() => {
          this.get('router').transitionTo('/');
        });
    }
  }
});
