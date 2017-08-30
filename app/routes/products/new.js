import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model() {
    return {
      product: this.store.createRecord('product'),
      newPicture: this.store.createRecord('picture')
    };
  },
  afterModel() {
    this.store.findAll('category');
  }
});
