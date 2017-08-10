import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  actions: {
    save() {
      this.product.save()
        .catch((error) => alert(error));
    }
  }
});
