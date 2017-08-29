import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  afterModel() {
    this.store.findAll('category');
  }
});
