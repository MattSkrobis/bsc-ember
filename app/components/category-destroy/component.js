import Ember from 'ember';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  // paperToaster: service(),
  router: service(),
  actions: {
    destroy(category) {
      category.deleteRecord();
      category
        .save()
        .then(() => {
          this.get('paperToaster').show('Success!', { duration: 3000 });
          this.get('router').transitionTo('categories.index');
        })
        .catch(err => {
          this.get('paperToaster').show(`Error: ${err}`);
        });
    },
    toggle() {
      this.toggleProperty('confirmShown');
    }
  }
});
