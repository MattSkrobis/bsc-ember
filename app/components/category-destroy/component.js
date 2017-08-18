import Ember from 'ember';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  router: service(),
  actions: {
    destroy(category) {
      category.deleteRecord();
      category.save();
      this.get('router').transitionTo('categories.index');
    },
    toggle() {
      this.toggleProperty('confirmShown');
    }
  }
});
