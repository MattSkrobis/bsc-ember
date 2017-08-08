import Ember from 'ember';

const  { Component } = Ember;

export default Component.extend({
  actions: {
    save() {
      this.product.save()
        .then((result) => alert(result))
        .catch((error) => alert(error));
    }
  }
});
