import Ember from 'ember';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  paperToaster: service(),
  actions: {
    closeDialog() {
      this.set('showDialog', false);
    },
    remove(picture) {
      picture.deleteRecord();
      picture
        .save()
        .then(() => {
          this.get('paperToaster').show('Success!', { duration: 3000 });
        })
        .catch(err => {
          this.get('paperToaster').show(`Error: ${err}`, { duration: 3000 });
        });
    }
  }
});
