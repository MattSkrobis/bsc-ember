import Ember from 'ember';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  toast: service('application-toast'),
  router: service(),
  actions: {
    destroy(category) {
      category.deleteRecord();
      category
        .save()
        .then(() => {
          this.set('toast.message', 'Success!');
          this.get('router').transitionTo('categories.index');
        })
        .catch(err => {
          this.set('toast.message', `Error: ${err}`);
        });
    },
    toggle() {
      this.toggleProperty('confirmShown');
    }
  }
});
