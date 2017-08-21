import Ember from 'ember';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  router: service(),
  actions: {
    destroy(category) {
      category.deleteRecord();
      category
        .save()
        .then(() => {
          this.get('router').transitionTo('categories.index');
        })
        .catch(err => {
          alert(err);
        });
    },
    toggle() {
      this.toggleProperty('confirmShown');
    }
  }
});
